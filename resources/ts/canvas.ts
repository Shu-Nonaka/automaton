import {Cell} from "./cell";

export class Canvas {
  element: HTMLCanvasElement
  context: CanvasRenderingContext2D

  constructor(canvasElement: HTMLCanvasElement) {
    this.element = canvasElement
    this.context = this.element.getContext('2d')
  }

  initializeStyle(): void {
    this.context.strokeStyle = 'black'
  }

  drawBorder(x: number, y: number, w: number, h: number): void {
    this.context.strokeRect(x, y, w, h)
  }

  drawArea(c: string, x: number, y: number, w: number, h: number): void {
    this.context.fillStyle = c
    this.context.fillRect(x, y, w, h)
  }

  drawCell(cell: Cell) {
    const color = cell.isAlive ? 'black' : 'white'

    const xCoordinate = cell.coordinates.x * cell.width
    const yCoordinate = cell.coordinates.y * cell.height

    this.drawBorder(xCoordinate, yCoordinate, cell.width, cell.height)
    this.drawArea(color, xCoordinate, yCoordinate, cell.width, cell.height)
  }
}
