import React, { useState, useEffect } from 'react';
import { useGame } from '../../context/GameContext.js';
import { STORY } from '../../data/story.js';

const StoryModal = () => {
    const { state, dispatch, ACTIONS } = useGame();
    const [currentStory, setCurrentStory] = useState(null);
    const [page, setPage] = useState(0);

    // Check for story triggers
    useEffect(() => {
        const checkStory = () => {
            // Intro Story (if not seen)
            if (state.system.view === 'town' && !state.world.introSeen) {
                return { ...STORY.intro, id: 'intro' };
            }

            // Town Entry Stories
            const currentTown = state.world.location;
            if (state.system.view === 'town' &&
                currentTown.startsWith('town') &&
                !state.world.visitedTowns?.[currentTown]) {
                return { ...STORY[currentTown], id: currentTown };
            }

            // Boss Victory Stories (handled via flags)
            const flags = state.world.questFlags || {};
            const bossStories = ['pride', 'greed', 'wrath', 'envy', 'lust', 'gluttony', 'sloth'];

            for (const boss of bossStories) {
                if (flags[`${boss}_defeated`] && !flags[`${boss}_story_seen`]) {
                    return { ...STORY[`victory_${boss}`], id: `${boss}_victory` };
                }
            }

            return null;
        };

        const story = checkStory();
        if (story) {
            setCurrentStory(story);
            setPage(0);
        }
    }, [state.system.view, state.world.location, state.world.questFlags]);

    const handleNext = () => {
        if (currentStory && page < currentStory.text.length - 1) {
            setPage(prev => prev + 1);
        } else {
            handleClose();
        }
    };

    const handleClose = () => {
        if (!currentStory) return;

        // Update state to mark story as seen
        const updates = { world: { ...state.world } };

        if (currentStory.id === 'intro') {
            updates.world.introSeen = true;
            updates.world.visitedTowns = { ...(state.world.visitedTowns || {}), town_1: true };
        } else if (currentStory.id.startsWith('town')) {
            updates.world.visitedTowns = {
                ...(state.world.visitedTowns || {}),
                [currentStory.id]: true
            };
        } else if (currentStory.id.endsWith('_victory')) {
            const boss = currentStory.id.replace('_victory', '');
            updates.world.questFlags = {
                ...state.world.questFlags,
                [`${boss}_story_seen`]: true
            };
        }

        dispatch({
            type: ACTIONS.UPDATE_PLAYER_DATA,
            payload: {
                player: state.player, // CRITICAL FIX: Preserve player state
                world: updates.world
            }
        });

        setCurrentStory(null);

        // Check for final victory
        if (currentStory.id === 'sloth_victory') {
            // Trigger ending sequence (maybe via another state/component)
        }
    };

    if (!currentStory) return null;

    return React.createElement('div', { className: 'modal-overlay fade-in' },
        React.createElement('div', { className: 'retro-modal-box story-override' },
            React.createElement('div', { className: 'retro-modal-header' },
                React.createElement('h2', { className: 'retro-h2' }, `> ${currentStory.title ? currentStory.title.toUpperCase() : "TRANSMISSION"}`),
            ),

            React.createElement('div', { className: 'retro-content-area center-content' },
                React.createElement('p', { className: 'retro-text large typewriter' },
                    `"${currentStory.text[page]}"`
                )
            ),

            React.createElement('div', { className: 'retro-action-bar' },
                React.createElement('span', { className: 'retro-text small' },
                    `PAGE ${page + 1} / ${currentStory.text.length}`
                ),
                React.createElement('button', { className: 'retro-action-btn primary', onClick: handleNext },
                    page < currentStory.text.length - 1 ? "[ NEXT PAGE ]" : "[ CLOSE TRANSMISSION ]"
                )
            ),

            React.createElement('style', null, `
                .story-override {
                    width: 700px;
                    min-height: 400px;
                    border: 4px double var(--primary); /* Double border for story importance */
                }
                .center-content {
                    justify-content: center;
                    align-items: center;
                    text-align: center;
                    padding: 40px;
                }
                .retro-text.large {
                    font-size: 1.4rem;
                    color: #fff;
                    line-height: 1.6;
                    font-family: monospace;
                    font-style: italic;
                }
                .retro-text.small {
                    color: #666;
                }
                .typewriter {
                    animation: type 0.05s steps(40, end);
                }
            `)
        )
    );
};

export default StoryModal;
