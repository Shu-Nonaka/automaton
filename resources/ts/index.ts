import {LifeGame} from "./life-game";

document.addEventListener('DOMContentLoaded', () => {
  const c = <HTMLCanvasElement>document.getElementById('lifegame');

// if (c === HTMLCanvasElement) throw "provided element isn't HTMLCanvasElement";

  const game = new LifeGame(c);

  game.render()

  document.getElementById('next').addEventListener('click', e => {
    game.next().render()
  })

  document.getElementById('run').addEventListener('click', () => {
    game.run()
  })
  document.getElementById('stop').addEventListener('click', () => {
    game.stop()
  })
})

