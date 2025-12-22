import React, { useState } from 'react';
import { useGame } from '../../context/GameContext.js';
import { COMMON_QUESTS, QUEST_CATEGORIES, getAvailableQuests, getQuestsByCategory } from '../../data/commonQuests.js';

const QuestBoard = ({ onClose }) => {
    const { state, dispatch, ACTIONS } = useGame();
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedQuest, setSelectedQuest] = useState(null);

    const playerLevel = state.player.level;
    const activeQuests = state.world.activeCommonQuests || [];
    const completedQuests = state.world.completedQuests || [];

    const availableQuests = getAvailableQuests(playerLevel);

    const displayQuests = selectedCategory === 'all'
        ? availableQuests
        : getQuestsByCategory(selectedCategory);

    const handleAcceptQuest = (quest) => {
        if (activeQuests.length >= 10) {
            alert("Maximum 10 active quests! Complete some first.");
            return;
        }

        if (activeQuests.find(q => q.id === quest.id)) {
            alert("Quest already active!");
            return;
        }

        const newActiveQuests = [...activeQuests, {
            id: quest.id,
            progress: 0,
            accepted: Date.now()
        }];

        dispatch({
            type: ACTIONS.UPDATE_PLAYER_DATA,
            payload: {
                ...state.player,
                world: {
                    ...state.world,
                    activeCommonQuests: newActiveQuests
                }
            }
        });

        alert(`Quest accepted: ${quest.name}`);
        setSelectedQuest(null);
    };

    const handleCompleteQuest = (quest) => {
        // Award rewards
        const rewards = quest.rewards;
        const newExp = state.player.exp + (rewards.exp || 0);
        const newGold = state.player.gold + (rewards.gold || 0);
        const leveledUp = newExp >= state.player.maxExp;

        dispatch({
            type: ACTIONS.UPDATE_PLAYER_DATA,
            payload: {
                ...state.player,
                exp: leveledUp ? newExp - state.player.maxExp : newExp,
                level: leveledUp ? state.player.level + 1 : state.player.level,
                maxExp: leveledUp ? Math.floor(state.player.maxExp * 1.5) : state.player.maxExp,
                gold: newGold,
                world: {
                    ...state.world,
                    activeCommonQuests: activeQuests.filter(q => q.id !== quest.id),
                    completedQuests: quest.repeatable ? completedQuests : [...completedQuests, quest.id]
                }
            }
        });

        alert(`Quest Complete!\n+${rewards.exp} EXP\n+${rewards.gold} Gold${leveledUp ? '\n\nLEVEL UP!' : ''}`);
    };

    return React.createElement('div', { className: 'modal-overlay fade-in' },
        React.createElement('div', { className: 'retro-modal-box' },
            React.createElement('div', { className: 'retro-modal-header' },
                React.createElement('h2', { className: 'retro-h2' }, "> QUEST BOUNTY BOARD"),
                React.createElement('button', { className: 'retro-close-btn', onClick: onClose }, "[ X ] CLOSE")
            ),

            React.createElement('div', { className: 'retro-content-area' },

                // Category Filter
                React.createElement('div', { className: 'retro-tabs' },
                    React.createElement('button', {
                        className: `retro-tab-btn ${selectedCategory === 'all' ? 'active' : ''}`,
                        onClick: () => setSelectedCategory('all')
                    }, "[ ALL ]"),
                    Object.keys(QUEST_CATEGORIES).map(cat =>
                        React.createElement('button', {
                            key: cat,
                            className: `retro-tab-btn ${selectedCategory === cat.toLowerCase() ? 'active' : ''}`,
                            onClick: () => setSelectedCategory(cat.toLowerCase())
                        }, `[ ${QUEST_CATEGORIES[cat].toUpperCase()} ]`)
                    )
                ),

                React.createElement('div', { className: 'retro-split-view' },
                    // List
                    React.createElement('div', { className: 'retro-list-section' },
                        displayQuests.map(quest => {
                            const isActive = activeQuests.find(q => q.id === quest.id);
                            return React.createElement('div', {
                                key: quest.id,
                                className: `retro-list-item clickable ${selectedQuest?.id === quest.id ? 'active' : ''} ${isActive ? 'highlight' : ''}`,
                                onClick: () => setSelectedQuest(quest)
                            },
                                React.createElement('div', { className: 'item-details' },
                                    React.createElement('span', { className: 'item-name' }, `> ${quest.name.toUpperCase()}`),
                                    React.createElement('span', { className: 'item-meta' }, `LV.${quest.level} ${quest.type}`)
                                ),
                                isActive && React.createElement('span', { className: 'item-status' }, "[ ACTIVE ]")
                            )
                        })
                    ),

                    // Details
                    React.createElement('div', { className: 'retro-details-section' },
                        selectedQuest ? React.createElement(React.Fragment, null,
                            React.createElement('div', { className: 'details-header' },
                                React.createElement('h3', { className: 'retro-h3' }, `> ${selectedQuest.name.toUpperCase()}`),
                                React.createElement('span', { className: 'retro-text' }, `TYPE: ${selectedQuest.type.toUpperCase()}`)
                            ),
                            React.createElement('div', { className: 'retro-divider' }),
                            React.createElement('p', { className: 'retro-text large' }, selectedQuest.description),
                            React.createElement('p', { className: 'retro-text' }, `> OBJECTIVE: ${selectedQuest.objective}`),

                            React.createElement('div', { className: 'retro-status-box' },
                                React.createElement('p', null, "REWARD DATA:"),
                                React.createElement('p', { className: 'highlight-text' }, `XP: ${selectedQuest.rewards.exp || 0} | GOLD: ${selectedQuest.rewards.gold || 0}`)
                            ),

                            React.createElement('button', {
                                className: 'retro-action-btn primary full-width',
                                onClick: () => handleAcceptQuest(selectedQuest),
                                disabled: activeQuests.find(q => q.id === selectedQuest.id) || (!selectedQuest.repeatable && completedQuests.includes(selectedQuest.id))
                            }, activeQuests.find(q => q.id === selectedQuest.id) ? "[ QUEST ACTIVE ]" :
                                completedQuests.includes(selectedQuest.id) ? "[ COMPLETED ]" : "[ ACCEPT BOUNTY ]")

                        ) : React.createElement('div', { className: 'empty-state align-center' },
                            React.createElement('p', { className: 'retro-text' }, "> SELECT A BOUNTY TO VIEW DETAILS.")
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
                    width: 1000px;
                    max-width: 95vw;
                    height: 85vh;
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
                .retro-h2 { margin: 0; color: var(--primary); }
                .retro-close-btn { background: transparent; border: none; color: var(--danger); font-family: monospace; cursor: pointer; }
                .retro-close-btn:hover { background: var(--danger); color: black; }

                .retro-tabs { display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 20px; border-bottom: 1px solid #333; padding-bottom: 10px; }
                .retro-tab-btn {
                    background: transparent; border: 1px solid transparent; color: #666;
                    cursor: pointer; font-family: monospace; padding: 5px 10px;
                }
                .retro-tab-btn:hover { color: var(--primary); }
                .retro-tab-btn.active { border: 1px solid var(--primary); color: var(--primary); background: rgba(0, 255, 0, 0.1); }

                .retro-split-view { display: flex; flex: 1; overflow: hidden; gap: 20px; }
                
                .retro-list-section { flex: 1; overflow-y: auto; padding-right: 10px; border-right: 1px solid #333; }
                .retro-details-section { flex: 1; overflow-y: auto; padding: 10px; display: flex; flex-direction: column; }
                
                .retro-list-item { 
                    border: 1px solid #222; padding: 10px; margin-bottom: 8px; cursor: pointer;
                    display: flex; justify-content: space-between; align-items: center;
                }
                .retro-list-item:hover { border-color: #555; background: #111; }
                .retro-list-item.active { border-color: var(--primary); background: rgba(0, 255, 0, 0.05); }
                .retro-list-item.highlight { border-left: 3px solid var(--accent); }
                
                .item-name { font-weight: bold; display: block; }
                .item-meta { font-size: 0.8rem; color: #666; }
                .item-status { font-size: 0.8rem; color: var(--accent); }

                .retro-h3 { color: var(--accent); margin-bottom: 10px; }
                .retro-text { color: #aaa; margin-bottom: 10px; line-height: 1.4; }
                .retro-text.large { font-size: 1.1rem; color: #fff; margin-bottom: 20px; }
                .retro-divider { height: 1px; background: #333; margin: 15px 0; }
                
                .retro-status-box { border: 1px dashed #444; padding: 15px; margin: 20px 0; }
                .highlight-text { color: var(--accent); font-weight: bold; font-size: 1.1rem; }
                
                .retro-action-btn.full-width { width: 100%; margin-top: auto; padding: 15px; font-size: 1.1rem; }
                .retro-action-btn.primary { background: var(--primary); color: black; border: none; font-weight: bold; cursor: pointer; }
                .retro-action-btn.primary:hover:not(:disabled) { background: var(--accent); }
                .retro-action-btn:disabled { background: #333; color: #666; cursor: not-allowed; }
                
                .align-center { display: flex; justify-content: center; align-items: center; height: 100%; }
            `)
        )
    );
};

export default QuestBoard;
