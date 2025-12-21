import React, { createContext, useReducer, useEffect, useContext } from 'react';

// --- Initial State ---
const initialState = {
    player: {
        name: "",
        class: null,
        race: "Human", // Default Race
        level: 1,
        exp: 0,
        maxExp: 100,
        stats: { hp: 100, maxHp: 100, mp: 50, maxMp: 50, atk: 10, mag: 10, def: 5, spd: 10 },
        inventory: [],
        gold: 0,
        equipment: { weapon: null, armor: null, accessory: null },
        skills: [],
        equippedSkills: [],
        passiveSkills: [],
        tier: 0,
        evolutionHistory: [],
        achievements: []
    },
    world: {
        location: "character_creation",
        unlockedTowns: ["town_1"],
        questFlags: {}, // For main questlines
        activeCommonQuests: [], // [{ id, progress, accepted }]
        completedQuests: [], // [questId]
        uniqueBuildingData: {},
    },
    system: {
        view: "character_creation",
        adminMode: false,
        lastSave: null
    }
};

// --- Actions ---
const ACTIONS = {
    INIT_GAME: 'INIT_GAME',
    SET_PLAYER_CLASS: 'SET_PLAYER_CLASS',
    NAVIGATE: 'NAVIGATE',
    ADD_ITEM: 'ADD_ITEM',
    UPDATE_STATS: 'UPDATE_STATS',
    ADMIN_TOGGLE: 'ADMIN_TOGGLE',
    LOAD_STATE: 'LOAD_STATE',
    UPDATE_PLAYER_DATA: 'UPDATE_PLAYER_DATA',
    UNLOCK_ACHIEVEMENT: 'UNLOCK_ACHIEVEMENT',
    SET_RACE: 'SET_RACE'
};

// --- Reducer ---
function gameReducer(state, action) {
    switch (action.type) {
        case ACTIONS.INIT_GAME:
            return { ...initialState };

        case ACTIONS.SET_PLAYER_CLASS:
            return {
                ...state,
                player: {
                    ...state.player,
                    class: action.payload.className,
                    stats: action.payload.stats,
                    evolutionHistory: [action.payload.className]
                },
                world: { ...state.world, location: "town_1" },
                system: { ...state.system, view: "town" }
            };

        case ACTIONS.NAVIGATE:
            return {
                ...state,
                world: { ...state.world, location: action.payload },
                system: { ...state.system, view: action.payload.startsWith("town") ? "town" : action.payload }
            };

        case ACTIONS.ADMIN_TOGGLE:
            return {
                ...state,
                system: { ...state.system, adminMode: action.payload }
            };

        case ACTIONS.LOAD_STATE:
            return action.payload;

        case ACTIONS.UPDATE_PLAYER_DATA:
            return {
                ...state,
                player: action.payload.player || action.payload,
                world: action.payload.world || state.world
            };

        case ACTIONS.UNLOCK_ACHIEVEMENT:
            if (state.player.achievements.includes(action.payload)) return state;
            return {
                ...state,
                player: {
                    ...state.player,
                    achievements: [...state.player.achievements, action.payload]
                }
            };

        case ACTIONS.SET_RACE:
            // Calculate new stats based on race bonuses?
            // For simplicity, we just update the race tag and maybe apply a one-time boost
            // OR we can make stats dynamic. Let's make it a permanent state change.
            return {
                ...state,
                player: {
                    ...state.player,
                    race: action.payload
                }
            };

        default:
            return state;
    }
}

// --- Context ---
const GameContext = createContext();

export const GameProvider = ({ children }) => {
    const [state, dispatch] = useReducer(gameReducer, initialState);

    // Auto-Save Effect
    useEffect(() => {
        if (state.player.name) {
            localStorage.setItem('sins_rpg_autosave', JSON.stringify(state));
        }
    }, [state]);

    // Initial Load
    useEffect(() => {
        const saved = localStorage.getItem('sins_rpg_autosave');
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                dispatch({ type: ACTIONS.LOAD_STATE, payload: parsed });
            } catch (e) {
                console.error("Save file corrupted", e);
            }
        }
    }, []);

    return React.createElement(GameContext.Provider, { value: { state, dispatch, ACTIONS } }, children);
};

export const useGame = () => useContext(GameContext);
