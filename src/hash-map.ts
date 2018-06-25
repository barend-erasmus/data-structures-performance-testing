import { BasePerformanceTesting } from './base';
import { IPerfomanceTesting } from './interfaces/performance-testing';

export class HashMapPerformanceTesting<T> extends BasePerformanceTesting<T> implements IPerfomanceTesting<T> {

    protected itemsPerSlot: number = 5;

    protected numberOfSlots: number = 4096;

    constructor(
        dataBlockSize: number,
        fileName: string,
        protected searchComparator: (a: T, b: T) => any,
    ) {
        super(dataBlockSize, fileName, 'Hash Map');
    }

    public async add(obj: any): Promise<void> {
        let max: number = 0;

        const slot: number = this.calculateSlot(obj);

        const index: number = slot * this.dataBlockSize * this.itemsPerSlot;

        for (let count = 0; count < this.itemsPerSlot; count ++) {
            if (count > max) {
                max = count;
            }

            const value: T = await this.findAtIndex(index + count);

            if (!value) {
                await this.insertAtIndex(index + count, obj);
                return;
            }
        }
    }

    public async search(obj: any): Promise<{ index: number; obj: any; }> {
        const slot: number = this.calculateSlot(obj);

        const index: number = slot * this.dataBlockSize * this.itemsPerSlot;

        for (let count = 0; count < this.itemsPerSlot; count ++) {
            const value: T = await this.findAtIndex(index + count);

            if (this.searchComparator(value, obj) === 0) {
                return {
                    index: index + count,
                    obj: value,
                };
            }
        }

        return null;
    }

    protected calculateSlot(obj: T): number {
        let hash: number =  this.hash(JSON.stringify(obj));

        hash = Math.abs(hash);

        return hash % this.numberOfSlots;
    }

    protected hash(str: string): number {
        let h: number = 0x1505;

        for (let i = 0, l = str.length; i < l; i++) {
            // tslint:disable-next-line:no-bitwise
            h = ((h << 5) + h) + str.charCodeAt(i);
        }

        return h;
    }

}
