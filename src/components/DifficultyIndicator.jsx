import React from 'react';

const DifficultyIndicator = ({ difficulty, theme = 'dark', size = 'small' }) => {
  const getDifficultyConfig = (diff) => {
    switch (diff) {
      case 'easy':
        return { color: '#4caf50', label: 'Easy', dots: 1 };
      case 'medium':
        return { color: '#ff9800', label: 'Medium', dots: 2 };
      case 'hard':
        return { color: '#f44336', label: 'Hard', dots: 3 };
      case 'unknown':
        return { color: '#757575', label: 'New', dots: 0 };
      default:
        return { color: '#757575', label: 'Unknown', dots: 0 };
    }
  };

  const config = getDifficultyConfig(difficulty);
  const dotSize = size === 'large' ? '8px' : '5px';
  const fontSize = size === 'large' ? '0.9rem' : '0.75rem';

  return (
    <div style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.25rem',
      padding: size === 'large' ? '0.5rem 0.75rem' : '0.25rem 0.5rem',
      backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
      borderRadius: '12px',
      border: `1px solid ${config.color}`,
      fontSize
    }}>
      {/* Difficulty dots */}
      <div style={{ display: 'flex', gap: '2px' }}>
        {[1, 2, 3].map(dot => (
          <div
            key={dot}
            style={{
              width: dotSize,
              height: dotSize,
              borderRadius: '50%',
              backgroundColor: dot <= config.dots ? config.color :
                (theme === 'dark' ? '#333' : '#ddd')
            }}
          />
        ))}
      </div>

      {/* Difficulty label */}
      <span style={{
        color: config.color,
        fontWeight: '600',
        fontSize
      }}>
        {config.label}
      </span>
    </div>
  );
};

export default DifficultyIndicator;