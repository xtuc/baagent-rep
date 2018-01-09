import {vector, comm} from 'bytearena-sdk';

const Vector2 = vector.Vector2;
const agent = comm.connect();

const byClosest = (a, b) => a.mag() > b.mag();

function toArray(acc, obj) {
  acc.push(obj.center);

  return acc;
}

function getClosest({vision}) {
    return vision
      .filter((x) => x.tag === 'obstacle')
      .reduce(toArray, [])
      .map(Vector2.fromArray)
      .sort(byClosest);
}

agent.on('perception', (perception) => {
  const force = new Vector2(0, 1).div(10);

  const [itemVector] = getClosest(perception);

  console.log(itemVector.x + '\t\t' + itemVector.y);

  const actions = [
    { method: 'steer', arguments: itemVector.toArray(5) }
  ];

  agent.do(actions);
});
