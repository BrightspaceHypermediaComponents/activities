import { expect } from 'chai';
import { getInvalidWeblinkKey } from './url-validation-helper.js';

describe('UrlValidationHelper', () => {
    let testUrl = '';
    let isExternalResource;

	describe('getInvalidWeblinkKey', () => {

		describe('when url is embedded', () => {
            isExternalResource = true;

            it('returns null on a valid url', () => {
                testUrl = 'https://google.ca';

                const result = getInvalidWeblinkKey(testUrl, isExternalResource);

                expect(result).to.be.null;
            })
        });

        describe('when url is not embedded', () => {

        });
	});
});
