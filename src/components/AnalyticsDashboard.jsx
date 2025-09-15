import React, { useState } from 'react';
import { useApp } from '../hooks/useApp';
import { getStudyAnalytics } from '../services/dataService';

const AnalyticsDashboard = () => {
  const { state, dispatch } = useApp();
  const [activeTab, setActiveTab] = useState('overview');

  const analytics = getStudyAnalytics(state.answers);

  // Calculate time-based analytics
  const getTimeBasedAnalytics = () => {
    const now = Date.now();
    const oneDay = 24 * 60 * 60 * 1000;
    const oneWeek = 7 * oneDay;
    const oneMonth = 30 * oneDay;

    const timeRanges = {
      today: now - oneDay,
      week: now - oneWeek,
      month: now - oneMonth
    };

    const results = {};

    Object.keys(timeRanges).forEach(range => {
      const rangeStart = timeRanges[range];
      const answersInRange = Object.values(state.answers).filter(
        answer => answer.timestamp >= rangeStart
      );

      results[range] = {
        total: answersInRange.length,
        correct: answersInRange.filter(a => a.correct).length,
        avgTime: answersInRange.length > 0
          ? Math.round(answersInRange.reduce((sum, a) => sum + (a.timeSpent || 0), 0) / answersInRange.length)
          : 0
      };
    });

    return results;
  };

  const timeAnalytics = getTimeBasedAnalytics();

  // Get weak areas (chapters with low accuracy)
  const getWeakAreas = () => {
    return Object.entries(analytics.chapterStats)
      .map(([chapter, stats]) => ({
        chapter: parseInt(chapter),
        accuracy: stats.total > 0 ? (stats.correct / stats.total) * 100 : 0,
        total: stats.total,
        correct: stats.correct
      }))
      .filter(area => area.total > 0 && area.accuracy < 70)
      .sort((a, b) => a.accuracy - b.accuracy);
  };

  const weakAreas = getWeakAreas();

  const renderOverview = () => (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '1rem',
      marginBottom: '2rem'
    }}>
      <div style={{
        padding: '1rem',
        backgroundColor: state.theme === 'dark' ? '#333' : '#f9f9f9',
        borderRadius: '8px',
        border: `1px solid ${state.theme === 'dark' ? '#444' : '#ddd'}`
      }}>
        <h3 style={{ margin: '0 0 0.5rem 0', color: '#4CAF50' }}>Overall Performance</h3>
        <div style={{ fontSize: '2rem', fontWeight: 'bold', color: state.theme === 'dark' ? '#fff' : '#333' }}>
          {Math.round(analytics.accuracy)}%
        </div>
        <div style={{ fontSize: '0.9rem', color: state.theme === 'dark' ? '#ccc' : '#666' }}>
          {analytics.correctAnswers} correct out of {analytics.totalQuestions}
        </div>
      </div>

      <div style={{
        padding: '1rem',
        backgroundColor: state.theme === 'dark' ? '#333' : '#f9f9f9',
        borderRadius: '8px',
        border: `1px solid ${state.theme === 'dark' ? '#444' : '#ddd'}`
      }}>
        <h3 style={{ margin: '0 0 0.5rem 0', color: '#2196F3' }}>Average Time</h3>
        <div style={{ fontSize: '2rem', fontWeight: 'bold', color: state.theme === 'dark' ? '#fff' : '#333' }}>
          {Math.floor(analytics.avgTimePerQuestion / 60)}m {analytics.avgTimePerQuestion % 60}s
        </div>
        <div style={{ fontSize: '0.9rem', color: state.theme === 'dark' ? '#ccc' : '#666' }}>
          per question
        </div>
      </div>

      <div style={{
        padding: '1rem',
        backgroundColor: state.theme === 'dark' ? '#333' : '#f9f9f9',
        borderRadius: '8px',
        border: `1px solid ${state.theme === 'dark' ? '#444' : '#ddd'}`
      }}>
        <h3 style={{ margin: '0 0 0.5rem 0', color: '#FF9800' }}>Study Streak</h3>
        <div style={{ fontSize: '2rem', fontWeight: 'bold', color: state.theme === 'dark' ? '#fff' : '#333' }}>
          {state.streak} 🔥
        </div>
        <div style={{ fontSize: '0.9rem', color: state.theme === 'dark' ? '#ccc' : '#666' }}>
          consecutive days
        </div>
      </div>

      <div style={{
        padding: '1rem',
        backgroundColor: state.theme === 'dark' ? '#333' : '#f9f9f9',
        borderRadius: '8px',
        border: `1px solid ${state.theme === 'dark' ? '#444' : '#ddd'}`
      }}>
        <h3 style={{ margin: '0 0 0.5rem 0', color: '#9C27B0' }}>Today's Progress</h3>
        <div style={{ fontSize: '2rem', fontWeight: 'bold', color: state.theme === 'dark' ? '#fff' : '#333' }}>
          {timeAnalytics.today.total}
        </div>
        <div style={{ fontSize: '0.9rem', color: state.theme === 'dark' ? '#ccc' : '#666' }}>
          questions answered
        </div>
      </div>
    </div>
  );

  const renderChapterAnalytics = () => (
    <div>
      <h3 style={{ color: state.theme === 'dark' ? '#fff' : '#333', marginBottom: '1rem' }}>
        Chapter Performance
      </h3>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '1rem'
      }}>
        {Object.entries(analytics.chapterStats).map(([chapter, stats]) => {
          const accuracy = stats.total > 0 ? (stats.correct / stats.total) * 100 : 0;
          return (
            <div
              key={chapter}
              style={{
                padding: '1rem',
                backgroundColor: state.theme === 'dark' ? '#333' : '#f9f9f9',
                borderRadius: '8px',
                border: `1px solid ${state.theme === 'dark' ? '#444' : '#ddd'}`
              }}
            >
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '0.5rem'
              }}>
                <h4 style={{ margin: 0, color: state.theme === 'dark' ? '#fff' : '#333' }}>
                  Chapter {chapter}
                </h4>
                <div style={{
                  padding: '0.25rem 0.5rem',
                  backgroundColor: accuracy >= 70 ? '#4CAF50' : accuracy >= 40 ? '#FF9800' : '#f44336',
                  color: '#fff',
                  borderRadius: '12px',
                  fontSize: '0.8rem',
                  fontWeight: 'bold'
                }}>
                  {Math.round(accuracy)}%
                </div>
              </div>

              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '0.9rem',
                color: state.theme === 'dark' ? '#ccc' : '#666',
                marginBottom: '0.5rem'
              }}>
                <span>{stats.correct}/{stats.total} correct</span>
                <span>{Math.round(stats.timeSpent / stats.total)}s avg</span>
              </div>

              {/* Progress bar for this chapter */}
              <div style={{
                width: '100%',
                height: '6px',
                backgroundColor: state.theme === 'dark' ? '#555' : '#e0e0e0',
                borderRadius: '3px',
                overflow: 'hidden'
              }}>
                <div style={{
                  width: `${accuracy}%`,
                  height: '100%',
                  backgroundColor: accuracy >= 70 ? '#4CAF50' : accuracy >= 40 ? '#FF9800' : '#f44336',
                  transition: 'width 0.3s ease'
                }} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderWeakAreas = () => (
    <div>
      <h3 style={{ color: state.theme === 'dark' ? '#fff' : '#333', marginBottom: '1rem' }}>
        Areas for Improvement
      </h3>
      {weakAreas.length === 0 ? (
        <p style={{ color: state.theme === 'dark' ? '#ccc' : '#666' }}>
          Great job! No weak areas identified. Keep up the good work!
        </p>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1rem'
        }}>
          {weakAreas.map(area => (
            <div
              key={area.chapter}
              style={{
                padding: '1rem',
                backgroundColor: state.theme === 'dark' ? '#333' : '#f9f9f9',
                borderRadius: '8px',
                border: `2px solid #f44336`,
                borderLeft: `5px solid #f44336`
              }}
            >
              <h4 style={{ margin: '0 0 0.5rem 0', color: '#f44336' }}>
                Chapter {area.chapter}
              </h4>
              <div style={{ color: state.theme === 'dark' ? '#fff' : '#333' }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
                  {Math.round(area.accuracy)}%
                </div>
                <div style={{ fontSize: '0.9rem', color: state.theme === 'dark' ? '#ccc' : '#666' }}>
                  {area.correct}/{area.total} questions correct
                </div>
                <div style={{
                  marginTop: '0.5rem',
                  padding: '0.5rem',
                  backgroundColor: '#f44336',
                  color: '#fff',
                  borderRadius: '4px',
                  fontSize: '0.8rem'
                }}>
                  💡 Review this chapter for better understanding
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderGoalSetting = () => (
    <div>
      <h3 style={{ color: state.theme === 'dark' ? '#fff' : '#333', marginBottom: '1rem' }}>
        Study Goals & Settings
      </h3>

      <div style={{
        padding: '1rem',
        backgroundColor: state.theme === 'dark' ? '#333' : '#f9f9f9',
        borderRadius: '8px',
        border: `1px solid ${state.theme === 'dark' ? '#444' : '#ddd'}`,
        marginBottom: '1rem'
      }}>
        <label style={{
          display: 'block',
          marginBottom: '0.5rem',
          color: state.theme === 'dark' ? '#fff' : '#333',
          fontWeight: 'bold'
        }}>
          Daily Question Goal:
        </label>
        <input
          type="number"
          min="1"
          max="100"
          value={state.dailyGoal}
          onChange={(e) => dispatch({ type: 'UPDATE_DAILY_PROGRESS', payload: parseInt(e.target.value) })}
          style={{
            width: '100px',
            padding: '0.5rem',
            border: `1px solid ${state.theme === 'dark' ? '#444' : '#ccc'}`,
            borderRadius: '4px',
            backgroundColor: state.theme === 'dark' ? '#222' : '#fff',
            color: state.theme === 'dark' ? '#fff' : '#333'
          }}
        />
        <p style={{
          fontSize: '0.9rem',
          color: state.theme === 'dark' ? '#ccc' : '#666',
          margin: '0.5rem 0 0 0'
        }}>
          Current progress: {timeAnalytics.today.total} / {state.dailyGoal} questions today
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '1rem'
      }}>
        <div style={{
          padding: '1rem',
          backgroundColor: state.theme === 'dark' ? '#333' : '#f9f9f9',
          borderRadius: '8px',
          border: `1px solid ${state.theme === 'dark' ? '#444' : '#ddd'}`,
          textAlign: 'center'
        }}>
          <h4 style={{ margin: '0 0 0.5rem 0', color: '#4CAF50' }}>This Week</h4>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: state.theme === 'dark' ? '#fff' : '#333' }}>
            {timeAnalytics.week.total}
          </div>
          <div style={{ fontSize: '0.8rem', color: state.theme === 'dark' ? '#ccc' : '#666' }}>
            questions answered
          </div>
        </div>

        <div style={{
          padding: '1rem',
          backgroundColor: state.theme === 'dark' ? '#333' : '#f9f9f9',
          borderRadius: '8px',
          border: `1px solid ${state.theme === 'dark' ? '#444' : '#ddd'}`,
          textAlign: 'center'
        }}>
          <h4 style={{ margin: '0 0 0.5rem 0', color: '#2196F3' }}>This Month</h4>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: state.theme === 'dark' ? '#fff' : '#333' }}>
            {timeAnalytics.month.total}
          </div>
          <div style={{ fontSize: '0.8rem', color: state.theme === 'dark' ? '#ccc' : '#666' }}>
            questions answered
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div style={{
      maxWidth: '1000px',
      margin: '0 auto',
      padding: '1rem'
    }}>
      {/* Tab Navigation */}
      <div style={{
        display: 'flex',
        marginBottom: '2rem',
        borderBottom: `1px solid ${state.theme === 'dark' ? '#444' : '#ddd'}`
      }}>
        {[
          { id: 'overview', label: 'Overview' },
          { id: 'chapters', label: 'By Chapter' },
          { id: 'weak', label: 'Weak Areas' },
          { id: 'goals', label: 'Goals & Settings' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: '0.75rem 1rem',
              backgroundColor: 'transparent',
              border: 'none',
              borderBottom: `2px solid ${activeTab === tab.id ? '#2196F3' : 'transparent'}`,
              color: activeTab === tab.id
                ? '#2196F3'
                : state.theme === 'dark' ? '#ccc' : '#666',
              cursor: 'pointer',
              fontWeight: activeTab === tab.id ? 'bold' : 'normal',
              transition: 'all 0.3s ease'
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'chapters' && renderChapterAnalytics()}
        {activeTab === 'weak' && renderWeakAreas()}
        {activeTab === 'goals' && renderGoalSetting()}
      </div>
    </div>
  );
};

export default AnalyticsDashboard;