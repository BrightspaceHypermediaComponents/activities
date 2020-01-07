import '../d2l-activity-editor.js';
import './d2l-activity-assignment-editor-detail.js';
import './d2l-activity-assignment-editor-secondary.js';
import './d2l-activity-assignment-editor-footer.js';
import '@brightspace-ui/core/templates/primary-secondary/primary-secondary.js';
import 'd2l-save-status/d2l-save-status.js';
import { css, html, LitElement } from 'lit-element/lit-element.js';
import { AssignmentActivityUsageEntity } from 'siren-sdk/src/activities/assignments/AssignmentActivityUsageEntity.js';
import { EntityMixinLit } from 'siren-sdk/src/mixin/entity-mixin-lit.js';
import { PendingContainerMixin } from 'siren-sdk/src/mixin/pending-container-mixin.js';

class AssignmentEditor extends PendingContainerMixin(EntityMixinLit(LitElement)) {

	static get properties() {
		return {
			/**
			 * True if the user's settings allow for rendering the WYSIWYG HTML editor
			 */
			htmlEditorEnabled: { type: Boolean },
			/**
			 * API endpoint for attachment unfurling service
			 */
			unfurlEndpoint: { type: String },
			/**
			 * API endpoint for determining whether a domain is trusted
			 */
			trustedSitesEndpoint: { type: String },
			_assignmentHref: { type: String },
			_initialLoadComplete: { type: Boolean }
		};
	}

	static get styles() {
		return css`
			:host {
				display: block;
			}
			:host([hidden]) {
				display: none;
			}
			.d2l-activity-assignment-editor-detail-panel, .d2l-activity-assignment-editor-secondary-panel {
				padding: 20px;
			}
			d2l-save-status {
				display: inline-block;
			}
		`;
	}

	constructor() {
		super();
		this._setEntityType(AssignmentActivityUsageEntity);
		this._assignmentHref = '';
		document.addEventListener('d2l-pending-resolved', this._onPendingResolved, {
			once: true
		});
	}

	set _entity(entity) {
		if (this._entityHasChanged(entity)) {
			this._onAssignmentActivityUsageChange(entity);
			super._entity = entity;
		}
	}

	firstUpdated(changedProperties) {
		super.firstUpdated(changedProperties);

		this.addEventListener('d2l-siren-entity-save-start', () => {
			this.shadowRoot.querySelector('#save-status').start();
		});
		this.addEventListener('d2l-siren-entity-save-end', () => {
			this.shadowRoot.querySelector('#save-status').end();
		});
		this.addEventListener('d2l-siren-entity-save-error', () => {
			this.shadowRoot.querySelector('#save-status').error();
		});
	}

	_onAssignmentActivityUsageChange(assignmentActivityUsage) {
		this._assignmentHref = assignmentActivityUsage.assignmentHref();
	}

	_onRequestProvider(e) {
		if (e.detail.key === 'd2l-provider-html-editor-enabled') {
			e.detail.provider = this.htmlEditorEnabled;
			e.stopPropagation();
		}
	}

	_onPendingResolved() {
		// Once we've loaded the page once, this prevents us from ever showing
		// the "Loading..." div again, even if page components are (re)loading
		this._initialLoadComplete = true;
	}

	render() {
		return html`
			<d2l-activity-editor
				?loading="${!this._initialLoadComplete && this._hasPendingChildren}"
				unfurlEndpoint="${this.unfurlEndpoint}"
				trustedSitesEndpoint="${this.trustedSitesEndpoint}"
				@d2l-request-provider="${this._onRequestProvider}">

				<d2l-template-primary-secondary slot="editor">
					<slot name="editor-nav" slot="header"></slot>
					<d2l-activity-assignment-editor-detail
						href="${this._assignmentHref}"
						.token="${this.token}"
						slot="primary"
						class="d2l-activity-assignment-editor-detail-panel">
					</d2l-activity-assignment-editor-detail>
					<d2l-activity-assignment-editor-secondary
						href="${this._assignmentHref}"
						.token="${this.token}"
						slot="secondary"
						class="d2l-activity-assignment-editor-secondary-panel">
					</d2l-activity-assignment-editor-secondary>
					<d2l-activity-assignment-editor-footer
						href="${this._assignmentHref}"
						.token="${this.token}"
						slot="footer"
						class="d2l-activity-assignment-editor-footer">
						<d2l-save-status id="save-status" slot="save-status"></d2l-save-status>
					</d2l-activity-assignment-editor-footer>
				</d2l-template-primary-secondary>
			</d2l-activity-editor>
		`;
	}
}
customElements.define('d2l-activity-assignment-editor', AssignmentEditor);
