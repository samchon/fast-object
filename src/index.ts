export default function create<T extends object>(input: T): T;

/**
 * @internal
 */
export default function create(): never {
    throw new Error(
        `Error on TSON.create(): no transform has been configured. Configure the "tsconfig.json" file following the README - https://github.com/samchon/typescript-json`,
    );
}
