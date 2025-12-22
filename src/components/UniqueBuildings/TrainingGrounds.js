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
        React.createElement('div', { className: 'retro-modal-box' },
            React.createElement('div', { className: 'retro-modal-header' },
                React.createElement('h2', { className: 'retro-h2' }, "> TRAINING SIMULATION"),
                React.createElement('button', { className: 'retro-close-btn', onClick: onClose }, "[ X ] ABORT")
            ),

            React.createElement('div', { className: 'retro-content-area' },
                React.createElement('div', { className: 'retro-status-box' },
                    React.createElement('h3', { className: 'retro-h3' }, "> STAT ALLOCATION PROTOCOL"),
                    React.createElement('p', { className: 'retro-text' }, `> UNALLOCATED POINTS: ${pointsRemaining}`),
                    pointsRemaining <= 0 && React.createElement('p', { className: 'retro-text warning' }, "> ALERT: NO POINTS AVAILABLE FOR UPGRADE.")
                ),

                React.createElement('div', { className: 'retro-list-container' },
                    allocatableStats.map(stat =>
                        React.createElement('div', { key: stat, className: 'retro-stat-row' },
                            React.createElement('span', { className: 'stat-label' }, `> ${stat === 'maxHp' ? 'MAX HP' : stat === 'maxMp' ? 'MAX MP' : stat.toUpperCase()}`),
                            React.createElement('div', { className: 'stat-controls' },
                                React.createElement('button', {
                                    className: 'retro-command-btn small',
                                    onClick: () => handleDecrease(stat),
                                    disabled: tempStats[stat] <= baseStats[stat]
                                }, "[-]"),
                                React.createElement('span', { className: 'stat-value' },
                                    `${tempStats[stat]} [${tempStats[stat] - baseStats[stat] > 0 ? '+' : ''}${tempStats[stat] - baseStats[stat]}]`
                                ),
                                React.createElement('button', {
                                    className: 'retro-command-btn small',
                                    onClick: () => handleIncrease(stat),
                                    disabled: pointsRemaining <= 0
                                }, "[+]")
                            )
                        )
                    )
                ),

                React.createElement('div', { className: 'retro-action-bar' },
                    React.createElement('button', {
                        className: 'retro-action-btn',
                        onClick: handleReset
                    }, "[ RESET ]"),
                    React.createElement('button', {
                        className: 'retro-action-btn primary',
                        onClick: handleApply,
                        disabled: pointsRemaining === (state.player.unallocatedStats || 0)
                    }, "[ CONFIRM UPGRADES ]")
                )
            ),

            // Styles
            React.createElement('style', null, `
                .retro-modal-box {
                    background: #000;
                    border: 2px solid var(--primary);
                    padding: 20px;
                    width: 600px;
                    max-width: 95vw;
                    display: flex; flex-direction: column;
                    color: var(--primary);
                    font-family: monospace;
                    box-shadow: 0 0 0 1000px rgba(0,0,0,0.8);
                }
                .retro-modal-header {
                    display: flex; justify-content: space-between; align-items: center;
                    border-bottom: 2px solid var(--border);
                    padding-bottom: 15px; margin-bottom: 20px;
                }
                .retro-h2 { margin: 0; color: var(--primary); }
                .retro-close-btn { background: transparent; border: none; color: var(--danger); font-family: monospace; cursor: pointer; }
                .retro-close-btn:hover { background: var(--danger); color: black; }

                .retro-content-area { display: flex; flex-direction: column; gap: 20px; }
                .retro-status-box { text-align: center; border: 1px dashed #333; padding: 10px; }
                .retro-h3 { color: var(--accent); margin: 0 0 5px 0; }
                .retro-text { margin: 5px 0; color: #aaa; }
                .retro-text.warning { color: var(--danger); }

                .retro-list-container { display: flex; flex-direction: column; gap: 10px; }
                .retro-stat-row { 
                    display: flex; justify-content: space-between; align-items: center; 
                    border: 1px solid #222; padding: 10px; 
                }
                .retro-stat-row:hover { border-color: #444; }
                .stat-label { font-weight: bold; color: var(--primary); }
                
                .stat-controls { display: flex; align-items: center; gap: 15px; }
                .stat-value { min-width: 80px; text-align: center; color: white; }
                
                .retro-command-btn.small {
                    background: #111; border: 1px solid #444; color: var(--primary);
                    width: 30px; height: 30px; cursor: pointer;
                }
                .retro-command-btn.small:hover:not(:disabled) { background: var(--primary); color: black; }
                .retro-command-btn.small:disabled { opacity: 0.3; cursor: not-allowed; }

                .retro-action-bar { display: flex; justify-content: space-between; gap: 20px; margin-top: 10px; }
                .retro-action-btn { 
                    flex: 1; padding: 10px; background: transparent; border: 1px solid #444; 
                    color: #888; cursor: pointer; font-family: monospace;
                }
                .retro-action-btn:hover { border-color: var(--primary); color: var(--primary); }
                .retro-action-btn.primary { border-color: var(--primary); color: var(--primary); font-weight: bold; }
                .retro-action-btn.primary:hover:not(:disabled) { background: var(--primary); color: black; }
                .retro-action-btn:disabled { opacity: 0.3; cursor: not-allowed; }
            `)
        )
    );
};

export default TrainingGrounds;
