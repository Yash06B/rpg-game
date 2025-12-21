import React from 'react';
import { GameProvider, useGame } from './context/GameContext.js';
import CharacterCreation from './components/Character/CharacterCreation.js';
import TownInterface from './components/Town/TownInterface.js';
import CombatInterface from './components/Combat/CombatInterface.js';
import AdminPanel from './components/Admin/AdminPanel.js';
import EvolutionModal from './components/Character/EvolutionModal.js';

const GameContainer = () => {
    const { state } = useGame();

    // View Router
    const renderView = () => {
        switch (state.system.view) {
            case 'character_creation': return React.createElement(CharacterCreation);
            case 'town': return React.createElement(TownInterface);
            case 'combat': return React.createElement(CombatInterface);
            case 'admin': return React.createElement('div', null, "Admin View");
            default: return React.createElement('div', { className: 'error' }, "Unknown View: " + state.system.view);
        }
    };

    return React.createElement('div', { className: 'app-container' },
        renderView(),
        // Modular Overlays
        state.system.adminMode && React.createElement(AdminPanel),
        state.player.class && React.createElement(EvolutionModal) // Logic inside modal decides if it shows
    );
};

const App = () => {
    return React.createElement(GameProvider, null,
        React.createElement(GameContainer)
    );
};

export default App;
