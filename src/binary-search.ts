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

    public async add(obj: T): Promise<void> {
        if (this.length === 0) {
            await this.insertAtIndex(this.length, obj);

            this.length++;

            return;
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
                break;
            } else if (this.searchComparator(middleValue, obj) === 1) {
                maxIndex = middleIndex - 1;
            }

            middleIndex = Math.floor((maxIndex + minIndex) / 2);
        }

        for (let index = middleIndex; index < this.length - 1; index ++) {
            const value: T = await this.findAtIndex(index);
            await this.insertAtIndex(index + 1, value);
        }

        await this.insertAtIndex(middleIndex + 1, obj);

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

    public async toArray(): Promise<T[]> {
        const result: T[] = [];

        for (let index = 0; index < this.length; index++) {
            result.push(await this.findAtIndex(index));
        }

        return result;
    }

}
