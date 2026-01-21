import React, { useState } from 'react';
import { useGame } from '../../context/GameContext.js';
import { CLASSES } from '../../data/classes.js';
import { RACES } from '../../data/races.js';

const CharacterCreation = () => {
  const { dispatch, ACTIONS } = useGame();

  const [step, setStep] = useState(1); // 1: Race, 2: Class, 3: Name
  const [selectedRace, setSelectedRace] = useState(null);
  const [selectedClass, setSelectedClass] = useState(null);
  const [name, setName] = useState('');

  const handleNext = () => {
    if (step === 1 && selectedRace) setStep(2);
    else if (step === 2 && selectedClass) setStep(3);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const finalizeCreation = () => {
    // 1. Init Class (sets base stats)
    dispatch({
      type: ACTIONS.SET_PLAYER_CLASS,
      payload: {
        className: CLASSES[selectedClass].label,
        stats: CLASSES[selectedClass].stats
      }
    });

    // 2. Apply Race Bonuses (adds to stats)
    dispatch({
      type: ACTIONS.SET_RACE,
      payload: RACES[selectedRace]
    });

    // 3. Set Name
    dispatch({
      type: ACTIONS.UPDATE_PLAYER_DATA,
      payload: { name: name }
    });
  };

  // Helper to render race list
  const renderRaceList = () => React.createElement('div', { className: 'list-container' },
    React.createElement('h3', null, "> SELECT BIOLOGICAL FORM:"),
    Object.values(RACES).map(race => (
      React.createElement('div', {
        key: race.id,
        className: `retro-item ${selectedRace === race.id ? 'active' : ''}`,
        onClick: () => setSelectedRace(race.id)
      }, `[ ${selectedRace === race.id ? 'X' : ' '} ] ${race.name.toUpperCase()}`)
    ))
  );

  // Helper for Class list
  const renderClassList = () => React.createElement('div', { className: 'list-container' },
    React.createElement('h3', null, "> SELECT COMBAT MODULE:"),
    Object.keys(CLASSES).filter(k => !CLASSES[k].unlockable).map(key => (
      React.createElement('div', {
        key: key,
        className: `retro-item ${selectedClass === key ? 'active' : ''}`,
        onClick: () => setSelectedClass(key)
      }, `[ ${selectedClass === key ? 'X' : ' '} ] ${CLASSES[key].label.toUpperCase()}`)
    ))
  );

  return React.createElement('div', { className: 'char-creation fade-in' },
    // Header tracking steps
    React.createElement('div', { className: 'step-indicator' },
      React.createElement('span', { className: step === 1 ? 'active-step' : '' }, "1. RACE"),
      React.createElement('span', null, " >> "),
      React.createElement('span', { className: step === 2 ? 'active-step' : '' }, "2. CLASS"),
      React.createElement('span', null, " >> "),
      React.createElement('span', { className: step === 3 ? 'active-step' : '' }, "3. IDENTITY")
    ),

    React.createElement('div', { className: 'creation-content' },

      // --- STEP 1: RACE ---
      step === 1 && React.createElement(React.Fragment, null,
        renderRaceList(),
        React.createElement('div', { className: 'details-panel' },
          selectedRace ? React.createElement(React.Fragment, null,
            React.createElement('h2', { className: 'retro-h2' }, RACES[selectedRace].name.toUpperCase()),
            React.createElement('p', { className: 'retro-text' }, RACES[selectedRace].description),
            React.createElement('div', { className: 'bonus-box' },
              React.createElement('h4', null, "RACIAL BONUSES:"),
              Object.entries(RACES[selectedRace].bonuses).map(([stat, val]) =>
                React.createElement('div', { key: stat }, `${stat.toUpperCase()}: ${val > 0 ? '+' : ''}${val}`)
              ),
              React.createElement('p', { className: 'passive-text' }, `PASSIVE: ${RACES[selectedRace].passive}`)
            )
          ) : React.createElement('p', { className: 'blink' }, "> WAITING FOR INPUT...")
        )
      ),

      // --- STEP 2: CLASS ---
      step === 2 && React.createElement(React.Fragment, null,
        renderClassList(),
        React.createElement('div', { className: 'details-panel' },
          selectedClass ? React.createElement(React.Fragment, null,
            React.createElement('h2', { className: 'retro-h2' }, CLASSES[selectedClass].label.toUpperCase()),
            React.createElement('p', { className: 'retro-text' }, CLASSES[selectedClass].description),
            React.createElement('div', { className: 'bonus-box' },
              React.createElement('h4', null, "BASE STATS:"),
              Object.entries(CLASSES[selectedClass].stats).map(([stat, val]) =>
                React.createElement('div', { key: stat }, `${stat.toUpperCase()}: ${val}`)
              )
            )
          ) : React.createElement('p', { className: 'blink' }, "> WAITING FOR INPUT...")
        )
      ),

      // --- STEP 3: NAME ---
      step === 3 && React.createElement('div', { className: 'name-section' },
        React.createElement('h2', null, "FINAL AUTHORIZATION"),
        React.createElement('div', { className: 'summary-card' },
          React.createElement('p', null, `RACE: ${RACES[selectedRace].name}`),
          React.createElement('p', null, `CLASS: ${CLASSES[selectedClass].label}`),
          React.createElement('div', { className: 'input-row' },
            React.createElement('span', null, "ENTER DESIGNATION: >"),
            React.createElement('input', {
              className: 'retro-input',
              autoFocus: true,
              value: name,
              onChange: (e) => setName(e.target.value.toUpperCase()),
              placeholder: "PLAYER_ONE"
            })
          )
        )
      )
    ),

    React.createElement('div', { className: 'nav-footer' },
      step > 1 && React.createElement('button', { className: 'retro-btn', onClick: handleBack }, "< BACK"),
      step < 3 && React.createElement('button', {
        className: 'retro-btn',
        onClick: handleNext,
        disabled: (step === 1 && !selectedRace) || (step === 2 && !selectedClass)
      }, "NEXT >"),
      step === 3 && React.createElement('button', {
        className: 'retro-btn primary',
        onClick: finalizeCreation,
        disabled: !name
      }, "INITIALIZE SYSTEM")
    ),

    React.createElement('style', null, `
        .char-creation { padding: 40px; color: var(--primary); font-family: monospace; height: 100vh; display: flex; flex-direction: column; }
        .step-indicator { display: flex; justify-content: center; gap: 10px; font-size: 1.2rem; margin-bottom: 30px; border-bottom: 2px solid #333; padding-bottom: 15px; }
        .active-step { color: var(--accent); font-weight: bold; text-decoration: underline; }
        
        .creation-content { display: flex; gap: 40px; flex: 1; overflow: hidden; }
        .list-container { flex: 1; overflow-y: auto; border: 1px solid #333; padding: 10px; }
        .retro-item { padding: 8px; cursor: pointer; border: 1px solid transparent; }
        .retro-item:hover { border-color: var(--primary); background: #111; }
        .retro-item.active { background: var(--primary); color: black; font-weight: bold; }

        .details-panel { flex: 1.5; border: 1px solid var(--border); padding: 20px; }
        .retro-h2 { margin-top: 0; color: var(--accent); border-bottom: 1px dashed #555; }
        .retro-text { font-size: 1.1rem; line-height: 1.5; margin: 20px 0; }
        .bonus-box { background: #111; padding: 15px; border: 1px solid #333; }
        .passive-text { color: #fdb931; margin-top: 10px; font-style: italic; }

        .name-section { width: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; }
        .summary-card { border: 2px solid var(--primary); padding: 40px; width: 600px; text-align: left; }
        .retro-input { background: black; border: none; border-bottom: 2px solid var(--primary); color: white; font-family: monospace; font-size: 1.5rem; width: 300px; margin-left: 20px; outline: none; }
        
        .nav-footer { margin-top: 20px; display: flex; justify-content: space-between; padding-top: 20px; border-top: 1px solid #333; }
        .retro-btn { background: transparent; border: 2px solid var(--primary); color: var(--primary); padding: 15px 40px; font-size: 1.2rem; cursor: pointer; }
        .retro-btn:hover:not(:disabled) { background: var(--primary); color: black; }
        .retro-btn:disabled { border-color: #555; color: #555; cursor: not-allowed; }
        .blink { animation: blink 1s infinite; }
        @keyframes blink { 50% { opacity: 0; } }
    `)
  );
};
export default CharacterCreation;
