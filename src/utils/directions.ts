import Direction, {DirectionInterface} from "./direction";
import DirectionCollection from "./direction-collection";

export interface DirectionsOptions {
  active?: string[];
  inactive?: string[];
  custom?: CustomDirections;
}

export interface DirectionsInterface {
  up: DirectionInterface;
  down: DirectionInterface;
  left: DirectionInterface;
  right: DirectionInterface;
  left_up: DirectionInterface;
  left_down: DirectionInterface;
  right_up: DirectionInterface;
  right_down: DirectionInterface;

  [index: string]: DirectionInterface | Function | DirectionCollection;
}

export interface CustomDirections {
  [index: string]: DirectionInterface;
}

export class Directions implements DirectionsInterface {
  [index: string]: Direction | Function | DirectionCollection;

  public down: Direction = new Direction({x: 0, y: -1});
  public left: Direction = new Direction({x: -1, y: 0});
  public left_down: Direction = new Direction({x: -1, y: -1});
  public left_up: Direction = new Direction({x: -1, y: 1});
  public right: Direction = new Direction({x: 1, y: 0});
  public right_down: Direction = new Direction({x: 1, y: -1});
  public right_up: Direction = new Direction({x: 1, y: 1});
  public up: Direction = new Direction({x: 0, y: 1});

  public customCollection: DirectionCollection = new DirectionCollection();

  public constructor(options?: DirectionsOptions) {
    if (typeof options === "undefined") {
      return;
    }

    if (typeof options.custom !== "undefined") {
      this.setCustom(options.custom);
    }

    if (typeof options.inactive !== "undefined") {
      this.setInactive(options.inactive);
    }

    if (typeof options.active !== "undefined") {
      this.setActive(options.active);
    }
  }

  public static getDefaultKeys(): string[] {
    return [
      "down",
      "left",
      "left_down",
      "left_up",
      "right",
      "right_down",
      "right_up",
      "up",
    ];
  }

  public throwInvalidKeyError(key: string) {
    throw new Error(`Invalid direction key passed: expected on of: "${(this.getAllKeys())}" got "${key}"`);
  }

  public throwInactiveKeyError(key: string) {
    throw new Error(`Invalid direction key passed: expected on of: "${(this.getActiveKeys())}" got "${key}"`);
  }

  public getCustomKeys(): string[] {
    return this.getCustomCollection().getKeys();
  }

  public getAllKeys(): string[] {
    const keys = Directions.getDefaultKeys();

    keys.push(...this.getCustomKeys());

    return keys;
  }

  public isValidKey(key: string): boolean {
    return this.getAllKeys().indexOf(key) !== -1;
  }

  public isInvalidKey(key: string): boolean {
    return !this.isValidKey(key);
  }

  public setCustomCollection(collection: DirectionCollection) {
    this.customCollection = collection;
  }

  public resetCustomCollection() {
    this.customCollection = new DirectionCollection();
  }

  public getCustomCollection(): DirectionCollection {
    return this.customCollection;
  }

  public setCustom(custom: CustomDirections) {
    this.resetCustomCollection();

    for (const key in custom) {
      if (!custom.hasOwnProperty(key)) {
        continue;
      }

      const value = new Direction(custom[key]);

      this.getCustomCollection().put(key, value);
    }
  }

  public hasCustom(): boolean {
    return this.getCustomKeys().length > 0;
  }

  public isCustom(key: string): boolean {
    return this.getCustomCollection().isValidKey(key);
  }

  public getCustom(key: string): Direction | null {
    if (!this.isCustom(key)) {
      return this.getCustomCollection().get(key);
    }

    this.throwInvalidKeyError(key);

    return null;
  }

  public get(key: string): Direction {
    if (this.isInvalidKey(key)) {
      this.throwInvalidKeyError(key);
    }

    if (this.hasCustom()) {
      const direction = this.getCustom(key);

      if (direction) {
        return direction;
      }
    }

    return <Direction>this[key];
  }

  public isActive(key: string): boolean {
    return this.get(key).isActive();
  }

  public setActive(active: string[]) {
    for (let i = 0; i < active.length; i++) {
      if (this.isActive(active[i])) {
        continue;
      }

      this.get(active[i]).setActive();
    }
  }

  public getActive(key: string): Direction {
    if (this.isInactive(key)) {
      this.throwInactiveKeyError(key);
    }

    return this.get(key);
  }

  public isInactive(key: string): boolean {
    return this.get(key).isInactive();
  }

  public setInactive(inactive: string[]) {
    for (let i = 0; i < inactive.length; i++) {
      if (this.isInactive(inactive[i])) {
        continue;
      }

      this.get(inactive[i]).setInactive();
    }
  }

  public getActiveKeys() {
    const keys = this.getAllKeys();
    const active = [];

    for (let i = 0; i < keys.length; i++) {
      if (this.isInactive(keys[i])) {
        continue;
      }

      active.push(keys[i]);
    }

    return active;
  }

  public getAllActive(): { [index: string]: Direction } {
    const keys = this.getActiveKeys();
    const active: { [index: string]: Direction } = {};

    for (const key in keys) {
      active[key] = this.getActive(key);
    }

    return active;
  }

  public getRandom(active_only: boolean = true): Direction {
    const keys = active_only ? this.getActiveKeys() : this.getAllKeys();

    const index = this.getRandomIndex(keys.length);

    return active_only ? this.getActive(keys[index]) : this.get(keys[index]);
  }

  public getRandomIndex(arrayLength: number): number {
    return Math.floor(Math.random() * arrayLength);
  }
}

export default Directions;
