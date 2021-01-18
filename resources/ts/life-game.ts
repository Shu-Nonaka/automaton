import {Canvas} from "./canvas";
import {Cell} from "./cell";

export class LifeGame {
  static makeField(y: number, x: number): Array<Array<Cell>> {
    return Array(y).fill(null).map(
      (_, y) => Array(x).fill(null).map((_, x) => {
        const coordinates = {x: x, y: y}

        return new Cell(20, 20, coordinates)
      })
    )
  }

  // rendering target canvas
  canvas: Canvas
  timer: NodeJS.Timeout | null = null
  field: Array<Array<Cell>>

  cell: {
    height: number,
    width: number
  } = {
    height: 10,
    width: 10
  }

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = new Canvas(canvas);

    this.field = LifeGame.makeField(25, 25);

    this.field.forEach((row, y) => {
      row.forEach((cell, x) => {
        cell.setNeighborHoods(this.field)
      })
    })

    this.canvas.element.addEventListener('click', e => {
      const [y, x] = [e.offsetY / 20, e.offsetX / 20].map(c => Math.floor(c))

      this.field[y][x].isAlive = !this.field[y][x].isAlive

      this.render()
    })
  }


  render() {
    this.field.forEach((row, y) => {
      row.forEach((cell, x) => {
        this.canvas.drawCell(cell)
      })
    })
  }

  next(): this {
    this.field.forEach((row, y) => {
      row.forEach((cell, x) => {
        cell.isLiving(y, x)
      })
    })

    this.field.forEach((row, y) => {
      row.forEach((cell, x) => {
        cell.next()
      })
    })

    return this
  }

  run() {
    const isRunning = this.timer !== null

    if (!isRunning) {
      this.timer = setInterval(() => {
        this.next()
        this.render()
      }, 1000);
    }
  }

  stop() {
    clearInterval(this.timer)

    this.timer = null
  }
}