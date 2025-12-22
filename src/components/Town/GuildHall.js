import React, { useState, useEffect } from 'react';
import { useGame } from '../../context/GameContext.js';
import { SKILLS, CLASS_SKILLS, getSkillAtLevel } from '../../data/skills.js';

const GuildHall = ({ onClose }) => {
    const { state, dispatch, ACTIONS } = useGame();
    const [tab, setTab] = useState('learn');
    const playerClass = state.player.class || 'Mage';
    const playerLevel = state.player.level;
    const playerSkills = state.player.skills || [];
    const equippedSkills = state.player.equippedSkills || [];

    // Auto-unlock skills based on level
    useEffect(() => {
        let classSkillIds = CLASS_SKILLS[playerClass] || CLASS_SKILLS.Mage;

        // Holy Paladin learns ALL skills
        if (playerClass === 'Holy Paladin') {
            classSkillIds = Object.keys(SKILLS);
        }

        const newSkills = [];

        classSkillIds.forEach(skillId => {
            const skillData = SKILLS[skillId];
            if (!skillData) return;

            // Check if player meets unlock level and doesn't already have it
            if (playerLevel >= skillData.unlockLevel) {
                const hasSkill = playerSkills.find(s => s.id === skillId);
                if (!hasSkill) {
                    newSkills.push({
                        id: skillId,
                        level: 1,
                        exp: 0,
                        maxExp: 100
                    });
                }
            }
        });

        if (newSkills.length > 0) {
            const updatedSkills = [...playerSkills, ...newSkills];
            dispatch({
                type: ACTIONS.UPDATE_PLAYER_DATA,
                payload: { ...state.player, skills: updatedSkills }
            });
        }
    }, [playerLevel]);

    // Get purchasable skills (Universal skills)
    const purchasableSkills = Object.keys(SKILLS)
        .filter(id => SKILLS[id].class === 'Universal')
        .map(id => ({ ...SKILLS[id], owned: playerSkills.find(s => s.id === id) }));

    const handlePurchaseSkill = (skillId) => {
        const skill = SKILLS[skillId];
        if (!skill.purchaseCost) return;

        if (state.player.gold < skill.purchaseCost) {
            alert("Not enough gold!");
            return;
        }

        const newSkills = [...playerSkills, { id: skillId, level: 1, exp: 0, maxExp: 100 }];
        dispatch({
            type: ACTIONS.UPDATE_PLAYER_DATA,
            payload: {
                ...state.player,
                skills: newSkills,
                gold: state.player.gold - skill.purchaseCost
            }
        });
        alert(`Learned ${skill.name}!`);
    };

    const handleEquipSkill = (skillId) => {
        const skill = SKILLS[skillId];
        if (skill.type === 'passive') {
            alert("Use the Passive Skill menu to equip passive skills!");
            return;
        }

        const isEquipped = equippedSkills.includes(skillId);

        if (isEquipped) {
            // Unequip
            const newEquipped = equippedSkills.filter(id => id !== skillId);
            dispatch({
                type: ACTIONS.UPDATE_PLAYER_DATA,
                payload: { ...state.player, equippedSkills: newEquipped }
            });
        } else {
            // Equip (max 8 slots)
            if (equippedSkills.length >= 8) {
                alert("Maximum 8 active skills equipped!");
                return;
            }
            const newEquipped = [...equippedSkills, skillId];
            dispatch({
                type: ACTIONS.UPDATE_PLAYER_DATA,
                payload: { ...state.player, equippedSkills: newEquipped }
            });
        }
    };

    return React.createElement('div', { className: 'modal-overlay fade-in' },
        React.createElement('div', { className: 'retro-modal-box' },
            React.createElement('div', { className: 'retro-modal-header' },
                React.createElement('h2', { className: 'retro-h2' }, "> ADVENTURER'S GUILD"),
                React.createElement('div', { className: 'retro-tabs' },
                    React.createElement('button', { className: `retro-tab-btn ${tab === 'learn' ? 'active' : ''}`, onClick: () => setTab('learn') }, "[ 1 ] MY SKILLS"),
                    React.createElement('button', { className: `retro-tab-btn ${tab === 'shop' ? 'active' : ''}`, onClick: () => setTab('shop') }, "[ 2 ] SKILL SHOP"),
                    React.createElement('button', { className: 'retro-tab-btn', onClick: onClose }, "[ X ] EXIT")
                )
            ),

            React.createElement('div', { className: 'retro-content-area' },

                // === MY SKILLS TAB ===
                tab === 'learn' && React.createElement('div', { className: 'retro-list-container' },
                    React.createElement('h3', { className: 'retro-h3' }, `> CLASS: ${playerClass.toUpperCase()} | ABILITIES: ${playerSkills.length}`),
                    React.createElement('p', { className: 'retro-text' }, "> USE ABILITIES IN COMBAT TO INCREASE PROFICIENCY."),

                    playerSkills.length === 0
                        ? React.createElement('p', { className: 'retro-text' }, "> NO COMBAT DATA ACQUIRED.")
                        : playerSkills.map((ps, idx) => {
                            const skillData = SKILLS[ps.id];
                            if (!skillData) return null;

                            const evolvedSkill = getSkillAtLevel(ps.id, ps.level);
                            const isEquipped = equippedSkills.includes(ps.id);
                            const isPassive = skillData.type === 'passive';

                            return React.createElement('div', {
                                key: ps.id,
                                className: `retro-list-item ${isEquipped ? 'equipped' : ''}`
                            },
                                React.createElement('div', { className: 'item-details' },
                                    React.createElement('div', { className: 'skill-header-line' },
                                        React.createElement('span', { className: 'skill-name' },
                                            `[ ${idx + 1} ] ${evolvedSkill.name.toUpperCase()}`
                                        ),
                                        React.createElement('span', { className: 'skill-meta' }, `LV.${ps.level}`)
                                    ),
                                    React.createElement('p', { className: 'skill-desc' }, evolvedSkill.description || skillData.description),
                                    React.createElement('div', { className: 'skill-stats-line' },
                                        React.createElement('span', null, `MP: ${evolvedSkill.mpCost || skillData.mpCost || 0}`),
                                        React.createElement('span', null, `TYPE: ${skillData.type ? skillData.type.toUpperCase() : 'ACTIVE'}`),
                                        React.createElement('span', null, `XP: ${ps.exp}/${ps.maxExp}`)
                                    ),
                                    // Evolution Hint
                                    ps.level < 10 && React.createElement('p', { className: 'evolution-hint' },
                                        `> NEXT EVOLUTION: LV.${ps.level < 3 ? 3 : ps.level < 7 ? 7 : 10}`
                                    )
                                ),
                                !isPassive ? React.createElement('button', {
                                    className: `retro-action-btn ${isEquipped ? 'highlight' : ''}`,
                                    onClick: () => handleEquipSkill(ps.id)
                                }, isEquipped ? "[ EQUIPPED ]" : "[ EQUIP ]") : React.createElement('span', { className: 'retro-text small' }, "[ PASSIVE ]")
                            );
                        })
                ),

                // === SKILL SHOP TAB ===
                tab === 'shop' && React.createElement('div', { className: 'shop-panel' },
                    React.createElement('h3', { className: 'retro-h3' }, "> UNIVERSAL SKILL IDATABASE"),
                    React.createElement('p', { className: 'retro-text' }, "> AVAILABLE FOR PURCHASE WITH GOLD."),

                    React.createElement('div', { className: 'retro-list-container' },
                        purchasableSkills.map(skill => {
                            const owned = skill.owned;
                            return React.createElement('div', {
                                key: skill.id,
                                className: `retro-list-item ${owned ? 'disabled' : ''}`
                            },
                                React.createElement('div', { className: 'item-details' },
                                    React.createElement('span', { className: 'skill-name' }, `> ${skill.name.toUpperCase()}`),
                                    React.createElement('p', { className: 'skill-desc' }, skill.description),
                                    React.createElement('span', { className: 'skill-meta' }, `COST: ${skill.purchaseCost}G`)
                                ),
                                React.createElement('button', {
                                    className: 'retro-action-btn',
                                    disabled: owned || state.player.gold < skill.purchaseCost,
                                    onClick: () => handlePurchaseSkill(skill.id)
                                }, owned ? "[ OWNED ]" : "[ LEARN ]")
                            );
                        })
                    )
                )
            )
        ),

        // Styles
        React.createElement('style', null, `
            .retro-modal-box {
                background: #000;
                border: 2px solid var(--primary);
                padding: 20px;
                width: 850px;
                max-width: 95vw;
                height: 85vh;
                display: flex;
                flex-direction: column;
                color: var(--primary);
                font-family: monospace;
            }
            .retro-modal-header {
                display: flex; justify-content: space-between; align-items: center;
                border-bottom: 2px solid var(--border);
                padding-bottom: 15px; margin-bottom: 20px;
            }
            .retro-tabs { display: flex; gap: 15px; }
            .retro-tab-btn {
                background: transparent; border: none; color: var(--text-muted);
                cursor: pointer; font-family: monospace; font-size: 1rem;
            }
            .retro-tab-btn:hover, .retro-tab-btn.active { color: var(--primary); text-decoration: underline; }
            
            .retro-content-area { flex: 1; overflow-y: auto; padding-right: 10px; }
            .retro-list-container { display: flex; flex-direction: column; gap: 10px; }
            .retro-h3 { color: var(--accent); margin-bottom: 10px; border-bottom: 1px dashed #333; padding-bottom: 5px; }
            .retro-text { color: var(--text-muted); font-style: italic; margin-bottom: 15px; }
            .retro-text.small { font-size: 0.8rem; }
            
            .retro-list-item {
                display: flex; justify-content: space-between; align-items: center;
                border: 1px solid #333; padding: 12px;
            }
            .retro-list-item.equipped { border-color: var(--primary); background: rgba(0, 255, 0, 0.05); }
            .retro-list-item.disabled { border-color: #222; opacity: 0.6; }
            
            .item-details { display: flex; flex-direction: column; flex: 1; }
            .skill-header-line { display: flex; justify-content: space-between; width: 100%; margin-bottom: 5px; }
            .skill-name { font-weight: bold; color: var(--primary); }
            .skill-meta { font-size: 0.9rem; color: var(--accent); }
            .skill-desc { font-size: 0.9rem; color: #aaa; margin: 3px 0; max-width: 90%; }
            .skill-stats-line { font-size: 0.8rem; color: #888; display: flex; gap: 10px; }
            .evolution-hint { font-size: 0.8rem; color: #555; margin-top: 5px; }
            
            .retro-action-btn {
                background: transparent; border: 1px solid var(--primary);
                color: var(--primary); padding: 8px 15px; font-family: monospace;
                cursor: pointer; margin-left: 15px; min-width: 100px;
            }
            .retro-action-btn:hover:not(:disabled) { background: var(--primary); color: black; }
            .retro-action-btn:disabled { border-color: #444; color: #444; cursor: not-allowed; }
            .retro-action-btn.highlight { background: var(--primary); color: black; }
        `)
    );
};

export default GuildHall;
