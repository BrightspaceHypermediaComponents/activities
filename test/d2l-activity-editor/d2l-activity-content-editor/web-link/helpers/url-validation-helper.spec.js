import { expect } from 'chai';
import { getWeblinkError } from '../../../../../components/d2l-activity-editor/d2l-activity-content-editor/web-link/helpers/url-validation-helper.js';

describe('UrlValidationHelper', () => {
	let testUrl = '';
	let isExternalResource;

	// TODO: Finish writing tests for this
	describe('getWeblinkError', () => {
		describe('when url is embedded', () => {
			isExternalResource = true;

			it('returns null on a valid url', () => {
				testUrl = 'https://google.ca';

				const result = getWeblinkError(testUrl, isExternalResource);

				expect(result).to.be.null;
			});
		});

		describe('when url is not embedded', () => {
			isExternalResource = true;

		});
	});
});
