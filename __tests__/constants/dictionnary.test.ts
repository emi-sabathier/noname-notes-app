import { dictionary } from '../../src/constants/dictionary';

describe('dictionary', () => {
    it('should contains string value', () => {
        const traverseObject = target => {
            for (const key in target) {
                if (typeof target[key] === 'object') {
                    traverseObject(target[key]);
                } else {
                    expect.stringContaining(target[key]);
                }
            }
        };

        traverseObject(dictionary);
    });
});
