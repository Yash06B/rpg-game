import React, { useState } from 'react';
import { useGame } from '../../context/GameContext.js';

const HallOfTranscendence = ({ onClose }) => {
    const { state, dispatch, ACTIONS } = useGame();
    const [selectedAbility, setSelectedAbility] = useState(null);

    // God-tier abilities requiring level 80+
    const transcendentAbilities = [
        {
            id: 'immortality',
            name: 'Immortality',
            description: 'Revive once per battle with 50% HP. Cooldown: 1 battle.',
            cost: 1000000,
            levelRequired: 90,
            effect: { type: 'revive', value: 0.5 }
        },
        {
            id: 'time_manipulation',
            name: 'Time Manipulation',
            description: 'Take two turns in a row once per battle.',
            cost: 800000,
            levelRequired: 85,
            effect: { type: 'double_turn', value: 1 }
        },
        {
            id: 'absolute_defense',
            name: 'Absolute Defense',
            description: 'Nullify all damage for one turn. Cooldown: 5 turns.',
            cost: 750000,
            levelRequired: 82,
            effect: { type: 'invincible', duration: 1, cooldown: 5 }
        },
        {
            id: 'reality_break',
            name: 'Reality Break',
            description: 'Deal 9999 damage to all enemies. Can only be used once per dungeon.',
            cost: 1500000,
            levelRequired: 95,
            effect: { type: 'ultimate', damage: 9999 }
        },
        {
            id: 'infinite_mana',
            name: 'Infinite Mana',
            description: 'All skills cost 0 MP.',
            cost: 2000000,
            levelRequired: 99,
            effect: { type: 'passive', stat: 'mp_cost', value: 0 }
        },
        {
            id: 'critical_ascension',
            name: 'Critical Ascension',
            description: 'All attacks are critical hits.',
            cost: 1800000,
            levelRequired: 97,
            effect: { type: 'passive', stat: 'crit_rate', value: 100 }
        },
        {
            id: 'divine_regeneration',
            name: 'Divine Regeneration',
            description: 'Restore 10% HP and MP every turn.',
            cost: 900000,
            levelRequired: 88,
            effect: { type: 'passive', stat: 'regen', value: 0.1 }
        },
        {
            id: 'god_mode',
            name: 'God Mode',
            description: 'All stats doubled permanently.',
            cost: 5000000,
            levelRequired: 100,
            effect: { type: 'passive', stat: 'all', multiplier: 2 }
        }
    ];

    const unlockedAbilities = state.player.transcendentAbilities || [];

    const handleUnlock = () => {
        if (!selectedAbility) return;

        if (state.player.level < selectedAbility.levelRequired) {
            alert(`Level ${selectedAbility.levelRequired} required!`);
            return;
        }

        if (state.player.gold < selectedAbility.cost) {
            alert(`Not enough gold! Cost: ${selectedAbility.cost}g`);
            return;
        }

        if (unlockedAbilities.includes(selectedAbility.id)) {
            alert("Already unlocked!");
            return;
        }

        const confirm = window.confirm(
            `Unlock ${selectedAbility.name}?\n\nCost: ${selectedAbility.cost.toLocaleString()}g\n\n${selectedAbility.description}\n\nThis is permanent!`
        );

        if (!confirm) return;

        dispatch({
            type: ACTIONS.UPDATE_PLAYER_DATA,
            payload: {
                ...state.player,
                gold: state.player.gold - selectedAbility.cost,
                transcendentAbilities: [...unlockedAbilities, selectedAbility.id]
            }
        });

        alert(`${selectedAbility.name} unlocked!`);
        setSelectedAbility(null);
    };

    return React.createElement('div', { className: 'modal-overlay fade-in' },
        React.createElement('div', { className: 'modal-content transcendence-modal' },
            React.createElement('div', { className: 'modal-header' },
                React.createElement('h2', null, "✨ Hall of Transcendence"),
                React.createElement('button', { className: 'close-btn', onClick: onClose }, "CLOSE")
            ),

            React.createElement('div', { className: 'transcendence-content' },
                React.createElement('div', { className: 'hall-intro' },
                    React.createElement('p', { className: 'intro-text' },
                        "Transcend mortal limits. Unlock god-tier abilities that break the rules of reality itself."
                    ),
                    React.createElement('p', { className: 'warning' },
                        "⚠️ These powers come at a steep price. Only the truly ascended may wield them."
                    )
                ),

                React.createElement('div', { className: 'player-status' },
                    React.createElement('h3', null, "Your Status"),
                    React.createElement('p', null, `Level: ${state.player.level} ${state.player.level >= 80 ? '✓' : '(Min: 80)'}`),
                    React.createElement('p', null, `Gold: ${state.player.gold.toLocaleString()}g`),
                    React.createElement('p', null, `Unlocked Abilities: ${unlockedAbilities.length}/8`)
                ),

                React.createElement('div', { className: 'abilities-grid' },
                    transcendentAbilities.map(ability => {
                        const unlocked = unlockedAbilities.includes(ability.id);
                        const canUnlock = state.player.level >= ability.levelRequired && !unlocked;

                        return React.createElement('div', {
                            key: ability.id,
                            className: `ability-card ${unlocked ? 'unlocked' : canUnlock ? 'available' : 'locked'} ${selectedAbility === ability ? 'selected' : ''}`,
                            onClick: () => !unlocked && setSelectedAbility(ability)
                        },
                            unlocked && React.createElement('div', { className: 'unlocked-badge' }, "UNLOCKED"),
                            React.createElement('h3', null, ability.name),
                            React.createElement('p', { className: 'ability-desc' }, ability.description),
                            React.createElement('div', { className: 'ability-requirements' },
                                React.createElement('p', { className: `level-req ${state.player.level >= ability.levelRequired ? 'met' : 'not-met'}` },
                                    `Level ${ability.levelRequired}${state.player.level >= ability.levelRequired ? ' ✓' : ''}`
                                ),
                                !unlocked && React.createElement('p', { className: `cost ${state.player.gold >= ability.cost ? 'can-afford' : 'cannot-afford'}` },
                                    `${ability.cost.toLocaleString()}g`
                                )
                            )
                        );
                    })
                ),

                selectedAbility && !unlockedAbilities.includes(selectedAbility.id) &&
                React.createElement('div', { className: 'unlock-action' },
                    React.createElement('button', {
                        className: 'unlock-btn',
                        onClick: handleUnlock,
                        disabled: state.player.level < selectedAbility.levelRequired ||
                            state.player.gold < selectedAbility.cost
                    }, `Unlock ${selectedAbility.name}`)
                )
            )
        ),

        React.createElement('style', null, `
      .transcendence-modal { width: 900px; max-height: 90vh; }
      .transcendence-content { padding: 25px; }
      
      .hall-intro { background: linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(236, 72, 153, 0.1) 100%); padding: 25px; border-radius: var(--radius-lg); margin-bottom: 25px; border: 2px solid var(--primary); }
      .intro-text { color: var(--text-main); font-size: 1.1rem; line-height: 1.6; margin-bottom: 10px; text-align: center; }
      .warning { color: #f59e0b; font-weight: bold; text-align: center; margin: 0; }
      
      .player-status { background: var(--bg-dark); padding: 20px; border-radius: var(--radius-md); margin-bottom: 25px; border-left: 4px solid #10b981; }
      .player-status h3 { color: #10b981; margin: 0 0 10px 0; }
      .player-status p { margin: 5px 0; color: var(--text-main); }
      
      .abilities-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 15px; margin-bottom: 25px; }
      .ability-card { background: var(--bg-dark); border: 3px solid var(--border); border-radius: var(--radius-md); padding: 20px; cursor: pointer; transition: all 0.2s; position: relative; overflow: hidden; }
      .ability-card:hover { border-color: var(--primary); transform: translateY(-3px); }
      .ability-card.locked { opacity: 0.5; border-color: #6b7280; }
      .ability-card.available { border-color: var(--primary); }
      .ability-card.unlocked { border-color: #10b981; background: rgba(16, 185, 129, 0.05); cursor: default; }
      .ability-card.selected { border-color: #f59e0b; box-shadow: 0 0 20px rgba(245, 158, 11, 0.3); }
      
      .unlocked-badge { position: absolute; top: 10px; right: 10px; background: #10b981; color: white; padding: 5px 12px; border-radius: 12px; font-size: 0.75rem; font-weight: bold; }
      
      .ability-card h3 { margin: 0 0 10px 0; color: var(--primary); font-size: 1.1rem; }
      .ability-desc { color: var(--text-muted); font-size: 0.9rem; line-height: 1.4; margin-bottom: 15px; min-height: 60px; }
      
      .ability-requirements { border-top: 1px solid var(--border); padding-top: 10px; }
      .level-req, .cost { margin: 5px 0; font-weight: bold; }
      .level-req.met { color: #10b981; }
      .level-req.not-met { color: #ef4444; }
      .cost.can-afford { color: #fbbf24; }
      .cost.cannot-afford { color: #ef4444; }
      
      .unlock-action { position: sticky; bottom: 0; background: var(--bg-main); padding-top: 20px; }
      .unlock-btn { width: 100%; padding: 22px; background: linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%); color: white; border: none; border-radius: var(--radius-md); font-size: 1.4rem; font-weight: bold; cursor: pointer; transition: all 0.2s; text-transform: uppercase; letter-spacing: 2px; }
      .unlock-btn:hover:not(:disabled) { transform: translateY(-3px); box-shadow: 0 15px 40px rgba(139, 92, 246, 0.6); }
      .unlock-btn:disabled { opacity: 0.3; cursor: not-allowed; background: var(--bg-dark); }
    `)
    );
};

export default HallOfTranscendence;
