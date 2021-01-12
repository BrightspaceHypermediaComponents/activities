import '@brightspace-ui/core/components/button/button';
import '@brightspace-ui/core/components/colors/colors';
import '@brightspace-ui/core/components/dropdown/dropdown';
import '@brightspace-ui/core/components/dropdown/dropdown-menu';
import '@brightspace-ui/core/components/tooltip/tooltip';
import '@brightspace-ui/core/components/menu/menu';

import { css, html, LitElement } from 'lit-element/lit-element';
import { LocalizeActivityEditorMixin } from '../mixins/d2l-activity-editor-lang-mixin.js';
import { RtlMixin } from '@brightspace-ui/core/mixins/rtl-mixin';
import { SkeletonMixin } from '@brightspace-ui/core/components/skeleton/skeleton-mixin.js';

class ActivityAttachmentsPickerPresentational extends SkeletonMixin(LocalizeActivityEditorMixin(RtlMixin(LitElement))) {
	static get properties() {
		return {
			canAddFile: {
				attribute: 'can-add-file',
				type: Boolean
			},
			canAddLink: {
				attribute: 'can-add-link',
				type: Boolean
			},
			canAddGoogleDriveLink: {
				attribute: 'can-add-googledrive-link',
				type: Boolean
			},
			canAddOneDriveLink: {
				attribute: 'can-add-onedrive-link',
				type: Boolean
			},
			canRecordVideo: {
				attribute: 'can-record-video',
				type: Boolean
			},
			canRecordAudio: {
				attribute: 'can-record-audio',
				type: Boolean
			}
		};
	}

	static get styles() {
		return [super.styles, css`
			.d2l-attachments-picker-container {
				align-items: center;
				background: var(--d2l-color-regolith);
				border: 1px solid var(--d2l-color-mica);
				border-radius: 6px;
				display: flex;
				flex-direction: row;
				justify-content: space-between;
			}

			.d2l-button-container {
				display: flex;
				flex-direction: row;
				padding: 12px;
				width: 100%;
			}

			.d2l-button-container-right {
				margin-left: auto;
			}
			:host([dir="rtl"]) .d2l-button-container-right {
				margin-left: 0;
				margin-right: auto;
			}

			d2l-button-icon:not([hidden]),
			d2l-button-subtle:not([hidden]) {
				display: inline-block;
			}

			.d2l-button-container-small {
				display: none;
			}

			@media only screen and (max-width: 768px) {
				:host {
					padding: 2px;
				}

				.d2l-button-container {
					display: none;
				}
				.d2l-button-container-small {
					display: block;
				}
			}
		`];
	}

	constructor() {
		super();

		this.canAddFile = false;
		this.canAddLink = false;
		this.canAddGoogleDriveLink = false;
		this.canAddOneDriveLink = false;
		this.canRecordVideo = false;
		this.canRecordAudio = false;

		D2L.ActivityEditor = D2L.ActivityEditor || {};
		// Referenced by the server-side ActivitiesView renderer
		D2L.ActivityEditor.FileUploadDialogCallback = (files) => {
			this.dispatchEvent(new CustomEvent('d2l-activity-attachments-picker-files-uploaded', {
				bubbles: true,
				composed: true,
				detail: {
					files: files
				}
			}));
		};
		// Referenced by the server-side ActivitiesView renderer
		D2L.ActivityEditor.RecordVideoDialogCallback = async(file) => {
			this.dispatchEvent(new CustomEvent('d2l-activity-attachments-picker-video-uploaded', {
				bubbles: true,
				composed: true,
				detail: {
					files: [file]
				}
			}));
		};
		// Referenced by the server-side ActivitiesView renderer
		D2L.ActivityEditor.RecordAudioDialogCallback = async(file) => {
			this.dispatchEvent(new CustomEvent('d2l-activity-attachments-picker-audio-uploaded', {
				bubbles: true,
				composed: true,
				detail: {
					files: [file]
				}
			}));
		};
	}

