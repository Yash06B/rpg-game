import React, { useState } from 'react';
import { useGame } from '../../context/GameContext.js';

const Inn = ({ onClose }) => {
    const { state, dispatch, ACTIONS } = useGame();
    const COST = 10;
    const [message, setMessage] = useState(null);

    const handleRest = () => {
        if (state.player.gold < COST) {
            alert("NOT ENOUGH GOLD. OLD GREG NEEDS HIS BAILEYS MONEY.");
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

        setMessage("Mmm... creamy. Soft. Beige. You feel restored.");
        setTimeout(() => setMessage(null), 3000);
    };

    const handleLove = () => {
        setMessage("COULD YOU LEARN TO LOVE ME?");
        setTimeout(() => setMessage(null), 3000);
    }

    const handleWatercolors = () => {
        setMessage("It's Baileys... a bit bigger. And that one's as close as you can get to Baileys without your eyes gettin' wet.");
        setTimeout(() => setMessage(null), 4000);
    }

    return React.createElement('div', { className: 'modal-overlay fade-in' },
        React.createElement('div', { className: 'retro-modal-box' },
            React.createElement('div', { className: 'retro-modal-header' },
                React.createElement('h2', { className: 'retro-h2' }, "> OLD GREG'S PLACE"),
                React.createElement('button', { className: 'retro-close-btn', onClick: onClose }, "[ X ] LEAVE")
            ),

            React.createElement('div', { className: 'retro-content-area' },
                React.createElement('p', { className: 'retro-text' },
                    "You're in a cave. It's dark. A scaly man-fish offers you a shoe filled with beige liquid."
                ),
                React.createElement('p', { className: 'retro-text' },
                    "\"Easy now, fuzzy little man-peach. You ever drunk Baileys from a shoe?\""
                ),

                React.createElement('div', { className: 'retro-divider' }),

                message && React.createElement('div', { className: 'retro-status-box message-box' },
                    React.createElement('p', { className: 'highlight-text' }, `> ${message}`)
                ),

                !message && React.createElement('div', { className: 'retro-status-box' },
                    React.createElement('h3', { className: 'retro-h3' }, "YOUR STATUS"),
                    React.createElement('p', null, `HP: ${state.player.stats.hp}/${state.player.stats.maxHp}`),
                    React.createElement('p', null, `MP: ${state.player.stats.mp}/${state.player.stats.maxMp}`),
                    React.createElement('p', { className: 'highlight-text' }, `GOLD: ${state.player.gold}g`)
                ),

                React.createElement('div', { className: 'actions-grid' },
                    React.createElement('button', {
                        className: 'retro-action-btn primary full-width',
                        onClick: handleRest
                    }, `[ DRINK BAILEYS (${COST}g) ]`),

                    React.createElement('button', {
                        className: 'retro-action-btn',
                        onClick: handleLove
                    }, `[ DO YOU LOVE ME? ]`),

                    React.createElement('button', {
                        className: 'retro-action-btn',
                        onClick: handleWatercolors
                    }, `[ SEE WATERCOLORS ]`)
                )
            ),

            React.createElement('style', null, `
                .retro-modal-box {
                    background: #000;
                    border: 2px solid #33ff00;
                    padding: 20px;
                    width: 600px;
                    max-width: 95vw;
                    display: flex; flex-direction: column;
                    color: #33ff00;
                    font-family: monospace;
                    box-shadow: 0 0 20px rgba(51, 255, 0, 0.2);
                }
                .retro-modal-header {
                    display: flex; justify-content: space-between; align-items: center;
                    border-bottom: 2px solid #33ff00; padding-bottom: 15px; margin-bottom: 20px;
                }
                .retro-h2 { margin: 0; color: #33ff00; text-shadow: 0 0 5px #33ff00; }
                .retro-close-btn { background: transparent; border: none; color: #ff0000; font-family: monospace; cursor: pointer; }
                
                .retro-content-area { display: flex; flex-direction: column; gap: 15px; }
                .retro-text { color: #ccffcc; line-height: 1.4; }
                .retro-divider { height: 1px; background: #004400; margin: 10px 0; }
                
                .retro-status-box { border: 1px dashed #008800; padding: 15px; margin-bottom: 10px; }
                .message-box { border: 1px solid #33ff00; background: #001100; }
                .retro-h3 { margin-top: 0; color: #33ff00; border-bottom: none; }
                .highlight-text { color: #ffff00; font-weight: bold; }

                .actions-grid { display: flex; flex-direction: column; gap: 10px; }

                .retro-action-btn { 
                    padding: 15px; font-size: 1.1rem; font-family: monospace; 
                    cursor: pointer; border: 1px solid #33ff00; background: #000; color: #33ff00;
                    transition: all 0.2s;
                }
                .retro-action-btn:hover { background: #33ff00; color: #000; }
                .retro-action-btn.primary { font-weight: bold; border: 2px solid #33ff00; }
            `)
        )
    );
};

export default Inn;
