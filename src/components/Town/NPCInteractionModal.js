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
        React.createElement('div', { className: 'retro-modal-box' },
            React.createElement('div', { className: 'retro-modal-header' },
                React.createElement('div', { className: 'header-left' },
                    React.createElement('span', { className: 'npc-sprite' }, npc.sprite),
                    React.createElement('h2', { className: 'retro-h2' }, `> ${npc.name.toUpperCase()}`)
                ),
                React.createElement('button', { className: 'retro-close-btn', onClick: onClose }, "[ X ] END COMMS")
            ),

            React.createElement('div', { className: 'retro-content-area' },
                React.createElement('div', { className: 'retro-dialogue-box' },
                    React.createElement('p', { className: 'retro-text typing' }, `"${npc.dialogue[dialogueIndex]}"`),
                    dialogueIndex < npc.dialogue.length - 1 &&
                    React.createElement('button', { className: 'retro-action-btn small', onClick: handleNextDialogue }, "[ NEXT ]")
                ),

                npc.quest && React.createElement('div', { className: 'retro-quest-section' },
                    React.createElement('div', { className: 'retro-divider' }),
                    React.createElement('h3', { className: 'retro-h3' }, questStatus === 'completed' ? "> QUEST COMPLETE" : "> QUEST AVAILABLE"),

                    React.createElement('div', { className: 'retro-status-box' },
                        React.createElement('h4', { className: 'retro-h4' }, npc.quest.name),
                        React.createElement('p', { className: 'retro-text' }, npc.quest.objective),
                        React.createElement('div', { className: 'retro-rewards' },
                            React.createElement('span', null, `REWARD: ${npc.quest.reward.exp} XP | ${npc.quest.reward.gold} G`),
                            npc.quest.reward.race && React.createElement('span', { className: 'highlight-text' }, ` [ RACE: ${npc.quest.reward.race} ]`)
                        )
                    ),

                    questStatus === 'available' && React.createElement('button', {
                        className: 'retro-action-btn primary full-width',
                        onClick: handleAcceptQuest
                    }, "[ ACCEPT ASSIGNMENT ]"),

                    questStatus === 'active' && React.createElement('button', {
                        className: 'retro-action-btn success full-width',
                        onClick: handleCompleteQuest
                    }, "[ COMPLETE ASSIGNMENT ]")
                )
            ),

            React.createElement('style', null, `
                .retro-modal-box {
                    background: #000;
                    border: 2px solid var(--primary);
                    padding: 20px;
                    width: 600px;
                    max-width: 95vw;
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
                .header-left { display: flex; align-items: center; gap: 15px; }
                .npc-sprite { font-size: 2rem; }
                .retro-h2 { margin: 0; color: var(--primary); }
                .retro-close-btn { background: transparent; border: none; color: var(--danger); font-family: monospace; cursor: pointer; }
                .retro-close-btn:hover { background: var(--danger); color: black; }

                .retro-content-area { display: flex; flex-direction: column; gap: 20px; }
                
                .retro-dialogue-box { 
                    border: 1px solid #333; padding: 15px; min-height: 100px; 
                    display: flex; flex-direction: column; justify-content: space-between;
                }
                .retro-text.typing { color: #fff; font-size: 1.1rem; line-height: 1.5; margin: 0; }
                
                .retro-action-btn.small { 
                    align-self: flex-end; padding: 5px 10px; margin-top: 10px;
                    background: transparent; border: 1px solid #444; color: var(--primary); cursor: pointer;
                }
                .retro-action-btn.small:hover { border-color: var(--primary); background: var(--primary); color: black; }

                .retro-divider { height: 1px; background: #333; margin: 15px 0; }
                .retro-h3 { color: var(--accent); margin-bottom: 10px; }
                
                .retro-status-box { border: 1px dashed #444; padding: 15px; margin-bottom: 20px; }
                .retro-h4 { color: #fff; margin: 0 0 5px 0; }
                .retro-rewards { margin-top: 10px; font-weight: bold; color: var(--accent); }
                .highlight-text { color: #ec4899; }
                
                .retro-action-btn.full-width { width: 100%; padding: 15px; font-size: 1.1rem; font-family: monospace; cursor: pointer; border: none; font-weight: bold; }
                .retro-action-btn.primary { background: var(--primary); color: black; }
                .retro-action-btn.primary:hover { background: var(--accent); }
                .retro-action-btn.success { background: var(--accent); color: black; }
                .retro-action-btn.success:hover { background: #fff; }
            `)
        )
    );
};

export default NPCInteractionModal;
