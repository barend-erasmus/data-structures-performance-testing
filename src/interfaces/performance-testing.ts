export interface IPerfomanceTesting<T> {

    add(obj: T): Promise<void>;

    dispose(): void;

    search(obj: T): Promise<{ index: number, obj: T }>;

    toString(): string;

}
