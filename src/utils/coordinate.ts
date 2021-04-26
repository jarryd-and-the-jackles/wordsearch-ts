import Direction from "./direction";
import Grid from "./grid";

export interface CoordinateInterface {
  x: number
  y: number
}

interface RandomOptions {
  grid: Grid;
  direction?: Direction;
  wordLength?: number;
}

export class Coordinate implements CoordinateInterface {
  public x: number;
  public y: number;

  public constructor(coordinate: CoordinateInterface) {
    this.x = coordinate.x;
    this.y = coordinate.y;
  }

  static getRandom({grid, direction, wordLength}: RandomOptions): Coordinate {
    let maxX = grid.getWidth();
    let maxY = grid.getHeight();
    let minX = 0;
    let minY = 0;

    if (typeof direction !== "undefined" && typeof wordLength !== "undefined") {
      if (direction.isUp()) {
        maxY -= (wordLength - 1);
      } else if (direction.isDown()) {
        minY += (wordLength - 1);
      }

      if (direction.isRight()) {
        maxX -= (wordLength - 1);
      } else if (direction.isLeft()) {
        minX += (wordLength - 1);
      }
    }

    const newX = Math.floor((Math.random() * (maxX - minX)) + minX);
    const newY = Math.floor((Math.random() * (maxY - minY)) + minY);

    return new Coordinate({
      x: newX,
      y: newY,
    });
  }

  public getX() {
    return this.x;
  }

  public getY() {
    return this.y;
  }

  public move(direction: CoordinateInterface) {
    this.x += direction.x;
    this.y += direction.y;
  }

  public clone(): Coordinate {
    return new Coordinate(this);
  }
}

export default Coordinate;
