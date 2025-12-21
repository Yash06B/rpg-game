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
        React.createElement('div', { className: 'modal-content guild-modal' },
            React.createElement('div', { className: 'modal-header' },
                React.createElement('h2', null, "🏛️ Adventurer's Guild"),
                React.createElement('div', { className: 'tabs' },
                    React.createElement('button', { className: tab === 'learn' ? 'active' : '', onClick: () => setTab('learn') }, "My Skills"),
                    React.createElement('button', { className: tab === 'shop' ? 'active' : '', onClick: () => setTab('shop') }, "Skill Shop")
                ),
                React.createElement('button', { className: 'close-btn', onClick: onClose }, "CLOSE")
            ),

            React.createElement('div', { className: 'guild-content' },

                // === MY SKILLS TAB ===
                tab === 'learn' && React.createElement('div', { className: 'skills-panel' },
                    React.createElement('h3', null, `${playerClass} Skills (${playerSkills.length})`),
                    React.createElement('p', { className: 'info-text' }, "Skills auto-unlock as you level up. Use in combat to gain skill XP and evolve them!"),

                    playerSkills.length === 0
                        ? React.createElement('p', { className: 'no-skills' }, "No skills yet. Keep leveling up!")
                        : React.createElement('div', { className: 'skill-list' },
                            playerSkills.map(ps => {
                                const skillData = SKILLS[ps.id];
                                if (!skillData) return null;

                                const evolvedSkill = getSkillAtLevel(ps.id, ps.level);
                                const isEquipped = equippedSkills.includes(ps.id);
                                const isPassive = skillData.type === 'passive';

                                return React.createElement('div', {
                                    key: ps.id,
                                    className: `skill-card ${isEquipped ? 'equipped' : ''} ${isPassive ? 'passive' : ''}`
                                },
                                    React.createElement('div', { className: 'skill-header' },
                                        React.createElement('h4', null, evolvedSkill.name || skillData.name),
                                        React.createElement('span', { className: 'skill-level' }, `Lv.${ps.level}`)
                                    ),
                                    React.createElement('p', { className: 'skill-desc' }, evolvedSkill.description || skillData.description),

                                    // Stats
                                    React.createElement('div', { className: 'skill-stats' },
                                        skillData.baseDamage && React.createElement('span', null, `DMG: ${evolvedSkill.baseDamage || skillData.baseDamage}`),
                                        skillData.mpCost && React.createElement('span', null, `MP: ${evolvedSkill.mpCost || skillData.mpCost}`),
                                        skillData.type && React.createElement('span', { className: 'type-badge' }, skillData.type)
                                    ),

                                    // XP Bar
                                    React.createElement('div', { className: 'xp-bar' },
                                        React.createElement('div', {
                                            className: 'xp-fill',
                                            style: { width: `${(ps.exp / ps.maxExp) * 100}%` }
                                        }),
                                        React.createElement('span', { className: 'xp-text' }, `${ps.exp}/${ps.maxExp} XP`)
                                    ),

                                    // Evolution Preview
                                    ps.level < 10 && React.createElement('p', { className: 'evolution-hint' },
                                        ps.level < 3 ? `→ Evolves at Lv.3` :
                                            ps.level < 7 ? `→ Evolves at Lv.7` :
                                                `→ Final form at Lv.10`
                                    ),

                                    // Equip Button (only for active skills)
                                    !isPassive && React.createElement('button', {
                                        className: `equip-btn ${isEquipped ? 'equipped' : ''}`,
                                        onClick: () => handleEquipSkill(ps.id)
                                    }, isEquipped ? "✓ Equipped" : "Equip")
                                );
                            })
                        )
                ),

                // === SKILL SHOP TAB ===
                tab === 'shop' && React.createElement('div', { className: 'shop-panel' },
                    React.createElement('h3', null, "Universal Skills for Purchase"),
                    React.createElement('p', { className: 'info-text' }, "These skills can be used by any class!"),

                    React.createElement('div', { className: 'skill-list' },
                        purchasableSkills.map(skill => {
                            const owned = skill.owned;
                            return React.createElement('div', {
                                key: skill.id,
                                className: `skill-card shop-card ${owned ? 'owned' : ''}`
                            },
                                React.createElement('div', { className: 'skill-header' },
                                    React.createElement('h4', null, skill.name),
                                    React.createElement('span', { className: 'price' }, `${skill.purchaseCost}g`)
                                ),
                                React.createElement('p', { className: 'skill-desc' }, skill.description),
                                React.createElement('div', { className: 'skill-stats' },
                                    skill.baseDamage && React.createElement('span', null, `DMG: ${skill.baseDamage}`),
                                    skill.mpCost && React.createElement('span', null, `MP: ${skill.mpCost}`),
                                    React.createElement('span', { className: 'type-badge' }, skill.type)
                                ),
                                React.createElement('button', {
                                    className: 'purchase-btn',
                                    disabled: owned || state.player.gold < skill.purchaseCost,
                                    onClick: () => handlePurchaseSkill(skill.id)
                                }, owned ? "Owned" : "Purchase")
                            );
                        })
                    )
                )
            )
        ),

        // Styles
        React.createElement('style', null, `
      .guild-modal { width: 900px; max-height: 90vh; }
      
      .guild-content { padding: 20px; max-height: 70vh; overflow-y: auto; }
      
      .skills-panel h3, .shop-panel h3 { color: var(--primary); margin-bottom: 10px; }
      .info-text { color: var(--text-muted); font-size: 0.85rem; margin-bottom: 20px; font-style: italic; }
      
      .skill-list { display: grid; grid-template-columns: repeat(auto-fill, minmax(350px, 1fr)); gap: 15px; }
      
      .skill-card {
        background: var(--bg-dark);
        border: 2px solid var(--border);
        border-radius: var(--radius-md);
        padding: 15px;
        padding-bottom: 30px;
        transition: all 0.2s;
      }
      .skill-card:hover { border-color: var(--primary); }
      .skill-card.equipped { border-color: #10b981; background: rgba(16, 185, 129, 0.1); }
      .skill-card.passive { border-left: 4px solid #a78bfa; }
      .skill-card.owned { opacity: 0.6; }
      
      .skill-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; }
      .skill-header h4 { margin: 0; color: var(--text-main); }
      .skill-level { background: var(--primary); color: white; padding: 3px 10px; border-radius: 12px; font-size: 0.8rem; font-weight: bold; }
      .price { background: #fbbf24; color: black; padding: 3px 10px; border-radius: 12px; font-size: 0.85rem; font-weight: bold; }
      
      .skill-desc { font-size: 0.85rem; color: var(--text-muted); margin-bottom: 10px; line-height: 1.4; }
      
      .skill-stats { display: flex; gap: 10px; margin-bottom: 10px; flex-wrap: wrap; }
      .skill-stats span { background: var(--bg-panel); padding: 4px 8px; border-radius: 4px; font-size: 0.75rem; }
      .type-badge { background: var(--accent) !important; color: white; font-weight: bold; }
      
      .xp-bar { background: #222; height: 8px; border-radius: 4px; position: relative; margin: 10px 0; }
      .xp-fill { background: linear-gradient(90deg, #10b981 0%, #34d399 100%); height: 100%; transition: width 0.3s; border-radius: 4px; }
      .xp-text { position: absolute; top: -20px; right: 0; font-size: 0.7rem; color: var(--text-muted); }
      
      .evolution-hint { font-size: 0.75rem; color: #a78bfa; font-style: italic; margin: 5px 0; }
      
      .equip-btn, .purchase-btn {
        width: 100%;
        padding: 8px;
        border: none;
        border-radius: var(--radius-md);
        background: var(--primary);
        color: white;
        cursor: pointer;
        font-weight: bold;
        margin-top: 10px;
        transition: all 0.2s;
      }
      .equip-btn:hover, .purchase-btn:hover { transform: translateY(-1px); }
      .equip-btn.equipped { background: #10b981; }
      .equip-btn:disabled, .purchase-btn:disabled { background: var(--bg-panel); color: var(--text-muted); cursor: not-allowed; transform: none; }
      
      .no-skills { text-align: center; color: var(--text-muted); padding: 40px; font-style: italic; }
    `)
    );
};

export default GuildHall;
