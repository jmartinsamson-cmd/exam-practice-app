import React from 'react';
import { useApp } from '../hooks/useApp';

const ProgressBar = () => {
  const { state } = useApp();

  const calculateProgress = () => {
    let totalQuestions = 0;
    let answeredQuestions = 0;
    let correctQuestions = 0;

    if (state.studyMode === 'chapter') {
      // Current chapter only
      const currentChapter = state.chapters[state.currentChapterIdx];
      if (currentChapter) {
        totalQuestions = currentChapter.questions.length;
        currentChapter.questions.forEach((_, qIdx) => {
          const questionId = `${currentChapter.chapter}-${qIdx}`;
          const answerData = state.answers[questionId];
          if (answerData) {
            answeredQuestions++;
            if (answerData.correct) correctQuestions++;
          }
        });
      }
    } else {
      // All chapters
      state.chapters.forEach(chapter => {
        totalQuestions += chapter.questions.length;
        chapter.questions.forEach((_, qIdx) => {
          const questionId = `${chapter.chapter}-${qIdx}`;
          const answerData = state.answers[questionId];
          if (answerData) {
            answeredQuestions++;
            if (answerData.correct) correctQuestions++;
          }
        });
      });
    }

    return {
      totalQuestions,
      answeredQuestions,
      correctQuestions,
      progressPercent: totalQuestions > 0 ? (answeredQuestions / totalQuestions) * 100 : 0,
      accuracyPercent: answeredQuestions > 0 ? (correctQuestions / answeredQuestions) * 100 : 0
    };
  };

  const progress = calculateProgress();

  // Daily goal progress
  const today = new Date().toDateString();
  const todayAnswers = Object.values(state.answers).filter(answer =>
    new Date(answer.timestamp).toDateString() === today
  );
  const dailyProgress = Math.min((todayAnswers.length / state.dailyGoal) * 100, 100);

  return (
    <div style={{
      padding: '1rem',
      backgroundColor: state.theme === 'dark' ? '#2a2a2a' : '#f5f5f5',
      borderRadius: '8px',
      marginBottom: '1rem'
    }}>
      {/* Overall Progress */}
      <div style={{ marginBottom: '1rem' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '0.5rem',
          color: state.theme === 'dark' ? '#fff' : '#333'
        }}>
          <span style={{ fontWeight: 'bold' }}>
            {state.studyMode === 'chapter' ? 'Chapter Progress' : 'Overall Progress'}
          </span>
          <span style={{ fontSize: '0.9rem' }}>
            {progress.answeredQuestions} / {progress.totalQuestions} questions
          </span>
        </div>

        {/* Progress Bar */}
        <div style={{
          width: '100%',
          height: '12px',
          backgroundColor: state.theme === 'dark' ? '#444' : '#e0e0e0',
          borderRadius: '6px',
          overflow: 'hidden',
          position: 'relative'
        }}>
          <div style={{
            width: `${progress.progressPercent}%`,
            height: '100%',
            backgroundColor: progress.accuracyPercent >= 70 ? '#4CAF50' :
                           progress.accuracyPercent >= 40 ? '#FF9800' : '#f44336',
            transition: 'width 0.3s ease'
          }} />
        </div>

        {/* Stats */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: '0.5rem',
          fontSize: '0.8rem',
          color: state.theme === 'dark' ? '#ccc' : '#666'
        }}>
          <span>{Math.round(progress.progressPercent)}% Complete</span>
          {progress.answeredQuestions > 0 && (
            <span>{Math.round(progress.accuracyPercent)}% Accuracy</span>
          )}
        </div>
      </div>

      {/* Daily Goal Progress */}
      <div>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '0.5rem',
          color: state.theme === 'dark' ? '#fff' : '#333'
        }}>
          <span style={{ fontWeight: 'bold' }}>Daily Goal</span>
          <span style={{ fontSize: '0.9rem' }}>
            {todayAnswers.length} / {state.dailyGoal} questions today
          </span>
        </div>

        {/* Daily Goal Bar */}
        <div style={{
          width: '100%',
          height: '8px',
          backgroundColor: state.theme === 'dark' ? '#444' : '#e0e0e0',
          borderRadius: '4px',
          overflow: 'hidden'
        }}>
          <div style={{
            width: `${dailyProgress}%`,
            height: '100%',
            backgroundColor: dailyProgress >= 100 ? '#4CAF50' : '#2196F3',
            transition: 'width 0.3s ease'
          }} />
        </div>

        {/* Daily Stats */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: '0.5rem',
          fontSize: '0.8rem',
          color: state.theme === 'dark' ? '#ccc' : '#666'
        }}>
          <span>{Math.round(dailyProgress)}% of Daily Goal</span>
          <span>🔥 {state.streak} day streak</span>
        </div>
      </div>

      {/* Quick Stats */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
        gap: '1rem',
        marginTop: '1rem',
        paddingTop: '1rem',
        borderTop: `1px solid ${state.theme === 'dark' ? '#444' : '#ddd'}`
      }}>
        <div style={{
          textAlign: 'center',
          color: state.theme === 'dark' ? '#fff' : '#333'
        }}>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#4CAF50' }}>
            {progress.correctQuestions}
          </div>
          <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>Correct</div>
        </div>

        <div style={{
          textAlign: 'center',
          color: state.theme === 'dark' ? '#fff' : '#333'
        }}>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#f44336' }}>
            {progress.answeredQuestions - progress.correctQuestions}
          </div>
          <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>Incorrect</div>
        </div>

        <div style={{
          textAlign: 'center',
          color: state.theme === 'dark' ? '#fff' : '#333'
        }}>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#FF9800' }}>
            {state.bookmarks.size}
          </div>
          <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>Bookmarked</div>
        </div>

        <div style={{
          textAlign: 'center',
          color: state.theme === 'dark' ? '#fff' : '#333'
        }}>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#9C27B0' }}>
            {Object.keys(state.notes).length}
          </div>
          <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>Notes</div>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;