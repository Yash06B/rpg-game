import React, { useState } from 'react';
import { useGame } from '../../context/GameContext.js';
import { QUESTS, getActiveQuestStep, isQuestComplete } from '../../data/quests.js';

const QuestTracker = ({ onClose }) => {
  const { state } = useGame();
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

  return React.createElement('div', { className: 'modal-overlay fade-in' },
    React.createElement('div', { className: 'modal-content quest-modal' },
      React.createElement('div', { className: 'modal-header' },
        React.createElement('h2', null, "📜 Quest Log"),
        React.createElement('button', { className: 'close-btn', onClick: onClose }, "×")
      ),

      React.createElement('div', { className: 'quest-list-container' },
        // Active Quests
        React.createElement('div', { className: 'quest-section' },
          React.createElement('h3', { className: 'section-title' }, `Active (${activeQuests.length})`),
          activeQuests.length === 0
            ? React.createElement('p', { className: 'no-quests' }, "No active quests. Explore towns to find hidden questlines!")
            : activeQuests.map(q =>
              React.createElement('div', { key: q.questId, className: 'quest-card active' },
                React.createElement('div', { className: 'card-header' },
                  React.createElement('span', { className: 'q-name' }, q.questName),
                  React.createElement('span', { className: 'q-step' }, `Step ${q.step}/7`)
                ),
                React.createElement('div', { className: 'card-body' },
                  React.createElement('p', { className: 'q-title' }, q.title),
                  React.createElement('p', { className: 'q-desc' }, q.description),
                  q.npc && React.createElement('p', { className: 'q-npc' }, `→ Talk to: ${q.npc}`)
                ),
                React.createElement('div', { className: 'progress-track' },
                  React.createElement('div', {
                    className: 'progress-fill',
                    style: { width: `${(q.step / 7) * 100}%` }
                  })
                )
              )
            )
        ),

        // Completed Quests
        completedQuests.length > 0 && React.createElement('div', { className: 'quest-section' },
          React.createElement('h3', { className: 'section-title' }, `Completed (${completedQuests.length})`),
          completedQuests.map(qId =>
            React.createElement('div', { key: qId, className: 'quest-card completed' },
              React.createElement('span', null, QUESTS[qId].name),
              React.createElement('span', { className: 'check' }, "✓")
            )
          )
        )
      ),

      // Styles
      React.createElement('style', null, `
                .modal-overlay {
                    position: fixed; top: 0; left: 0; width: 100%; height: 100%;
                    background: rgba(0, 0, 0, 0.8);
                    display: flex; justify-content: center; align-items: center;
                    z-index: 2000;
                    backdrop-filter: blur(5px);
                }
                .quest-modal {
                    background: var(--bg-panel);
                    width: 90%; max-width: 600px;
                    max-height: 85vh;
                    border-radius: 12px;
                    border: 1px solid var(--border);
                    box-shadow: 0 0 30px rgba(0,0,0,0.5);
                    display: flex; flex-direction: column;
                    overflow: hidden;
                }
                .modal-header {
                    padding: 20px;
                    background: rgba(0,0,0,0.2);
                    border-bottom: 1px solid var(--border);
                    display: flex; justify-content: space-between; align-items: center;
                }
                .modal-header h2 { margin: 0; color: var(--primary); }
                .close-btn {
                    background: none; border: none; color: var(--text-muted);
                    font-size: 2rem; cursor: pointer;
                }
                .close-btn:hover { color: white; }

                .quest-list-container {
                    padding: 20px;
                    overflow-y: auto;
                    flex: 1;
                    padding-bottom: 60px;
                }
                .section-title {
                    font-size: 0.9rem; color: var(--text-muted); text-transform: uppercase;
                    margin-bottom: 15px; border-bottom: 1px solid var(--border); padding-bottom: 5px;
                }
                
                .quest-card {
                    background: rgba(255,255,255,0.03);
                    border: 1px solid var(--border);
                    border-radius: 8px;
                    margin-bottom: 15px;
                    overflow: hidden;
                }
                .quest-card.active { border-left: 4px solid var(--primary); }
                .quest-card.completed { 
                    padding: 15px; display: flex; justify-content: space-between; 
                    opacity: 0.6; background: rgba(0,0,0,0.2);
                }
                
                .card-header {
                    background: rgba(0,0,0,0.2);
                    padding: 10px 15px;
                    display: flex; justify-content: space-between;
                    font-weight: bold;
                }
                .q-name { color: white; }
                .q-step { color: var(--accent); font-size: 0.8rem; }
                
                .card-body { padding: 15px; }
                .q-title { color: var(--primary); font-weight: bold; margin-bottom: 5px; }
                .q-desc { font-size: 0.9rem; color: #ccc; line-height: 1.4; margin-bottom: 10px; }
                .q-npc { font-size: 0.85rem; color: #fbbf24; font-style: italic; }
                
                .progress-track { height: 4px; background: #222; }
                .progress-fill { height: 100%; background: var(--primary); }
                
                .check { color: #10b981; font-weight: bold; }
                .no-quests { text-align: center; padding: 20px; color: var(--text-muted); font-style: italic; }
            `)
    )
  );
};

export default QuestTracker;
