import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { loadChapterData, saveToLocalStorage, loadFromLocalStorage } from '../services/dataService';

const AppContext = createContext();

const initialState = {
  // Chapter and question state
  chapters: [],
  currentChapterIdx: 0,
  currentQuestionIdx: 0,

  // UI state
  sidebarOpen: false,
  theme: 'dark',
  loading: true,
  showKeyboardHelp: false,

  // Study modes
  studyMode: 'chapter', // 'chapter', 'shuffle-chapter', 'shuffle-all', 'review', 'timed', 'adaptive'
  timerMode: false,
  timePerQuestion: 60, // seconds
  timeRemaining: null,

  // Question state
  selectedAnswer: null,
  showRationale: false,
  confidence: null, // 1-5 scale

  // Progress tracking
  answers: {}, // questionId: { answer, correct, confidence, timeSpent, attempts }
  bookmarks: new Set(),
  notes: {}, // questionId: noteText

  // Analytics
  sessionStartTime: Date.now(),
  dailyGoal: 20,
  streak: 0,

  // Filtering
  searchTerm: '',
  filters: {
    answered: null, // true/false/null
    correct: null,
    bookmarked: null,
    difficulty: null // 'easy', 'medium', 'hard', 'unknown', null
  }
};

function appReducer(state, action) {
  switch (action.type) {
    case 'SET_CHAPTERS':
      return { ...state, chapters: action.payload, loading: false };

    case 'SET_CHAPTER':
      return {
        ...state,
        currentChapterIdx: action.payload,
        currentQuestionIdx: 0,
        selectedAnswer: null,
        showRationale: false,
        confidence: null
      };

    case 'SET_QUESTION':
      return {
        ...state,
        currentQuestionIdx: action.payload,
        selectedAnswer: null,
        showRationale: false,
        confidence: null
      };

    case 'SELECT_ANSWER':
      return { ...state, selectedAnswer: action.payload };

    case 'SET_CONFIDENCE':
      return { ...state, confidence: action.payload };

    case 'SHOW_RATIONALE':
      return { ...state, showRationale: true };

    case 'SUBMIT_ANSWER': {
      const { questionId, answer, correct, timeSpent } = action.payload;
      return {
        ...state,
        answers: {
          ...state.answers,
          [questionId]: {
            answer,
            correct,
            confidence: state.confidence,
            timeSpent,
            attempts: (state.answers[questionId]?.attempts || 0) + 1,
            timestamp: Date.now()
          }
        }
      };
    }

    case 'TOGGLE_BOOKMARK': {
      const bookmarks = new Set(state.bookmarks);
      if (bookmarks.has(action.payload)) {
        bookmarks.delete(action.payload);
      } else {
        bookmarks.add(action.payload);
      }
      return { ...state, bookmarks };
    }

    case 'SET_NOTE':
      return {
        ...state,
        notes: { ...state.notes, [action.payload.questionId]: action.payload.note }
      };

    case 'SET_STUDY_MODE':
      return { ...state, studyMode: action.payload };

    case 'TOGGLE_SIDEBAR':
      return { ...state, sidebarOpen: !state.sidebarOpen };

    case 'TOGGLE_THEME':
      return { ...state, theme: state.theme === 'dark' ? 'light' : 'dark' };

    case 'SET_TIMER':
      return {
        ...state,
        timerMode: action.payload.enabled,
        timePerQuestion: action.payload.timePerQuestion || state.timePerQuestion,
        timeRemaining: action.payload.enabled ? action.payload.timePerQuestion : null
      };

    case 'UPDATE_TIMER':
      return {
        ...state,
        timeRemaining: Math.max(0, state.timeRemaining - 1)
      };

    case 'SET_SEARCH':
      return { ...state, searchTerm: action.payload };

    case 'SET_FILTERS':
      return { ...state, filters: { ...state.filters, ...action.payload } };

    case 'UPDATE_DAILY_PROGRESS':
      return { ...state, dailyGoal: action.payload };

    case 'UPDATE_STREAK':
      return { ...state, streak: action.payload };

    case 'TOGGLE_KEYBOARD_HELP':
      return { ...state, showKeyboardHelp: !state.showKeyboardHelp };

    case 'LOAD_SAVED_STATE':
      return { ...state, ...action.payload };

    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Load saved state on mount
  useEffect(() => {
    const savedState = loadFromLocalStorage();
    if (savedState) {
      dispatch({ type: 'LOAD_SAVED_STATE', payload: savedState });
    }
  }, []);

  // Load chapters data
  useEffect(() => {
    loadChapterData().then(chapters => {
      dispatch({ type: 'SET_CHAPTERS', payload: chapters });
    });
  }, []);

  // Save state changes to localStorage
  useEffect(() => {
    if (!state.loading) {
      saveToLocalStorage({
        answers: state.answers,
        bookmarks: Array.from(state.bookmarks),
        notes: state.notes,
        theme: state.theme,
        dailyGoal: state.dailyGoal,
        streak: state.streak,
        studyMode: state.studyMode,
        timePerQuestion: state.timePerQuestion
      });
    }
  }, [state.answers, state.bookmarks, state.notes, state.theme, state.dailyGoal, state.streak, state.studyMode, state.timePerQuestion, state.loading]);

  // Timer effect
  useEffect(() => {
    let interval;
    if (state.timerMode && state.timeRemaining > 0) {
      interval = setInterval(() => {
        dispatch({ type: 'UPDATE_TIMER' });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [state.timerMode, state.timeRemaining]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}