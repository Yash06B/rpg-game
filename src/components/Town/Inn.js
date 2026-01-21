import React, { useState } from 'react';
import { useGame } from '../../context/GameContext.js';

const Inn = ({ onClose }) => {
    const { state, dispatch, ACTIONS } = useGame();
    const COST = 10;
    const [message, setMessage] = useState(null);
    const [chatHistory, setChatHistory] = useState([
        { sender: 'AI', text: "The tavern is dim, lit only by the neon glow of the synthesisers. Old Greg looks up from his datapad." },
        { sender: 'Greg', text: "Welcome to my place. It's safe here. The Baileys is... simulated, but the relief is real." }
    ]);

    const addMessage = (sender, text) => {
        setChatHistory(prev => [...prev, { sender, text }]);
        // Keep only last 4 messages to prevent overflow in fixed height
        if (chatHistory.length > 4) setChatHistory(prev => prev.slice(1));
    };

    const handleRest = () => {
        if (state.player.gold < COST) {
            addMessage('System', "ERROR: Insufficient Credits.");
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

        addMessage('System', "Restorative sequence initiated... Vital signs normalizing.");
        setTimeout(() => addMessage('Greg', "Feel better? The shoe never lies."), 1000);
    };

    const handleChat = (topic) => {
        if (topic === 'love') addMessage('Greg', "Love? It's a complex algorithm. Could you learn to love... me?");
        if (topic === 'watercolors') addMessage('Greg', "I call this one 'Baileys Up Close'. It's a bit bigger than the last one.");
    };

    return React.createElement('div', { className: 'modal-overlay fade-in' },
        React.createElement('div', { className: 'modern-modal-box' },
            // Modern Header
            React.createElement('div', { className: 'modern-header' },
                React.createElement('div', { className: 'header-title' },
                    React.createElement('span', { className: 'status-dot' }),
                    React.createElement('h2', null, "Old Greg's Tavern")
                ),
                React.createElement('button', { className: 'modern-close-btn', onClick: onClose }, "✕")
            ),

            // Content Area - Split View
            React.createElement('div', { className: 'modern-body' },

                // Left: Chat Log
                React.createElement('div', { className: 'chat-log' },
                    chatHistory.map((msg, i) =>
                        React.createElement('div', { key: i, className: `chat-entry ${msg.sender === 'System' ? 'system' : ''}` },
                            React.createElement('span', { className: 'sender-name' }, msg.sender),
                            React.createElement('p', { className: 'message-text' }, msg.text)
                        )
                    )
                ),

                // Right: Status & Actions
                React.createElement('div', { className: 'controls-panel' },
                    React.createElement('div', { className: 'status-card' },
                        React.createElement('h3', null, "PLAYER STATUS"),
                        React.createElement('div', { className: 'stat-row' },
                            React.createElement('span', null, "HP"),
                            React.createElement('div', { className: 'bar-bg' },
                                React.createElement('div', { className: 'bar-fill hp', style: { width: `${(state.player.stats.hp / state.player.stats.maxHp) * 100}%` } })
                            )
                        ),
                        React.createElement('div', { className: 'stat-row' },
                            React.createElement('span', null, "MP"),
                            React.createElement('div', { className: 'bar-bg' },
                                React.createElement('div', { className: 'bar-fill mp', style: { width: `${(state.player.stats.mp / state.player.stats.maxMp) * 100}%` } })
                            )
                        ),
                        React.createElement('div', { className: 'gold-display' },
                            React.createElement('span', null, "CREDITS"),
                            React.createElement('span', { className: 'gold-val' }, `${state.player.gold}`)
                        )
                    ),

                    React.createElement('div', { className: 'action-buttons' },
                        React.createElement('button', { className: 'modern-btn primary', onClick: handleRest },
                            React.createElement('span', null, "REST (10c)"),
                            React.createElement('span', { className: 'btn-sub' }, "Full Recover")
                        ),
                        React.createElement('button', { className: 'modern-btn secondary', onClick: () => handleChat('love') }, "ASK ABOUT LOVE"),
                        React.createElement('button', { className: 'modern-btn secondary', onClick: () => handleChat('watercolors') }, "VIEW ART")
                    )
                )
            ),

            React.createElement('style', null, `
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');

                .modern-modal-box {
                    background: #050505;
                    border: 1px solid #333;
                    border-radius: 12px;
                    width: 800px;
                    max-width: 95vw;
                    height: 500px;
                    display: flex; flex-direction: column;
                    box-shadow: 0 0 30px rgba(139, 92, 246, 0.15); /* Soft Violet Glow */
                    font-family: 'Inter', sans-serif;
                    overflow: hidden;
                }

                .modern-header {
                    display: flex; justify-content: space-between; align-items: center;
                    padding: 15px 25px;
                    border-bottom: 1px solid #222;
                    background: #0a0a0a;
                }
                .header-title { display: flex; align-items: center; gap: 10px; }
                .status-dot { width: 8px; height: 8px; background: #10b981; border-radius: 50%; box-shadow: 0 0 8px #10b981; }
                .modern-header h2 { margin: 0; font-size: 1.1rem; color: #fff; font-weight: 600; letter-spacing: 0.5px; }
                .modern-close-btn { background: none; border: none; color: #666; font-size: 1.2rem; cursor: pointer; transition: color 0.2s; }
                .modern-close-btn:hover { color: #fff; }

                .modern-body { display: flex; flex: 1; }
                
                /* Chat Log */
                .chat-log { flex: 2; padding: 25px; display: flex; flex-direction: column; gap: 20px; border-right: 1px solid #222; overflow-y: auto; }
                .chat-entry { display: flex; flex-direction: column; gap: 4px; animation: fadeIn 0.3s ease; }
                .sender-name { font-size: 0.75rem; font-weight: 700; color: #8b5cf6; text-transform: uppercase; letter-spacing: 1px; }
                .message-text { margin: 0; color: #e5e7eb; font-size: 0.95rem; line-height: 1.5; }
                .chat-entry.system .sender-name { color: #ef4444; }
                .chat-entry.system .message-text { color: #fca5a5; font-family: monospace; }

                /* Controls */
                .controls-panel { flex: 1.2; padding: 25px; display: flex; flex-direction: column; gap: 25px; background: #080808; }
                
                .status-card { background: #111; padding: 15px; border-radius: 8px; border: 1px solid #222; }
                .status-card h3 { color: #6b7280; font-size: 0.7rem; margin: 0 0 15px 0; letter-spacing: 1px; }
                
                .stat-row { display: flex; align-items: center; gap: 10px; margin-bottom: 10px; }
                .stat-row span { color: #fff; font-size: 0.8rem; width: 25px; font-weight: bold; }
                .bar-bg { flex: 1; height: 6px; background: #222; border-radius: 3px; overflow: hidden; }
                .bar-fill { height: 100%; border-radius: 3px; }
                .bar-fill.hp { background: #ef4444; box-shadow: 0 0 10px rgba(239, 68, 68, 0.4); }
                .bar-fill.mp { background: #3b82f6; box-shadow: 0 0 10px rgba(59, 130, 246, 0.4); }

                .gold-display { display: flex; justify-content: space-between; margin-top: 15px; padding-top: 10px; border-top: 1px solid #222; }
                .gold-display span { color: #9ca3af; font-size: 0.8rem; }
                .gold-display .gold-val { color: #fbbf24; font-weight: bold; font-family: monospace; font-size: 0.9rem; }

                .action-buttons { display: flex; flex-direction: column; gap: 10px; }
                .modern-btn {
                    padding: 12px; border: none; border-radius: 6px; cursor: pointer;
                    display: flex; flex-direction: column; align-items: center; justify-content: center;
                    transition: all 0.2s; font-family: 'Inter', sans-serif;
                }
                .modern-btn.primary {
                    background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);
                    color: white; font-weight: 600;
                    box-shadow: 0 4px 15px rgba(139, 92, 246, 0.3);
                }
                .modern-btn.primary:hover { transform: translateY(-1px); box-shadow: 0 6px 20px rgba(139, 92, 246, 0.4); }
                
                .modern-btn.secondary {
                    background: #1f2937; color: #d1d5db; font-size: 0.85rem; font-weight: 500;
                }
                .modern-btn.secondary:hover { background: #374151; color: #fff; }

                .btn-sub { font-size: 0.7rem; font-weight: 400; opacity: 0.8; margin-top: 2px; }

                @keyframes fadeIn { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: translateY(0); } }
            `)
        )
    );
};

export default Inn;
