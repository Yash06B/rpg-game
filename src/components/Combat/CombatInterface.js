import React, { useState, useEffect } from 'react';
import { useGame } from '../../context/GameContext.js';
import { MONSTERS, DRAGONS, DEMON_LORDS } from '../../data/monsters.js';
import { SKILLS, getSkillAtLevel } from '../../data/skills.js';
import { getFlavorText } from '../../data/flavorText.js';

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
    let baseDmg = isPlayer ? attacker.atk : attacker.atk;
    const def = isPlayer ? defender.def : defender.def;
    const variance = 0.9 + Math.random() * 0.2;

    if (isPlayer) {
      // --- HOLY PALADIN BONUSES ---
      if (state.player.class === 'Holy Paladin') {
        const isDemonLord = ['pride', 'greed', 'wrath', 'envy', 'lust', 'gluttony', 'sloth'].includes(defender.id);
        if (isDemonLord) {
          if (state.player.race === 'Angel') {
            baseDmg *= 1000; // 1000x Damage vs Demon Lords if Angel
          } else {
            baseDmg *= 100; // 100x Damage vs Demon Lords
          }
        }
      }
    }

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

    let currentEnemyHp = enemy.hp;
    const dmg = calculateDamage(state.player.stats, enemy, true);

    // Check for miss (10% chance base)
    if (Math.random() < 0.1) {
      addLog(getFlavorText('miss', { enemyName: enemy.name }));
    } else {
      currentEnemyHp = Math.max(0, enemy.hp - dmg);
      setEnemy(prev => ({ ...prev, hp: currentEnemyHp }));

      const flavorType = dmg > 50 ? 'player_strong' : dmg > 20 ? 'player_normal' : 'player_weak';
      addLog(`${getFlavorText(flavorType, { enemyName: enemy.name })} (${dmg} dmg)`);

      if (currentEnemyHp <= 0) {
        handleVictory();
        return;
      }
    }

    if (currentEnemyHp <= 0) {
      // Redundant check, but safe
      handleVictory();
      return;
    }

    setPlayerTurn(false);
    setTimeout(() => handleEnemyTurn(currentEnemyHp), 1200);
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

    // Enemy miss chance based on player speed vs enemy speed
    // If player is faster, up to 30% dodge chance
    const dodgeChance = Math.min(0.3, Math.max(0.05, (state.player.stats.spd - enemy.spd) * 0.01));

    if (Math.random() < dodgeChance) {
      addLog(getFlavorText('enemy_miss', { enemyName: enemy.name }));
    } else {
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

      // Use flavor text or special attack name
      if (attackName !== 'basic attack') {
        addLog(`${enemy.name} uses ${attackName.replace('_', ' ')}! (${enemyDmg} damage)`);
      } else {
        const flavorType = enemyDmg > 40 ? 'enemy_strong' : enemyDmg > 15 ? 'enemy_normal' : 'enemy_weak';
        addLog(`${getFlavorText(flavorType, { enemyName: enemy.name })} (${enemyDmg} damage)`);
      }

      if (newPlayerHp <= 0) {
        handleDefeat();
        return;
      }
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
      addLog(getFlavorText('flee_success', { enemyName: enemy.name }));
      setTimeout(() => {
        dispatch({ type: ACTIONS.NAVIGATE, payload: state.world.location });
      }, 1000);
    } else {
      addLog(getFlavorText('flee_fail', { enemyName: enemy.name }));
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
    // Status Header
    React.createElement('div', { className: 'retro-status-bar' },
      React.createElement('span', null, `HERO: ${state.player.name} [LVL ${state.player.level}]`),
      React.createElement('span', { className: state.player.stats.hp < state.player.stats.maxHp * 0.3 ? 'danger-text' : '' },
        `HP: ${state.player.stats.hp}/${state.player.stats.maxHp}`
      ),
      React.createElement('span', null, `MP: ${state.player.stats.mp}/${state.player.stats.maxMp}`),
      React.createElement('span', null, `TURN: ${turn}`)
    ),

    // Log Area
    React.createElement('div', { className: 'retro-log-area' },
      combatLog.map((line, i) => React.createElement('p', { key: i, className: 'log-line' }, `> ${line}`))
    ),

    // Enemy Status (Text)
    React.createElement('div', { className: 'retro-enemy-status' },
      React.createElement('h3', null, `TARGET: ${enemy.name.toUpperCase()} (Lv.${enemy.level})`),
      React.createElement('p', null, `STATUS: ${enemy.hp > 0 ? 'HOSTILE' : 'DEFEATED'} [ HP: ${enemy.hp}/${enemy.maxHp} ]`),
      React.createElement('div', { style: { marginTop: '5px', fontSize: '2rem' } },
        enemy.level >= 80 ? "🐉" : enemy.level >= 60 ? "🐲" : enemy.level >= 30 ? "👹" : "👺"
      )
    ),

    // Skill Selection Sub-Menu
    selectedSkill && React.createElement('div', { className: 'retro-command-box' },
      React.createElement('h3', { className: 'retro-h3' }, "-- SELECT SKILL --"),
      React.createElement('div', { className: 'command-list' },
        equippedSkills.map((skill, idx) =>
          React.createElement('button', {
            key: skill.id,
            className: 'retro-command-btn',
            disabled: state.player.stats.mp < (skill.data.mpCost || 0),
            onClick: () => handleSkillAttack(skill.id)
          }, `[ ${idx + 1} ] ${skill.data.name.toUpperCase()} (${skill.data.mpCost} MP)`)
        ),
        React.createElement('button', { className: 'retro-command-btn', onClick: () => setSelectedSkill(null) }, "[ X ] CANCEL")
      )
    ),

    // Main Actions
    !selectedSkill && React.createElement('div', { className: 'retro-command-box' },
      React.createElement('h3', { className: 'retro-h3' }, "-- COMBAT ACTIONS --"),
      React.createElement('div', { className: 'command-list' },
        React.createElement('button', {
          className: 'retro-command-btn',
          onClick: handleAttack,
          disabled: !playerTurn || combatState !== 'active'
        }, "[ 1 ] ATTACK"),
        React.createElement('button', {
          className: 'retro-command-btn',
          onClick: () => setSelectedSkill(true),
          disabled: !playerTurn || combatState !== 'active' || equippedSkills.length === 0
        }, "[ 2 ] SKILL"),
        React.createElement('button', {
          className: 'retro-command-btn',
          disabled: true
        }, "[ 3 ] ITEM (EMPTY)"),
        React.createElement('button', {
          className: 'retro-command-btn',
          onClick: handleFlee,
          disabled: !playerTurn || combatState !== 'active'
        }, "[ 4 ] FLEE")
      )
    ),

    React.createElement('style', null, `
      .combat-container { 
        height: 100vh;
        display: flex; 
        flex-direction: column; 
        padding: 10px;
        background: #000;
        color: var(--primary);
        font-family: monospace;
      }
      .retro-status-bar {
        display: flex;
        justify-content: space-between;
        border-bottom: 2px solid var(--border);
        padding-bottom: 10px;
        margin-bottom: 10px;
        font-weight: bold;
      }
      .retro-log-area {
        flex: 1;
        overflow-y: auto;
        border: 1px solid #333;
        padding: 10px;
        margin-bottom: 10px;
        background: #050505;
        font-family: 'Courier New', monospace;
      }
      .log-line {
        margin: 5px 0;
        color: #33ff00;
        text-shadow: 0 0 2px #00ff00;
      }
      .retro-enemy-status {
        border: 1px solid var(--danger);
        padding: 10px;
        margin-bottom: 10px;
        text-align: center;
        color: var(--danger);
      }
      .retro-command-box {
        border-top: 1px solid var(--border);
        padding-top: 10px;
      }
      .retro-h3 {
        color: var(--accent);
        margin-bottom: 10px;
      }
      .command-list {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 10px;
      }
      .retro-command-btn {
        background: transparent;
        border: 1px solid #333;
        color: var(--primary);
        padding: 10px;
        font-family: monospace;
        text-align: left;
        cursor: pointer;
        font-size: 1.1rem;
      }
      .retro-command-btn:hover:not(:disabled) {
        background: var(--primary);
        color: #000;
      }
      .retro-command-btn:disabled {
        color: #555;
        border-color: #222;
        cursor: not-allowed;
      }
      .danger-text { color: var(--danger); animation: flicker 1s infinite; }
    `)
  );
};

export default CombatInterface;
