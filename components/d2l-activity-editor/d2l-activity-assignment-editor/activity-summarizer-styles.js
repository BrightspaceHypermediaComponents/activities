import { css } from 'lit-element/lit-element.js';

// !important is only needed for old Edge
export const summarizerHeaderStyles = css`
	.activity-summarizer-header {
		margin-top: 20px !important;
		margin-bottom: 12px !important;
	}
`;

export const summarizerSummaryStyles = css`
	.activity-summarizer-summary {
		list-style: none;
		padding: 0;
		margin-top: 5px;
		min-height: 20px;
		color: var(--d2l-color-tungsten);
	}

	ul.activity-summarizer-summary > li {
		margin-bottom: 8px;
	}

	ul.activity-summarizer-summary > li:last-child {
		margin-bottom: 0;
	}
`;
