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
        React.createElement('div', { className: 'modal-content quest-board-modal' },
            React.createElement('div', { className: 'modal-header' },
                React.createElement('h2', null, "📋 Quest Board"),
                React.createElement('button', { className: 'close-btn', onClick: onClose }, "CLOSE")
            ),

            React.createElement('div', { className: 'quest-board-content' },
                // Category Filter
                React.createElement('div', { className: 'category-tabs' },
                    React.createElement('button', {
                        className: selectedCategory === 'all' ? 'active' : '',
                        onClick: () => setSelectedCategory('all')
                    }, "All"),
                    Object.keys(QUEST_CATEGORIES).map(cat =>
                        React.createElement('button', {
                            key: cat,
                            className: selectedCategory === cat.toLowerCase() ? 'active' : '',
                            onClick: () => setSelectedCategory(cat.toLowerCase())
                        }, QUEST_CATEGORIES[cat])
                    )
                ),

                // Quest List
                React.createElement('div', { className: 'quest-list-panel' },
                    React.createElement('h3', null, `Available Quests (${displayQuests.length})`),
                    React.createElement('div', { className: 'quest-grid' },
                        displayQuests.map(quest => {
                            const isActive = activeQuests.find(q => q.id === quest.id);
                            const isCompleted = completedQuests.includes(quest.id);

                            return React.createElement('div', {
                                key: quest.id,
                                className: `quest-item ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`,
                                onClick: () => setSelectedQuest(quest)
                            },
                                React.createElement('div', { className: 'quest-type' }, quest.type.toUpperCase()),
                                React.createElement('h4', null, quest.name),
                                React.createElement('p', { className: 'quest-short-desc' }, quest.description),
                                React.createElement('div', { className: 'quest-rewards' },
                                    React.createElement('span', null, `${quest.rewards.exp || 0} XP`),
                                    React.createElement('span', null, `${quest.rewards.gold || 0}g`)
                                ),
                                isActive && React.createElement('div', { className: 'active-badge' }, "ACTIVE"),
                                isCompleted && !quest.repeatable && React.createElement('div', { className: 'completed-badge' }, "✓")
                            );
                        })
                    )
                ),

                // Quest Details
                selectedQuest && React.createElement('div', { className: 'quest-details' },
                    React.createElement('h2', null, selectedQuest.name),
                    React.createElement('p', { className: 'type-badge' }, selectedQuest.type.toUpperCase()),
                    React.createElement('p', { className: 'description' }, selectedQuest.description),
                    React.createElement('div', { className: 'objective' },
                        React.createElement('h4', null, "Objective:"),
                        React.createElement('p', null, selectedQuest.objective)
                    ),
                    React.createElement('div', { className: 'rewards-detail' },
                        React.createElement('h4', null, "Rewards:"),
                        React.createElement('p', null, `EXP: ${selectedQuest.rewards.exp || 0}`),
                        React.createElement('p', null, `Gold: ${selectedQuest.rewards.gold || 0}`),
                        selectedQuest.rewards.items && React.createElement('p', null,
                            `Items: ${selectedQuest.rewards.items.join(', ')}`
                        )
                    ),
                    React.createElement('div', { className: 'quest-meta' },
                        React.createElement('p', null, `Level Requirement: ${selectedQuest.level}`),
                        React.createElement('p', null, `${selectedQuest.repeatable === 'daily' ? 'Daily Quest' : selectedQuest.repeatable ? 'Repeatable' : 'One-time Quest'}`)
                    ),
                    React.createElement('button', {
                        className: 'accept-btn',
                        onClick: () => handleAcceptQuest(selectedQuest),
                        disabled: activeQuests.find(q => q.id === selectedQuest.id) ||
                            (!selectedQuest.repeatable && completedQuests.includes(selectedQuest.id))
                    },
                        activeQuests.find(q => q.id === selectedQuest.id) ? "Active" :
                            completedQuests.includes(selectedQuest.id) ? "Completed" : "Accept Quest"
                    )
                )
            )
        ),

        // Styles
        React.createElement('style', null, `
      .quest-board-modal { width: 95vw; max-width: 1200px; height: 90vh; }
      .quest-board-content { display: flex; flex-direction: column; height: calc(100% - 60px); padding: 20px; }
      
      .category-tabs { display: flex; gap: 5px; flex-wrap: wrap; margin-bottom: 20px; padding-bottom: 15px; border-bottom: 2px solid var(--border); }
      .category-tabs button { background: var(--bg-dark); border: 1px solid var(--border); color: var(--text-muted); padding: 8px 15px; border-radius: var(--radius-md); cursor: pointer; font-size: 0.85rem; transition: all 0.2s; }
      .category-tabs button:hover { border-color: var(--primary); }
      .category-tabs button.active { background: var(--primary); color: white; border-color: var(--primary); }
      
      .quest-list-panel { flex: 1; overflow-y: auto; margin-bottom: 20px; }
      .quest-list-panel h3 { color: var(--primary); margin-bottom: 15px; }
      
      .quest-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 12px; }
      
      .quest-item {
        background: var(--bg-dark);
        border: 2px solid var(--border);
        border-radius: var(--radius-md);
        padding: 15px;
        cursor: pointer;
        transition: all 0.2s;
        position: relative;
      }
      .quest-item:hover { border-color: var(--primary); transform: translateY(-2px); }
      .quest-item.active { border-color: #10b981; background: rgba(16, 185, 129, 0.1); }
      .quest-item.completed { opacity: 0.6; }
      
      .quest-type {
        background: var(--accent);
        color: white;
        padding: 3px 10px;
        border-radius: 12px;
        font-size: 0.7rem;
        font-weight: bold;
        display: inline-block;
        margin-bottom: 8px;
      }
      
      .quest-item h4 { margin: 5px 0; color: var(--text-main); font-size: 1rem; }
      .quest-short-desc { font-size: 0.85rem; color: var(--text-muted); margin: 8px 0; line-height: 1.3; }
      
      .quest-rewards { display: flex; gap: 10px; margin-top: 10px; }
      .quest-rewards span { background: var(--bg-panel); padding: 4px 10px; border-radius: 8px; font-size: 0.8rem; color: #fbbf24; font-weight: bold; }
      
      .active-badge { position: absolute; top: 10px; right: 10px; background: #10b981; color: white; padding: 4px 12px; border-radius: 12px; font-size: 0.7rem; font-weight: bold; }
      .completed-badge { position: absolute; top: 10px; right: 10px; background: #6b7280; color: white; padding: 4px 12px; border-radius: 12px; font-size: 0.9rem; font-weight: bold; }
      
      .quest-details {
        background: var(--bg-panel);
        padding: 25px;
        border-radius: var(--radius-lg);
        border: 2px solid var(--primary);
        max-height: 400px;
        overflow-y: auto;
      }
      .quest-details h2 { color: var(--primary); margin-bottom: 10px; }
      .quest-details .description { color: var(--text-muted); margin: 15px 0; line-height: 1.6; }
      .quest-details .objective { background: var(--bg-dark); padding: 15px; border-radius: var(--radius-md); margin: 15px 0; }
      .quest-details .objective h4 { color: var(--accent); margin-bottom: 8px; }
      .quest-details .rewards-detail { margin: 15px 0; }
      .quest-details .rewards-detail h4 { color: #10b981; margin-bottom: 8px; }
      .quest-details .rewards-detail p { margin: 5px 0; color: var(--text-main); }
      .quest-details .quest-meta { margin-top: 15px; padding-top: 15px; border-top: 1px solid var(--border); }
      .quest-details .quest-meta p { color: var(--text-muted); font-size: 0.85rem; margin: 5px 0; }
      
      .accept-btn {
        width: 100%;
        padding: 15px;
        background: var(--primary);
        color: white;
        border: none;
        border-radius: var(--radius-md);
        font-weight: bold;
        font-size: 1.1rem;
        cursor: pointer;
        margin-top: 20px;
        transition: all 0.2s;
      }
      .accept-btn:hover:not(:disabled) { background: var(--accent); transform: translateY(-2px); }
      .accept-btn:disabled { background: var(--bg-dark); color: var(--text-muted); cursor: not-allowed; }
    `)
    );
};

export default QuestBoard;
