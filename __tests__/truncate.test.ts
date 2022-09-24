import { truncate } from '../src/utils/truncate';

describe('truncate', () => {
    it('should slice string', () => {
        expect(truncate('OYI3ve168yLqmKqk6AwYwgsN9W8m92EbMUCLHbQoAaYqeRZbu2')).toEqual(
            'OYI3ve168yLqmKqk6AwYwgsN9W8m92EbMUCLHbQo...',
        );
    });
    it('should return original string if < 40', () => {
        expect(truncate('OYI3ve168yLqmKqk6Aw')).toEqual('OYI3ve168yLqmKqk6Aw');
    });
    it('should return empty string', () => {
        expect(truncate('')).toBe('');
    });
});
