import { IteratorClass } from "./utils";

export class Room {
  public top: Neighbor<Room> = Wall;
  public bottom: Neighbor<Room> = Wall;
  public left: Neighbor<Room> = Wall;
  public right: Neighbor<Room> = Wall;

  constructor(public value: number = Wall) {}
}

export class MazeRow extends IteratorClass<Room> {
  constructor(width: number) {
    super(Array.from({ length: width }, (): Room => new Room()))
  }
}

export class Maze extends IteratorClass<MazeRow> {

  constructor(width: number, height: number) {
    super(Array.from({ length: height }, (): MazeRow => new MazeRow(width)));
  }
  
}

export const Wall = 0;
export type TypeWall = 0;
export type Neighbor<T> = T|TypeWall;