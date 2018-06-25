import * as fs from 'fs';
import * as path from 'path';
import { BinarySearchPerformanceTesting } from './binary-search';
import { BinaryTreePerformanceTesting } from './binary-tree';
import { HashMapPerformanceTesting } from './hash-map';
import { IPerfomanceTesting } from './interfaces/performance-testing';
import { StandardArrayPerformanceTesting } from './standard-array';

(async () => {
    const binarySearchPerformanceTesting: BinarySearchPerformanceTesting<string> = new BinarySearchPerformanceTesting(
        50,
        path.join(__dirname, 'binary-search.log'),
        (a: string, b: string) => a < b ? -1 : a > b ? 1 : 0);

    const binaryTreePerformanceTesting: BinaryTreePerformanceTesting<string> = new BinaryTreePerformanceTesting(
        50,
        path.join(__dirname, 'binary-tree.log'),
        (a: string, b: string) => a < b ? -1 : a > b ? 1 : 0);

    const hashMapPerformanceTesting: HashMapPerformanceTesting<string> = new HashMapPerformanceTesting(
        50,
        path.join(__dirname, 'hash-map.log'),
        (a: string, b: string) => a < b ? -1 : a > b ? 1 : 0);

    const standardArrayPerformanceTesting: StandardArrayPerformanceTesting<string> = new StandardArrayPerformanceTesting(
        50,
        path.join(__dirname, 'standard-array.log'),
        (a: string, b: string) => a < b ? -1 : a > b ? 1 : 0);

    const performanceTestings: Array<IPerfomanceTesting<string>> = [
        binarySearchPerformanceTesting,
        binaryTreePerformanceTesting,
        hashMapPerformanceTesting,
        standardArrayPerformanceTesting,
    ];

    for (const performanceTesting of performanceTestings) {
        console.log(performanceTesting.toString());

        const entries: string[] = fs
            .readFileSync(path.join(__dirname, '..', '1000-common-words.txt'), 'utf8')
            .split('\r\n')
            .slice(0, 1000);

        const startTimestampAdd: Date = new Date();

        for (const entry of entries) {
            await performanceTesting.add(entry);
        }

        const endTimestampAdd: Date = new Date();

        console.log(`Add`);
        console.log(`  ${endTimestampAdd.getTime() - startTimestampAdd.getTime()} ms`);
        console.log(`  ${entries.length / ((endTimestampAdd.getTime() - startTimestampAdd.getTime()) / 1000)} per second`);

        const numberOfRequests: number = 3000;

        const startTimestampSearch: Date = new Date();

        for (let i = 0; i < numberOfRequests; i++) {
            const r: any = await performanceTesting.search(entries[Math.floor(Math.random() * entries.length)]);
        }

        const endTimestampSearch: Date = new Date();

        console.log(`Search`);
        console.log(`  ${endTimestampSearch.getTime() - startTimestampSearch.getTime()} ms`);
        console.log(`  ${numberOfRequests / ((endTimestampSearch.getTime() - startTimestampSearch.getTime()) / 1000)} per second`);

        performanceTesting.dispose();

        console.log(`-----------`);
    }
})();
