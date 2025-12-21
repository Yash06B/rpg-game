import React, { useState, useEffect } from 'react';
import { useGame } from '../context/GameContext.js';

const MainMenu = () => {
    const { state, dispatch, ACTIONS } = useGame();
    const [hasSave, setHasSave] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem('sins_rpg_autosave');
        if (saved) {
            setHasSave(true);
        }
    }, []);

    const handleNewGame = () => {
        if (window.confirm("Start a new journey? Any existing progress will be overwritten.")) {
            // Clear save
            localStorage.removeItem('sins_rpg_autosave');
            dispatch({ type: ACTIONS.INIT_GAME });
            // Should verify INIT_GAME sets view to 'character_creation', if not we force it
            // Actually INIT_GAME usually resets to initialState which is character_creation.
        }
    };

    const handleContinue = () => {
        const saved = localStorage.getItem('sins_rpg_autosave');
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                dispatch({ type: ACTIONS.LOAD_STATE, payload: parsed });
            } catch (e) {
                console.error("Failed to load save", e);
                alert("Save file corrupted.");
            }
        }
    };

    return React.createElement('div', { className: 'main-menu fade-in' },
        React.createElement('div', { className: 'menu-content' },
            React.createElement('h1', { className: 'game-title' }, "SINS OF THE DEMON LORDS"),
            React.createElement('p', { className: 'subtitle' }, "An RPG powered by React & AI"),

            React.createElement('div', { className: 'menu-buttons' },
                React.createElement('button', {
                    className: 'menu-btn primary',
                    onClick: handleNewGame
                }, "New Game"),

                React.createElement('button', {
                    className: 'menu-btn',
                    onClick: handleContinue,
                    disabled: !hasSave
                }, "Continue Journey"),

                React.createElement('button', {
                    className: 'menu-btn',
                    onClick: () => alert("Credits:\nCreated by Yash & Antigravity (Google DeepMind)\nMusic: None yet :(")
                }, "Credits")
            )
        ),
        React.createElement('style', null, `
            .main-menu {
                height: 100vh;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%);
                color: white;
                text-align: center;
            }
            .game-title {
                font-size: 4rem;
                background: linear-gradient(to right, #ef4444, #f59e0b, #ec4899);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                margin-bottom: 10px;
                text-transform: uppercase;
                letter-spacing: 5px;
                filter: drop-shadow(0 0 10px rgba(239, 68, 68, 0.5));
            }
            .subtitle {
                font-size: 1.5rem;
                color: #94a3b8;
                margin-bottom: 50px;
            }
            .menu-buttons {
                display: flex;
                flex-direction: column;
                gap: 20px;
                width: 300px;
            }
            .menu-btn {
                padding: 15px 30px;
                font-size: 1.2rem;
                border: 2px solid #334155;
                background: rgba(30, 41, 59, 0.8);
                color: #e2e8f0;
                cursor: pointer;
                transition: all 0.3s;
                text-transform: uppercase;
                letter-spacing: 2px;
                border-radius: 4px;
            }
            .menu-btn:hover:not(:disabled) {
                background: rgba(51, 65, 85, 0.9);
                border-color: #fbbf24;
                color: #fbbf24;
                transform: scale(1.05);
                box-shadow: 0 0 15px rgba(251, 191, 36, 0.3);
            }
            .menu-btn.primary {
                border-color: #ef4444;
                box-shadow: 0 0 10px rgba(239, 68, 68, 0.2);
            }
            .menu-btn.primary:hover {
                background: #ef4444;
                color: white;
                box-shadow: 0 0 20px rgba(239, 68, 68, 0.6);
            }
            .menu-btn:disabled {
                opacity: 0.3;
                cursor: not-allowed;
                border-color: transparent;
            }
        `)
    );
};

export default MainMenu;
