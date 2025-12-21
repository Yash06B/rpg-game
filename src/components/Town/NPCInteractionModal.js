import React, { useState } from 'react';
import { useGame } from '../../context/GameContext.js';

import { CLASSES } from '../../data/classes.js';

const NPCInteractionModal = ({ npc, onClose }) => {
    const { state, dispatch, ACTIONS } = useGame();
    const [dialogueIndex, setDialogueIndex] = useState(0);
    const [questStatus, setQuestStatus] = useState(null); // 'available', 'active', 'completed'

    // Check quest status
    React.useEffect(() => {
        if (!npc.quest) return;

        // NPC Quests might be stored in a special 'npcQuests' object in state, 
        // OR we just use the common quest system structure but with a special flag.
        // For now, let's assume we check 'questFlags' or similar. 
        // Actually, let's just use a local check against 'completedQuests' and 'activeCommonQuests' 
        // assuming we merge them or have a separate list.

        // Simplification: We'll store NPC quests in the same 'activeCommonQuests' for now, 
        // or add a new 'activeNPCQuests' if needed. Let's use 'activeCommonQuests' but with the distinct ID.

        const isActive = state.world.activeCommonQuests.find(q => q.id === npc.quest.id);
        const isCompleted = state.world.completedQuests.includes(npc.quest.id);

        if (isCompleted) setQuestStatus('completed');
        else if (isActive) setQuestStatus('active');
        else setQuestStatus('available');

    }, [npc, state.world]);

    const handleNextDialogue = () => {
        if (dialogueIndex < npc.dialogue.length - 1) {
            setDialogueIndex(dialogueIndex + 1);
        } else {
            // End of dialogue
        }
    };

    const handleAcceptQuest = () => {
        dispatch({
            type: ACTIONS.UPDATE_PLAYER_DATA,
            payload: {
                world: {
                    ...state.world,
                    activeCommonQuests: [...state.world.activeCommonQuests, {
                        id: npc.quest.id,
                        progress: 0,
                        accepted: Date.now(),
                        type: 'npc', // Mark as NPC quest
                        target: npc.quest.objective,
                        reward: npc.quest.reward
                    }]
                }
            }
        });
        setQuestStatus('active');
        alert("Quest Accepted: " + npc.quest.name);
    };

    const handleCompleteQuest = () => {
        // Here we would check if objective is met. 
        // For "Special" quests like Race Change, we assume they are "Talk to NPC" style 
        // or we auto-complete if the user has the item. 
        // For simplicity in this demo, "Special" quests from NPCs might be instant-complete 
        // if they are just "dialogue" or "event" based, OR we just give the reward.

        // If it's a Race Change quest (type: 'special' and has race reward)
        if (npc.quest.reward.race) {
            if (window.confirm(`Accepting this reward will change your race to ${npc.quest.reward.race}. Proceed?`)) {
                dispatch({ type: ACTIONS.SET_RACE, payload: npc.quest.reward.race });
            } else {
                return;
            }
        }

        // If it's a Class Change quest
        if (npc.quest.reward.class) {
            const newClassName = npc.quest.reward.class;
            // Find class key by label (e.g. "Holy Paladin")
            const classKey = Object.keys(CLASSES).find(key => CLASSES[key].label === newClassName || CLASSES[key].id === newClassName) || 'HolyPaladin';
            const classData = CLASSES[classKey];

            if (window.confirm(`Accepting this reward will change your class to ${newClassName}. All stats will be updated. Proceed?`)) {
                dispatch({
                    type: ACTIONS.SET_PLAYER_CLASS,
                    payload: {
                        className: classData.label,
                        stats: classData.stats
                    }
                });
            } else {
                return;
            }
        }

        // Give standard rewards
        const { exp, gold, item } = npc.quest.reward;
        let newInventory = [...state.player.inventory];
        if (item) newInventory.push(item);

        dispatch({
            type: ACTIONS.UPDATE_PLAYER_DATA,
            payload: {
                player: {
                    ...state.player,
                    exp: state.player.exp + (exp || 0),
                    gold: state.player.gold + (gold || 0),
                    inventory: newInventory
                },
                world: {
                    ...state.world,
                    activeCommonQuests: state.world.activeCommonQuests.filter(q => q.id !== npc.quest.id),
                    completedQuests: [...state.world.completedQuests, npc.quest.id]
                }
            }
        });
        setQuestStatus('completed');
        alert(`Quest Completed! Rewards: ${exp} XP, ${gold} Gold${item ? ', ' + item : ''}`);
        onClose();
    };

    return React.createElement('div', { className: 'modal-overlay fade-in' },
        React.createElement('div', { className: 'modal-content npc-modal' },
            React.createElement('div', { className: 'npc-header' },
                React.createElement('span', { className: 'npc-sprite-large' }, npc.sprite),
                React.createElement('div', null,
                    React.createElement('h2', null, npc.name),
                    React.createElement('p', { className: 'npc-personality' }, npc.personality)
                ),
                React.createElement('button', { className: 'close-btn', onClick: onClose }, "CLOSE")
            ),

            React.createElement('div', { className: 'dialogue-box' },
                React.createElement('p', null, `"${npc.dialogue[dialogueIndex]}"`),
                dialogueIndex < npc.dialogue.length - 1 &&
                React.createElement('button', { className: 'next-btn', onClick: handleNextDialogue }, "Next ▶")
            ),

            npc.quest && React.createElement('div', { className: 'npc-quest-section' },
                React.createElement('h3', null, questStatus === 'completed' ? "Quest Completed" : "Quest Available"),
                React.createElement('div', { className: 'quest-card' },
                    React.createElement('h4', null, npc.quest.name),
                    React.createElement('p', null, npc.quest.objective),
                    React.createElement('div', { className: 'rewards' },
                        React.createElement('span', null, `${npc.quest.reward.exp} XP`),
                        React.createElement('span', null, `${npc.quest.reward.gold} Gold`),
                        npc.quest.reward.race && React.createElement('span', { className: 'rare-reward' }, `Race: ${npc.quest.reward.race}`)
                    ),

                    questStatus === 'available' && React.createElement('button', {
                        className: 'quest-btn accept',
                        onClick: handleAcceptQuest
                    }, "Accept Quest"),

                    questStatus === 'active' && React.createElement('button', {
                        className: 'quest-btn complete',
                        onClick: handleCompleteQuest // In real game, verify conditions first
                    }, "Complete Quest")
                )
            ),

            React.createElement('style', null, `
                .npc-modal { max-width: 600px; background: var(--bg-panel); border: 2px solid var(--primary); }
                .npc-header { display: flex; gap: 20px; align-items: center; margin-bottom: 20px; border-bottom: 1px solid var(--border); padding-bottom: 15px; }
                .npc-sprite-large { font-size: 3rem; }
                .npc-personality { font-style: italic; color: var(--text-muted); }
                .dialogue-box { background: var(--bg-dark); padding: 20px; border-radius: var(--radius-md); border-left: 4px solid var(--accent); margin-bottom: 20px; position: relative; }
                .dialogue-box p { font-size: 1.1rem; line-height: 1.6; font-family: 'Georgia', serif; }
                .next-btn { position: absolute; bottom: 10px; right: 10px; background: none; border: none; color: var(--primary); cursor: pointer; font-weight: bold; }
                
                .npc-quest-section { margin-top: 20px; }
                .quest-card { background: rgba(0,0,0,0.2); padding: 15px; border-radius: var(--radius-md); border: 1px solid var(--border); }
                .quest-card h4 { color: #fbbf24; margin-bottom: 5px; }
                .quest-btn { width: 100%; padding: 10px; margin-top: 10px; border-radius: var(--radius-sm); border: none; cursor: pointer; font-weight: bold; }
                .quest-btn.accept { background: var(--primary); color: white; }
                .quest-btn.complete { background: #10b981; color: white; }
                .rare-reward { color: #ec4899; }
            `)
        )
    );
};

export default NPCInteractionModal;
