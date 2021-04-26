import Coordinate, {CoordinateInterface} from "./coordinate";

export interface DirectionInterface extends CoordinateInterface {
  active?: boolean
}

export class Direction extends Coordinate implements DirectionInterface {
  active: boolean = true;

  constructor(direction: DirectionInterface) {
    super({
      x: direction.x,
      y: direction.y,
    });

    if (typeof direction.active !== "undefined") {
      this.active = direction.active;
    }
  }

  isActive(): boolean {
    return this.active;
  }

  isInactive(): boolean {
    return !this.isActive();
  }

  setActive(active: boolean = true): void {
    this.active = active;
  }

  setInactive(): void {
    this.setActive(false);
  }

  isUp(): boolean {
    return this.getY() === 1;
  }

  isDown(): boolean {
    return this.getY() === -1;
  }

  isLeft(): boolean {
    return this.getX() === -1;
  }

  isRight(): boolean {
    return this.getX() === 1;
  }
}

export default Direction;
