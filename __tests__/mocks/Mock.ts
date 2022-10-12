export type Mock<T> = {
    [K in keyof T]: T[K] extends (...args: infer A) => infer B ? jest.Mock<B, A> : T[K];
};

export const mock = <T extends object>(): Mock<T> => {
    return new Proxy<T>({} as T, {
        get(object, key) {
            if (!(key in object)) {
                // @ts-ignore
                object[key] = jest.fn();
            }
            // @ts-ignore
            return object[key];
        },
        set(object, key, value) {
            // @ts-ignore
            object[key] = value;
            return true;
        },
    }) as Mock<T>;
};
