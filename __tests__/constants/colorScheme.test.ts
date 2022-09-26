import { colorScheme } from '../../src/constants/colorScheme';

describe('colorScheme', () => {
    it('should contains string value', () => {
        Object.values(colorScheme).map(color => {
            expect.stringContaining(color);
        });
    });
});
