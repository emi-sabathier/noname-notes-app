import { colorsList } from '../../src/constants/noteColorsList';

describe('colorsList', () => {
    it('should be an array', () => {
        expect(Array.isArray(colorsList)).toBeTruthy();
    });
});
