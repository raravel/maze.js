import { rand } from './utils';
import { Maze, Room, Wall } from './maze';

export class EllerMaze extends Maze {

  private increment = 1;
  
  constructor(width: number, height: number, public level = 2) {
    super(width, height);
    this.initialize();
    this.create();
    this.groupNormalize();
  }

  private initialize() {
    this.forEach((row, y) => {
      row.forEach((room) => {
        if ( y === 0 ) {
          room.value = this.increment++;
        } else {
          room.value = 0;
        }
      });
    });
  }

  private needMerge(): boolean {
    return !!rand(this.level);
  }

  private needDig(): boolean {
    return !!rand(this.level);
  }

  private groupNormalize() {
    this.forEach((row) => {
      row.forEach((room) => {
        if ( room.value !== Wall ) room.value = 1;
      });
    });
  }

  private create() {
    let y=0;
    for ( ;y < this.length-1;y++ ) {
      const row = this[y];
      let nowGroup = Wall;
      let isGroupDig = false;

      for ( let x=0;x < row.length;x++ ) {
        const col = row[x];
        if ( col.value === Wall )
          col.value = this.increment++;
      }

      for ( let x=0;x < row.length-1;x++ ) {
        const col = row[x];

        if ( nowGroup === Wall ) {
          nowGroup = col.value;
        }

        if ( this.needMerge() ) {
          const next = row[x+1];
          next.value = nowGroup;
          next.left = col;
          col.right = next;

          if ( this.needDig() ) {
            const bottom = this[y+1][x];
            bottom.value = nowGroup;
            bottom.top = col;
            col.bottom = bottom;
            isGroupDig = true;
          }
        } else {
          if ( !isGroupDig ) {
            const bottom = this[y+1][x];
            bottom.value = nowGroup;
            bottom.top = col;
            col.bottom = bottom;
          }
          nowGroup = Wall;
          isGroupDig = false;
        }
      }
    }

    const lastRow = this[y];
    for ( let x=0;x < lastRow.length-1;x++ ) {
      const now = lastRow[x];
      const next = lastRow[x+1];
      next.value = 1;
      next.left = now;
      now.right = next;
    }
  }
  
  public toRaw(): Room[][] {
    return this.data.map((r) => r.data);
  }
}
