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
    React.createElement('div', { className: 'retro-modal-box' },
      React.createElement('div', { className: 'retro-modal-header' },
        React.createElement('h2', { className: 'retro-h2' }, "> QUEST DATABASE"),
        React.createElement('button', { className: 'retro-close-btn', onClick: onClose }, "[ X ] CLOSE")
      ),

      React.createElement('div', { className: 'retro-list-container' },
        // Active Quests
        React.createElement('div', { className: 'quest-section' },
          React.createElement('h3', { className: 'retro-h3' }, `> ACTIVE ASSIGNMENTS (${activeQuests.length})`),
          activeQuests.length === 0
            ? React.createElement('p', { className: 'retro-text' }, "> NO ACTIVE MISSIONS DETECTED.")
            : activeQuests.map(q =>
              React.createElement('div', { key: q.questId, className: 'retro-quest-item' },
                React.createElement('div', { className: 'quest-header' },
                  React.createElement('span', { className: 'q-name' }, `>> ${q.questName.toUpperCase()}`),
                  React.createElement('span', { className: 'q-step' }, `[ STEP ${q.step}/7 ]`)
                ),
                React.createElement('div', { className: 'quest-body' },
                  React.createElement('p', { className: 'q-title' }, `OBJ: ${q.title}`),
                  React.createElement('p', { className: 'q-desc' }, q.description),
                  q.npc && React.createElement('p', { className: 'q-npc' }, `TARGET NPC: ${q.npc}`)
                )
              )
            )
        ),

        // Completed Quests
        completedQuests.length > 0 && React.createElement('div', { className: 'quest-section' },
          React.createElement('br', null),
          React.createElement('h3', { className: 'retro-h3' }, `> COMPLETED ARCHIVE (${completedQuests.length})`),
          completedQuests.map(qId =>
            React.createElement('div', { key: qId, className: 'retro-quest-item completed' },
              React.createElement('span', null, QUESTS[qId]?.name || qId),
              React.createElement('span', { className: 'check' }, "[ COMPLETE ]")
            )
          )
        )
      ),

      // Styles
      React.createElement('style', null, `
                .modal-overlay {
                    position: fixed; top: 0; left: 0; width: 100%; height: 100%;
                    background: rgba(0, 0, 0, 0.9);
                    display: flex; justify-content: center; align-items: center;
                    z-index: 2000;
                }
                .retro-modal-box {
                    background: #000;
                    width: 700px; max-width: 95vw;
                    max-height: 85vh;
                    border: 2px solid var(--primary);
                    display: flex; flex-direction: column;
                    padding: 20px;
                    color: var(--primary);
                    font-family: monospace;
                    box-shadow: 0 0 0 1000px rgba(0,0,0,0.8);
                }
                .retro-modal-header {
                    display: flex; justify-content: space-between; align-items: center;
                    border-bottom: 2px solid var(--border);
                    padding-bottom: 15px;
                    margin-bottom: 20px;
                }
                .retro-h2 { margin: 0; color: var(--primary); }
                .retro-close-btn {
                    background: transparent; border: none; color: var(--danger);
                    font-family: monospace; font-size: 1.1rem; cursor: pointer;
                }
                .retro-close-btn:hover { background: var(--danger); color: black; }

                .retro-list-container {
                    padding-right: 10px;
                    overflow-y: auto;
                    flex: 1;
                }
                .retro-h3 { 
                    border-bottom: 1px dashed var(--text-muted); 
                    margin-bottom: 10px; color: var(--accent); 
                }
                
                .retro-quest-item {
                    border: 1px solid #333;
                    padding: 10px;
                    margin-bottom: 10px;
                }
                .retro-quest-item.completed {
                    display: flex; justify-content: space-between;
                    border-color: #222;
                    color: #666;
                }
                
                .quest-header {
                    display: flex; justify-content: space-between;
                    font-weight: bold;
                    margin-bottom: 5px;
                    color: var(--primary);
                }
                .q-step { color: var(--accent); }
                
                .quest-body { padding-left: 10px; border-left: 2px solid #333; }
                .q-title { font-weight: bold; margin-bottom: 5px; color: #fff; }
                .q-desc { font-size: 0.9rem; color: #ccc; margin-bottom: 5px; }
                .q-npc { font-size: 0.9rem; color: #fbbf24; font-style: italic; }
                
                .check { color: #10b981; }
                .retro-text { font-style: italic; color: #555; }
            `)
    )
  );
};

export default QuestTracker;
