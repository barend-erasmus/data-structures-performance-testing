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

        it('should add in order', async () => {
            await performanceTesting.add('hello');
            await performanceTesting.add('world');
            await performanceTesting.add('foo');
            await performanceTesting.add('bar');
            await performanceTesting.add('john');
            await performanceTesting.add('doe');

            const result: string[] = await performanceTesting.toArray();

            expect(result[0]).to.be.eq('bar');
            expect(result[1]).to.be.eq('doe');
            expect(result[2]).to.be.eq('foo');
            expect(result[3]).to.be.eq('hello');
        });

    });

});
