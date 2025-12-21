import React, { useState } from 'react';
import { useGame } from '../../context/GameContext.js';

const TrainingGrounds = ({ onClose }) => {
    const { state, dispatch, ACTIONS } = useGame();
    const [tempStats, setTempStats] = useState({ ...state.player.stats });
    const [pointsRemaining, setPointsRemaining] = useState(state.player.unallocatedStats || 0);

    const baseStats = { hp: 100, maxHp: 100, mp: 50, maxMp: 50, atk: 10, mag: 10, def: 5, spd: 10 };

    const handleIncrease = (stat) => {
        if (pointsRemaining <= 0) return;
        if (stat === 'hp' || stat === 'mp') return; // Can't directly increase current values

        setTempStats(prev => ({ ...prev, [stat]: prev[stat] + 1 }));
        setPointsRemaining(prev => prev - 1);
    };

    const handleDecrease = (stat) => {
        if (tempStats[stat] <= baseStats[stat]) return;

        setTempStats(prev => ({ ...prev, [stat]: prev[stat] - 1 }));
        setPointsRemaining(prev => prev + 1);
    };

    const handleApply = () => {
        const updatedStats = { ...tempStats };

        // Update max HP/MP if those stats increased
        if (tempStats.maxHp !== state.player.stats.maxHp) {
            updatedStats.hp = Math.min(tempStats.hp, tempStats.maxHp);
        }
        if (tempStats.maxMp !== state.player.stats.maxMp) {
            updatedStats.mp = Math.min(tempStats.mp, tempStats.maxMp);
        }

        dispatch({
            type: ACTIONS.UPDATE_PLAYER_DATA,
            payload: {
                ...state.player,
                stats: updatedStats,
                unallocatedStats: pointsRemaining
            }
        });

        alert("Stats allocated successfully!");
        onClose();
    };

    const handleReset = () => {
        setTempStats({ ...state.player.stats });
        setPointsRemaining(state.player.unallocatedStats || 0);
    };

    const allocatableStats = ['maxHp', 'maxMp', 'atk', 'mag', 'def', 'spd'];

    return React.createElement('div', { className: 'modal-overlay fade-in' },
        React.createElement('div', { className: 'modal-content training-modal' },
            React.createElement('div', { className: 'modal-header' },
                React.createElement('h2', null, "⚔️ Training Grounds"),
                React.createElement('button', { className: 'close-btn', onClick: onClose }, "CLOSE")
            ),

            React.createElement('div', { className: 'training-content' },
                React.createElement('div', { className: 'points-display' },
                    React.createElement('h3', null, "Available Points:"),
                    React.createElement('span', { className: 'points-count' }, pointsRemaining)
                ),

                React.createElement('p', { className: 'instruction' },
                    pointsRemaining > 0
                        ? "Allocate your stat points to customize your character's strengths."
                        : "No points available. Level up or use the Ancient Library to respec."
                ),

                React.createElement('div', { className: 'stat-allocation' },
                    allocatableStats.map(stat =>
                        React.createElement('div', { key: stat, className: 'alloc-row' },
                            React.createElement('span', { className: 'stat-label' },
                                stat === 'maxHp' ? 'MAX HP' :
                                    stat === 'maxMp' ? 'MAX MP' :
                                        stat.toUpperCase()
                            ),
                            React.createElement('div', { className: 'stat-controls' },
                                React.createElement('button', {
                                    className: 'stat-btn decrease',
                                    onClick: () => handleDecrease(stat),
                                    disabled: tempStats[stat] <= baseStats[stat]
                                }, "−"),
                                React.createElement('span', { className: 'stat-display' },
                                    `${tempStats[stat]} (${tempStats[stat] - baseStats[stat] > 0 ? '+' : ''}${tempStats[stat] - baseStats[stat]})`
                                ),
                                React.createElement('button', {
                                    className: 'stat-btn increase',
                                    onClick: () => handleIncrease(stat),
                                    disabled: pointsRemaining <= 0
                                }, "+")
                            )
                        )
                    )
                ),

                React.createElement('div', { className: 'action-buttons' },
                    React.createElement('button', {
                        className: 'reset-btn',
                        onClick: handleReset
                    }, "Reset Changes"),
                    React.createElement('button', {
                        className: 'apply-btn',
                        onClick: handleApply,
                        disabled: pointsRemaining === (state.player.unallocatedStats || 0)
                    }, "Apply Stats")
                )
            )
        ),

        React.createElement('style', null, `
      .training-modal { width: 600px; }
      .training-content { padding: 25px; }
      
      .points-display { text-align: center; background: var(--bg-dark); padding: 20px; border-radius: var(--radius-lg); margin-bottom: 20px; border: 2px solid var(--primary); }
      .points-display h3 { margin: 0 0 10px 0; color: var(--text-muted); font-size: 1rem; }
      .points-count { font-size: 3rem; font-weight: bold; color: var(--primary); text-shadow: 0 0 20px var(--primary); }
      
      .instruction { text-align: center; color: var(--text-muted); margin-bottom: 25px; font-style: italic; }
      
      .stat-allocation { display: flex; flex-direction: column; gap: 12px; margin-bottom: 25px; }
      .alloc-row { display: flex; justify-content: space-between; align-items: center; background: var(--bg-dark); padding: 15px 20px; border-radius: var(--radius-md); transition: all 0.2s; }
      .alloc-row:hover { background: var(--bg-panel); }
      
      .stat-label { font-weight: bold; color: var(--accent); width: 100px; }
      .stat-controls { display: flex; align-items: center; gap: 15px; }
      .stat-btn { width: 40px; height: 40px; border: 2px solid var(--border); background: var(--bg-panel); color: var(--text-main); border-radius: var(--radius-md); font-size: 1.5rem; font-weight: bold; cursor: pointer; transition: all 0.2s; }
      .stat-btn:hover:not(:disabled) { border-color: var(--primary); background: var(--primary); color: white; transform: scale(1.1); }
      .stat-btn:disabled { opacity: 0.3; cursor: not-allowed; }
      .stat-btn.increase { border-color: #10b981; }
      .stat-btn.increase:hover:not(:disabled) { background: #10b981; border-color: #10b981; }
      .stat-btn.decrease { border-color: #ef4444; }
      .stat-btn.decrease:hover:not(:disabled) { background: #ef4444; border-color: #ef4444; }
      
      .stat-display { min-width: 120px; text-align: center; font-weight: bold; color: var(--text-main); font-size: 1.1rem; }
      
      .action-buttons { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; }
      .reset-btn, .apply-btn { padding: 15px; border: none; border-radius: var(--radius-md); font-weight: bold; font-size: 1.1rem; cursor: pointer; transition: all 0.2s; }
      .reset-btn { background: #6b7280; color: white; }
      .reset-btn:hover { background: #4b5563; transform: translateY(-2px); }
      .apply-btn { background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; }
      .apply-btn:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 8px 20px rgba(16, 185, 129, 0.4); }
      .apply-btn:disabled { opacity: 0.5; cursor: not-allowed; }
    `)
    );
};

export default TrainingGrounds;
