import {html, css, LitElement} from 'lit-element/lit-element.js';
import {LitQuickEvalLocalize} from './LitQuickEvalLocalize.js';
import {unsafeHTML} from 'lit-html/directives/unsafe-html.js';
import 'd2l-link/d2l-link.js';

class D2LQuickEvalNoSubmissionsText extends LitQuickEvalLocalize(LitElement) {
	static get styles() {
		return css`
			<style>
				.d2l-quick-eval-no-submissions-heading {
					@apply --d2l-heading-2;
					margin: 0;
				}
			</style>
		`;
	}
	render() {
		return html`
			<h2 class="d2l-quick-eval-no-submissions-heading">${this.localize('caughtUp')}</h2>
			<p class="d2l-body-standard">${this._computeNoSubmissionsText(this.courseLevel)}</p>
			<p class="d2l-body-standard">${this._computeCheckBackOftenText(this.courseLevel, this.multiCourseQuickEvalHref)}</p>
		`;
	}
	static get properties() {
		return {
			courseLevel: {
				type: Boolean,
				value: false
			},
			multiCourseQuickEvalHref: {
				type: String,
				value: ''
			}
		};
	}
	_computeNoSubmissionsText(courseLevel) {
		if (courseLevel) {
			return this.localize('noSubmissionsCourseLevel');
		}
		return this.localize('noSubmissions');
	}
	_computeCheckBackOftenText(courseLevel, multiCourseQuickEvalHref) {
		if (courseLevel && multiCourseQuickEvalHref) {
			return unsafeHTML(this.localize('checkBackOftenCourseLevel', {startTag: `<d2l-link href="${this.multiCourseQuickEvalHref}">`, endTag: '</d2l-link>'}));
		}
		return this.localize('checkBackOften');
	}
}

window.customElements.define('d2l-quick-eval-no-submissions-text', D2LQuickEvalNoSubmissionsText);
