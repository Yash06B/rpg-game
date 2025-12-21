import React, { useState } from 'react';
import { useGame } from '../../context/GameContext.js';
import { CLASSES } from '../../data/classes.js';

const CharacterCreation = () => {
  const { dispatch, ACTIONS } = useGame();
  const [selectedClass, setSelectedClass] = useState(null);
  const [name, setName] = useState('');

  const handleStart = () => {
    if (!name || !selectedClass) return;

    // Dispatch init
    dispatch({
      type: ACTIONS.SET_PLAYER_CLASS,
      payload: {
        className: CLASSES[selectedClass].label,
        stats: CLASSES[selectedClass].stats
      }
    });
  };

  return React.createElement('div', { className: 'char-creation fade-in' },
    React.createElement('div', { className: 'header' },
      React.createElement('h1', null, "Create Your Hero"),
      React.createElement('input', {
        type: 'text',
        placeholder: "Enter Hero Name...",
        value: name,
        onChange: (e) => setName(e.target.value),
        className: 'name-input'
      })
    ),
    React.createElement('div', { className: 'class-grid' },
      Object.keys(CLASSES).filter(key => !CLASSES[key].unlockable).map(key => {
        const cls = CLASSES[key];
        const isSelected = selectedClass === key;

        return React.createElement('div', {
          key: cls.id,
          className: `class-card ${isSelected ? 'selected' : ''}`,
          onClick: () => setSelectedClass(key),
          style: { borderColor: isSelected ? cls.color : 'transparent' }
        },
          React.createElement('h3', { style: { color: cls.color } }, cls.label),
          React.createElement('p', { className: 'desc' }, cls.description),
          React.createElement('div', { className: 'stats-mini' },
            React.createElement('span', null, `HP: ${cls.stats.hp}`),
            React.createElement('span', null, `MP: ${cls.stats.mp}`),
            React.createElement('span', null, `ATK: ${cls.stats.atk}`),
            React.createElement('span', null, `MAG: ${cls.stats.mag}`)
          )
        );
      })
    ),
    React.createElement('div', { className: 'footer' },
      React.createElement('button', {
        disabled: !name || !selectedClass,
        onClick: handleStart,
        className: 'start-btn'
      }, "Embark on Journey")
    ),
    React.createElement('style', null, `
      .char-creation {
        padding: 40px;
        max-width: 1200px;
        margin: 0 auto;
        height: 100vh;
        display: flex;
        flex-direction: column;
      }
      .header {
        text-align: center;
        margin-bottom: 30px;
      }
      .name-input {
        background: transparent;
        border: none;
        border-bottom: 2px solid var(--border);
        color: white;
        font-size: 2rem;
        text-align: center;
        margin-top: 20px;
        padding: 10px;
      }
      .name-input:focus {
        outline: none;
        border-color: var(--primary);
      }
      .class-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        gap: 15px;
        overflow-y: auto;
        padding: 10px;
        flex: 1;
      }
      .class-card {
        background: var(--bg-card);
        padding: 15px;
        border-radius: var(--radius-md);
        border: 2px solid var(--border);
        cursor: pointer;
        transition: all 0.2s;
      }
      .class-card:hover {
        transform: translateY(-2px);
        border-color: var(--text-muted);
      }
      .class-card.selected {
        background: var(--bg-panel);
        box-shadow: 0 0 15px rgba(0,0,0,0.5);
      }
      .stats-mini {
        display: grid;
        grid-template-columns: 1fr 1fr;
        font-size: 0.8rem;
        color: var(--text-muted);
        margin-top: 10px;
        gap: 4px;
      }
      .footer {
        padding-top: 20px;
        text-align: center;
      }
      .start-btn {
        background: var(--primary);
        color: white;
        border: none;
        padding: 15px 40px;
        font-size: 1.2rem;
        border-radius: var(--radius-lg);
        cursor: pointer;
        box-shadow: 0 0 20px var(--primary-glow);
        font-weight: bold;
        transition: transform 0.1s;
      }
      .start-btn:hover {
        transform: scale(1.05);
      }
      .start-btn:disabled {
        opacity: 0.5;
        cursor: not-allowed;
        transform: none;
      }
    `)
  );
};

export default CharacterCreation;
