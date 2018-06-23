import { BasePerformanceTesting } from './base';

export class BinarySearchPerformanceTesting<T> extends BasePerformanceTesting<T> {

    protected length: number = null;

    constructor(
        dataBlockSize: number,
        fileName: string,
        protected searchComparator: (a: T, b: T) => any,
    ) {
        super(dataBlockSize, fileName);

        this.length = 0;
    }

    public async add(id: number, value: string): Promise<void> {
        // await this.fsWrite(`${id}|${value}`, this.length);

        // await this.fsSync();

        this.length++;
    }

    public async search(obj: T): Promise<{ index: number, obj: T }> {
        if (this.length === 0) {
            return null;
        }

        let maxIndex: number = this.length - 1;
        let minIndex: number = 0;
        let middleIndex: number = Math.floor((maxIndex - minIndex) / 2);

        let middleValue: T = null;

        while (minIndex <= maxIndex) {
            middleValue = await this.findAtIndex(middleIndex);

            if (this.searchComparator(middleValue, obj) === -1) {
                minIndex = middleIndex + 1;
            } else if (this.searchComparator(middleValue, obj) === 0) {
                return {
                    index: middleIndex,
                    obj: await this.findAtIndex(middleIndex),
                };
            } else if (this.searchComparator(middleValue, obj) === 1) {
                maxIndex = middleIndex - 1;
            }

            middleIndex = Math.floor((maxIndex + minIndex) / 2);
        }

        return null;
    }

}
