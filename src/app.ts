import * as path from 'path';
import { BinarySearchPerformanceTesting } from './binary-search';

(async () => {
    const performanceTesting: BinarySearchPerformanceTesting = new BinarySearchPerformanceTesting(20, path.join(__dirname, 'binary-search.log'));

    for (let i = 0; i < 10; i += 1) {
        await performanceTesting.add(i, Math.random().toString());
    }

    const numberOfRequests: number = 10000;

    const startTimestamp: Date = new Date();

    for (let i = 0; i < numberOfRequests; i ++) {
        const str: string = await performanceTesting.search(Math.floor(Math.random() * 500000));
        
        console.log(str);
    }

    const endTimestamp: Date = new Date();

    console.log(`${endTimestamp.getTime() - startTimestamp.getTime()} ms`);
    console.log(`${numberOfRequests / ((endTimestamp.getTime() - startTimestamp.getTime()) / 1000)} request per second`);

    performanceTesting.dispose();
})();
