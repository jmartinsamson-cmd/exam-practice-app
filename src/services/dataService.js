// Data service for loading chapters and managing localStorage
import chaptersIndex from '../../data/chapters-index.json';

const STORAGE_KEY = 'exam-practice-app';

// Load chapter data dynamically
export async function loadChapterData() {
  try {
    const chapters = [];

    for (const chapterInfo of chaptersIndex.chapters) {
      try {
        // Dynamic import for each chapter (with vite-ignore to suppress warning)
        const chapterModule = await import(/* @vite-ignore */ `../../data/chapters/${chapterInfo.filename}`);
        chapters.push(chapterModule.default);
      } catch (error) {
        console.error(`Failed to load chapter ${chapterInfo.chapter}:`, error);
      }
    }

    return chapters.sort((a, b) => a.chapter - b.chapter);
  } catch (error) {
    console.error('Failed to load chapters index:', error);
    return [];
  }
}

// Save data to localStorage
export function saveToLocalStorage(data) {
  try {
    const existingData = loadFromLocalStorage() || {};
    const updatedData = { ...existingData, ...data };

    // Convert Set to Array for bookmarks
    if (data.bookmarks instanceof Set) {
      updatedData.bookmarks = Array.from(data.bookmarks);
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedData));
  } catch (error) {
    console.error('Failed to save to localStorage:', error);
  }
}

// Load data from localStorage
export function loadFromLocalStorage() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      const parsed = JSON.parse(data);

      // Convert Array back to Set for bookmarks
      if (Array.isArray(parsed.bookmarks)) {
        parsed.bookmarks = new Set(parsed.bookmarks);
      }

      return parsed;
    }
    return null;
  } catch (error) {
    console.error('Failed to load from localStorage:', error);
    return null;
  }
}

// Analytics and progress tracking
export function getStudyAnalytics(answers) {
  const totalQuestions = Object.keys(answers).length;
  const correctAnswers = Object.values(answers).filter(a => a.correct).length;
  const accuracy = totalQuestions > 0 ? (correctAnswers / totalQuestions) * 100 : 0;

  // Calculate average time per question
  const totalTime = Object.values(answers).reduce((sum, a) => sum + (a.timeSpent || 0), 0);
  const avgTimePerQuestion = totalQuestions > 0 ? totalTime / totalQuestions : 0;

  // Group by chapter for detailed analytics
  const chapterStats = {};
  Object.entries(answers).forEach(([questionId, answer]) => {
    const [chapterNum] = questionId.split('-');
    if (!chapterStats[chapterNum]) {
      chapterStats[chapterNum] = { total: 0, correct: 0, timeSpent: 0 };
    }
    chapterStats[chapterNum].total++;
    if (answer.correct) chapterStats[chapterNum].correct++;
    chapterStats[chapterNum].timeSpent += answer.timeSpent || 0;
  });

  return {
    totalQuestions,
    correctAnswers,
    accuracy: Math.round(accuracy * 100) / 100,
    avgTimePerQuestion: Math.round(avgTimePerQuestion),
    chapterStats
  };
}

// Calculate question difficulty based on user performance data
export function calculateQuestionDifficulty(questionId, answers) {
  const answerData = answers[questionId];

  if (!answerData || answerData.attempts === 0) {
    return 'unknown'; // Not enough data
  }

  const attempts = answerData.attempts;
  const avgTime = answerData.timeSpent || 0;
  const confidence = answerData.confidence || 3;

  // Calculate difficulty score (0-10, higher = more difficult)
  let difficultyScore = 0;

  // Factor in accuracy (wrong answers increase difficulty)
  if (!answerData.correct) difficultyScore += 4;

  // Factor in multiple attempts (more attempts = higher difficulty)
  difficultyScore += Math.min(attempts - 1, 3);

  // Factor in time spent (longer time = higher difficulty)
  if (avgTime > 120) difficultyScore += 2;
  else if (avgTime > 60) difficultyScore += 1;

  // Factor in confidence (low confidence = higher difficulty)
  if (confidence <= 2) difficultyScore += 2;
  else if (confidence <= 3) difficultyScore += 1;

  // Convert to difficulty levels
  if (difficultyScore <= 2) return 'easy';
  else if (difficultyScore <= 5) return 'medium';
  else return 'hard';
}

// Get global difficulty statistics for all questions
export function getGlobalDifficultyStats(answers, chapters) {
  const difficultyStats = { easy: 0, medium: 0, hard: 0, unknown: 0 };

  chapters.forEach(chapter => {
    chapter.questions.forEach((_, qIdx) => {
      const questionId = `${chapter.chapter}-${qIdx}`;
      const difficulty = calculateQuestionDifficulty(questionId, answers);
      difficultyStats[difficulty]++;
    });
  });

  return difficultyStats;
}

