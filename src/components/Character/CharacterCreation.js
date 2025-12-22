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
      React.createElement('h1', null, "IDENTITY INITIALIZATION"),
      React.createElement('div', { className: 'input-group' },
        React.createElement('span', null, "> ENTER DESIGNATION: "),
        React.createElement('input', {
          type: 'text',
          placeholder: "_",
          value: name,
          onChange: (e) => setName(e.target.value.toUpperCase()),
          className: 'name-input',
          autoFocus: true
        })
      )
    ),

    React.createElement('div', { className: 'creation-layout' },
      // Left: Class List
      React.createElement('div', { className: 'class-list-container' },
        React.createElement('h3', null, "SELECT CLASS MODULE:"),
        React.createElement('div', { className: 'class-list' },
          Object.keys(CLASSES).filter(key => !CLASSES[key].unlockable).map((key, index) => {
            const cls = CLASSES[key];
            const isSelected = selectedClass === key;
            return React.createElement('div', {
              key: cls.id,
              className: `retro-list-item ${isSelected ? 'active' : ''}`,
              onClick: () => setSelectedClass(key)
            }, `[ ${isSelected ? 'X' : ' '} ] ${cls.label.toUpperCase()}`);
          })
        )
      ),

      // Right: Details
      React.createElement('div', { className: 'class-details-container' },
        selectedClass ? React.createElement(React.Fragment, null,
          React.createElement('h3', { style: { color: CLASSES[selectedClass].color } },
            `> ${CLASSES[selectedClass].label.toUpperCase()} ANALYSIS`
          ),
          React.createElement('p', { className: 'retro-desc' },
            CLASSES[selectedClass].description
          ),
          React.createElement('div', { className: 'retro-stats' },
            React.createElement('div', null, `HP  : ${CLASSES[selectedClass].stats.hp}`),
            React.createElement('div', null, `MP  : ${CLASSES[selectedClass].stats.mp}`),
            React.createElement('div', null, `STR : ${CLASSES[selectedClass].stats.atk}`),
            React.createElement('div', null, `INT : ${CLASSES[selectedClass].stats.mag}`)
          )
        ) : React.createElement('div', { className: 'placeholder-text' }, "> AWAITING CLASS SELECTION...")
      )
    ),

    React.createElement('div', { className: 'footer' },
      React.createElement('button', {
        disabled: !name || !selectedClass,
        onClick: handleStart,
        className: 'retro-btn start-btn'
      }, "[ EXECUTE INITIALIZATION ]")
    ),

    React.createElement('style', null, `
            .char-creation {
                padding: 20px;
                max-width: 1000px;
                margin: 0 auto;
                height: 100vh;
                display: flex;
                flex-direction: column;
                font-family: monospace;
                color: var(--primary);
            }
            .header {
                text-align: left;
                margin-bottom: 20px;
                border-bottom: 1px solid var(--border);
                padding-bottom: 10px;
            }
            .input-group {
                margin-top: 10px;
                font-size: 1.2rem;
            }
            .name-input {
                background: transparent;
                border: none;
                color: var(--primary);
                font-size: 1.2rem;
                font-family: monospace;
                text-transform: uppercase;
                outline: none;
                width: 300px;
            }
            .creation-layout {
                display: flex;
                flex: 1;
                gap: 20px;
                overflow: hidden;
            }
            .class-list-container {
                flex: 1;
                border-right: 1px solid var(--border);
                padding-right: 10px;
                overflow-y: auto;
            }
            .class-list {
                display: flex;
                flex-direction: column;
                gap: 5px;
            }
            .retro-list-item {
                cursor: pointer;
                padding: 5px;
            }
            .retro-list-item:hover {
                color: var(--accent);
            }
            .retro-list-item.active {
                color: #000;
                background: var(--primary);
            }
            .class-details-container {
                flex: 2;
                padding-left: 10px;
                overflow-y: auto;
            }
            .retro-desc {
                margin: 20px 0;
                line-height: 1.5;
                font-style: italic;
            }
            .retro-stats {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 10px;
                border: 1px solid var(--border);
                padding: 10px;
                max-width: 300px;
            }
            .footer {
                padding-top: 20px;
                border-top: 1px solid var(--border);
                text-align: right;
            }
            .start-btn {
                font-size: 1.5rem;
                color: var(--primary);
            }
            .start-btn:hover:not(:disabled) {
                background: var(--primary);
                color: #000;
            }
            .start-btn:disabled {
                color: var(--text-muted);
            }
            
            @media (max-width: 768px) {
                .creation-layout { flex-direction: column; }
                .class-list-container { border-right: none; border-bottom: 1px solid var(--border); flex: 1; }
                .class-details-container { flex: 1; border-top: 1px solid var(--border); }
            }
        `)
  );
};

export default CharacterCreation;
