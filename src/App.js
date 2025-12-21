import React from 'react';
import { GameProvider, useGame } from './context/GameContext.js';

// --- ALL COMPONENT IMPORTS ---
import MainMenu from './components/MainMenu.js';
import CharacterCreation from './components/Character/CharacterCreation.js';
import TownInterface from './components/Town/TownInterface.js';
import CombatInterface from './components/Combat/CombatInterface.js';
import AdminPanel from './components/Admin/AdminPanel.js';
import EvolutionModal from './components/Character/EvolutionModal.js';
import QuestTracker from './components/Shared/QuestTracker.js';
import StoryModal from './components/Shared/StoryModal.js';
import VictoryScreen from './components/Shared/VictoryScreen.js';

// --- DATA IMPORTS ---
import { ACHIEVEMENTS } from './data/achievements.js';

// --- ERROR BOUNDARY ---
class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error("React Error Boundary:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return React.createElement('div', { style: { padding: 20, color: 'red', background: '#220000', height: '100vh' } },
                React.createElement('h1', null, "Something went wrong."),
                React.createElement('p', null, this.state.error && this.state.error.toString()),
                React.createElement('button', {
                    onClick: () => { localStorage.clear(); window.location.reload(); },
                    style: { padding: 10, marginTop: 20 }
                }, "Reset Game Data")
            );
        }
        return this.props.children;
    }
}

// --- MAIN GAME CONTAINER ---
const GameContainer = () => {
    const { state } = useGame();

    // View Routing Logic
    const renderView = () => {
        try {
            switch (state.system.view) {
                case 'main_menu':
                    return React.createElement(MainMenu);
                case 'character_creation':
                    return React.createElement(CharacterCreation);
                case 'town':
                    return React.createElement(TownInterface);
                case 'combat':
                    return React.createElement(CombatInterface);
                case 'admin':
                    return React.createElement('div', null, "Admin View Panel");
                default:
                    return React.createElement('div', { className: 'error' },
                        `Unknown View State: ${state.system.view}`
                    );
            }
        } catch (err) {
            console.error("View Render Error:", err);
            return React.createElement('div', { className: 'error' }, "Error rendering view: " + err.message);
        }
    };

    return React.createElement('div', { className: 'app-container' },
        // 1. Main View (Menu, Town, Combat, etc.)
        renderView(),

        // 2. Overlay Systems (Always available if condition met)
        state.system.adminMode && React.createElement(AdminPanel),

        // 3. Evolution Modal (Triggers on class change/level up)
        state.player.class && React.createElement(EvolutionModal),

        // 4. Story & Victory Overlays
        React.createElement(StoryModal),
        React.createElement(VictoryScreen),


    );
};

// --- ACHIEVEMENT WATCHER WRAPPER ---
const GameContainerWithAchievements = () => {
    const { state, dispatch, ACTIONS } = useGame();

    // Global Achievement Check Effect
    React.useEffect(() => {
        if (!state.player) return;

        Object.values(ACHIEVEMENTS).forEach(ach => {
            // Check if condition met AND not already earned
            const alreadyUnlocked = (state.player.achievements || []).includes(ach.id);
            if (!alreadyUnlocked && ach.condition && ach.condition(state)) {
                dispatch({ type: ACTIONS.UNLOCK_ACHIEVEMENT, payload: ach.id });
                console.log(`[Achievement Unlocked]: ${ach.title}`);
            }
        });
    }, [state.player, state.world, dispatch, ACTIONS]);

    return React.createElement(GameContainer);
};

// --- ROOT APP COMPONENT ---
const App = () => {
    return React.createElement(ErrorBoundary, null,
        React.createElement(GameProvider, null,
            React.createElement(GameContainerWithAchievements)
        )
    );
};

export default App;
