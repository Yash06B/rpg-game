import React, { useState, useEffect } from 'react';
import { useGame } from '../context/GameContext.js';

const MainMenu = () => {
    const { state, dispatch, ACTIONS } = useGame();
    const [hasSave, setHasSave] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem('sins_rpg_autosave');
        if (saved) {
            setHasSave(true);
        }
    }, []);

    const handleNewGameClick = () => {
        if (hasSave) {
            setShowConfirmModal(true);
        } else {
            startNewGame();
        }
    };

    const startNewGame = () => {
        localStorage.removeItem('sins_rpg_autosave');
        dispatch({ type: ACTIONS.INIT_GAME });
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
            React.createElement('pre', { className: 'ascii-title' }, `
   _____ _____ _   _  _____ 
  / ____|_   _| \\ | |/ ____|
 | (___   | | |  \\| | (___  
  \\___ \\  | | | . \` |\\___ \\ 
  ____) |_| |_| |\\  |____) |
 |_____/|_____|_| \\_|_____/ 
 OF THE DEMON LORDS
 v1.0 (1980)
            `),
            React.createElement('p', { className: 'subtitle' }, "> SYSTEM READY. AWAITING INPUT..."),

            React.createElement('div', { className: 'menu-actions' },
                React.createElement('button', {
                    className: 'retro-btn',
                    onClick: handleNewGameClick
                }, "[ N ] NEW GAME"),

                React.createElement('button', {
                    className: 'retro-btn',
                    disabled: !hasSave,
                    onClick: handleContinue
                }, hasSave ? "[ C ] CONTINUE JOURNEY" : "[ X ] NO SAVE DATA"),

                React.createElement('button', {
                    className: 'retro-btn',
                    onClick: () => alert("CREDITS:\nPROGRAMMED BY YASH & ANTIGRAVITY\nCOPYRIGHT (C) 2025")
                }, "[ ? ] CREDITS")
            )
        ),

        // Retro Confirmation Modal
        showConfirmModal && React.createElement('div', { className: 'modal-overlay' },
            React.createElement('div', { className: 'confirm-modal retro-box' },
                React.createElement('h2', null, "WARNING: DATA OVERWRITE"),
                React.createElement('p', null, "> STARTING A NEW GAME WILL ERASE CURRENT MEMORY."),
                React.createElement('p', null, "> PROCEED? (Y/N)"),
                React.createElement('div', { className: 'modal-actions' },
                    React.createElement('button', {
                        className: 'retro-btn',
                        onClick: () => setShowConfirmModal(false)
                    }, "[ N ] CANCEL"),
                    React.createElement('button', {
                        className: 'retro-btn danger',
                        onClick: startNewGame
                    }, "[ Y ] ERASE & START")
                )
            )
        ),

        React.createElement('style', null, `
            .main-menu {
                height: 100vh;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                background: #000;
                color: var(--primary);
                font-family: monospace;
            }
            .ascii-title {
                font-family: monospace;
                white-space: pre;
                color: var(--primary);
                text-shadow: 0 0 5px var(--primary);
                margin-bottom: 20px;
                line-height: 1;
                font-size: 14px; /* Default small for safety */
            }
            @media (min-width: 800px) {
                .ascii-title { font-size: 1.2rem; }
            }
            .subtitle {
                color: var(--text-muted);
                margin-bottom: 40px;
                border-bottom: 1px dashed var(--border);
                padding-bottom: 10px;
                width: 100%;
                text-align: center;
            }
            .menu-actions {
                display: flex;
                flex-direction: column;
                gap: 15px;
                align-items: flex-start;
                width: 100%;
                max-width: 400px;
            }
            .retro-btn {
                background: transparent;
                border: none;
                color: var(--primary);
                font-family: monospace;
                font-size: 1.2rem;
                cursor: pointer;
                text-align: left;
                width: 100%;
                padding: 5px;
            }
            .retro-btn:hover:not(:disabled) {
                background: var(--primary);
                color: #000;
            }
            .retro-btn:disabled {
                color: var(--text-muted);
                cursor: not-allowed;
            }
            
            .modal-overlay {
                position: fixed;
                top: 0; left: 0; right: 0; bottom: 0;
                background: rgba(0, 0, 0, 0.9);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 100;
            }
            .retro-box {
                border: 2px solid var(--primary);
                padding: 20px;
                background: #000;
                max-width: 500px;
                width: 90%;
            }
            .menu-content {
                display: flex;
                flex-direction: column;
                align-items: center;
            }
        `)
    );
};

export default MainMenu;
