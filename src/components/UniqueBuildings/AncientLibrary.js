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
        React.createElement('div', { className: 'modal-content library-modal' },
            React.createElement('div', { className: 'modal-header' },
                React.createElement('h2', null, "📚 Ancient Library"),
                React.createElement('button', { className: 'close-btn', onClick: onClose }, "CLOSE")
            ),

            React.createElement('div', { className: 'library-content' },
                React.createElement('div', { className: 'library-intro' },
                    React.createElement('p', { className: 'intro-text' },
                        "The Ancient Library holds knowledge of rebirth. Here, you may reset your character's stat allocations and start anew."
                    ),
                    React.createElement('p', { className: 'warning' },
                        "⚠️ This will reset all stat bonuses to base values. Equipment bonuses remain."
                    )
                ),

                React.createElement('div', { className: 'current-stats' },
                    React.createElement('h3', null, "Current Stats"),
                    React.createElement('div', { className: 'stat-grid' },
                        Object.entries(currentStats).filter(([stat]) => !['hp', 'mp'].includes(stat)).map(([stat, value]) =>
                            React.createElement('div', { key: stat, className: 'stat-row' },
                                React.createElement('span', { className: 'stat-name' }, stat.toUpperCase()),
                                React.createElement('span', { className: 'stat-value' }, value),
                                React.createElement('span', { className: 'stat-base' },
                                    `(Base: ${baseStats[stat] || 0})`
                                )
                            )
                        )
                    )
                ),

                React.createElement('div', { className: 'respec-info' },
                    React.createElement('h3', null, "Respec Information"),
                    React.createElement('p', null, `Cost: ${respecCost} Gold`),
                    React.createElement('p', null, `Total Allocated Points: ${allocatedPoints}`),
                    React.createElement('p', null, `Your Gold: ${state.player.gold}g`)
                ),

                React.createElement('button', {
                    className: 'respec-btn',
                    onClick: handleRespec,
                    disabled: state.player.gold < respecCost
                }, `Reset Stats (${respecCost}g)`)
            )
        ),

        React.createElement('style', null, `
      .library-modal { width: 700px; max-height: 85vh; }
      .library-content { padding: 25px; }
      .library-intro { background: var(--bg-dark); padding: 20px; border-radius: var(--radius-md); margin-bottom: 20px; border-left: 4px solid var(--primary); }
      .intro-text { color: var(--text-main); line-height: 1.6; margin-bottom: 10px; }
      .warning { color: #f59e0b; font-weight: bold; margin: 0; }
      
      .current-stats { margin-bottom: 25px; }
      .current-stats h3 { color: var(--primary); margin-bottom: 15px; }
      .stat-grid { display: grid; gap: 10px; }
      .stat-row { display: flex; justify-content: space-between; align-items: center; background: var(--bg-dark); padding: 12px 15px; border-radius: var(--radius-md); }
      .stat-name { font-weight: bold; color: var(--accent); text-transform: uppercase; width: 100px; }
      .stat-value { font-size: 1.3rem; font-weight: bold; color: var(--text-main); width: 60px; text-align: center; }
      .stat-base { color: var(--text-muted); font-size: 0.85rem; }
      
      .respec-info { background: var(--bg-panel); padding: 20px; border-radius: var(--radius-md); margin-bottom: 20px; }
      .respec-info h3 { color: var(--primary); margin-bottom: 10px; }
      .respec-info p { margin: 8px 0; color: var(--text-main); }
      
      .respec-btn { width: 100%; padding: 18px; background: linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%); color: white; border: none; border-radius: var(--radius-md); font-size: 1.2rem; font-weight: bold; cursor: pointer; transition: all 0.2s; }
      .respec-btn:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 8px 20px rgba(139, 92, 246, 0.4); }
      .respec-btn:disabled { opacity: 0.5; cursor: not-allowed; background: var(--bg-dark); }
    `)
    );
};

export default AncientLibrary;
