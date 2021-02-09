import { css } from 'lit-element/lit-element.js';

export const activityContentEditorStyles = css`
	:host {
		display: block;
	}
	:host([hidden]) {
		display: none;
	}
	:host > div {
		padding-bottom: 20px;
	}
`;
