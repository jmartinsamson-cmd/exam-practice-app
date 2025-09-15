import React from 'react';
import { useApp } from '../hooks/useApp';
import { filterQuestions } from '../services/dataService';

const Sidebar = () => {
  const { state, dispatch } = useApp();

  const handleChapterSelect = (chapterIdx) => {
    dispatch({ type: 'SET_CHAPTER', payload: chapterIdx });
    if (window.innerWidth <= 768) {
      dispatch({ type: 'TOGGLE_SIDEBAR' });
    }
  };

  const handleSearchChange = (e) => {
    dispatch({ type: 'SET_SEARCH', payload: e.target.value });
  };

  const handleFilterChange = (filterType, value) => {
    dispatch({ type: 'SET_FILTERS', payload: { [filterType]: value } });
  };

  const filteredQuestions = filterQuestions(
    state.chapters,
    state.answers,
    state.filters,
    state.searchTerm
  );

  const getChapterProgress = (chapterIdx) => {
    const chapter = state.chapters[chapterIdx];
    if (!chapter) return { answered: 0, correct: 0, total: 0 };

    let answered = 0;
    let correct = 0;

    chapter.questions.forEach((_, qIdx) => {
      const questionId = `${chapter.chapter}-${qIdx}`;
      const answerData = state.answers[questionId];
      if (answerData) {
        answered++;
        if (answerData.correct) correct++;
      }
    });

    return { answered, correct, total: chapter.questions.length };
  };

  return (
    <div className="sidebar-component" style={{
      position: 'fixed',
      top: 0,
      left: state.sidebarOpen ? 0 : '-350px',
      width: '350px',
      height: '100vh',
      backgroundColor: state.theme === 'dark' ? 'rgba(26, 26, 26, 0.95)' : 'rgba(245, 245, 245, 0.95)',
      borderRight: `1px solid ${state.theme === 'dark' ? 'rgba(51, 51, 51, 0.8)' : 'rgba(221, 221, 221, 0.8)'}`,
      transition: 'left 0.3s ease',
      zIndex: 1000,
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      boxShadow: state.theme === 'dark'
        ? '2px 0 20px rgba(0, 0, 0, 0.3)'
        : '2px 0 20px rgba(0, 0, 0, 0.1)'
    }}>
      {/* Header */}
      <div style={{
        padding: '1rem',
        borderBottom: `1px solid ${state.theme === 'dark' ? '#333' : '#ddd'}`,
        backgroundColor: state.theme === 'dark' ? '#2a2a2a' : '#fff'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1rem'
        }}>
          <h2 style={{
            margin: 0,
            color: state.theme === 'dark' ? '#fff' : '#333'
          }}>
            Study Navigation
          </h2>
          <button
            onClick={() => dispatch({ type: 'TOGGLE_SIDEBAR' })}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '1.5rem',
              cursor: 'pointer',
              color: state.theme === 'dark' ? '#fff' : '#333'
            }}
          >
            ✕
          </button>
        </div>

        {/* Search */}
        <input
          type="text"
          placeholder="Search questions..."
          value={state.searchTerm}
          onChange={handleSearchChange}
          style={{
            width: '100%',
            padding: '0.5rem',
            border: `1px solid ${state.theme === 'dark' ? '#444' : '#ccc'}`,
            borderRadius: '4px',
            backgroundColor: state.theme === 'dark' ? '#333' : '#fff',
            color: state.theme === 'dark' ? '#fff' : '#333'
          }}
        />
      </div>

      {/* Filters */}
      <div style={{
        padding: '1rem',
        borderBottom: `1px solid ${state.theme === 'dark' ? '#333' : '#ddd'}`,
        backgroundColor: state.theme === 'dark' ? '#222' : '#f9f9f9'
      }}>
        <h3 style={{
          margin: '0 0 0.5rem 0',
          color: state.theme === 'dark' ? '#fff' : '#333',
          fontSize: '0.9rem'
        }}>
          Filters
        </h3>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          {/* Answered Filter */}
          <select
            value={state.filters.answered || ''}
            onChange={(e) => handleFilterChange('answered', e.target.value === '' ? null : e.target.value === 'true')}
            style={{
              padding: '0.25rem',
              fontSize: '0.8rem',
              border: `1px solid ${state.theme === 'dark' ? '#444' : '#ccc'}`,
              borderRadius: '4px',
              backgroundColor: state.theme === 'dark' ? '#333' : '#fff',
              color: state.theme === 'dark' ? '#fff' : '#333'
            }}
          >
            <option value="">All Questions</option>
            <option value="true">Answered</option>
            <option value="false">Unanswered</option>
          </select>

          {/* Correct Filter */}
          <select
            value={state.filters.correct || ''}
            onChange={(e) => handleFilterChange('correct', e.target.value === '' ? null : e.target.value === 'true')}
            style={{
              padding: '0.25rem',
              fontSize: '0.8rem',
              border: `1px solid ${state.theme === 'dark' ? '#444' : '#ccc'}`,
              borderRadius: '4px',
              backgroundColor: state.theme === 'dark' ? '#333' : '#fff',
              color: state.theme === 'dark' ? '#fff' : '#333'
            }}
          >
            <option value="">All Answered</option>
            <option value="true">Correct</option>
            <option value="false">Incorrect</option>
          </select>

          {/* Difficulty Filter */}
          <select
            value={state.filters.difficulty || ''}
            onChange={(e) => handleFilterChange('difficulty', e.target.value === '' ? null : e.target.value)}
            style={{
              padding: '0.25rem',
              fontSize: '0.8rem',
              border: `1px solid ${state.theme === 'dark' ? '#444' : '#ccc'}`,
              borderRadius: '4px',
              backgroundColor: state.theme === 'dark' ? '#333' : '#fff',
              color: state.theme === 'dark' ? '#fff' : '#333'
            }}
          >
            <option value="">All Difficulties</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
            <option value="unknown">New/Unknown</option>
          </select>

          {/* Bookmarked Filter */}
          <button
            onClick={() => handleFilterChange('bookmarked', state.filters.bookmarked ? null : true)}
            style={{
              padding: '0.25rem 0.5rem',
              fontSize: '0.8rem',
              border: `1px solid ${state.filters.bookmarked ? '#ffaa00' : state.theme === 'dark' ? '#444' : '#ccc'}`,
              borderRadius: '4px',
              backgroundColor: state.filters.bookmarked ? '#ffaa00' : 'transparent',
              color: state.filters.bookmarked ? '#000' : state.theme === 'dark' ? '#fff' : '#333',
              cursor: 'pointer'
            }}
          >
            ⭐ Bookmarked
          </button>
        </div>
      </div>

      {/* Study Mode Selection */}
      <div style={{
        padding: '1rem',
        borderBottom: `1px solid ${state.theme === 'dark' ? '#333' : '#ddd'}`
      }}>
        <h3 style={{
          margin: '0 0 0.5rem 0',
          color: state.theme === 'dark' ? '#fff' : '#333',
          fontSize: '0.9rem'
        }}>
          Study Mode
        </h3>
        <select
          value={state.studyMode}
          onChange={(e) => dispatch({ type: 'SET_STUDY_MODE', payload: e.target.value })}
          style={{
            width: '100%',
            padding: '0.5rem',
            border: `1px solid ${state.theme === 'dark' ? '#444' : '#ccc'}`,
            borderRadius: '4px',
            backgroundColor: state.theme === 'dark' ? '#333' : '#fff',
            color: state.theme === 'dark' ? '#fff' : '#333'
          }}
        >
          <option value="chapter">Chapter by Chapter</option>
          <option value="shuffle-chapter">Shuffle Current Chapter</option>
          <option value="shuffle-all">Shuffle All Questions</option>
          <option value="review">Review Incorrect</option>
          <option value="adaptive">Adaptive Learning</option>
          <option value="timed">Timed Practice</option>
        </select>
      </div>

      {/* Chapter List */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: '0.5rem'
      }}>
        {state.chapters.map((chapter, idx) => {
          const progress = getChapterProgress(idx);
          const progressPercent = progress.total > 0 ? (progress.answered / progress.total) * 100 : 0;
          const accuracyPercent = progress.answered > 0 ? (progress.correct / progress.answered) * 100 : 0;

          return (
            <div
              key={chapter.chapter}
              onClick={() => handleChapterSelect(idx)}
              style={{
                padding: '0.75rem',
                margin: '0.25rem',
                borderRadius: '8px',
                cursor: 'pointer',
                backgroundColor: idx === state.currentChapterIdx
                  ? state.theme === 'dark' ? '#2196F3' : '#2196F3'
                  : state.theme === 'dark' ? '#333' : '#fff',
                color: idx === state.currentChapterIdx
                  ? '#fff'
                  : state.theme === 'dark' ? '#fff' : '#333',
                border: `1px solid ${state.theme === 'dark' ? '#444' : '#ddd'}`,
                transition: 'all 0.2s ease'
              }}
            >
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '0.25rem'
              }}>
                <span style={{ fontWeight: 'bold' }}>
                  Chapter {chapter.chapter}
                </span>
                <span style={{ fontSize: '0.8rem' }}>
                  {progress.answered}/{progress.total}
                </span>
              </div>

              {/* Progress Bar */}
              <div style={{
                width: '100%',
                height: '4px',
                backgroundColor: state.theme === 'dark' ? '#555' : '#e0e0e0',
                borderRadius: '2px',
                overflow: 'hidden',
                marginBottom: '0.25rem'
              }}>
                <div style={{
                  width: `${progressPercent}%`,
                  height: '100%',
                  backgroundColor: accuracyPercent >= 70 ? '#4CAF50' : accuracyPercent >= 40 ? '#FF9800' : '#f44336',
                  transition: 'width 0.3s ease'
                }} />
              </div>

              <div style={{
                fontSize: '0.7rem',
                opacity: 0.8
              }}>
                {progress.answered > 0 && `${Math.round(accuracyPercent)}% accuracy`}
              </div>
            </div>
          );
        })}
      </div>

      {/* Search Results (when searching) */}
      {state.searchTerm && (
        <div style={{
          maxHeight: '200px',
          overflowY: 'auto',
          borderTop: `1px solid ${state.theme === 'dark' ? '#333' : '#ddd'}`,
          backgroundColor: state.theme === 'dark' ? '#2a2a2a' : '#f9f9f9'
        }}>
          <div style={{
            padding: '0.5rem',
            color: state.theme === 'dark' ? '#fff' : '#333',
            fontSize: '0.9rem',
            fontWeight: 'bold'
          }}>
            Search Results ({filteredQuestions.length})
          </div>
          {filteredQuestions.slice(0, 20).map((result) => (
            <div
              key={`${result.chapter}-${result.questionIdx}`}
              onClick={() => {
                dispatch({ type: 'SET_CHAPTER', payload: result.chapterIdx });
                dispatch({ type: 'SET_QUESTION', payload: result.questionIdx });
                if (window.innerWidth <= 768) {
                  dispatch({ type: 'TOGGLE_SIDEBAR' });
                }
              }}
              style={{
                padding: '0.5rem',
                borderBottom: `1px solid ${state.theme === 'dark' ? '#333' : '#ddd'}`,
                cursor: 'pointer',
                fontSize: '0.8rem',
                color: state.theme === 'dark' ? '#ccc' : '#666'
              }}
            >
              Ch {result.chapter}, Q {result.questionIdx + 1}: {result.question.question.substring(0, 80)}...
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Sidebar;