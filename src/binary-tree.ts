import { BasePerformanceTesting } from './base';
import { IPerfomanceTesting } from './interfaces/performance-testing';

export class BinaryTreePerformanceTesting<T> extends BasePerformanceTesting<T> implements IPerfomanceTesting<T> {

    constructor(
        dataBlockSize: number,
        fileName: string,
        protected searchComparator: (a: T, b: T) => any,
    ) {
        super(dataBlockSize, fileName);
    }

    public async add(obj: T): Promise<void> {
        let index: number = 0;

        let node: T = null;

        while (true) {
            node = await this.findAtIndex(index);

            if (!node) {
                await this.insertAtIndex(index, obj);
                return;
            }

            const leftIndex: number = (index * 2) + 1;
            const rightIndex: number = (index * 2) + 2;

            if (this.searchComparator(node, obj) === -1) {
                index = leftIndex;
            } else if (this.searchComparator(node, obj) === 0) {
                return;
            } else if (this.searchComparator(node, obj) === 1) {
                index = rightIndex;
            }
        }
    }

    public async search(obj: T): Promise<{ index: number, obj: T }> {
        let index: number = 0;

        let node: T = null;

        while (true) {
            node = await this.findAtIndex(index);

            if (!node) {
                return null;
            }

            const leftIndex: number = (index * 2) + 1;
            const rightIndex: number = (index * 2) + 2;

            if (this.searchComparator(node, obj) === -1) {
                index = leftIndex;
            } else if (this.searchComparator(node, obj) === 0) {
                return {
                    index,
                    obj: node,
                };
            } else if (this.searchComparator(node, obj) === 1) {
                index = rightIndex;
            }
        }
    }

}
