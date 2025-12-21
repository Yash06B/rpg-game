import React, { useState } from 'react';
import { useGame } from '../../context/GameContext.js';
import { QUESTS, getActiveQuestStep, isQuestComplete } from '../../data/quests.js';

const QuestTracker = () => {
    const { state } = useGame();
    const [expanded, setExpanded] = useState(true);
    const questFlags = state.world.questFlags || {};

    // Get all active quests
    const activeQuests = [];
    Object.keys(QUESTS).forEach(questId => {
        if (!isQuestComplete(questId, questFlags)) {
            const activeStep = getActiveQuestStep(questId, questFlags);
            if (activeStep) {
                activeQuests.push({
                    questId,
                    questName: QUESTS[questId].name,
                    town: QUESTS[questId].town,
                    ...activeStep
                });
            }
        }
    });

    // Get completed quests
    const completedQuests = Object.keys(QUESTS).filter(qId =>
        isQuestComplete(qId, questFlags)
    );

    if (!expanded) {
        return React.createElement('div', { className: 'quest-tracker-mini' },
            React.createElement('button', {
                className: 'expand-btn',
                onClick: () => setExpanded(true)
            }, `📜 Quests (${activeQuests.length})`)
        );
    }

    return React.createElement('div', { className: 'quest-tracker fade-in' },
        React.createElement('div', { className: 'tracker-header' },
            React.createElement('h3', null, "📜 Quest Log"),
            React.createElement('button', {
                className: 'minimize-btn',
                onClick: () => setExpanded(false)
            }, "−")
        ),

        // Active Quests
        React.createElement('div', { className: 'quest-section' },
            React.createElement('h4', null, `Active (${activeQuests.length})`),
            activeQuests.length === 0
                ? React.createElement('p', { className: 'no-quests' }, "No active quests. Explore towns to find hidden questlines!")
                : activeQuests.map(q =>
                    React.createElement('div', { key: q.questId, className: 'quest-card active' },
                        React.createElement('div', { className: 'quest-title' }, q.questName),
                        React.createElement('div', { className: 'quest-step' }, `Step ${q.step}/7: ${q.title}`),
                        React.createElement('p', { className: 'quest-desc' }, q.description),
                        q.npc && React.createElement('p', { className: 'quest-npc' }, `→ Talk to: ${q.npc}`),
                        React.createElement('div', { className: 'progress-bar' },
                            React.createElement('div', {
                                className: 'progress-fill',
                                style: { width: `${(q.step / 7) * 100}%` }
                            })
                        )
                    )
                )
        ),

        // Completed Quests
        completedQuests.length > 0 && React.createElement('div', { className: 'quest-section completed-section' },
            React.createElement('h4', null, `✓ Completed (${completedQuests.length})`),
            completedQuests.map(qId =>
                React.createElement('div', { key: qId, className: 'quest-card completed' },
                    React.createElement('div', { className: 'quest-title' }, QUESTS[qId].name),
                    React.createElement('span', { className: 'check' }, "✓")
                )
            )
        ),

        // Styles
        React.createElement('style', null, `
      .quest-tracker-mini {
        position: fixed;
        top: 80px;
        right: 20px;
        z-index: 1000;
      }
      .expand-btn {
        background: var(--bg-card);
        border: 1px solid var(--border);
        color: var(--text-main);
        padding: 10px 15px;
        border-radius: var(--radius-md);
        cursor: pointer;
        font-size: 0.9rem;
        box-shadow: 0 2px 10px rgba(0,0,0,0.3);
      }
      .expand-btn:hover {
        background: var(--bg-panel);
      }

      .quest-tracker {
        position: fixed;
        top: 20px;
        right: 20px;
        width: 350px;
        max-height: 80vh;
        background: rgba(20, 20, 30, 0.95);
        backdrop-filter: blur(10px);
        border: 1px solid var(--border);
        border-radius: var(--radius-lg);
        padding: 15px;
        overflow-y: auto;
        z-index: 1000;
        box-shadow: 0 10px 40px rgba(0,0,0,0.5);
      }
      
      .tracker-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 15px;
        padding-bottom: 10px;
        border-bottom: 1px solid var(--border);
      }
      .tracker-header h3 {
        margin: 0;
        color: var(--primary);
      }
      .minimize-btn {
        background: transparent;
        border: none;
        color: var(--text-muted);
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0 5px;
      }
      .minimize-btn:hover {
        color: var(--text-main);
      }

      .quest-section {
        margin-bottom: 20px;
      }
      .quest-section h4 {
        font-size: 0.9rem;
        color: var(--text-muted);
        margin-bottom: 10px;
        text-transform: uppercase;
        letter-spacing: 1px;
      }

      .quest-card {
        background: var(--bg-dark);
        border: 1px solid var(--border);
        border-radius: var(--radius-md);
        padding: 12px;
        margin-bottom: 10px;
        transition: transform 0.2s;
      }
      .quest-card:hover {
        transform: translateX(-3px);
        border-color: var(--primary);
      }
      .quest-card.active {
        border-left: 3px solid var(--primary);
      }
      .quest-card.completed {
        opacity: 0.7;
        border-left: 3px solid #10b981;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .quest-title {
        font-weight: bold;
        color: var(--text-main);
        margin-bottom: 5px;
      }
      .quest-step {
        font-size: 0.85rem;
        color: var(--accent);
        margin-bottom: 5px;
      }
      .quest-desc {
        font-size: 0.8rem;
        color: var(--text-muted);
        margin: 5px 0;
        line-height: 1.4;
      }
      .quest-npc {
        font-size: 0.75rem;
        color: #fbbf24;
        font-style: italic;
        margin-top: 5px;
      }

      .progress-bar {
        background: #222;
        height: 4px;
        border-radius: 2px;
        margin-top: 8px;
        overflow: hidden;
      }
      .progress-fill {
        background: linear-gradient(90deg, var(--primary) 0%, var(--accent) 100%);
        height: 100%;
        transition: width 0.5s;
      }

      .check {
        color: #10b981;
        font-size: 1.2rem;
      }

      .no-quests {
        font-size: 0.85rem;
        color: var(--text-muted);
        font-style: italic;
        padding: 10px;
        text-align: center;
      }

      .completed-section {
        opacity: 0.8;
      }
    `)
    );
};

export default QuestTracker;