	render() {
		if (!this.canAddFile && !this.canAddLink && !this.canAddGoogleDriveLink && !this.canAddOneDriveLink && !this.canRecordVideo && !this.canRecordAudio && !this.skeleton) {
			return html``;
		}

		return html`
		<div class="d2l-attachments-picker-container d2l-skeletize">
			<div class="d2l-button-container">
				<d2l-button-icon
					id="add-file-button"
					icon="d2l-tier1:upload"
					aria-label="${this.localize('attachments.addFile')}"
					?hidden="${!this.canAddFile && !this.skeleton}"
					@click="${this._launchAddFileDialog}">
				</d2l-button-icon>
				<d2l-tooltip
					for="add-file-button"
					align="start"
					aria-hidden="true"
					disable-focus-lock>${this.localize('attachments.addFile')}</d2l-tooltip>
					<!-- Important: keep tooltip content inline, otherwise screenreader gets confused -->
				<d2l-button-icon
					id="add-quicklink-button"
					icon="d2l-tier1:quicklink"
					aria-label="${this.localize('attachments.addQuicklink')}"
					?hidden="${!this.canAddLink}"
					@click="${this._launchAddQuicklinkDialog}">
				</d2l-button-icon>
				<d2l-tooltip
					for="add-quicklink-button"
					aria-hidden="true"
					disable-focus-lock>${this.localize('attachments.addQuicklink')}</d2l-tooltip>
				<d2l-button-icon
					id="add-link-button"
					icon="d2l-tier1:link"
					aria-label="${this.localize('attachments.addLink')}"
					?hidden="${!this.canAddLink}"
					@click="${this._launchAddLinkDialog}">
				</d2l-button-icon>
				<d2l-tooltip
					for="add-link-button"
					aria-hidden="true"
					disable-focus-lock>${this.localize('attachments.addLink')}</d2l-tooltip>

				<d2l-button-icon
					id="add-google-drive-link-button"
					icon="d2l-tier1:google-drive"
					aria-label="${this.localize('attachments.addGoogleDriveLink')}"
					?hidden="${!this.canAddGoogleDriveLink}"
					@click="${this._launchAddGoogleDriveLinkDialog}">
				</d2l-button-icon>
				<d2l-tooltip
					for="add-google-drive-link-button"
					aria-hidden="true"
					disable-focus-lock>${this.localize('attachments.addGoogleDriveLink')}</d2l-tooltip>

				<d2l-button-icon
					id="add-onedrive-link-button"
					icon="d2l-tier1:one-drive"
					aria-label="${this.localize('attachments.addOneDriveLink')}"
					?hidden="${!this.canAddOneDriveLink}"
					@click="${this._launchAddOneDriveLinkDialog}">
				</d2l-button-icon>
				<d2l-tooltip
					for="add-onedrive-link-button"
					aria-hidden="true"
					disable-focus-lock>${this.localize('attachments.addOneDriveLink')}</d2l-tooltip>

				<div class="d2l-button-container-right">
					<d2l-button-subtle
						id="record-audio-button"
						icon="tier1:mic"
						?hidden="${!this.canRecordAudio}"
						text="${this.localize('attachments.recordAudio')}"
						@click="${this._launchRecordAudioDialog}">
					</d2l-button-subtle>
					<d2l-button-subtle
						id="record-video-button"
						icon="tier1:file-video"
						?hidden="${!this.canRecordVideo}"
						text="${this.localize('attachments.recordVideo')}"
						@click="${this._launchRecordVideoDialog}">
					</d2l-button-subtle>
				</div>
			</div>
			<div class="d2l-button-container-small">
				<d2l-dropdown>
					<d2l-button-icon
						id="attach-dropdown"
						class="d2l-dropdown-opener opener-border-0 option-menu-toggle"
						icon="d2l-tier1:attach"
						text="${this.localize('attachments.attach')}">
					</d2l-button-icon>
					<d2l-tooltip for="attach-dropdown"
						position="top" disable-focus-lock>${this.localize('attachments.attach')}
					</d2l-tooltip>
					<d2l-dropdown-menu id="dropdown" align="end" no-pointer vertical-offset="6px">
						<d2l-menu role="menu" label="${this.localize('attachments.attach')}">
							<d2l-menu-item
								text="${this.localize('attachments.addFileMenu')}"
								?hidden="${!this.canAddFile}"
								@d2l-menu-item-select="${this._launchAddFileDialog}"
							></d2l-menu-item>
							<d2l-menu-item
								text="${this.localize('attachments.addQuicklinkMenu')}"
								?hidden="${!this.canAddLink}"
								@d2l-menu-item-select="${this._launchAddQuicklinkDialog}"
							></d2l-menu-item>
							<d2l-menu-item
								text="${this.localize('attachments.addLinkMenu')}"
								?hidden="${!this.canAddLink}"
								@d2l-menu-item-select="${this._launchAddLinkDialog}"
							></d2l-menu-item>
							<d2l-menu-item
								text="${this.localize('attachments.addGoogleDriveLinkMenu')}"
								?hidden="${!this.canAddGoogleDriveLink}"
								@d2l-menu-item-select="${this._launchAddGoogleDriveLinkDialog}"
							></d2l-menu-item>
							<d2l-menu-item
								text="${this.localize('attachments.addOneDriveLinkMenu')}"
								?hidden="${!this.canAddLink}"
								@d2l-menu-item-select="${this._launchAddOneDriveLinkDialog}"
							></d2l-menu-item>
						</d2l-menu>
					</d2l-dropdown-menu>
				</d2l-dropdown>
				<span class="d2l-button-container-right">
					<d2l-button-icon
						id="record-audio-button-small"
						icon="tier1:mic"
						?hidden="${!this.canRecordAudio}"
						text="${this.localize('attachments.recordAudio')}"
						@click="${this._launchRecordAudioDialog}">
					</d2l-button-icon>
					<d2l-tooltip for="record-audio-button-small"
						position="top" disable-focus-lock>${this.localize('attachments.recordAudio')}
					</d2l-tooltip>
					<d2l-button-icon
						id="record-video-button-small"
						icon="tier1:file-video"
						?hidden="${!this.canRecordVideo}"
						text="${this.localize('attachments.recordVideo')}"
						@click="${this._launchRecordVideoDialog}">
					</d2l-button-icon>
					<d2l-tooltip for="record-video-button-small"
						position="top" disable-focus-lock>${this.localize('attachments.recordVideo')}
					</d2l-tooltip>
				</span>
			</div>
		</div>
		`;
	}

