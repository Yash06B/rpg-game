import React from 'react';
import { useGame } from '../../context/GameContext.js';

const VictoryScreen = () => {
    const { state } = useGame();
    const flags = state.world.questFlags || {};

    // Check if all 7 demons are defeated
    const allDemonsDefeated =
        flags.pride_defeated &&
        flags.greed_defeated &&
        flags.wrath_defeated &&
        flags.envy_defeated &&
        flags.lust_defeated &&
        flags.gluttony_defeated &&
        flags.sloth_defeated;

    // Only show if all defeated AND the final story has been seen
    if (!allDemonsDefeated || !flags.sloth_story_seen) return null;

    return React.createElement('div', { className: 'victory-screen fade-in' },
        React.createElement('div', { className: 'victory-content' },
            React.createElement('h1', null, "THE WORLD IS SAVED"),
            React.createElement('p', { className: 'subtitle' }, "You have defeated the Seven Deadly Sins."),

            React.createElement('div', { className: 'stats-summary' },
                React.createElement('h2', null, "Hero's Journey"),
                React.createElement('p', null, `Hero: ${state.player.name}`),
                React.createElement('p', null, `Class: ${state.player.class} (Tier ${state.player.tier})`),
                React.createElement('p', null, `Level: ${state.player.level}`),
                React.createElement('p', null, `Gold Earned: ${state.player.gold}`),
                React.createElement('p', null, `Quests Completed: ${state.world.completedQuests?.length || 0}`)
            ),

            React.createElement('div', { className: 'credits' },
                React.createElement('p', null, "Thank you for playing!"),
                React.createElement('p', { className: 'small' }, "Created with AI Agentic Coding")
            ),

            React.createElement('button', {
                className: 'restart-btn',
                onClick: () => window.location.reload()
            }, "Play Again")
        ),
        React.createElement('style', null, `
      .victory-screen {
        position: fixed;
        top: 0; left: 0; width: 100%; height: 100%;
        background: black;
        color: white;
        z-index: 9999;
        display: flex;
        justify-content: center;
        align-items: center;
        background: linear-gradient(135deg, #000000 0%, #1a0505 100%);
      }
      .victory-content {
        text-align: center;
        max-width: 800px;
        padding: 40px;
        border: 2px solid #daa520;
        background: rgba(0,0,0,0.8);
        border-radius: 20px;
        box-shadow: 0 0 50px #daa520;
        animation: float 6s infinite ease-in-out;
      }
      h1 { font-size: 4rem; color: #daa520; margin-bottom: 10px; text-shadow: 0 0 20px #daa520; }
      .subtitle { font-size: 1.5rem; color: #aaa; margin-bottom: 40px; }
      .stats-summary { margin-bottom: 40px; text-align: left; background: rgba(255,255,255,0.1); padding: 20px; border-radius: 10px; }
      .stats-summary h2 { color: #fff; border-bottom: 1px solid #555; padding-bottom: 10px; margin-bottom: 15px; }
      .stats-summary p { font-size: 1.2rem; margin: 5px 0; color: #ccc; }
      .credits { margin-bottom: 40px; }
      .restart-btn {
        padding: 15px 40px;
        font-size: 1.5rem;
        background: #daa520;
        color: black;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        font-weight: bold;
        transition: all 0.3s;
      }
      .restart-btn:hover {
        background: #fff;
        transform: scale(1.1);
        box-shadow: 0 0 30px white;
      }
      @keyframes float {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-10px); }
      }
    `)
    );
};

export default VictoryScreen;
