import React, { createContext, useReducer, useEffect, useContext } from 'react';

// --- Initial State ---
const initialState = {
    player: {
        name: "",
        class: null, // "Mage", "Warrior", etc.
        level: 1,
        exp: 0,
        maxExp: 100,
        stats: { hp: 100, maxHp: 100, mp: 50, maxMp: 50, atk: 10, mag: 10, def: 5, spd: 10 },
        inventory: [], // [{ id, count }]
        gold: 0,
        equipment: { weapon: null, armor: null, accessory: null },
        skills: [], // [{ id: 'fireball', level: 1, exp: 0, maxExp: 100 }]
        equippedSkills: [], // Active skill slots (max 8)
        passiveSkills: [], // Passive skill slots (max 4)
        tier: 0, // 0=Base, 1=Lv10, 2=Lv40, ...
        evolutionHistory: [], // ["Mage", "Pyromancer"]
    },
    world: {
        location: "character_creation", // "town_1", "world_map", "combat", "dungeon"
        unlockedTowns: ["town_1"],
        questFlags: {},
        uniqueBuildingData: {},
    },
    system: {
        view: "character_creation", // "character_creation", "town", "combat", "admin", "menu"
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
    UPDATE_PLAYER_DATA: 'UPDATE_PLAYER_DATA' // Added for Admin
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
                player: action.payload
            };

        default:
            return state;
    }
}

// --- Context ---
const GameContext = createContext();

export const GameProvider = ({ children }) => {
    const [state, dispatch] = useReducer(gameReducer, initialState);

    // Auto-Save Effect (Basic)
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
