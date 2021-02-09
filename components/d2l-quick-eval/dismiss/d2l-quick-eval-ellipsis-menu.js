import { css, html, LitElement } from 'lit-element/lit-element.js';
import { LitQuickEvalLocalize } from '../QuickEvalLocalize.js';
import '@brightspace-ui/core/components/dropdown/dropdown-more.js';
import '@brightspace-ui/core/components/dropdown/dropdown-menu.js';
import '@brightspace-ui/core/components/menu/menu.js';
import '@brightspace-ui/core/components/menu/menu-item.js';
import './d2l-quick-eval-dismissed-activities.js';

class D2LQuickEvalEllipsisMenu extends LitQuickEvalLocalize(LitElement) {

	static get properties() {
		return {
			href: {
				type: String,
			},
			token: {
				type: String,
			},
			opened: {
				type: Boolean,
			},
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

	static get styles() {
		return css`
			:host([hidden]) {
				display: none;
			}
		`;
	}
	render() {
		return html`
		<d2l-dropdown-more text="${this.localize('optionsForQuickEval')}">
			<d2l-dropdown-menu>
				<d2l-menu label="${this.localize('optionsForQuickEval')}">
					<d2l-menu-item
					@d2l-menu-item-select="${this._open.bind(this)}"
					text="${this.localize('dismissedActivities')}"></d2l-menu-item>
					${this._renderMultiCourseLinkMenuItem()}
				</d2l-menu>
			</d2l-dropdown-menu>
		</d2l-dropdown-more>
		<d2l-quick-eval-dismissed-activities
			href="${this._computeLazyHref()}"
			.token="${this.token}"
			.opened="${this.opened}"
			@d2l-dialog-close="${this._close.bind(this)}"
			></d2l-quick-eval-dismissed-activities>
		`;
	}

	constructor() {
		super();
		this._close();
		this._initialLoad = true;
	}

	_open() {
		this._initialLoad = false;
		this.opened = true;
	}

	_close() {
		this.opened = false;
	}

	_computeLazyHref() {
		if (!this._initialLoad) {
			return this.href;
		}
		return '';
	}

	_goToMultiCourseQuickEval() {
		window.location.href = this.multiCourseQuickEvalHref;
	}

	_renderMultiCourseLinkMenuItem() {
		return (this.courseLevel && this.multiCourseQuickEvalHref) ? (
			html`<d2l-menu-item
				@d2l-menu-item-select="${this._goToMultiCourseQuickEval.bind(this)}"
				text="${this.localize('multiCourseQuickEval')}"
			></d2l-menu-item>`
		) : (html``);
	}
}

window.customElements.define('d2l-quick-eval-ellipsis-menu', D2LQuickEvalEllipsisMenu);
