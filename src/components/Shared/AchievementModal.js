import React, { useEffect } from 'react';
import { useGame } from '../../context/GameContext.js';
import { ACHIEVEMENTS } from '../../data/achievements.js';

const AchievementModal = ({ onClose }) => {
    const { state } = useGame();
    const unlockedIds = state.player.achievements || [];

    const totalAchievements = Object.keys(ACHIEVEMENTS).length;
    const unlockedCount = unlockedIds.length;
    const progressPercent = Math.floor((unlockedCount / totalAchievements) * 100);

    return React.createElement('div', { className: 'modal-overlay fade-in' },
        React.createElement('div', { className: 'retro-modal-box' },
            React.createElement('div', { className: 'retro-modal-header' },
                React.createElement('h2', { className: 'retro-h2' }, "> ACHIEVEMENT LOG"),
                React.createElement('button', { className: 'retro-close-btn', onClick: onClose }, "[ X ] CLOSE")
            ),

            React.createElement('div', { className: 'retro-progress-section' },
                React.createElement('p', { className: 'retro-text' }, `> SYSTEM COMPLETION: ${unlockedCount}/${totalAchievements} [${progressPercent}%]`),
                React.createElement('div', { className: 'retro-progress-bar' },
                    React.createElement('div', {
                        className: 'retro-progress-fill',
                        style: { width: `${progressPercent}%` }
                    })
                )
            ),

            React.createElement('div', { className: 'retro-list-container' },
                Object.values(ACHIEVEMENTS).map((achievement, idx) => {
                    const isUnlocked = unlockedIds.includes(achievement.id);
                    return React.createElement('div', {
                        key: achievement.id,
                        className: `retro-list-item ${isUnlocked ? 'unlocked' : 'locked'}`
                    },
                        React.createElement('div', { className: 'ach-header' },
                            React.createElement('span', { className: 'ach-title' },
                                isUnlocked ? `[ ${achievement.icon} ] ${achievement.title.toUpperCase()}` : `[ ${idx + 1} ] ???`
                            ),
                            isUnlocked && React.createElement('span', { className: 'check' }, "[ UNLOCKED ]")
                        ),
                        React.createElement('p', { className: 'ach-desc' },
                            isUnlocked ? achievement.description : "Decrypting data..."
                        )
                    );
                })
            ),

            React.createElement('style', null, `
                .modal-overlay {
                    position: fixed; top: 0; left: 0; width: 100%; height: 100%;
                    background: rgba(0, 0, 0, 0.9);
                    display: flex; justify-content: center; align-items: center;
                    z-index: 2000;
                }
                .retro-modal-box {
                    background: #000;
                    width: 600px; max-width: 95vw;
                    max-height: 80vh;
                    border: 2px solid var(--primary);
                    padding: 20px;
                    display: flex; flex-direction: column;
                    color: var(--primary);
                    font-family: monospace;
                    box-shadow: 0 0 0 1000px rgba(0,0,0,0.8);
                }
                .retro-modal-header {
                    display: flex; justify-content: space-between; align-items: center;
                    border-bottom: 2px solid var(--border);
                    padding-bottom: 15px;
                    margin-bottom: 20px;
                }
                .retro-h2 { margin: 0; color: var(--accent); }
                .retro-close-btn {
                    background: transparent; border: none; color: var(--danger);
                    font-family: monospace; font-size: 1.1rem; cursor: pointer;
                }
                .retro-close-btn:hover { background: var(--danger); color: black; }

                .retro-progress-section { margin-bottom: 20px; text-align: center; }
                .retro-progress-bar { background: #222; height: 15px; border: 1px solid #444; margin-top: 5px; }
                .retro-progress-fill { background: var(--accent); height: 100%; }

                .retro-list-container {
                    padding-right: 10px;
                    overflow-y: auto;
                    flex: 1;
                    display: flex; flex-direction: column; gap: 10px;
                }
                
                .retro-list-item { 
                    border: 1px solid #333; padding: 10px; 
                }
                .retro-list-item.locked { color: #555; border-style: dashed; }
                .retro-list-item.unlocked { border-color: var(--accent); background: rgba(255, 176, 0, 0.05); }

                .ach-header { display: flex; justify-content: space-between; margin-bottom: 5px; font-weight: bold; }
                .ach-title { color: var(--primary); }
                .retro-list-item.unlocked .ach-title { color: var(--accent); }
                .ach-desc { font-size: 0.9rem; color: #aaa; margin: 0; }
                
                .check { color: var(--primary); }
            `)
        )
    );
};

export default AchievementModal;
