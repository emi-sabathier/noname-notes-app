import { NOTES_COLLECTION_NAME, TAGS_COLLECTION_NAME } from '../../src/constants/firestore';

describe('firestore', () => {
    it('should NOTES_COLLECTION_NAME to be a string', () => {
        expect.stringContaining(NOTES_COLLECTION_NAME);
    });
    it('should TAGS_COLLECTION_NAME to be a string', () => {
        expect.stringContaining(TAGS_COLLECTION_NAME);
    });
});
