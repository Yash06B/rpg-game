import React, { useState } from 'react';
import { useGame } from '../../context/GameContext.js';

const AncientLibrary = ({ onClose }) => {
    const { state, dispatch, ACTIONS } = useGame();
    const [selectedStat, setSelectedStat] = useState(null);
    const [respecCost] = useState(1000); // Fixed cost for respec

    const currentStats = state.player.stats;

    // Calculate how many stat points player has allocated
    const baseStats = { hp: 100, maxHp: 100, mp: 50, maxMp: 50, atk: 10, mag: 10, def: 5, spd: 10 };
    const allocatedPoints = Object.entries(currentStats).reduce((sum, [stat, value]) => {
        if (stat === 'hp' || stat === 'mp') return sum; // Skip current values
        const baseValue = baseStats[stat] || 0;
        return sum + Math.max(0, value - baseValue);
    }, 0);

    const handleRespec = () => {
        if (state.player.gold < respecCost) {
            alert("Not enough gold! Cost: " + respecCost + "g");
            return;
        }

        const confirm = window.confirm(
            `Reset all stats to base values for ${respecCost}g?\n\nYou'll receive ${allocatedPoints} stat points to reallocate.`
        );

        if (confirm) {
            dispatch({
                type: ACTIONS.UPDATE_PLAYER_DATA,
                payload: {
                    ...state.player,
                    stats: { ...baseStats, hp: baseStats.maxHp, mp: baseStats.maxMp },
                    gold: state.player.gold - respecCost,
                    unallocatedStats: allocatedPoints
                }
            });
            alert("Stats reset! Visit Training Grounds to reallocate points.");
            onClose();
        }
    };

    return React.createElement('div', { className: 'modal-overlay fade-in' },
        React.createElement('div', { className: 'retro-modal-box library-modal' },
            React.createElement('div', { className: 'retro-modal-header' },
                React.createElement('h2', { className: 'retro-h2' }, "> ANCIENT LIBRARY"),
                React.createElement('button', { className: 'retro-close-btn', onClick: onClose }, "[ X ] EXIT")
            ),

            React.createElement('div', { className: 'retro-content-area' },
                React.createElement('div', { className: 'retro-status-box' },
                    React.createElement('p', { className: 'retro-text' },
                        "The dusty tomes here contain forbidden knowledge of rebirth. You may purge your current form and reallocate your potential."
                    ),
                    React.createElement('p', { className: 'warning-text' },
                        "WARNING: ALL STAT ALLOCATIONS WILL BE RESET TO BASE."
                    )
                ),

                React.createElement('div', { className: 'library-split' },
                    // Left Column: Stats
                    React.createElement('div', { className: 'stats-column' },
                        React.createElement('h3', { className: 'retro-h3' }, "> CURRENT FORM"),
                        Object.entries(currentStats).filter(([stat]) => !['hp', 'mp'].includes(stat)).map(([stat, value]) =>
                            React.createElement('div', { key: stat, className: 'retro-stat-row' },
                                React.createElement('span', { className: 'stat-label' }, stat.toUpperCase()),
                                React.createElement('span', { className: 'dots' }, "...................."),
                                React.createElement('span', { className: 'stat-val' }, value)
                            )
                        )
                    ),

                    // Right Column: Action
                    React.createElement('div', { className: 'action-column' },
                        React.createElement('h3', { className: 'retro-h3' }, "> RITUAL OF REBIRTH"),
                        React.createElement('div', { className: 'cost-box' },
                            React.createElement('p', null, `COST: ${respecCost}g`),
                            React.createElement('p', null, `POINTS TO RETURN: ${allocatedPoints}`),
                            React.createElement('p', { className: 'highlight-text' }, `YOUR GOLD: ${state.player.gold}g`)
                        ),

                        React.createElement('button', {
                            className: 'retro-action-btn primary full-width',
                            onClick: handleRespec,
                            disabled: state.player.gold < respecCost
                        }, `[ PERFORM RITUAL (-${respecCost}g) ]`)
                    )
                )
            ),

            React.createElement('style', null, `
                .retro-modal-box {
                    background: #000;
                    border: 2px solid var(--primary);
                    padding: 20px;
                    width: 800px;
                    max-width: 95vw;
                    display: flex; flex-direction: column;
                    color: var(--primary);
                    font-family: monospace;
                    box-shadow: 0 0 0 1000px rgba(0,0,0,0.8);
                }
                .retro-modal-header {
                    display: flex; justify-content: space-between; align-items: center;
                    border-bottom: 2px solid var(--border); padding-bottom: 15px; margin-bottom: 20px;
                }
                .retro-h2 { margin: 0; color: var(--primary); }
                .retro-close-btn { background: transparent; border: none; color: var(--danger); font-family: monospace; cursor: pointer; }
                
                .retro-content-area { display: flex; flex-direction: column; gap: 20px; }
                
                .retro-status-box { border: 1px dashed var(--accent); padding: 15px; }
                .retro-text { color: #ccc; margin-bottom: 10px; }
                .warning-text { color: var(--danger); font-weight: bold; }

                .library-split { display: flex; gap: 30px; flex-wrap: wrap; }
                .stats-column, .action-column { flex: 1; min-width: 300px; }
                
                .retro-h3 { color: var(--accent); border-bottom: 1px solid #333; margin-bottom: 15px; }
                
                .retro-stat-row { display: flex; justify-content: space-between; margin-bottom: 8px; font-family: monospace; }
                .stat-label { color: var(--primary); }
                .dots { color: #444; overflow: hidden; white-space: nowrap; margin: 0 10px; }
                .stat-val { color: #fff; font-weight: bold; }

                .cost-box { margin-bottom: 20px; border: 1px solid #333; padding: 15px; background: rgba(255,255,255,0.05); }
                .highlight-text { color: #fdb931; margin-top: 10px; font-weight: bold; }

                .retro-action-btn.full-width { width: 100%; padding: 20px; font-size: 1.1rem; font-family: monospace; cursor: pointer; border: none; font-weight: bold; }
                .retro-action-btn.primary { background: var(--danger); color: black; } /* Red for dangerous action */
                .retro-action-btn.primary:hover:not(:disabled) { background: #ff4444; color: white; }
                .retro-action-btn:disabled { background: #333; color: #555; cursor: not-allowed; }
            `)
        )
    );
};

export default AncientLibrary;
