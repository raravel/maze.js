export const rand = (num=0, min=0): number => Math.floor(Math.random() * (num)) + min;
export const random = <T extends any>(items: T[]): T => items[rand(items.length)];


export class IteratorClass<T extends any>{

  constructor(protected data: T[] = []) {
    return new Proxy(this, {
      get: (target, p, ...args) => {
        if ( target.hasOwnProperty(p) || typeof p === 'symbol' ) {
          return Reflect.get(target, p, ...args);
        }
        
        if ( Number.isInteger(+p) ) {
          return this.data[+p];
        }
        return undefined;
      },
      set: (target, p, value, ...args) => {
        if ( target.hasOwnProperty(p) || typeof p === 'symbol' ) {
          return Reflect.set(target, p, value, ...args);
        }
        if ( Number.isInteger(+p) ) {
          return this.data[+p] = value;
        }
        return undefined;
      },
    });
  }
  
  *[Symbol.iterator](): Iterator<T> {
    for ( const item of this.data ) {
      yield item;
    }
  }

}