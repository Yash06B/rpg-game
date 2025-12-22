import React, { useState } from 'react';
import { useGame } from '../../context/GameContext.js';

const Inn = ({ onClose }) => {
    const { state, dispatch, ACTIONS } = useGame();
    const COST = 10;

    const handleRest = () => {
        if (state.player.gold < COST) {
            alert("NOT ENOUGH GOLD.");
            return;
        }

        dispatch({
            type: ACTIONS.UPDATE_PLAYER_DATA,
            payload: {
                ...state.player,
                gold: state.player.gold - COST,
                stats: {
                    ...state.player.stats,
                    hp: state.player.stats.maxHp,
                    mp: state.player.stats.maxMp
                }
            }
        });

        alert("YOU RESTED AND RECOVERED FULL HEALTH AND MANA.");
    };

    return React.createElement('div', { className: 'modal-overlay fade-in' },
        React.createElement('div', { className: 'retro-modal-box' },
            React.createElement('div', { className: 'retro-modal-header' },
                React.createElement('h2', { className: 'retro-h2' }, "> THE TRAVELER'S INN"),
                React.createElement('button', { className: 'retro-close-btn', onClick: onClose }, "[ X ] LEAVE")
            ),

            React.createElement('div', { className: 'retro-content-area' },
                React.createElement('p', { className: 'retro-text' },
                    "The air is warm and smells of roasted meat. The innkeeper nods at you."
                ),
                React.createElement('p', { className: 'retro-text' },
                    "\"Weary traveler, a bed costs 10 Gold. You'll wake up good as new.\""
                ),

                React.createElement('div', { className: 'retro-divider' }),

                React.createElement('div', { className: 'retro-status-box' },
                    React.createElement('h3', { className: 'retro-h3' }, "YOUR STATUS"),
                    React.createElement('p', null, `HP: ${state.player.stats.hp}/${state.player.stats.maxHp}`),
                    React.createElement('p', null, `MP: ${state.player.stats.mp}/${state.player.stats.maxMp}`),
                    React.createElement('p', { className: 'highlight-text' }, `GOLD: ${state.player.gold}g`)
                ),

                React.createElement('button', {
                    className: 'retro-action-btn primary full-width',
                    onClick: handleRest
                }, `[ REST FOR THE NIGHT (-${COST}g) ]`)
            ),

            React.createElement('style', null, `
                .retro-modal-box {
                    background: #000;
                    border: 2px solid var(--primary);
                    padding: 20px;
                    width: 500px;
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
                
                .retro-content-area { display: flex; flex-direction: column; gap: 15px; }
                .retro-text { color: #ccc; line-height: 1.4; }
                .retro-divider { height: 1px; background: #333; margin: 10px 0; }
                
                .retro-status-box { border: 1px dashed #444; padding: 15px; margin-bottom: 10px; }
                .retro-h3 { margin-top: 0; color: var(--accent); border-bottom: none; }
                .highlight-text { color: #fdb931; }

                .retro-action-btn.full-width { width: 100%; padding: 15px; font-size: 1.1rem; font-family: monospace; cursor: pointer; border: none; font-weight: bold; }
                .retro-action-btn.primary { background: var(--primary); color: black; }
                .retro-action-btn.primary:hover { background: var(--accent); }
            `)
        )
    );
};

export default Inn;
