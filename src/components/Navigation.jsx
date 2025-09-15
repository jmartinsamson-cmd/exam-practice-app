import React from 'react';
import { useApp } from '../hooks/useApp';
import { getNextAdaptiveQuestion } from '../services/dataService';

const Navigation = () => {
  const { state, dispatch } = useApp();

  const currentChapter = state.chapters[state.currentChapterIdx];
  const isLastQuestion = currentChapter && state.currentQuestionIdx === currentChapter.questions.length - 1;
  const isFirstQuestion = state.currentQuestionIdx === 0;
  const isLastChapter = state.currentChapterIdx === state.chapters.length - 1;
  const isFirstChapter = state.currentChapterIdx === 0;

  const handleNext = () => {
    if (state.studyMode === 'adaptive') {
      const nextQuestion = getNextAdaptiveQuestion(
        state.answers,
        state.chapters,
        state.currentChapterIdx,
        state.currentQuestionIdx
      );
      dispatch({ type: 'SET_CHAPTER', payload: nextQuestion.chapterIdx });
      dispatch({ type: 'SET_QUESTION', payload: nextQuestion.questionIdx });
      return;
    }

    if (state.studyMode === 'shuffle-all') {
      // Random question from all chapters
      const totalQuestions = state.chapters.reduce((sum, ch) => sum + ch.questions.length, 0);
      let randomIdx = Math.floor(Math.random() * totalQuestions);

      for (let chIdx = 0; chIdx < state.chapters.length; chIdx++) {
        if (randomIdx < state.chapters[chIdx].questions.length) {
          dispatch({ type: 'SET_CHAPTER', payload: chIdx });
          dispatch({ type: 'SET_QUESTION', payload: randomIdx });
          return;
        }
        randomIdx -= state.chapters[chIdx].questions.length;
      }
    }

    if (state.studyMode === 'shuffle-chapter') {
      // Random question from current chapter
      const randomQuestionIdx = Math.floor(Math.random() * currentChapter.questions.length);
      dispatch({ type: 'SET_QUESTION', payload: randomQuestionIdx });
      return;
    }

    if (state.studyMode === 'review') {
      // Find next incorrect answer
      const incorrectQuestions = [];
      state.chapters.forEach((chapter, chIdx) => {
        chapter.questions.forEach((_, qIdx) => {
          const questionId = `${chapter.chapter}-${qIdx}`;
          const answerData = state.answers[questionId];
          if (answerData && !answerData.correct) {
            incorrectQuestions.push({ chapterIdx: chIdx, questionIdx: qIdx });
          }
        });
      });

      if (incorrectQuestions.length > 0) {
        const current = incorrectQuestions.findIndex(
          q => q.chapterIdx === state.currentChapterIdx && q.questionIdx === state.currentQuestionIdx
        );
        const next = incorrectQuestions[(current + 1) % incorrectQuestions.length];
        dispatch({ type: 'SET_CHAPTER', payload: next.chapterIdx });
        dispatch({ type: 'SET_QUESTION', payload: next.questionIdx });
      }
      return;
    }

    // Default sequential navigation
    if (!isLastQuestion) {
      dispatch({ type: 'SET_QUESTION', payload: state.currentQuestionIdx + 1 });
    } else if (!isLastChapter) {
      dispatch({ type: 'SET_CHAPTER', payload: state.currentChapterIdx + 1 });
    }
  };

  const handlePrevious = () => {
    if (state.studyMode === 'review') {
      // Find previous incorrect answer
      const incorrectQuestions = [];
      state.chapters.forEach((chapter, chIdx) => {
        chapter.questions.forEach((_, qIdx) => {
          const questionId = `${chapter.chapter}-${qIdx}`;
          const answerData = state.answers[questionId];
          if (answerData && !answerData.correct) {
            incorrectQuestions.push({ chapterIdx: chIdx, questionIdx: qIdx });
          }
        });
      });

      if (incorrectQuestions.length > 0) {
        const current = incorrectQuestions.findIndex(
          q => q.chapterIdx === state.currentChapterIdx && q.questionIdx === state.currentQuestionIdx
        );
        const prev = incorrectQuestions[current > 0 ? current - 1 : incorrectQuestions.length - 1];
        dispatch({ type: 'SET_CHAPTER', payload: prev.chapterIdx });
        dispatch({ type: 'SET_QUESTION', payload: prev.questionIdx });
      }
      return;
    }

    // Default sequential navigation
    if (!isFirstQuestion) {
      dispatch({ type: 'SET_QUESTION', payload: state.currentQuestionIdx - 1 });
    } else if (!isFirstChapter) {
      const prevChapter = state.chapters[state.currentChapterIdx - 1];
      dispatch({ type: 'SET_CHAPTER', payload: state.currentChapterIdx - 1 });
      dispatch({ type: 'SET_QUESTION', payload: prevChapter.questions.length - 1 });
    }
  };

  const handleTimerToggle = () => {
    const newTimerState = !state.timerMode;
    dispatch({
      type: 'SET_TIMER',
      payload: {
        enabled: newTimerState,
        timePerQuestion: state.timePerQuestion
      }
    });
  };

  const handleTimeSettingChange = (newTime) => {
    dispatch({
      type: 'SET_TIMER',
      payload: {
        enabled: state.timerMode,
        timePerQuestion: newTime
      }
    });
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1rem',
      backgroundColor: state.theme === 'dark' ? '#2a2a2a' : '#f5f5f5',
      borderRadius: '8px',
      marginBottom: '1rem',
      flexWrap: 'wrap',
      gap: '1rem'
    }}>
      {/* Navigation Buttons */}
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <button
          onClick={handlePrevious}
          disabled={state.studyMode === 'chapter' && isFirstQuestion && isFirstChapter}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#2196F3',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            opacity: state.studyMode === 'chapter' && isFirstQuestion && isFirstChapter ? 0.5 : 1
          }}
        >
          ← Previous
        </button>

        <button
          onClick={handleNext}
          disabled={state.studyMode === 'chapter' && isLastQuestion && isLastChapter}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#4CAF50',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            opacity: state.studyMode === 'chapter' && isLastQuestion && isLastChapter ? 0.5 : 1
          }}
        >
          Next →
        </button>
      </div>

      {/* Question Position */}
      <div style={{
        color: state.theme === 'dark' ? '#fff' : '#333',
        fontSize: '0.9rem'
      }}>
        Chapter {currentChapter?.chapter || 1} | Question {state.currentQuestionIdx + 1} of {currentChapter?.questions.length || 0}
      </div>

      {/* Timer Controls */}
      {(state.studyMode === 'timed' || state.timerMode) && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          <button
            onClick={handleTimerToggle}
            style={{
              padding: '0.25rem 0.5rem',
              backgroundColor: state.timerMode ? '#ff4444' : '#666',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '0.8rem'
            }}
          >
            {state.timerMode ? 'Stop Timer' : 'Start Timer'}
          </button>

          <select
            value={state.timePerQuestion}
            onChange={(e) => handleTimeSettingChange(Number(e.target.value))}
            style={{
              padding: '0.25rem',
              fontSize: '0.8rem',
              border: `1px solid ${state.theme === 'dark' ? '#444' : '#ccc'}`,
              borderRadius: '4px',
              backgroundColor: state.theme === 'dark' ? '#333' : '#fff',
              color: state.theme === 'dark' ? '#fff' : '#333'
            }}
          >
            <option value={30}>30s</option>
            <option value={60}>1m</option>
            <option value={90}>1.5m</option>
            <option value={120}>2m</option>
            <option value={180}>3m</option>
            <option value={300}>5m</option>
          </select>
        </div>
      )}

      {/* Study Mode Indicator */}
      <div style={{
        padding: '0.25rem 0.5rem',
        backgroundColor: state.theme === 'dark' ? '#333' : '#e0e0e0',
        borderRadius: '12px',
        fontSize: '0.8rem',
        color: state.theme === 'dark' ? '#fff' : '#333'
      }}>
        {state.studyMode === 'chapter' && 'Sequential'}
        {state.studyMode === 'shuffle-chapter' && 'Shuffle Chapter'}
        {state.studyMode === 'shuffle-all' && 'Shuffle All'}
        {state.studyMode === 'review' && 'Review Mode'}
        {state.studyMode === 'adaptive' && 'Adaptive'}
        {state.studyMode === 'timed' && 'Timed Practice'}
      </div>
    </div>
  );
};

export default Navigation;