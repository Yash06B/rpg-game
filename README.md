# Sins of the Demon Lords - Epic Turn-Based RPG

An epic browser-based turn-based RPG featuring 15 unique classes, complex evolution systems, crafting, and demon lord bosses.

## 🎮 Features

### Character System
- **15 Unique Classes**: Mage, Warrior, Rogue, Cleric, Archer, Berserker, Monk, Necromancer, Bard, Druid, Knight, Assassin, Summoner, Elementalist, and Alchemist
- **4-Tier Evolution System**: Evolve your class at levels 10, 40, 70, and 90 with multiple branching paths
- **Dynamic Stat Growth**: Each class has unique base stats and growth patterns

### World & Towns
- **7 Towns**: Each with unique buildings and exclusive services
- **Unique Buildings**: Ancient Library, Enchantment Tower, Fusion Chamber, Soul Sanctuary, Time Vault, Mythic Forge, Hall of Transcendence
- **Demon Lord Dungeons**: Face 7 deadly sin bosses (Pride, Greed, Wrath, Envy, Lust, Gluttony, Sloth)

### Combat & Progression
- **Turn-Based Combat**: Strategic battle system with skills and items
- **Skill System**: Auto-unlock and purchasable skills with evolution mechanics
- **Crafting & Smithing**: Instant crafting system with recipes and enhancements
- **Inventory Management**: Comprehensive item and resource tracking

### Admin Features
- **Admin Panel**: Accessible with code `yash`
- Full control over player stats, items, skills, and progression
- Debug tools for testing and game balance

## 🚀 Getting Started

### Prerequisites
- Python 3.x (for local server)
- Modern web browser with ES Module support

### Running the Game

1. Clone the repository:
```bash
git clone https://github.com/Yash06B/rpg-game.git
cd rpg-game
```

2. Start a local server:
```bash
python -m http.server 8000
```

3. Open your browser and navigate to:
```
http://localhost:8000
```

## 🎯 How to Play

1. **Create Your Hero**: Enter a name and select from 15 unique classes
2. **Explore Towns**: Visit buildings for shopping, crafting, and quests
3. **Battle Demons**: Enter dungeons to fight monsters and demon lords
4. **Evolve Your Class**: Reach evolution milestones (Lv 10/40/70/90) to unlock new paths
5. **Craft Equipment**: Use the Blacksmith to create powerful gear

### Admin Mode
Click the **⚙** icon in town and enter code `yash` to access:
- Stat editor
- Item spawner
- Teleportation
- Level adjustment
- Class changes

## 🛠️ Technical Stack

- **Framework**: React (via ES Modules/CDN)
- **State Management**: React Context + useReducer
- **Styling**: Vanilla CSS with modern design
- **Persistence**: LocalStorage for auto-save

## 📁 Project Structure

```
/
├── index.html              # Entry point
├── style.css              # Global styles
└── src/
    ├── App.js             # Main component
    ├── main.js            # React mount
    ├── components/        # UI components
    │   ├── Admin/         # Admin panel
    │   ├── Character/     # Character creation & evolution
    │   ├── Combat/        # Battle interface
    │   ├── Town/          # Town & building interfaces
    │   └── Shared/        # Reusable components
    ├── context/           # Game state management
    ├── data/              # Game data (classes, items, etc.)
    ├── hooks/             # Custom React hooks
    └── utils/             # Helper functions
```

## 🎨 Class Evolution Trees

Each class has unique evolution paths:
- **Tier 1 (Lv10)**: 3-4 specialization options
- **Tier 2 (Lv40)**: Advanced class variants
- **Tier 3 (Lv70)**: Elite transformations
- **Tier 4 (Lv90)**: God-tier ultimate forms

## 🔮 Future Features

- [ ] Complete skill evolution system (Lv 3/7/10)
- [ ] 8 unique monsters per dungeon
- [ ] Dragons in Forest 6+
- [ ] 7-step hidden questlines per town
- [ ] Equipment enhancement system
- [ ] Gem socketing mechanics
- [ ] Battle animations
- [ ] World map UI

## 📜 License

This project is open source and available under the MIT License.

## 👤 Author

**Yash06B**

---

*Built with ❤️ using modern web technologies*
