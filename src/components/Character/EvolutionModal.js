import React, { useState } from 'react';
import { useGame } from '../../context/GameContext.js';
import { EVOLUTIONS } from '../../data/evolutions.js';

const EvolutionModal = () => {
    const { state, dispatch, ACTIONS } = useGame();
    const currentClass = state.player.class;
    const level = state.player.level;

    // Determine Tier
    let targetTier = 0;
    if (level >= 90) targetTier = 4;
    else if (level >= 70) targetTier = 3;
    else if (level >= 40) targetTier = 2;
    else if (level >= 10) targetTier = 1;

    // Check if we already evolved for this tier
    // verification: if current tier (state.player.tier) < targetTier
    if (state.player.tier >= targetTier) return null; // Already evolved

    // Get Options
    let options = [];
    if (EVOLUTIONS[currentClass] && EVOLUTIONS[currentClass][level >= 90 ? 90 : level >= 70 ? 70 : level >= 40 ? 40 : 10]) {
        options = EVOLUTIONS[currentClass][level >= 90 ? 90 : level >= 70 ? 70 : level >= 40 ? 40 : 10];
    } else {
        // If precise tree is not defined, we might default or show nothing
        // For demo purposes, if no options found, don't show modal
        return null;
    }

    const handleEvolve = (opt) => {
        // Construct updated player
        const updatedPlayer = {
            ...state.player,
            class: opt.label, // Change class name
            tier: targetTier, // Update tier
            evolutionHistory: [...state.player.evolutionHistory, opt.label],
            // Apply stat boost (simple full heal + modest buff for demo)
            stats: {
                ...state.player.stats,
                maxHp: Math.floor(state.player.stats.maxHp * 1.5),
                maxMp: Math.floor(state.player.stats.maxMp * 1.5),
                atk: Math.floor(state.player.stats.atk * 1.2),
                hp: Math.floor(state.player.stats.maxHp * 1.5), // Heal
                mp: Math.floor(state.player.stats.maxMp * 1.5),
            }
        };

        dispatch({ type: ACTIONS.UPDATE_PLAYER_DATA, payload: updatedPlayer });
        alert(`Evolved to ${opt.label}!`);
    };

    return React.createElement('div', { className: 'evo-modal-overlay fade-in' },
        React.createElement('div', { className: 'evo-modal' },
            React.createElement('h2', { className: 'evo-title' }, "CLASS EVOLUTION AVAILABLE"),
            React.createElement('p', null, `You have reached Level ${level}. Choose your destiny.`),

            React.createElement('div', { className: 'evo-options' },
                options.map(opt =>
                    React.createElement('div', {
                        key: opt.id,
                        className: 'evo-card',
                        onClick: () => handleEvolve(opt)
                    },
                        React.createElement('h3', null, opt.label),
                        React.createElement('p', null, opt.desc)
                    )
                )
            )
        ),
        React.createElement('style', null, `
      .evo-modal-overlay {
        position: fixed;
        top: 0; left: 0; right: 0; bottom: 0;
        background: rgba(0,0,0,0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
      }
      .evo-modal {
        background: var(--bg-panel);
        padding: 40px;
        border-radius: 20px;
        border: 2px solid var(--accent);
        box-shadow: 0 0 50px var(--accent-glow);
        text-align: center;
        max-width: 800px;
      }
      .evo-title {
        font-size: 2rem;
        color: var(--accent);
        margin-bottom: 20px;
        text-transform: uppercase;
        letter-spacing: 2px;
      }
      .evo-options {
        display: flex;
        gap: 20px;
        margin-top: 30px;
        justify-content: center;
      }
      .evo-card {
        background: var(--bg-dark);
        border: 1px solid var(--border);
        padding: 20px;
        border-radius: 10px;
        cursor: pointer;
        width: 200px;
        transition: transform 0.2s, border-color 0.2s;
      }
      .evo-card:hover {
        transform: scale(1.1);
        border-color: var(--primary);
        box-shadow: 0 0 15px var(--primary-glow);
      }
    `)
    );
};

export default EvolutionModal;
