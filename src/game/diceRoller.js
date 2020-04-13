const { evaluate } = require('mathjs');

const statMap = { 
  'END' : 'Endurance',
  'STR' : 'Strength', 
  'AGI' : 'Agility', 
  'RSN' : 'Reason', 
  'SPD' : 'Speed', 
  'MAG' : 'MagicalAffinity', 
  'ALT' : 'Alertness', 
  'MEL' : 'Melee', 
  'ACC' : 'Accuracy',
}

function parseRoll (text) {
  const regex = /(\d*)(D\d*)((?:[+*-](?:\d+|\([A-Z]*\)))*)(?:\+(D\d*))?/i;

  if (!regex.test(text)) {
    throw new Error('Invalid roll');
  }

  let diefound = false;
  let operatorfound = false;
  const operators = ['*', '+', '-', '/'];
  const reduced = text.split('').reduce((a, v, i) => {
    if (v.toLowerCase() === 'd') {
      diefound = true;
    }else{
      if (!diefound) {
        a.count += v;
      }else{
        if (operators.includes(v) && !operatorfound) {
          a.operator += v;
          operatorfound = true;
        }else if (!operatorfound) {
          a.size += v;
        } else {
          a.post += v;
        }
      }
    }
    
    return a;
  }, {
    count :'',
    size: '',
    post : '',
    operator : '',
    raw: text,
  })

  return {
    count: Number(reduced.count),
    size: Number(reduced.size),
    post: reduced.post,
    operator: reduced.operator,
    raw: reduced.raw,
  }
}

function roll(parsed) {
  const dice = [];
  for (let i = 0; i < parsed.count; i++){
    dice.push(Math.ceil(Math.random() * parsed.size))
  }

  const sum = dice.reduce((a,b) => a + b, 0);
  const parsedPost = evaluate(parsed.post);
  const total = evaluate(sum + parsed.operator + parsedPost);

  // const total = sum + evaluated;

  return {
    dice,
    sum,
    ...parsed,
    post: parsedPost,
    total,
  };
}

module.exports.roll = (message) => {
  let parsed;

  if (typeof message === 'string') {
    const roll = message.slice(6).replace(/ /g,'');

    parsed = parseRoll(roll);
  }else{
    parsed = message;
  }
  
  return roll(parsed)
}

module.exports.rollStat = function rollStat (stat, character) {
  if (!character) return null;

  const actual = statMap[stat];

  const dice = {
    count: 3,
    size: 6,
    post: character[actual],
    operator: '-',
    raw: actual,
  }

  return roll(dice);
}

module.exports.rollMacro = function rollMacro(macro, character) {
  if (!character) return null;

  let replaced = macro;
  // Replace
  Object.entries(statMap).forEach(([key, value]) => {
    replaced = replaced.replace(`@{${key}}`, character[value])
  })

  parsed = parseRoll(replaced);

  return roll(parsed);
}