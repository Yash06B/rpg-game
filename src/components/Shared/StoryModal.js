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
            payload: updates
        });

        setCurrentStory(null);

        // Check for final victory
        if (currentStory.id === 'sloth_victory') {
            // Trigger ending sequence (maybe via another state/component)
        }
    };

    if (!currentStory) return null;

    return React.createElement('div', { className: 'modal-overlay fade-in' },
        React.createElement('div', { className: 'modal-content story-modal' },
            React.createElement('div', { className: 'story-header' },
                React.createElement('h2', null, currentStory.title || "Story"),
            ),
            React.createElement('div', { className: 'story-text-container' },
                React.createElement('p', { className: 'story-text typewriter' },
                    currentStory.text[page]
                )
            ),
            React.createElement('div', { className: 'story-controls' },
                React.createElement('span', { className: 'page-indicator' },
                    `${page + 1} / ${currentStory.text.length}`
                ),
                React.createElement('button', { className: 'next-btn', onClick: handleNext },
                    page < currentStory.text.length - 1 ? 'Next ➤' : 'Close'
                )
            )
        ),
        React.createElement('style', null, `
      .story-modal {
        background: url('https://img.freepik.com/free-vector/old-paper-texture-background_1387-259.jpg?size=626&ext=jpg') no-repeat center center;
        background-size: cover;
        width: 600px;
        min-height: 400px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 40px;
        box-shadow: 0 0 50px rgba(0,0,0,0.8);
        border: 10px solid #5d4037;
        color: #3e2723;
        font-family: 'Times New Roman', serif;
      }
      .story-header h2 {
        text-align: center;
        font-size: 2.5rem;
        margin-bottom: 20px;
        border-bottom: 2px solid #3e2723;
        padding-bottom: 10px;
      }
      .story-text-container {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .story-text {
        font-size: 1.4rem;
        line-height: 1.6;
        text-align: center;
        font-style: italic;
      }
      .story-controls {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 20px;
      }
      .page-indicator {
        font-weight: bold;
        font-size: 1.1rem;
      }
      .next-btn {
        background: #3e2723;
        color: #f5deb3;
        border: none;
        padding: 10px 25px;
        font-size: 1.2rem;
        font-family: serif;
        cursor: pointer;
        transition: transform 0.2s;
        border-radius: 5px;
      }
      .next-btn:hover {
        transform: scale(1.05);
        background: #5d4037;
      }
      @keyframes type {
        from { width: 0 }
        to { width: 100% }
      }
    `)
    );
};

export default StoryModal;
