import '../../components/d2l-activity-editor/d2l-activity-assignment-editor/d2l-activity-assignment-editor-submission-and-completion.js';
import { aTimeout, expect, fixture, html, oneEvent } from '@open-wc/testing';
import { default as langTerms } from '../../components/d2l-activity-editor/d2l-activity-assignment-editor/lang/en.js';
import { runConstructor } from '@brightspace-ui/core/tools/constructor-test-helper.js';
import sinon from 'sinon';
import { shared as store } from '../../components/d2l-activity-editor/d2l-activity-assignment-editor/state/assignment-store.js';

describe('d2l-activity-assignment-editor-submission-and-completion', function() {

	let el, href, entityStoreGet, entityStoreFetch;
	function getAccordion() {
		// returns an Element
		return el.shadowRoot.querySelector('.accordion');
	}

	beforeEach(async() => {
		href = 'http://activity/1';

		entityStoreGet = sinon.stub(window.D2L.Siren.EntityStore, 'get').returns({
			hasActionByName: () => true,
			getSubEntityByRel: () => {
				return {
					getActionByName: () => {
						return {
							hasFieldByName: () => true,
							getFieldByName: () => {
								return {
									value: [
										{
											value: 1,
											title: 'completion type 1'
										}
									]
								};
							},
						};
					},
					getSubEntityByRel: () => {},
					hasActionByName: () => true,
					hasClass: () => true,
					properties: {
						url: ''
					}
				};
			},
			hasSubEntityByRel: () => {
				return { hasActionByName: () => true };
			},
			hasLinkByRel: () => true,
			getLinkByRel: () => {
				return { href: '' };
			},
			getActionByName: () => {
				return {
					hasFieldByName: () => true,
					getFieldByName: () => {
						return {
							value: [
								{
									value: 1, title: 'first submission type'
								},
								{
									value: 2, title: 'second submission type'
								}
							]
						};
					}
				};
			},
			properties: { 
				submissionType: {
					value: '1', title: 'first submission type'
				}
			}
		});
		entityStoreFetch = sinon.stub(window.D2L.Siren.EntityStore, 'fetch').returns({
			hasActionByName: () => true
		});

		await store.fetchAssignment(href, 'token');

		el = await fixture(
			html`
				<d2l-activity-assignment-editor-submission-and-completion-editor href=${href} token="token">
				</d2l-activity-assignment-editor-submission-and-completion-editor>
			`
		);
	});

	afterEach(() => {
		entityStoreGet.restore();
		entityStoreFetch.restore();
	});

	describe('constructor', () => {

		it('should construct', () => {
			runConstructor('d2l-activity-assignment-editor-submission-and-completion-editor');
		});

	});

	it('passes accessibility test', async() => {
		await expect(el).to.be.accessible();
	});

	it('accordion is not hidden on load', async() => {
		expect(getAccordion().getAttribute('hidden')).to.be.null;
	});

	it('accordion has a heading', async() => {
		const header = el.shadowRoot.querySelectorAll('.accordion > .activity-summarizer-header');
		expect(header[0].slot).to.equal('header'); //TODO: probably remove this, impl detail
		expect(header[0].innerText).to.equal(langTerms.submissionCompletionAndCategorization);
	});

	it('accordion has a summary', async() => {
		const summary = el.shadowRoot.querySelectorAll('.accordion > .activity-summarizer-summary');
		expect(summary[0].slot).to.equal('summary'); //TODO: probably remove this, impl detail
		expect(summary[0].getElementsByTagName('li').length).to.equal(3);
	});

	it('accordion initializes as closed', async() => {
		expect(getAccordion().getAttribute('_state')).to.equal('closed');
	});

	it('handles click event', async() => {
		//TODO: make this check if accordion opens/closes? (maybe out of scope?)
		setTimeout(() => el.click());
		const { target } = await oneEvent(el, 'click');
		expect(target).equals(el);
	});

	describe('submission-type-container', () => {
		it('submission type options loads correctly', async() => {
			const submissionSelect = el.shadowRoot.querySelector('#assignment-submission-type');
			expect(submissionSelect.getElementsByTagName('option').length).to.equal(2);
		});
	});
});
