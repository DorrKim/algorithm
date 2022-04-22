function solution(new_id) {
  const stageMapper = {
    1: (...args) => stage1(...args),
    2: (...args) => stage2(...args),
    3: (...args) => stage3(...args),
    4: (...args) => stage4(...args),
    5: (...args) => stage5(...args),
    6: (...args) => stage6(...args),
    7: (...args) => stage7(...args)
  };
  let id = new_id;
  for (let i = 1; i <= 7; i++) {
    id = stageMapper[i](id);
  }
  return id;
}

function stage1(id) {
  return id.toLowerCase();
}

function stage2(id) {
  return id.replace(/[^a-z0-9-_.]/g, '');
}

function stage3(id) {
  return id.replace(/\.{2,}/g, '.');
}

function stage4(id) {
  return id.replace(/(^\.)|(\.$)/, '');
}

function stage5(id) {
  return id === '' ? 'a' : id;
}

function stage6(id) {
  return stage4(id.slice(0, 15));
}

function stage7(id) {
  return id.length <= 2 ? (id + id.slice(-1).repeat(3)).slice(0, 3) : id;
}
