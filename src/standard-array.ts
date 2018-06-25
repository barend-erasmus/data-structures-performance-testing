import { BasePerformanceTesting } from './base';
import { IPerfomanceTesting } from './interfaces/performance-testing';

export class StandardArrayPerformanceTesting<T> extends BasePerformanceTesting<T> implements IPerfomanceTesting<T> {

    protected length: number = null;

    constructor(
        dataBlockSize: number,
        fileName: string,
        protected searchComparator: (a: T, b: T) => any,
    ) {
        super(dataBlockSize, fileName);

        this.length = 0;
    }

    public async add(obj: T): Promise<void> {
        this.insertAtIndex(this.length, obj);

        this.length++;
    }

    public async search(obj: T): Promise<{ index: number; obj: T; }> {
        for (let index = 0; index < this.length; index++) {
            const value: T = await this.findAtIndex(index);

            if (this.searchComparator(value, obj) === 0) {
                return {
                    index,
                    obj: value,
                };
            }
        }

        return null;
    }

}
