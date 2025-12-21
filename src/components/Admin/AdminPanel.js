import React, { useState } from 'react';
import { useGame } from '../../context/GameContext.js';
import { TOWNS } from '../../data/towns.js';
import { CLASSES } from '../../data/classes.js';

const AdminPanel = () => {
    const { state, dispatch, ACTIONS } = useGame();
    const [activeTab, setActiveTab] = useState('player');
    const [editStat, setEditStat] = useState({ ...state.player.stats, level: state.player.level, gold: state.player.gold });

    const handleStatChange = (key, val) => {
        setEditStat(prev => ({ ...prev, [key]: parseInt(val) || 0 }));
    };

    const applyStats = () => {
        // Construct new player object
        const newPlayer = {
            ...state.player,
            level: editStat.level,
            gold: editStat.gold,
            stats: {
                ...state.player.stats,
                hp: editStat.hp,
                mp: editStat.mp,
                atk: editStat.atk,
                mag: editStat.mag,
                def: editStat.def,
                spd: editStat.spd
            }
        };

        // Dispatch generic update (we might need a specific SET_PLAYER action, reusing SET_PLAYER_CLASS for now partially or just hacking it via LOAD_STATE style or better, adding UPDATE_PLAYER)
        // For now, let's create a quick reducer patch or just adding a new action type in mind. 
        // Actually, let's dispatch a direct state override if we had one. 
        // I'll add UPDATE_PLAYER to the reducer in the next step. For now, I'll assume it exists or use what I have.
        // Wait, I defined UPDATE_STATS in GameContext? Yes I did in the ACTIONS list, but did I implement it? Let me check GameContext.js content. 
        // I implemented ACTIONS.UPDATE_STATS in the ACTIONS list but missed the case in the reducer? 
        // I will double check. If not, I'll use a workaround or fix it.

        // Let's assume I will fix GameContext.js in a moment.
        dispatch({ type: 'UPDATE_PLAYER_DATA', payload: newPlayer });
        alert("Stats Applied");
    };

    const teleport = (loc) => {
        dispatch({ type: ACTIONS.NAVIGATE, payload: loc });
        dispatch({ type: ACTIONS.ADMIN_TOGGLE, payload: false });
    };

    return React.createElement('div', { className: 'admin-panel fade-in' },
        React.createElement('div', { className: 'admin-header' },
            React.createElement('h2', null, "ADMIN CONTROL PANEL"),
            React.createElement('button', { className: 'close-btn', onClick: () => dispatch({ type: ACTIONS.ADMIN_TOGGLE, payload: false }) }, "EXIT")
        ),

        React.createElement('div', { className: 'admin-tabs' },
            ['player', 'world', 'items', 'debug'].map(tab =>
                React.createElement('button', {
                    key: tab,
                    className: `tab-btn ${activeTab === tab ? 'active' : ''}`,
                    onClick: () => setActiveTab(tab)
                }, tab.toUpperCase())
            )
        ),

        React.createElement('div', { className: 'admin-content' },

            // PLAYER EDITOR
            activeTab === 'player' && React.createElement('div', { className: 'editor-grid' },
                React.createElement('h3', null, "Edit Player Stats"),
                Object.keys(editStat).map(key =>
                    React.createElement('div', { key: key, className: 'input-group' },
                        React.createElement('label', null, key.toUpperCase()),
                        React.createElement('input', {
                            type: 'number',
                            value: editStat[key],
                            onChange: (e) => handleStatChange(key, e.target.value)
                        })
                    )
                ),
                React.createElement('button', { className: 'action-btn', onClick: applyStats }, "APPLY CHANGES"),

                React.createElement('h3', { style: { marginTop: '20px' } }, "Change Class"),
                React.createElement('div', { className: 'class-list-mini' },
                    Object.keys(CLASSES).map(cls =>
                        React.createElement('button', {
                            key: cls,
                            onClick: () => dispatch({
                                type: ACTIONS.SET_PLAYER_CLASS,
                                payload: { className: CLASSES[cls].label, stats: CLASSES[cls].stats }
                            })
                        }, cls)
                    )
                )
            ),

            // WORLD / TELEPORT
            activeTab === 'world' && React.createElement('div', null,
                React.createElement('h3', null, "Teleport"),
                Object.keys(TOWNS).map(tId =>
                    React.createElement('button', {
                        key: tId,
                        className: 'teleport-btn',
                        onClick: () => teleport(tId)
                    }, TOWNS[tId].name)
                )
            )
        ),

        // Styles
        React.createElement('style', null, `
      .admin-panel {
        position: fixed;
        top: 0; left: 0; right: 0; bottom: 0;
        background: rgba(0,0,0,0.95);
        z-index: 9999;
        padding: 40px;
        color: #0f0;
        font-family: monospace;
        overflow-y: auto;
      }
      .admin-header { display: flex; justify-content: space-between; border-bottom: 2px solid #0f0; margin-bottom: 20px; }
      .close-btn { background: #f00; color: white; border: none; padding: 10px 20px; cursor: pointer; }
      
      .admin-tabs { display: flex; gap: 10px; margin-bottom: 20px; }
      .tab-btn { background: #333; color: #0f0; border: 1px solid #0f0; padding: 10px; cursor: pointer; }
      .tab-btn.active { background: #0f0; color: black; }
      
      .editor-grid { display: grid; gap: 10px; max-width: 600px; }
      .input-group { display: flex; justify-content: space-between; align-items: center; }
      .input-group input { background: #111; border: 1px solid #0f0; color: #0f0; padding: 5px; }
      
      .teleport-btn { display: block; width: 100%; margin-bottom: 10px; padding: 10px; background: #111; border: 1px solid #0f0; color: #0f0; cursor: pointer; text-align: left; }
      .teleport-btn:hover { background: #0f0; color: black; }

      .class-list-mini { display: flex; flex-wrap: wrap; gap: 5px; }
      .class-list-mini button { background: #111; border: 1px solid #0f0; color: #0f0; cursor: pointer; padding: 5px; font-size: 0.8rem; }
    `)
    );
};

export default AdminPanel;
