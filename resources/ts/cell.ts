type BorderStyle = 'black'

const Style = {
  DEAD: 'white',
  ALIVE: 'black'
}

const Status = {
  DEAD: false,
  ALIVE: true
}

type Status = typeof Status[keyof typeof Status]

type Style = typeof Style[keyof typeof Style]

type Coordinates = {
  x: number,
  y: number
}

export class Cell {
  static borderStyle = 'black'

  height: number
  width: number
  coordinates: Coordinates

  isAlive: Status = false
  nextLife: Status = false
  neighborhoods: Array<Cell>

  constructor(height: number, width: number, coordinates: Coordinates) {
    this.height = height
    this.width = width

    this.coordinates = coordinates
  }

  setNeighborHoods(cells: Array<Array<Cell>>) {
    this.neighborhoods = [
      cells?.[this.coordinates.y - 1]?.[this.coordinates.x - 1],
      cells?.[this.coordinates.y - 1]?.[this.coordinates.x],
      cells?.[this.coordinates.y - 1]?.[this.coordinates.x + 1],

      cells?.[this.coordinates.y]?.[this.coordinates.x - 1],
      cells?.[this.coordinates.y]?.[this.coordinates.x + 1],

      cells?.[this.coordinates.y + 1]?.[this.coordinates.x - 1],
      cells?.[this.coordinates.y + 1]?.[this.coordinates.x],
      cells?.[this.coordinates.y + 1]?.[this.coordinates.x],
    ].filter(c => c != undefined)
  }

  next(): void {
    this.isAlive = this.nextLife
  }

  isLiving(y, x) {
    const livingNeighborHoodsCount = this.neighborhoods.filter(cell => cell.isAlive).length

    if (y < 5 && livingNeighborHoodsCount > 0){

      console.log(`y:${y}-x:${x}`)
      console.log(this.neighborhoods)
    }
    switch (livingNeighborHoodsCount) {
      case 0:
      case 1:
        this.nextLife = false
        break
      case 2:
        this.nextLife = this.isAlive
        break
      case 3:
        this.nextLife = true
        break
      default:
        this.nextLife = false
    }

    return this
  }
}