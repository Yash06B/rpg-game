import React, { useState } from 'react';
import { useGame } from '../../context/GameContext.js';
import { SKILLS } from '../../data/skills.js';

const PassiveSkillManager = ({ onClose }) => {
    const { state, dispatch, ACTIONS } = useGame();
    const playerSkills = state.player.skills || [];
    const passiveSkills = state.player.passiveSkills || [];

    // Get only passive skills the player owns
    const availablePassives = playerSkills.filter(ps => {
        const skillData = SKILLS[ps.id];
        return skillData && skillData.type === 'passive';
    });

    const handleTogglePassive = (skillId) => {
        const isEquipped = passiveSkills.includes(skillId);

        if (isEquipped) {
            // Unequip
            const newPassives = passiveSkills.filter(id => id !== skillId);
            dispatch({
                type: ACTIONS.UPDATE_PLAYER_DATA,
                payload: { ...state.player, passiveSkills: newPassives }
            });
        } else {
            // Equip (max 4 slots)
            if (passiveSkills.length >= 4) {
                alert("Maximum 4 passive skills equipped!");
                return;
            }
            const newPassives = [...passiveSkills, skillId];
            dispatch({
                type: ACTIONS.UPDATE_PLAYER_DATA,
                payload: { ...state.player, passiveSkills: newPassives }
            });
        }
    };

    return React.createElement('div', { className: 'modal-overlay fade-in' },
        React.createElement('div', { className: 'modal-content passive-modal' },
            React.createElement('div', { className: 'modal-header' },
                React.createElement('h2', null, "⭐ Passive Skills"),
                React.createElement('button', { className: 'close-btn', onClick: onClose }, "CLOSE")
            ),

            React.createElement('div', { className: 'passive-content' },
                React.createElement('p', { className: 'info' },
                    `Equip up to 4 passive skills. They are always active. (${passiveSkills.length}/4 equipped)`
                ),

                availablePassives.length === 0
                    ? React.createElement('p', { className: 'no-passives' },
                        "No passive skills learned yet. Level up to unlock more!"
                    )
                    : React.createElement('div', { className: 'passive-grid' },
                        availablePassives.map(ps => {
                            const skillData = SKILLS[ps.id];
                            const isEquipped = passiveSkills.includes(ps.id);

                            return React.createElement('div', {
                                key: ps.id,
                                className: `passive-card ${isEquipped ? 'equipped' : ''}`,
                                onClick: () => handleTogglePassive(ps.id)
                            },
                                React.createElement('div', { className: 'passive-header' },
                                    React.createElement('h4', null, skillData.name),
                                    isEquipped && React.createElement('span', { className: 'equipped-badge' }, "✓")
                                ),
                                React.createElement('p', { className: 'passive-desc' }, skillData.description),
                                React.createElement('p', { className: 'passive-effect' },
                                    `Effect: ${skillData.effect || 'Stat boost'}`
                                ),
                                React.createElement('button', {
                                    className: `equip-btn ${isEquipped ? 'equipped' : ''}`
                                }, isEquipped ? "Equipped" : "Equip")
                            );
                        })
                    )
            )
        ),

        React.createElement('style', null, `
      .passive-modal { width: 700px; max-height: 80vh; }
      .passive-content { padding: 20px; }
      .info { color: var(--text-muted); font-size: 0.9rem; margin-bottom: 20px; text-align: center; }
            .skill-list {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
                gap: 15px;
                overflow-y: auto;
                flex: 1;
                padding: 5px;
                padding-bottom: 60px;
            }
      .passive-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 15px; }
      
      .passive-card {
        background: var(--bg-dark);
        border: 2px solid var(--border);
        border-radius: var(--radius-md);
        padding: 15px;
        cursor: pointer;
        transition: all 0.2s;
      }
      .passive-card:hover { border-color: var(--primary); transform: translateY(-2px); }
      .passive-card.equipped {
        border-color: #a78bfa;
        background: rgba(167, 139, 250, 0.1);
        box-shadow: 0 0 15px rgba(167, 139, 250, 0.3);
      }
      
      .passive-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10px;
      }
      .passive-header h4 { margin: 0; color: var(--text-main); }
      .equipped-badge {
        background: #a78bfa;
        color: white;
        padding: 3px 8px;
        border-radius: 10px;
        font-size: 0.75rem;
        font-weight: bold;
      }
      
      .passive-desc {
        font-size: 0.85rem;
        color: var(--text-muted);
        margin-bottom: 10px;
        line-height: 1.4;
      }
      
      .passive-effect {
        font-size: 0.8rem;
        color: #10b981;
        font-weight: bold;
        margin-bottom: 10px;
      }
      
      .equip-btn {
        width: 100%;
        padding: 8px;
        border: none;
        border-radius: var(--radius-md);
        background: var(--primary);
        color: white;
        font-weight: bold;
        cursor: pointer;
        transition: all 0.2s;
      }
      .equip-btn.equipped { background: #a78bfa; }
      
      .no-passives {
        text-align: center;
        color: var(--text-muted);
        padding: 40px;
        font-style: italic;
      }
    `)
    );
};

export default PassiveSkillManager;
