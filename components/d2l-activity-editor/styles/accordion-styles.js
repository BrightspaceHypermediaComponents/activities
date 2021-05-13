import { css } from 'lit-element';

export const accordionStyles = css`
	:host {
		display: block;
	}

	:host([hidden]) {
		display: none;
	}

	.d2l-editor {
		margin: 1rem 0;
	}

	.d2l-editor:last-child {
		margin-bottom: 0;
	}

	.d2l-label-text {
		margin: 0 0 0.6rem 0;
	}
`;
