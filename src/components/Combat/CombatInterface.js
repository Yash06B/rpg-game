import React, { useState, useEffect } from 'react';
import { useGame } from '../../context/GameContext.js';

const CombatInterface = () => {
    const { state, dispatch, ACTIONS } = useGame();
    const [combatLog, setCombatLog] = useState(["Encounter started!"]);
    const [turn, setTurn] = useState(1);
    const [enemy, setEnemy] = useState({
        name: "Dungeon Minion",
        hp: 50,
        maxHp: 50,
        atk: 8
    });

    const addLog = (msg) => setCombatLog(prev => [...prev.slice(-4), msg]);

    const handleAttack = () => {
        // Player Turn
        const dmg = Math.floor(state.player.stats.atk * 1.2);
        const newEnemyHp = Math.max(0, enemy.hp - dmg);
        setEnemy(prev => ({ ...prev, hp: newEnemyHp }));
        addLog(`You hit ${enemy.name} for ${dmg} damage!`);

        if (newEnemyHp <= 0) {
            addLog("Victory!");
            setTimeout(() => {
                alert("Victory! Gained 50 XP and 10 Gold.");
                // TODO: Dispatch rewards
                dispatch({ type: ACTIONS.NAVIGATE, payload: 'town' });
            }, 1000);
            return;
        }

        // Enemy Turn (Simulated delay)
        setTimeout(() => {
            const enemyDmg = Math.max(1, enemy.atk - state.player.stats.def);
            addLog(`${enemy.name} attacks you for ${enemyDmg} damage!`);
            // In a real app, update player HP in context
            setTurn(t => t + 1);
        }, 800);
    };

    return React.createElement('div', { className: 'combat-container fade-in' },
        React.createElement('h2', { style: { textAlign: 'center', marginBottom: '20px' } },
            `Combat - Turn ${turn}`
        ),

        // Battlefield
        React.createElement('div', { className: 'battlefield' },
            // Enemy
            React.createElement('div', { className: 'combat-card enemy' },
                React.createElement('div', { className: 'sprite' }, "👹"),
                React.createElement('h3', null, enemy.name),
                React.createElement('div', { className: 'hp-bar' },
                    React.createElement('div', {
                        className: 'hp-fill',
                        style: { width: `${(enemy.hp / enemy.maxHp) * 100}%` }
                    })
                ),
                React.createElement('p', null, `${enemy.hp} / ${enemy.maxHp} HP`)
            ),

            // VS
            React.createElement('div', { className: 'vs' }, "VS"),

            // Player
            React.createElement('div', { className: 'combat-card player' },
                React.createElement('div', { className: 'sprite' }, "🛡️"),
                React.createElement('h3', null, state.player.name),
                React.createElement('div', { className: 'hp-bar' },
                    React.createElement('div', {
                        className: 'hp-fill player-fill',
                        style: { width: `${(state.player.stats.hp / state.player.stats.maxHp) * 100}%` }
                    })
                ),
                React.createElement('p', null, `${state.player.stats.hp} / ${state.player.stats.maxHp} HP`)
            )
        ),

        // Log
        React.createElement('div', { className: 'combat-log' },
            combatLog.map((line, i) => React.createElement('p', { key: i }, line))
        ),

        // Controls
        React.createElement('div', { className: 'combat-controls' },
            React.createElement('button', { className: 'combat-btn attack', onClick: handleAttack }, "Attack"),
            React.createElement('button', { className: 'combat-btn skill' }, "Skill"),
            React.createElement('button', { className: 'combat-btn item' }, "Item"),
            React.createElement('button', { className: 'combat-btn flee', onClick: () => dispatch({ type: ACTIONS.NAVIGATE, payload: 'town' }) }, "Flee")
        ),

        // Styles
        React.createElement('style', null, `
      .combat-container {
        padding: 20px;
        max-width: 800px;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        height: 100vh;
      }
      .battlefield {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
        flex: 1;
      }
      .combat-card {
        background: var(--bg-card);
        padding: 20px;
        border-radius: var(--radius-lg);
        border: 2px solid var(--border);
        width: 40%;
        text-align: center;
      }
      .sprite { font-size: 4rem; margin-bottom: 10px; }
      .hp-bar {
        background: #333;
        height: 10px;
        border-radius: 5px;
        margin: 10px 0;
        overflow: hidden;
      }
      .hp-fill {
        background: var(--accent);
        height: 100%;
        transition: width 0.3s;
      }
      .player-fill { background: var(--primary); }
      .vs { font-weight: bold; font-size: 2rem; color: var(--text-muted); }
      
      .combat-log {
        background: rgba(0,0,0,0.5);
        padding: 10px;
        height: 150px;
        overflow-y: auto;
        margin-bottom: 20px;
        border-radius: var(--radius-md);
        font-family: monospace;
      }
      .combat-controls {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 10px;
        padding-bottom: 20px;
      }
      .combat-btn {
        padding: 15px;
        border: none;
        border-radius: var(--radius-md);
        font-weight: bold;
        cursor: pointer;
        color: white;
        font-size: 1.1rem;
      }
      .attack { background: var(--primary); }
      .skill { background: var(--class-mage); }
      .item { background: var(--class-rogue); }
      .flee { background: var(--accent); }
    `)
    );
};

export default CombatInterface;
