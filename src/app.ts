// import * as path from 'path';
// import { BinarySearchPerformanceTesting } from './binary-search';

// (async () => {
//     const performanceTesting: BinarySearchPerformanceTesting<string> = new BinarySearchPerformanceTesting(
//         20,
//         path.join(__dirname, 'binary-search.log'),
//         (a: string, b: string) => a < b ? -1 : a > b ? 1 : 0);

//     for (let i = 0; i < 500000; i += 1) {
//         await performanceTesting.add(i, Math.random().toString());
//     }

//     const numberOfRequests: number = 10000;

//     const startTimestamp: Date = new Date();

//     for (let i = 0; i < numberOfRequests; i++) {
//         const r: any = await performanceTesting.search(Math.floor(Math.random() * 500000).toString());
//     }

//     const endTimestamp: Date = new Date();

//     console.log(`${endTimestamp.getTime() - startTimestamp.getTime()} ms`);
//     console.log(`${numberOfRequests / ((endTimestamp.getTime() - startTimestamp.getTime()) / 1000)} request per second`);

//     performanceTesting.dispose();
// })();
