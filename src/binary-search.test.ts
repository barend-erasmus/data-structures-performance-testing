import { expect } from 'chai';
import 'mocha';
import * as path from 'path';
import * as sinon from 'sinon';
import { BinarySearchPerformanceTesting } from './binary-search';

describe('BinarySearchPerformanceTesting', () => {

    let performanceTesting: BinarySearchPerformanceTesting<string> = null;

    describe('#add', () => {

        afterEach(async () => {
            performanceTesting.dispose();
        });

        beforeEach(async () => {
            performanceTesting = new BinarySearchPerformanceTesting(
                20,
                path.join(__dirname, 'binary-search.log'),
                (a: string, b: string) => a < b ? -1 : a > b ? 1 : 0);
        });

        it('', async () => {
            await performanceTesting.add('bar');
            await performanceTesting.add('foo');
            await performanceTesting.add('hello');
            await performanceTesting.add('world');

            await performanceTesting.add('john');

            const result: string[] = await performanceTesting.toArray();

            console.log(result);
        });

    });

});