// Spaced repetition algorithm
export function getSpacedRepetitionQuestions(answers, chapters) {
  const now = Date.now();
  const questionsToReview = [];

  chapters.forEach(chapter => {
    chapter.questions.forEach((question, qIdx) => {
      const questionId = `${chapter.chapter}-${qIdx}`;
      const answerData = answers[questionId];

      if (!answerData) {
        // New question - high priority
        questionsToReview.push({
          chapterIdx: chapters.findIndex(c => c.chapter === chapter.chapter),
          questionIdx: qIdx,
          priority: 10,
          reason: 'new'
        });
      } else if (!answerData.correct) {
        // Incorrect answer - very high priority
        const daysSinceAnswer = (now - answerData.timestamp) / (1000 * 60 * 60 * 24);
        questionsToReview.push({
          chapterIdx: chapters.findIndex(c => c.chapter === chapter.chapter),
          questionIdx: qIdx,
          priority: Math.max(15 - daysSinceAnswer, 5),
          reason: 'incorrect'
        });
      } else if (answerData.confidence && answerData.confidence < 4) {
        // Low confidence - medium priority
        const daysSinceAnswer = (now - answerData.timestamp) / (1000 * 60 * 60 * 24);
        questionsToReview.push({
          chapterIdx: chapters.findIndex(c => c.chapter === chapter.chapter),
          questionIdx: qIdx,
          priority: Math.max(8 - daysSinceAnswer, 2),
          reason: 'low-confidence'
        });
      }
    });
  });

  return questionsToReview.sort((a, b) => b.priority - a.priority);
}

// Adaptive questioning - select next best question
export function getNextAdaptiveQuestion(answers, chapters, currentChapter, currentQuestion) {
  const spacedQuestions = getSpacedRepetitionQuestions(answers, chapters);

  if (spacedQuestions.length > 0) {
    const next = spacedQuestions[0];
    return {
      chapterIdx: next.chapterIdx,
      questionIdx: next.questionIdx,
      reason: next.reason
    };
  }

  // Fallback to sequential if no spaced repetition needed
  let nextChapter = currentChapter;
  let nextQuestion = currentQuestion + 1;

  if (nextQuestion >= chapters[currentChapter]?.questions.length) {
    nextChapter = (currentChapter + 1) % chapters.length;
    nextQuestion = 0;
  }

  return {
    chapterIdx: nextChapter,
    questionIdx: nextQuestion,
    reason: 'sequential'
  };
}

// Filter questions based on criteria
export function filterQuestions(chapters, answers, filters, searchTerm) {
  const filtered = [];

  chapters.forEach((chapter, chIdx) => {
    chapter.questions.forEach((question, qIdx) => {
      const questionId = `${chapter.chapter}-${qIdx}`;
      const answerData = answers[questionId];

      // Search term filter
      if (searchTerm && !question.question.toLowerCase().includes(searchTerm.toLowerCase()) &&
          !question.rationale?.toLowerCase().includes(searchTerm.toLowerCase())) {
        return;
      }

      // Answered filter
      if (filters.answered !== null) {
        const isAnswered = !!answerData;
        if (filters.answered !== isAnswered) return;
      }

      // Correct filter
      if (filters.correct !== null && answerData) {
        if (filters.correct !== answerData.correct) return;
      }

      // Difficulty filter
      if (filters.difficulty !== null) {
        const questionDifficulty = calculateQuestionDifficulty(questionId, answers);
        if (filters.difficulty !== questionDifficulty) return;
      }

      // Bookmarked filter handled in component level

      filtered.push({
        chapterIdx: chIdx,
        questionIdx: qIdx,
        question,
        chapter: chapter.chapter
      });
    });
  });

  return filtered;
}