	_launchAddFileDialog() {
		const opener = D2L.LP.Web.UI.ObjectRepository.TryGet('D2L.ActivityEditor.FileUploadDialogOpener');
		if (opener) {
			opener();
		}
	}

	_launchAddGoogleDriveLinkDialog() {
		const opener = D2L.LP.Web.UI.ObjectRepository.TryGet('D2L.ActivityEditor.AddGoogleDriveLinkDialogOpener');
		if (!opener) {
			return;
		}

		const event = opener();
		event.AddListener(event => {
			this.dispatchEvent(new CustomEvent('d2l-activity-attachments-picker-googledrive-link-dialog-opened', {
				bubbles: true,
				composed: true,
				detail: {
					title: event.m_title,
					url: event.m_url
				}
			}));
		});
	}

	_launchAddLinkDialog() {
		const opener = D2L.LP.Web.UI.ObjectRepository.TryGet('D2L.ActivityEditor.AddLinkDialogOpener');
		if (!opener) {
			return;
		}

		const event = opener();
		event.AddListener(event => {
			this.dispatchEvent(new CustomEvent('d2l-activity-attachments-picker-link-dialog-opened', {
				bubbles: true,
				composed: true,
				detail: {
					title: event.m_title,
					url: event.m_url
				}
			}));
		});
	}
	_launchAddOneDriveLinkDialog() {
		const opener = D2L.LP.Web.UI.ObjectRepository.TryGet('D2L.ActivityEditor.AddOneDriveLinkDialogOpener');
		if (!opener) {
			return;
		}

		const event = opener();
		event.AddListener(event => {
			this.dispatchEvent(new CustomEvent('d2l-activity-attachments-picker-onedrive-link-dialog-opened', {
				bubbles: true,
				composed: true,
				detail: {
					title: event.m_title,
					url: event.m_url
				}
			}));
		});
	}

	_launchAddQuicklinkDialog() {
		const opener = D2L.LP.Web.UI.ObjectRepository.TryGet('D2L.ActivityEditor.AddQuicklinkDialogOpener');
		if (!opener) {
			return;
		}

		// Required for the async handler below to work in Edge
		const event = opener();
		event.AddListener(async event => {
			this.dispatchEvent(new CustomEvent('d2l-activity-attachments-picker-quicklink-dialog-opened', {
				bubbles: true,
				composed: true,
				detail: {
					event: event
				}
			}));
		});
	}

	_launchRecordAudioDialog() {
		const opener = D2L.LP.Web.UI.ObjectRepository.TryGet('D2L.ActivityEditor.RecordAudioDialogOpener');
		if (opener) {
			opener();
		}
	}

	_launchRecordVideoDialog() {
		const opener = D2L.LP.Web.UI.ObjectRepository.TryGet('D2L.ActivityEditor.RecordVideoDialogOpener');
		if (opener) {
			opener();
		}
	}
}

customElements.define('d2l-activity-attachments-picker-presentational', ActivityAttachmentsPickerPresentational);
