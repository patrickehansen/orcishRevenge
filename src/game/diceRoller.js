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
        if (operators.includes(v)) {
          a.operator = v;
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
    post: Number(reduced.post),
    operator: reduced.operator,
    raw: reduced.raw,
  }
}

module.exports.roll = (message) => {
  let parsed;

  if (typeof message === 'string') {
    const roll = message.slice(6).replace(/ /g,'');

    parsed = parseRoll(roll);
  }else{
    parsed = message;
  }
  
  const dice = [];
  for (let i = 0; i < parsed.count; i++){
    dice.push(Math.ceil(Math.random() * parsed.size))
  }

  const sum = dice.reduce((a,b) => a + b, 0);
  let total;
  const post = Number(parsed.post);

  switch (parsed.operator) {
    case '+' : 
      total = sum + post;
    break;
    case '-' : 
      total = sum - post;
    break;
    case '*' :
      total = sum * post;
    break;
    case '/': 
      total = (sum / post).toFixed(1);
    break;
    default: 
      total = sum;
  }

  return {
    dice,
    sum,
    ...parsed,
    total,
  };
}