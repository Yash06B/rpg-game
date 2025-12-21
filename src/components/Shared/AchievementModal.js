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
        React.createElement('div', { className: 'modal-content achievement-modal' },
            React.createElement('div', { className: 'modal-header' },
                React.createElement('h2', null, "🏆 Achievements"),
                React.createElement('button', { className: 'close-btn', onClick: onClose }, "×")
            ),

            React.createElement('div', { className: 'progress-bar-container' },
                React.createElement('div', { className: 'progress-text' },
                    `Progress: ${unlockedCount} / ${totalAchievements} (${progressPercent}%)`
                ),
                React.createElement('div', { className: 'progress-track' },
                    React.createElement('div', {
                        className: 'progress-fill',
                        style: { width: `${progressPercent}%` }
                    })
                )
            ),

            React.createElement('div', { className: 'achievements-list' },
                Object.values(ACHIEVEMENTS).map(achievement => {
                    const isUnlocked = unlockedIds.includes(achievement.id);
                    return React.createElement('div', {
                        key: achievement.id,
                        className: `achievement-card ${isUnlocked ? 'unlocked' : 'locked'}`
                    },
                        React.createElement('div', { className: 'achievement-icon' },
                            isUnlocked ? achievement.icon : "🔒"
                        ),
                        React.createElement('div', { className: 'achievement-info' },
                            React.createElement('h4', null, achievement.title),
                            React.createElement('p', null, achievement.description)
                        ),
                        isUnlocked && React.createElement('div', { className: 'check-mark' }, "✓")
                    );
                })
            ),

            React.createElement('style', null, `
                .achievement-modal { width: 600px; max-height: 80vh; display: flex; flex-direction: column; background: #1a1a2e; color: #fff; border: 2px solid #ffd700; }
                .modal-header { display: flex; justify-content: space-between; align-items: center; padding-bottom: 15px; border-bottom: 1px solid #444; margin-bottom: 15px; }
                .close-btn { background: none; border: none; color: #fff; font-size: 2rem; cursor: pointer; }
                
                .progress-bar-container { margin-bottom: 20px; text-align: center; }
                .progress-text { margin-bottom: 5px; font-weight: bold; color: #ffd700; }
                .progress-track { background: #333; height: 10px; border-radius: 5px; overflow: hidden; }
                .progress-fill { background: linear-gradient(90deg, #ffd700, #ffaa00); height: 100%; transition: width 0.5s; }

                .ach-list {
                    flex: 1;
                    overflow-y: auto;
                    padding: 10px;
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                    padding-bottom: 30px;
                }
                
                .achievement-card { 
                    display: flex; align-items: center; gap: 15px; padding: 15px; 
                    background: #232342; margin-bottom: 10px; border-radius: 8px; border: 1px solid #333;
                    transition: all 0.2s;
                }
                .achievement-card.unlocked { border-color: #ffd700; background: linear-gradient(90deg, #2a2a50, #232342); }
                .achievement-card.locked { opacity: 0.6; grayscale: 1; }
                
                .achievement-icon { font-size: 2rem; width: 50px; text-align: center; }
                .achievement-info h4 { margin: 0 0 5px 0; color: #e0e0e0; }
                .achievement-card.unlocked .achievement-info h4 { color: #ffd700; }
                .achievement-info p { margin: 0; font-size: 0.9rem; color: #aaa; }
                
                .check-mark { color: #ffd700; font-weight: bold; font-size: 1.5rem; margin-left: auto; }
            `)
        )
    );
};

export default AchievementModal;
