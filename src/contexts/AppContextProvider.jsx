import React, { useReducer, useEffect } from 'react';
import { AppContext } from './AppContext';
import { loadChapterData, saveToLocalStorage, loadFromLocalStorage } from '../services/dataService';

const initialState = {
  // Chapter and question state
  chapters: [],
  selectedChapters: [],
  currentQuestion: null,
  currentQuestionIndex: 0,
  answers: {},
  showRationale: false,
  score: 0,
  totalQuestions: 0,
  questionsAnswered: 0,

  // Navigation state
  currentView: 'chapters', // 'chapters', 'question', 'analytics', 'settings'
  sidebarOpen: true,

  // Question settings
  questionMode: 'practice', // 'practice', 'test'
  difficulty: 'all', // 'all', 'easy', 'medium', 'hard'
  timeLimit: null, // null for no limit, number for seconds

  // Test/Timer state
  timerMode: false,
  timeRemaining: 0,
  testStartTime: null,

  // Theme and UI
  theme: 'light', // 'light', 'dark'
  fontSize: 'medium', // 'small', 'medium', 'large'

  // Analytics data
  performanceData: {
    byChapter: {},
    byDifficulty: { easy: [], medium: [], hard: [] },
    timeSpent: 0,
    streak: { current: 0, best: 0 },
    accuracy: { overall: 0, recent: [] }
  },

  // Settings
  settings: {
    autoAdvance: false,
    showHints: true,
    playSound: true,
    saveProgress: true
  }
};

function appReducer(state, action) {
  switch (action.type) {
    case 'LOAD_CHAPTERS':
      return { ...state, chapters: action.payload };

    case 'SELECT_CHAPTERS':
      return { ...state, selectedChapters: action.payload };

    case 'SET_CURRENT_QUESTION':
      return {
        ...state,
        currentQuestion: action.payload.question,
        currentQuestionIndex: action.payload.index
      };

    case 'SUBMIT_ANSWER': {
      const newAnswers = { ...state.answers, [action.payload.questionId]: action.payload.answer };
      const isCorrect = action.payload.isCorrect;

      return {
        ...state,
        answers: newAnswers,
        showRationale: true,
        questionsAnswered: state.questionsAnswered + 1,
        score: isCorrect ? state.score + 1 : state.score,
        performanceData: {
          ...state.performanceData,
          accuracy: {
            ...state.performanceData.accuracy,
            overall: ((state.performanceData.accuracy.overall * (state.questionsAnswered - 1)) + (isCorrect ? 1 : 0)) / state.questionsAnswered,
            recent: [...state.performanceData.accuracy.recent.slice(-9), isCorrect ? 1 : 0]
          },
          streak: {
            ...state.performanceData.streak,
            current: isCorrect ? state.performanceData.streak.current + 1 : 0,
            best: isCorrect && state.performanceData.streak.current + 1 > state.performanceData.streak.best
              ? state.performanceData.streak.current + 1
              : state.performanceData.streak.best
          }
        }
      };
    }

    case 'HIDE_RATIONALE':
      return { ...state, showRationale: false };

    case 'NEXT_QUESTION':
      return {
        ...state,
        currentQuestionIndex: state.currentQuestionIndex + 1,
        showRationale: false
      };

    case 'SET_VIEW':
      return { ...state, currentView: action.payload };

    case 'TOGGLE_SIDEBAR':
      return { ...state, sidebarOpen: !state.sidebarOpen };

    case 'SET_QUESTION_MODE':
      return { ...state, questionMode: action.payload };

    case 'SET_DIFFICULTY':
      return { ...state, difficulty: action.payload };

    case 'SET_TIME_LIMIT':
      return { ...state, timeLimit: action.payload };

    case 'START_TIMER':
      return {
        ...state,
        timerMode: true,
        timeRemaining: action.payload,
        testStartTime: Date.now()
      };

    case 'STOP_TIMER':
      return { ...state, timerMode: false, timeRemaining: 0 };

    case 'UPDATE_TIMER':
      return {
        ...state,
        timeRemaining: Math.max(0, state.timeRemaining - 1)
      };

    case 'SET_THEME':
      return { ...state, theme: action.payload };

    case 'SET_FONT_SIZE':
      return { ...state, fontSize: action.payload };

    case 'UPDATE_PERFORMANCE':
      return {
        ...state,
        performanceData: { ...state.performanceData, ...action.payload }
      };

    case 'UPDATE_SETTINGS':
      return {
        ...state,
        settings: { ...state.settings, ...action.payload }
      };

    case 'RESET_QUIZ':
      return {
        ...state,
        currentQuestion: null,
        currentQuestionIndex: 0,
        answers: {},
        showRationale: false,
        score: 0,
        questionsAnswered: 0,
        timerMode: false,
        timeRemaining: 0,
        testStartTime: null
      };

    case 'LOAD_SAVED_STATE':
      return { ...state, ...action.payload };

    default:
      return state;
  }
}

export default function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Load chapters on app start
  useEffect(() => {
    const loadData = async () => {
      try {
        const chaptersData = await loadChapterData();
        dispatch({ type: 'LOAD_CHAPTERS', payload: chaptersData });

        // Load saved state from localStorage
        const savedState = loadFromLocalStorage('appState');
        if (savedState) {
          dispatch({ type: 'LOAD_SAVED_STATE', payload: savedState });
        }
      } catch (error) {
        console.error('Error loading chapters:', error);
      }
    };

    loadData();
  }, []);

  // Save state to localStorage whenever it changes
  useEffect(() => {
    const stateToSave = {
      selectedChapters: state.selectedChapters,
      answers: state.answers,
      performanceData: state.performanceData,
      settings: state.settings,
      theme: state.theme,
      fontSize: state.fontSize
    };

    if (state.settings.saveProgress) {
      saveToLocalStorage('appState', stateToSave);
    }
  }, [state]);

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