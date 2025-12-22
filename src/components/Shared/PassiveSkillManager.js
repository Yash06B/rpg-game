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
        React.createElement('div', { className: 'retro-modal-box' },
            React.createElement('div', { className: 'retro-modal-header' },
                React.createElement('h2', { className: 'retro-h2' }, "> PASSIVE AUGMENTATIONS"),
                React.createElement('button', { className: 'retro-close-btn', onClick: onClose }, "[ X ] CLOSE")
            ),

            React.createElement('div', { className: 'retro-content-area' },
                React.createElement('div', { className: 'retro-status-box' },
                    React.createElement('p', { className: 'retro-text' }, `> ACTIVE SLOTS DEPLOYED: ${passiveSkills.length}/4`),
                    React.createElement('p', { className: 'retro-text small' }, "> PASSIVE MODULES ARE ALWAYS ACTIVE ONCE EQUIPPED.")
                ),

                React.createElement('div', { className: 'retro-list-container' },
                    availablePassives.length === 0
                        ? React.createElement('p', { className: 'retro-text' }, "> NO PASSIVE AUGMENTATIONS ACQUIRED.")
                        : availablePassives.map((ps, idx) => {
                            const skillData = SKILLS[ps.id];
                            const isEquipped = passiveSkills.includes(ps.id);

                            return React.createElement('div', {
                                key: ps.id,
                                className: `retro-list-item ${isEquipped ? 'equipped' : ''} clickable`,
                                onClick: () => handleTogglePassive(ps.id)
                            },
                                React.createElement('div', { className: 'item-details' },
                                    React.createElement('div', { className: 'skill-header-line' },
                                        React.createElement('span', { className: 'skill-name' },
                                            `> ${skillData.name.toUpperCase()}`
                                        ),
                                        isEquipped && React.createElement('span', { className: 'skill-meta' }, "[ ACTIVE ]")
                                    ),
                                    React.createElement('p', { className: 'skill-desc' }, skillData.description),
                                    React.createElement('span', { className: 'skill-meta' }, `EFFECT: ${skillData.effect || 'STAT BOOST'}`)
                                ),
                                React.createElement('button', {
                                    className: `retro-action-btn small ${isEquipped ? 'highlight' : ''}`
                                }, isEquipped ? "[ EQUIPPED ]" : "[ EQUIP ]")
                            )
                        })
                )
            ),

            React.createElement('style', null, `
                .retro-modal-box {
                    background: #000;
                    border: 2px solid var(--primary);
                    padding: 20px;
                    width: 700px;
                    max-width: 95vw;
                    max-height: 80vh;
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
                .retro-h2 { margin: 0; color: var(--accent); }
                .retro-close-btn { background: transparent; border: none; color: var(--danger); font-family: monospace; cursor: pointer; }
                .retro-close-btn:hover { background: var(--danger); color: black; }

                .retro-content-area { display: flex; flex-direction: column; gap: 20px; overflow-y: auto; padding-right: 10px; flex: 1; }
                .retro-status-box { text-align: center; border: 1px dashed #333; padding: 10px; }
                .retro-text { margin: 5px 0; color: #aaa; }
                .retro-text.small { font-size: 0.8rem; color: #666; font-style: italic; }

                .retro-list-container { display: flex; flex-direction: column; gap: 10px; }
                .retro-list-item { 
                    display: flex; justify-content: space-between; align-items: center; 
                    border: 1px solid #333; padding: 12px; cursor: pointer;
                }
                .retro-list-item:hover { border-color: #555; background: #111; }
                .retro-list-item.equipped { border-color: var(--accent); background: rgba(167, 139, 250, 0.1); }
                
                .item-details { flex: 1; margin-right: 15px; }
                .skill-header-line { display: flex; justify-content: space-between; margin-bottom: 5px; }
                .skill-name { font-weight: bold; color: var(--primary); }
                .retro-list-item.equipped .skill-name { color: var(--accent); }
                .skill-desc { font-size: 0.9rem; color: #aaa; margin: 0 0 5px 0; }
                .skill-meta { font-size: 0.8rem; color: #666; font-weight: bold; }
                .retro-list-item.equipped .skill-meta { color: var(--accent); }

                .retro-action-btn.small { 
                    padding: 5px 10px; border: 1px solid #444; background: transparent; 
                    color: #888; cursor: pointer; font-family: monospace; min-width: 80px;
                }
                .retro-action-btn.small:hover { border-color: var(--primary); color: var(--primary); }
                .retro-action-btn.small.highlight { border-color: var(--accent); background: var(--accent); color: black; }
            `)
        )
    );
};

export default PassiveSkillManager;
