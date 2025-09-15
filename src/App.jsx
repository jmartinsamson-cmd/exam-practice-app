import React, { useState, useEffect } from 'react';
import { AppProvider, useApp } from './contexts/AppContext';
import Sidebar from './components/Sidebar';
import QuestionCard from './components/QuestionCard';
import Navigation from './components/Navigation';
import ProgressBar from './components/ProgressBar';
import AnalyticsDashboard from './components/AnalyticsDashboard';
import './App.css';

const AppContent = () => {
  const { state, dispatch } = useApp();
  const [currentView, setCurrentView] = useState('study'); // 'study' | 'analytics'

  const handlePreviousQuestion = React.useCallback(() => {
    const isFirstQuestion = state.currentQuestionIdx === 0;
    const isFirstChapter = state.currentChapterIdx === 0;

    if (!isFirstQuestion) {
      dispatch({ type: 'SET_QUESTION', payload: state.currentQuestionIdx - 1 });
    } else if (!isFirstChapter) {
      const prevChapter = state.chapters[state.currentChapterIdx - 1];
      dispatch({ type: 'SET_CHAPTER', payload: state.currentChapterIdx - 1 });
      dispatch({ type: 'SET_QUESTION', payload: prevChapter.questions.length - 1 });
    }
  }, [state.currentQuestionIdx, state.currentChapterIdx, state.chapters, dispatch]);

  const handleNextQuestion = React.useCallback(() => {
    const currentChapter = state.chapters[state.currentChapterIdx];
    const isLastQuestion = currentChapter && state.currentQuestionIdx === currentChapter.questions.length - 1;
    const isLastChapter = state.currentChapterIdx === state.chapters.length - 1;

    if (!isLastQuestion) {
      dispatch({ type: 'SET_QUESTION', payload: state.currentQuestionIdx + 1 });
    } else if (!isLastChapter) {
      dispatch({ type: 'SET_CHAPTER', payload: state.currentChapterIdx + 1 });
    }
  }, [state.currentQuestionIdx, state.currentChapterIdx, state.chapters, dispatch]);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e) => {
      // Toggle sidebar with 'S' key
      if (e.key.toLowerCase() === 's' && !e.ctrlKey && !e.altKey) {
        const activeElement = document.activeElement;
        if (activeElement.tagName !== 'INPUT' && activeElement.tagName !== 'TEXTAREA') {
          dispatch({ type: 'TOGGLE_SIDEBAR' });
        }
      }

      // Navigate with arrow keys
      if (e.key === 'ArrowLeft' && !e.ctrlKey && !e.altKey) {
        const activeElement = document.activeElement;
        if (activeElement.tagName !== 'INPUT' && activeElement.tagName !== 'TEXTAREA') {
          // Previous question logic
          handlePreviousQuestion();
        }
      }

      if (e.key === 'ArrowRight' && !e.ctrlKey && !e.altKey) {
        const activeElement = document.activeElement;
        if (activeElement.tagName !== 'INPUT' && activeElement.tagName !== 'TEXTAREA') {
          // Next question logic
          handleNextQuestion();
        }
      }

      // Toggle theme with 'T' key
      if (e.key.toLowerCase() === 't' && !e.ctrlKey && !e.altKey) {
        const activeElement = document.activeElement;
        if (activeElement.tagName !== 'INPUT' && activeElement.tagName !== 'TEXTAREA') {
          dispatch({ type: 'TOGGLE_THEME' });
        }
      }

      // Toggle keyboard help with '?' key
      if (e.key === '?' && !e.ctrlKey && !e.altKey) {
        const activeElement = document.activeElement;
        if (activeElement.tagName !== 'INPUT' && activeElement.tagName !== 'TEXTAREA') {
          dispatch({ type: 'TOGGLE_KEYBOARD_HELP' });
        }
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [dispatch, state.currentChapterIdx, state.currentQuestionIdx, state.chapters, handleNextQuestion, handlePreviousQuestion]);

  // Handle timer expiration
  useEffect(() => {
    if (state.timerMode && state.timeRemaining === 0) {
      // Auto-submit if timer expires
      if (state.selectedAnswer !== null && !state.showRationale) {
        const currentChapter = state.chapters[state.currentChapterIdx];
        const currentQuestion = currentChapter?.questions[state.currentQuestionIdx];

        if (currentQuestion) {
          const questionId = `${currentChapter.chapter}-${state.currentQuestionIdx}`;
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
              timeSpent: state.timePerQuestion
            }
          });

          dispatch({ type: 'SHOW_RATIONALE' });
        }
      }

      // Reset timer for next question
      dispatch({
        type: 'SET_TIMER',
        payload: {
          enabled: true,
          timePerQuestion: state.timePerQuestion
        }
      });
    }
  }, [state.timeRemaining, state.selectedAnswer, state.showRationale, state.timerMode, dispatch, state.chapters, state.currentChapterIdx, state.currentQuestionIdx, state.timePerQuestion]);

  // Handle click outside sidebar to close it
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (state.sidebarOpen && typeof window !== 'undefined' && window.innerWidth <= 768) {
        const sidebar = document.querySelector('.sidebar-component');
        if (sidebar && !sidebar.contains(e.target)) {
          dispatch({ type: 'TOGGLE_SIDEBAR' });
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [state.sidebarOpen, dispatch]);

  if (state.loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: state.theme === 'dark' ? '#121212' : '#ffffff',
        color: state.theme === 'dark' ? '#ffffff' : '#000000'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '50px',
            height: '50px',
            border: `4px solid ${state.theme === 'dark' ? '#333' : '#e0e0e0'}`,
            borderTop: '4px solid #2196F3',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 1rem'
          }} />
          <p>Loading questions...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: state.theme === 'dark' ? 'rgba(18, 18, 18, 0.95)' : 'rgba(255, 255, 255, 0.95)',
      color: state.theme === 'dark' ? '#ffffff' : '#000000',
      transition: 'background-color 0.3s ease, color 0.3s ease',
      backdropFilter: 'blur(10px)',
      WebkitBackdropFilter: 'blur(10px)'
    }}>
      {/* Header */}
      <header style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        backgroundColor: state.theme === 'dark' ? 'rgba(26, 26, 26, 0.95)' : 'rgba(245, 245, 245, 0.95)',
        borderBottom: `1px solid ${state.theme === 'dark' ? 'rgba(51, 51, 51, 0.8)' : 'rgba(221, 221, 221, 0.8)'}`,
        padding: '1rem',
        boxShadow: '0 2px 20px rgba(0,0,0,0.1)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button
              onClick={() => dispatch({ type: 'TOGGLE_SIDEBAR' })}
              style={{
                background: 'none',
                border: 'none',
                fontSize: '1.5rem',
                cursor: 'pointer',
                color: state.theme === 'dark' ? '#fff' : '#333',
                padding: '0.5rem'
              }}
              title="Toggle sidebar (S)"
            >
              ☰
            </button>
            <h1 style={{
              margin: 0,
              fontSize: '1.8rem',
              fontWeight: '600',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              Exam Practice
            </h1>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            {/* View Toggle */}
            <div style={{
              display: 'flex',
              backgroundColor: state.theme === 'dark' ? '#333' : '#e0e0e0',
              borderRadius: '20px',
              padding: '2px'
            }}>
              <button
                onClick={() => setCurrentView('study')}
                style={{
                  padding: '0.5rem 1rem',
                  border: 'none',
                  borderRadius: '18px',
                  backgroundColor: currentView === 'study' ? '#2196F3' : 'transparent',
                  color: currentView === 'study' ? '#fff' : state.theme === 'dark' ? '#fff' : '#333',
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                  transition: 'all 0.3s ease'
                }}
              >
                Study
              </button>
              <button
                onClick={() => setCurrentView('analytics')}
                style={{
                  padding: '0.5rem 1rem',
                  border: 'none',
                  borderRadius: '18px',
                  backgroundColor: currentView === 'analytics' ? '#2196F3' : 'transparent',
                  color: currentView === 'analytics' ? '#fff' : state.theme === 'dark' ? '#fff' : '#333',
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                  transition: 'all 0.3s ease'
                }}
              >
                Analytics
              </button>
            </div>

            {/* Theme Toggle */}
            <button
              onClick={() => dispatch({ type: 'TOGGLE_THEME' })}
              style={{
                background: 'none',
                border: `2px solid ${state.theme === 'dark' ? '#444' : '#ccc'}`,
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                cursor: 'pointer',
                fontSize: '1.2rem',
                color: state.theme === 'dark' ? '#fff' : '#333',
                transition: 'all 0.3s ease'
              }}
              title={`Switch to ${state.theme === 'dark' ? 'light' : 'dark'} theme (T)`}
            >
              {state.theme === 'dark' ? '☀️' : '🌙'}
            </button>
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <Sidebar />

      {/* Sidebar Overlay for Mobile */}
      {state.sidebarOpen && typeof window !== 'undefined' && window.innerWidth <= 768 && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0,0,0,0.5)',
            zIndex: 999
          }}
          onClick={() => dispatch({ type: 'TOGGLE_SIDEBAR' })}
        />
      )}

      {/* Main Content */}
      <div style={{
        marginLeft: state.sidebarOpen && (typeof window === 'undefined' || window.innerWidth > 768) ? '350px' : '0',
        transition: 'margin-left 0.3s ease',
        minHeight: 'calc(100vh - 80px)',
        display: 'flex',
        justifyContent: 'center',
        width: state.sidebarOpen && (typeof window === 'undefined' || window.innerWidth > 768) ? 'calc(100vw - 350px)' : '100vw'
      }}>
        <div style={{
          maxWidth: '1200px',
          width: '100%',
          padding: '1rem'
        }}>
          {currentView === 'study' ? (
            <>
              <ProgressBar />
              <Navigation />
              <QuestionCard />
            </>
          ) : (
            <AnalyticsDashboard />
          )}
        </div>
      </div>

      {/* Keyboard Shortcuts Help (Toggle with ?) */}
      {state.showKeyboardHelp && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: 'rgba(0,0,0,0.8)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 2000
        }}>
          <div style={{
            backgroundColor: state.theme === 'dark' ? '#2a2a2a' : '#fff',
            padding: '2rem',
            borderRadius: '8px',
            maxWidth: '400px',
            width: '90%'
          }}>
            <h3 style={{ margin: '0 0 1rem 0', color: state.theme === 'dark' ? '#fff' : '#333' }}>
              Keyboard Shortcuts
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, color: state.theme === 'dark' ? '#ccc' : '#666' }}>
              <li style={{ marginBottom: '0.5rem' }}><kbd>S</kbd> - Toggle Sidebar</li>
              <li style={{ marginBottom: '0.5rem' }}><kbd>T</kbd> - Toggle Theme</li>
              <li style={{ marginBottom: '0.5rem' }}><kbd>←</kbd> - Previous Question</li>
              <li style={{ marginBottom: '0.5rem' }}><kbd>→</kbd> - Next Question</li>
              <li style={{ marginBottom: '0.5rem' }}><kbd>?</kbd> - Show/Hide This Help</li>
            </ul>
            <button
              onClick={() => dispatch({ type: 'TOGGLE_KEYBOARD_HELP' })}
              style={{
                width: '100%',
                padding: '0.5rem',
                backgroundColor: '#2196F3',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const App = () => {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
};

export default App;