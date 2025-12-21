import React, { useState, useEffect } from 'react';
import { useGame } from '../../context/GameContext.js';
import { MONSTERS, DRAGONS, DEMON_LORDS } from '../../data/monsters.js';
import { SKILLS, getSkillAtLevel } from '../../data/skills.js';

const CombatInterface = () => {
  const { state, dispatch, ACTIONS } = useGame();
  const [combatLog, setCombatLog] = useState([]);
  const [turn, setTurn] = useState(1);
  const [enemy, setEnemy] = useState(null);
  const [combatState, setCombatState] = useState('active'); // 'active', 'victory', 'defeat'
  const [playerTurn, setPlayerTurn] = useState(true);
  const [selectedSkill, setSelectedSkill] = useState(null);

  // Initialize enemy on mount
  useEffect(() => {
    const enemyData = selectRandomEnemy();
    setEnemy({ ...enemyData, hp: enemyData.hp, maxHp: enemyData.hp });
    addLog(`A wild ${enemyData.name} appears!`);
    addLog(enemyData.description);
  }, []);

  const addLog = (msg) => setCombatLog(prev => [...prev.slice(-6), msg]);

  // Select enemy based on current town
  const selectRandomEnemy = () => {
    const location = state.world.location;
    const playerLevel = state.player.level;

    let monsterPool = [];
    if (location === 'town_1' || !location.startsWith('town')) {
      monsterPool = ['slime', 'goblin', 'wolf', 'bat', 'spider', 'boar', 'bandit', 'skeleton'];
    } else if (location === 'town_2') {
      monsterPool = ['orc', 'troll', 'dark_elf', 'scorpion', 'sandworm', 'harpy', 'minotaur', 'cursed_knight'];
    } else if (location === 'town_3') {
      monsterPool = ['chimera', 'basilisk', 'gargoyle', 'spectre', 'elemental', 'golem', 'manticore', 'death_knight'];
    } else if (location === 'town_4') {
      monsterPool = ['lich', 'vampire', 'werewolf', 'demon', 'arcane_construct', 'shadow_fiend', 'void_stalker', 'corrupted_paladin'];
    } else if (location === 'town_5') {
      monsterPool = ['ancient_treant', 'phoenix', 'hydra', 'kraken', 'storm_giant', 'living_armor', 'elemental_lord', 'archdemon'];
    } else if (location === 'town_6' && playerLevel >= 60) {
      monsterPool = ['young_fire_dragon', 'young_ice_dragon', 'young_lightning_dragon', 'young_earth_dragon', 'drake', 'wyvern', 'dragon_knight', 'elder_wyrm'];
      const randomDragon = monsterPool[Math.floor(Math.random() * monsterPool.length)];
      return { ...DRAGONS[randomDragon] };
    } else if (location === 'town_7' && playerLevel >= 80) {
      monsterPool = ['ancient_fire_dragon', 'ancient_ice_dragon', 'ancient_lightning_dragon', 'ancient_earth_dragon', 'ancient_void_dragon', 'ancient_holy_dragon', 'mythic_dragon_lord', 'dragon_god_aspect'];
      const randomDragon = monsterPool[Math.floor(Math.random() * monsterPool.length)];
      return { ...DRAGONS[randomDragon] };
    } else {
      monsterPool = ['slime', 'goblin', 'wolf'];
    }

    const randomMonster = monsterPool[Math.floor(Math.random() * monsterPool.length)];
    return { ...MONSTERS[randomMonster] };
  };

  const calculateDamage = (attacker, defender, isPlayer) => {
    const baseDmg = isPlayer ? attacker.atk : attacker.atk;
    const def = isPlayer ? defender.def : defender.def;
    const variance = 0.9 + Math.random() * 0.2;
    return Math.max(1, Math.floor((baseDmg - def * 0.5) * variance));
  };

  // Award skill XP
  const awardSkillXP = (skillId) => {
    const playerSkills = state.player.skills || [];
    const skillIndex = playerSkills.findIndex(s => s.id === skillId);
    if (skillIndex === -1) return;

    const skill = playerSkills[skillIndex];
    const xpGain = 15 + Math.floor(enemy.level * 0.5); // Base 15 + enemy level bonus
    const newExp = skill.exp + xpGain;
    const maxExp = skill.maxExp || 100;

    if (newExp >= maxExp && skill.level < 10) {
      // Level up!
      const newLevel = skill.level + 1;
      const newMaxExp = Math.floor(maxExp * 1.5);
      const updatedSkills = [...playerSkills];
      updatedSkills[skillIndex] = { ...skill, level: newLevel, exp: newExp - maxExp, maxExp: newMaxExp };

      dispatch({
        type: ACTIONS.UPDATE_PLAYER_DATA,
        payload: { ...state.player, skills: updatedSkills }
      });

      const skillData = SKILLS[skillId];
      addLog(`⭐ ${skillData.name} leveled up to Lv.${newLevel}!`);

      // Evolution notifications
      if (newLevel === 3 || newLevel === 7 || newLevel === 10) {
        const evolved = getSkillAtLevel(skillId, newLevel);
        addLog(`✨ ${skillData.name} evolved to ${evolved.name || skillData.name}!`);
      }
    } else {
      // Just add XP
      const updatedSkills = [...playerSkills];
      updatedSkills[skillIndex] = { ...skill, exp: Math.min(newExp, maxExp) };

      dispatch({
        type: ACTIONS.UPDATE_PLAYER_DATA,
        payload: { ...state.player, skills: updatedSkills }
      });

      addLog(`${SKILLS[skillId].name} gained ${xpGain} XP!`);
    }
  };

  const handleAttack = () => {
    if (!playerTurn || combatState !== 'active' || !enemy) return;

    const dmg = calculateDamage(state.player.stats, enemy, true);
    const newEnemyHp = Math.max(0, enemy.hp - dmg);
    setEnemy(prev => ({ ...prev, hp: newEnemyHp }));

    const attackVerb = dmg > 50 ? 'devastates' : dmg > 20 ? 'strikes' : 'hits';
    addLog(`You ${attackVerb} ${enemy.name} for ${dmg} damage!`);

    if (newEnemyHp <= 0) {
      handleVictory();
      return;
    }

    setPlayerTurn(false);
    setTimeout(() => handleEnemyTurn(newEnemyHp), 1200);
  };

  const handleSkillAttack = (skillId) => {
    if (!playerTurn || combatState !== 'active' || !enemy) return;

    const playerSkills = state.player.skills || [];
    const playerSkill = playerSkills.find(s => s.id === skillId);
    if (!playerSkill) return;

    const skillData = getSkillAtLevel(skillId, playerSkill.level);

    // Check MP cost
    const mpCost = skillData.mpCost || 0;
    if (state.player.stats.mp < mpCost) {
      addLog("Not enough MP!");
      return;
    }

    // Calculate skill damage
    const baseDmg = skillData.baseDamage || state.player.stats.atk;
    const magBonus = skillData.element ? state.player.stats.mag * 0.5 : 0;
    const totalDmg = Math.floor((baseDmg + magBonus) * (0.9 + Math.random() * 0.2));

    const newEnemyHp = Math.max(0, enemy.hp - totalDmg);
    setEnemy(prev => ({ ...prev, hp: newEnemyHp }));

    // Update MP
    dispatch({
      type: ACTIONS.UPDATE_PLAYER_DATA,
      payload: {
        ...state.player,
        stats: { ...state.player.stats, mp: state.player.stats.mp - mpCost }
      }
    });

    addLog(`You cast ${skillData.name || skillData.name}! ${totalDmg} damage!`);

    // Award skill XP
    awardSkillXP(skillId);

    if (newEnemyHp <= 0) {
      handleVictory();
      return;
    }

    setSelectedSkill(null);
    setPlayerTurn(false);
    setTimeout(() => handleEnemyTurn(newEnemyHp), 1200);
  };

  const handleEnemyTurn = (currentEnemyHp) => {
    if (currentEnemyHp <= 0) return;

    const enemyDmg = calculateDamage(enemy, state.player.stats, false);
    const newPlayerHp = Math.max(0, state.player.stats.hp - enemyDmg);

    dispatch({
      type: ACTIONS.UPDATE_PLAYER_DATA,
      payload: {
        ...state.player,
        stats: { ...state.player.stats, hp: newPlayerHp }
      }
    });

    const attackName = enemy.attacks && enemy.attacks.length > 0
      ? enemy.attacks[Math.floor(Math.random() * enemy.attacks.length)]
      : 'basic attack';

    addLog(`${enemy.name} uses ${attackName.replace('_', ' ')} for ${enemyDmg} damage!`);

    if (newPlayerHp <= 0) {
      handleDefeat();
      return;
    }

    setTurn(t => t + 1);
    setPlayerTurn(true);
  };

  const handleVictory = () => {
    setCombatState('victory');
    const expGain = enemy.exp || 50;
    const goldGain = enemy.gold || 20;

    addLog(`Victory! ${enemy.name} has been defeated!`);
    addLog(`+${expGain} EXP, +${goldGain} Gold`);

    if (enemy.loot && enemy.loot.length > 0) {
      const randomLoot = enemy.loot[Math.floor(Math.random() * enemy.loot.length)];
      addLog(`Found: ${randomLoot.replace('_', ' ')}`);
    }

    // CHECK FOR DEMON LORD VICTORY
    const demonLords = ['pride', 'greed', 'wrath', 'envy', 'lust', 'gluttony', 'sloth'];
    let isDemonLord = false;

    // Check if ID matches a demon lord ID
    if (demonLords.includes(enemy.id)) {
      isDemonLord = true;
      addLog(`🔥 You have defeated the ${enemy.name.split(' - ')[0]} Demon Lord!`);
    }

    setTimeout(() => {
      const newExp = state.player.exp + expGain;
      const newGold = state.player.gold + goldGain;
      const leveledUp = newExp >= state.player.maxExp;

      // Prepare updates
      const updates = {
        player: {
          ...state.player,
          exp: leveledUp ? newExp - state.player.maxExp : newExp,
          level: leveledUp ? state.player.level + 1 : state.player.level,
          maxExp: leveledUp ? Math.floor(state.player.maxExp * 1.5) : state.player.maxExp,
          gold: newGold,
          stats: {
            ...state.player.stats,
            hp: state.player.stats.maxHp,
            mp: state.player.stats.maxMp
          }
        }
      };

      // If demon lord, update world flags
      if (isDemonLord) {
        updates.world = {
          ...state.world,
          questFlags: {
            ...state.world.questFlags,
            [`${enemy.id}_defeated`]: true
          }
        };
      }

      dispatch({
        type: ACTIONS.UPDATE_PLAYER_DATA,
        payload: updates
      });

      if (leveledUp) addLog(`LEVEL UP! You are now Level ${state.player.level + 1}!`);

      setTimeout(() => {
        dispatch({ type: ACTIONS.NAVIGATE, payload: state.world.location });
      }, 3000);
    }, 2000);
  };

  const handleDefeat = () => {
    setCombatState('defeat');
    addLog(`You have been defeated by ${enemy.name}...`);
    addLog("Retreating to town...");

    setTimeout(() => {
      dispatch({
        type: ACTIONS.UPDATE_PLAYER_DATA,
        payload: {
          ...state.player,
          stats: {
            ...state.player.stats,
            hp: Math.floor(state.player.stats.maxHp * 0.5)
          },
          gold: Math.max(0, state.player.gold - Math.floor(state.player.gold * 0.1))
        }
      });
      dispatch({ type: ACTIONS.NAVIGATE, payload: state.world.location });
    }, 2500);
  };

  const handleFlee = () => {
    const fleeChance = Math.random();
    if (fleeChance > 0.5 || state.player.stats.spd > enemy.spd) {
      addLog("You successfully fled from battle!");
      setTimeout(() => {
        dispatch({ type: ACTIONS.NAVIGATE, payload: state.world.location });
      }, 1000);
    } else {
      addLog("Failed to flee!");
      setPlayerTurn(false);
      setTimeout(() => handleEnemyTurn(enemy.hp), 800);
    }
  };

  if (!enemy) return React.createElement('div', { className: 'loading' }, "Loading battle...");

  // Get equipped skills
  const equippedSkills = (state.player.equippedSkills || []).map(skillId => {
    const playerSkill = (state.player.skills || []).find(s => s.id === skillId);
    if (!playerSkill) return null;
    return { ...playerSkill, data: getSkillAtLevel(skillId, playerSkill.level) };
  }).filter(Boolean);

  return React.createElement('div', { className: 'combat-container fade-in' },
    React.createElement('h2', { style: { textAlign: 'center', marginBottom: '10px' } },
      `Turn ${turn}`
    ),

    // Battlefield
    React.createElement('div', { className: 'battlefield' },
      React.createElement('div', { className: 'combat-card enemy' },
        React.createElement('div', { className: 'sprite' }, enemy.level >= 80 ? "🐉" : enemy.level >= 60 ? "🐲" : enemy.level >= 30 ? "👹" : "👺"),
        React.createElement('h3', null, enemy.name),
        React.createElement('p', { className: 'level-badge' }, `Lv. ${enemy.level}`),
        React.createElement('div', { className: 'hp-bar' },
          React.createElement('div', {
            className: 'hp-fill',
            style: { width: `${(enemy.hp / enemy.maxHp) * 100}%` }
          })
        ),
        React.createElement('p', null, `${enemy.hp} / ${enemy.maxHp} HP`)
      ),

      React.createElement('div', { className: 'vs' }, "⚔️"),

      React.createElement('div', { className: 'combat-card player' },
        React.createElement('div', { className: 'sprite' }, "🛡️"),
        React.createElement('h3', null, state.player.name),
        React.createElement('p', { className: 'level-badge' }, `Lv. ${state.player.level} ${state.player.class}`),
        React.createElement('div', { className: 'hp-bar' },
          React.createElement('div', {
            className: 'hp-fill player-fill',
            style: { width: `${(state.player.stats.hp / state.player.stats.maxHp) * 100}%` }
          })
        ),
        React.createElement('p', null, `${state.player.stats.hp} / ${state.player.stats.maxHp} HP`),
        React.createElement('p', { style: { fontSize: '0.85rem', marginTop: '5px' } }, `MP: ${state.player.stats.mp}/${state.player.stats.maxMp}`)
      )
    ),

    // Combat Log
    React.createElement('div', { className: 'combat-log' },
      combatLog.map((line, i) => React.createElement('p', { key: i, className: 'log-line fade-in' }, `> ${line}`))
    ),

    // Skill Selection
    selectedSkill && React.createElement('div', { className: 'skill-selector' },
      React.createElement('h4', null, "Select Skill:"),
      React.createElement('div', { className: 'skill-buttons' },
        equippedSkills.map(skill =>
          React.createElement('button', {
            key: skill.id,
            className: 'skill-btn',
            disabled: state.player.stats.mp < (skill.data.mpCost || 0),
            onClick: () => handleSkillAttack(skill.id)
          },
            React.createElement('span', { className: 'skill-name' }, skill.data.name),
            React.createElement('span', { className: 'skill-mp' }, `${skill.data.mpCost || 0} MP`)
          )
        )
      ),
      React.createElement('button', { className: 'cancel-btn', onClick: () => setSelectedSkill(null) }, "Cancel")
    ),

    // Controls
    !selectedSkill && React.createElement('div', { className: 'combat-controls' },
      React.createElement('button', {
        className: 'combat-btn attack',
        onClick: handleAttack,
        disabled: !playerTurn || combatState !== 'active'
      }, "⚔️ Attack"),
      React.createElement('button', {
        className: 'combat-btn skill',
        onClick: () => setSelectedSkill(true),
        disabled: !playerTurn || combatState !== 'active' || equippedSkills.length === 0
      }, "✨ Skill"),
      React.createElement('button', {
        className: 'combat-btn item',
        disabled: true
      }, "🧪 Item"),
      React.createElement('button', {
        className: 'combat-btn flee',
        onClick: handleFlee,
        disabled: !playerTurn || combatState !== 'active'
      }, "🏃 Flee")
    ),

    // Styles (extended)
    React.createElement('style', null, `
      .combat-container { padding: 20px; max-width: 900px; margin: 0 auto; display: flex; flex-direction: column; height: 100vh; background: linear-gradient(180deg, #0a0a12 0%, #1a0a0a 100%); }
      .battlefield { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; flex: 1; padding: 20px; }
      .combat-card { background: var(--bg-card); padding: 20px; border-radius: var(--radius-lg); border: 2px solid var(--border); width: 35%; text-align: center; box-shadow: 0 4px 15px rgba(0,0,0,0.3); }
      .combat-card.enemy { border-color: var(--accent); animation: enemyPulse 2s infinite; }
      @keyframes enemyPulse { 0%, 100% { box-shadow: 0 0 10px var(--accent-glow); } 50% { box-shadow: 0 0 20px var(--accent-glow); } }
      .sprite { font-size: 5rem; margin-bottom: 10px; }
      .level-badge { background: var(--bg-dark); padding: 4px 10px; border-radius: 20px; font-size: 0.8rem; display: inline-block; margin: 5px 0; color: var(--text-muted); }
      .hp-bar { background: #222; height: 15px; border-radius: 10px; margin: 15px 0; overflow: hidden; border: 1px solid #444; }
      .hp-fill { background: linear-gradient(90deg, #ef4444 0%, #f87171 100%); height: 100%; transition: width 0.5s; }
      .player-fill { background: linear-gradient(90deg, #3b82f6 0%, #60a5fa 100%); }
      .vs { font-weight: bold; font-size: 3rem; color: var(--text-muted); text-shadow: 0 0 10px rgba(255,255,255,0.3); }
      
      .combat-log { background: rgba(0,0,0,0.7); padding: 15px; height: 180px; overflow-y: auto; margin-bottom: 20px; border-radius: var(--radius-md); font-family: 'Courier New', monospace; border: 1px solid var(--border); }
      .log-line { margin: 5px 0; color: #0f0; text-shadow: 0 0 5px #0f0; animation: fadeIn 0.3s; }
      
      .skill-selector { background: var(--bg-panel); padding: 20px; margin-bottom: 20px; border-radius: var(--radius-lg); border: 2px solid var(--primary); }
      .skill-selector h4 { margin-bottom: 15px; color: var(--primary); }
      .skill-buttons { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 10px; margin-bottom: 10px; }
      .skill-btn { background: var(--bg-dark); border: 2px solid var(--primary); color: var(--text-main); padding: 15px; border-radius: var(--radius-md); cursor: pointer; display: flex; flex-direction: column; gap: 5px; transition: all 0.2s; }
      .skill-btn:hover:not(:disabled) { background: var(--primary); color: white; transform: translateY(-2px); }
      .skill-btn:disabled { opacity: 0.3; cursor: not-allowed; border-color: var(--border); }
      .skill-name { font-weight: bold; }
      .skill-mp { font-size: 0.8rem; color: #60a5fa; }
      .cancel-btn { background: #ef4444; color: white; border: none; padding: 10px 20px; border-radius: var(--radius-md); cursor: pointer; font-weight: bold; }
      
      .combat-controls { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; padding-bottom: 20px; }
      .combat-btn { padding: 18px; border: none; border-radius: var(--radius-md); font-weight: bold; cursor: pointer; color: white; font-size: 1.2rem; transition: transform 0.1s, opacity 0.2s; box-shadow: 0 4px 10px rgba(0,0,0,0.3); }
      .combat-btn:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 6px 15px rgba(0,0,0,0.4); }
      .combat-btn:disabled { opacity: 0.4; cursor: not-allowed; }
      .attack { background: linear-gradient(135deg, #dc2626 0%, #ef4444 100%); }
      .skill { background: linear-gradient(135deg, #7c3aed 0%, #a78bfa 100%); }
      .item { background: linear-gradient(135deg, #059669 0%, #10b981 100%); }
      .flee { background: linear-gradient(135deg, #d97706 0%, #f59e0b 100%); }
    `)
  );
};

export default CombatInterface;