// Export user study data
export function exportStudyData(state) {
  const exportData = {
    version: '1.0',
    exportDate: new Date().toISOString(),
    userData: {
      answers: state.answers,
      bookmarks: Array.from(state.bookmarks),
      notes: state.notes,
      settings: {
        theme: state.theme,
        studyMode: state.studyMode,
        timePerQuestion: state.timePerQuestion,
        dailyGoal: state.dailyGoal
      },
      analytics: {
        streak: state.streak,
        sessionStartTime: state.sessionStartTime
      }
    }
  };

  const dataStr = JSON.stringify(exportData, null, 2);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(dataBlob);

  const link = document.createElement('a');
  link.href = url;
  link.download = `exam-practice-data-${new Date().toISOString().split('T')[0]}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

// Import user study data
export function importStudyData(file, dispatch) {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject(new Error('No file provided'));
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importData = JSON.parse(e.target.result);

        // Validate the data structure
        if (!importData.userData || !importData.version) {
          throw new Error('Invalid file format');
        }

        // Import user data
        const userData = importData.userData;

        // Restore answers
        if (userData.answers) {
          Object.entries(userData.answers).forEach(([questionId, answerData]) => {
            dispatch({
              type: 'SUBMIT_ANSWER',
              payload: {
                questionId,
                answer: answerData.answer,
                correct: answerData.correct,
                timeSpent: answerData.timeSpent
              }
            });
          });
        }

        // Restore bookmarks
        if (userData.bookmarks) {
          userData.bookmarks.forEach(questionId => {
            dispatch({ type: 'TOGGLE_BOOKMARK', payload: questionId });
          });
        }

        // Restore notes
        if (userData.notes) {
          Object.entries(userData.notes).forEach(([questionId, note]) => {
            dispatch({ type: 'SET_NOTE', payload: { questionId, note } });
          });
        }

        // Restore settings
        if (userData.settings) {
          const settings = userData.settings;
          if (settings.theme) {
            dispatch({ type: 'TOGGLE_THEME' }); // Adjust based on current vs imported theme
          }
          if (settings.studyMode) {
            dispatch({ type: 'SET_STUDY_MODE', payload: settings.studyMode });
          }
          if (settings.dailyGoal) {
            dispatch({ type: 'UPDATE_DAILY_PROGRESS', payload: settings.dailyGoal });
          }
        }

        // Restore analytics
        if (userData.analytics) {
          if (userData.analytics.streak) {
            dispatch({ type: 'UPDATE_STREAK', payload: userData.analytics.streak });
          }
        }

        resolve({
          success: true,
          message: 'Study data imported successfully!',
          importedItems: {
            answers: Object.keys(userData.answers || {}).length,
            bookmarks: (userData.bookmarks || []).length,
            notes: Object.keys(userData.notes || {}).length
          }
        });

      } catch (error) {
        reject(new Error(`Failed to import data: ${error.message}`));
      }
    };

    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };

    reader.readAsText(file);
  });
}

// Export progress report (more detailed analysis)
export function exportProgressReport(state) {
  const analytics = getStudyAnalytics(state.answers);
  const difficultyStats = getGlobalDifficultyStats(state.answers, state.chapters);

  const report = {
    exportDate: new Date().toISOString(),
    studySession: {
      totalQuestions: analytics.totalQuestions,
      correctAnswers: analytics.correctAnswers,
      accuracy: analytics.accuracy,
      avgTimePerQuestion: analytics.avgTimePerQuestion,
      studyStreak: state.streak,
      dailyGoal: state.dailyGoal
    },
    difficultyBreakdown: difficultyStats,
    chapterProgress: analytics.chapterStats,
    bookmarkedQuestions: Array.from(state.bookmarks),
    studyNotes: Object.keys(state.notes).length,
    weakAreas: Object.entries(analytics.chapterStats)
      .filter(([, stats]) => stats.total > 0 && (stats.correct / stats.total) < 0.7)
      .map(([chapter, stats]) => ({
        chapter: parseInt(chapter),
        accuracy: Math.round((stats.correct / stats.total) * 100),
        totalQuestions: stats.total
      }))
      .sort((a, b) => a.accuracy - b.accuracy)
  };

  const reportStr = `# Study Progress Report
Generated: ${new Date().toLocaleDateString()}

## Overall Performance
- Total Questions Answered: ${report.studySession.totalQuestions}
- Accuracy: ${report.studySession.accuracy}%
- Average Time per Question: ${report.studySession.avgTimePerQuestion} seconds
- Current Streak: ${report.studySession.studyStreak} days

## Difficulty Breakdown
- Easy Questions: ${report.difficultyBreakdown.easy}
- Medium Questions: ${report.difficultyBreakdown.medium}
- Hard Questions: ${report.difficultyBreakdown.hard}
- New/Unknown: ${report.difficultyBreakdown.unknown}

## Areas for Improvement
${report.weakAreas.length > 0 ?
  report.weakAreas.map(area => `- Chapter ${area.chapter}: ${area.accuracy}% accuracy (${area.totalQuestions} questions)`).join('\n') :
  '- Great job! No weak areas identified.'
}

## Study Statistics
- Bookmarked Questions: ${report.bookmarkedQuestions.length}
- Notes Created: ${report.studyNotes}
- Daily Goal: ${report.studySession.dailyGoal} questions

---
*Generated by Exam Practice App*
`;

  const dataBlob = new Blob([reportStr], { type: 'text/markdown' });
  const url = URL.createObjectURL(dataBlob);

  const link = document.createElement('a');
  link.href = url;
  link.download = `study-progress-report-${new Date().toISOString().split('T')[0]}.md`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}