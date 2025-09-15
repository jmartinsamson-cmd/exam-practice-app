import React, { useState, useEffect } from 'react';
import { useApp } from '../contexts/AppContext';
import { calculateQuestionDifficulty } from '../services/dataService';
import DifficultyIndicator from './DifficultyIndicator';

const QuestionCard = () => {
  const { state, dispatch } = useApp();
  const [questionStartTime, setQuestionStartTime] = useState(Date.now());

  const currentChapter = state.chapters[state.currentChapterIdx];
  const currentQuestion = currentChapter?.questions[state.currentQuestionIdx];

  useEffect(() => {
    setQuestionStartTime(Date.now());
  }, [state.currentChapterIdx, state.currentQuestionIdx]);

  if (!currentQuestion) return null;

  const questionId = `${currentChapter.chapter}-${state.currentQuestionIdx}`;
  const isBookmarked = state.bookmarks.has(questionId);
  const userNote = state.notes[questionId] || '';
  const difficulty = calculateQuestionDifficulty(questionId, state.answers);

  const handleAnswerSelect = (optionIndex) => {
    if (state.showRationale) return;
    dispatch({ type: 'SELECT_ANSWER', payload: optionIndex });
  };

  const handleSubmitAnswer = () => {
    if (state.selectedAnswer === null) return;

    const timeSpent = Math.floor((Date.now() - questionStartTime) / 1000);
    const correctAnswer = Array.isArray(currentQuestion.answer)
      ? currentQuestion.answer
      : [currentQuestion.answer];
    const selectedAnswers = Array.isArray(state.selectedAnswer)
      ? state.selectedAnswer
      : [state.selectedAnswer];

    const isCorrect = correctAnswer.length === selectedAnswers.length &&
      correctAnswer.every(ans => selectedAnswers.includes(ans));

    dispatch({
      type: 'SUBMIT_ANSWER',
      payload: {
        questionId,
        answer: state.selectedAnswer,
        correct: isCorrect,
        timeSpent
      }
    });

    dispatch({ type: 'SHOW_RATIONALE' });
  };

  const handleConfidenceSelect = (confidence) => {
    dispatch({ type: 'SET_CONFIDENCE', payload: confidence });
  };

  const handleBookmarkToggle = () => {
    dispatch({ type: 'TOGGLE_BOOKMARK', payload: questionId });
  };

  const handleNoteChange = (note) => {
    dispatch({ type: 'SET_NOTE', payload: { questionId, note } });
  };

  const correctAnswer = currentQuestion.answer;

  return (
    <div style={{
      maxWidth: '800px',
      margin: '0 auto',
      padding: '2rem',
      backgroundColor: state.theme === 'dark' ? 'rgba(26, 26, 26, 0.9)' : 'rgba(255, 255, 255, 0.9)',
      borderRadius: '16px',
      boxShadow: state.theme === 'dark'
        ? '0 8px 32px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)'
        : '0 8px 32px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(0, 0, 0, 0.05)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      border: state.theme === 'dark'
        ? '1px solid rgba(255, 255, 255, 0.1)'
        : '1px solid rgba(0, 0, 0, 0.05)'
    }}>
      {/* Timer Display */}
      {state.timerMode && state.timeRemaining !== null && (
        <div style={{
          textAlign: 'center',
          marginBottom: '1rem',
          padding: '0.5rem',
          backgroundColor: state.timeRemaining < 10 ? '#ff4444' : state.theme === 'dark' ? '#333' : '#f0f0f0',
          borderRadius: '4px',
          color: state.theme === 'dark' ? '#fff' : '#333'
        }}>
          Time Remaining: {Math.floor(state.timeRemaining / 60)}:{String(state.timeRemaining % 60).padStart(2, '0')}
        </div>
      )}

      {/* Question Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '1rem',
        color: state.theme === 'dark' ? '#fff' : '#333'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <h2 style={{ margin: 0 }}>
            Question {state.currentQuestionIdx + 1} of {currentChapter?.questions.length}
          </h2>
          <DifficultyIndicator difficulty={difficulty} theme={state.theme} />
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            onClick={handleBookmarkToggle}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '1.5rem',
              cursor: 'pointer',
              color: isBookmarked ? '#ffaa00' : state.theme === 'dark' ? '#666' : '#ccc'
            }}
            title={isBookmarked ? 'Remove bookmark' : 'Bookmark question'}
          >
            ⭐
          </button>
        </div>
      </div>

      {/* Question Text */}
      <div style={{
        marginBottom: '2rem',
        fontSize: '1.1rem',
        lineHeight: '1.6',
        color: state.theme === 'dark' ? '#fff' : '#333'
      }}>
        {currentQuestion.question}
      </div>

      {/* Answer Options */}
      <div style={{ marginBottom: '2rem' }}>
        {currentQuestion.options.map((option, index) => {
          const isSelected = Array.isArray(state.selectedAnswer)
            ? state.selectedAnswer.includes(index)
            : state.selectedAnswer === index;
          const isCorrect = Array.isArray(correctAnswer)
            ? correctAnswer.includes(index)
            : correctAnswer === index;
          const isIncorrect = state.showRationale && isSelected && !isCorrect;

          return (
            <div
              key={index}
              style={{
                marginBottom: '0.5rem',
                padding: '1rem',
                border: `2px solid ${
                  state.showRationale && isCorrect
                    ? '#4CAF50'
                    : isIncorrect
                      ? '#f44336'
                      : isSelected
                        ? '#2196F3'
                        : state.theme === 'dark' ? '#333' : '#ddd'
                }`,
                borderRadius: '8px',
                cursor: state.showRationale ? 'default' : 'pointer',
                backgroundColor: state.showRationale && isCorrect
                  ? 'rgba(76, 175, 80, 0.1)'
                  : isIncorrect
                    ? 'rgba(244, 67, 54, 0.1)'
                    : isSelected
                      ? 'rgba(33, 150, 243, 0.1)'
                      : state.theme === 'dark' ? '#222' : '#f9f9f9',
                transition: 'all 0.3s ease',
                color: state.theme === 'dark' ? '#fff' : '#333'
              }}
              onClick={() => handleAnswerSelect(index)}
            >
              <span style={{
                fontWeight: isSelected ? 'bold' : 'normal',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <span style={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  border: `2px solid ${isSelected ? '#2196F3' : state.theme === 'dark' ? '#666' : '#ccc'}`,
                  backgroundColor: isSelected ? '#2196F3' : 'transparent',
                  flexShrink: 0
                }} />
                {option}
              </span>
            </div>
          );
        })}
      </div>

      {/* Confidence Rating (before answering) */}
      {!state.showRationale && state.selectedAnswer !== null && (
        <div style={{
          marginBottom: '1rem',
          color: state.theme === 'dark' ? '#fff' : '#333'
        }}>
          <p style={{ marginBottom: '0.5rem' }}>How confident are you in this answer?</p>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {[1, 2, 3, 4, 5].map(rating => (
              <button
                key={rating}
                onClick={() => handleConfidenceSelect(rating)}
                style={{
                  padding: '0.5rem 1rem',
                  border: `2px solid ${state.confidence === rating ? '#2196F3' : state.theme === 'dark' ? '#666' : '#ccc'}`,
                  backgroundColor: state.confidence === rating ? '#2196F3' : 'transparent',
                  color: state.confidence === rating ? '#fff' : state.theme === 'dark' ? '#fff' : '#333',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                {rating}
              </button>
            ))}
          </div>
          <small style={{ color: state.theme === 'dark' ? '#aaa' : '#666' }}>
            1 = Not confident, 5 = Very confident
          </small>
        </div>
      )}

      {/* Submit Button */}
      {!state.showRationale && (
        <button
          onClick={handleSubmitAnswer}
          disabled={state.selectedAnswer === null}
          style={{
            width: '100%',
            padding: '1rem',
            fontSize: '1.1rem',
            backgroundColor: state.selectedAnswer !== null ? '#4CAF50' : '#666',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            cursor: state.selectedAnswer !== null ? 'pointer' : 'not-allowed',
            marginBottom: '1rem',
            transition: 'background-color 0.3s ease'
          }}
        >
          Submit Answer
        </button>
      )}

      {/* Rationale */}
      {state.showRationale && currentQuestion.rationale && (
        <div style={{
          marginTop: '2rem',
          padding: '1.5rem',
          backgroundColor: state.theme === 'dark' ? '#2a2a2a' : '#f5f5f5',
          borderRadius: '8px',
          border: `2px solid ${state.theme === 'dark' ? '#444' : '#ddd'}`,
          color: state.theme === 'dark' ? '#fff' : '#333'
        }}>
          <h3 style={{ marginTop: 0, color: '#2196F3' }}>Explanation:</h3>
          <p style={{ lineHeight: '1.6', marginBottom: 0 }}>
            {currentQuestion.rationale}
          </p>
        </div>
      )}

      {/* Notes Section */}
      <div style={{ marginTop: '2rem' }}>
        <label style={{
          display: 'block',
          marginBottom: '0.5rem',
          color: state.theme === 'dark' ? '#fff' : '#333',
          fontWeight: 'bold'
        }}>
          Personal Notes:
        </label>
        <textarea
          value={userNote}
          onChange={(e) => handleNoteChange(e.target.value)}
          placeholder="Add your notes about this question..."
          style={{
            width: '100%',
            minHeight: '80px',
            padding: '0.75rem',
            border: `2px solid ${state.theme === 'dark' ? '#444' : '#ddd'}`,
            borderRadius: '4px',
            backgroundColor: state.theme === 'dark' ? '#333' : '#fff',
            color: state.theme === 'dark' ? '#fff' : '#333',
            resize: 'vertical',
            fontFamily: 'inherit'
          }}
        />
      </div>
    </div>
  );
};

export default QuestionCard;