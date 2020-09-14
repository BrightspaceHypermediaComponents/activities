import { css } from 'lit-element/lit-element.js';

// !important is only needed for old Edge
export const summarizerHeaderStyles = css`
	.d2l-activity-summarizer-header {
		margin-bottom: 12px !important;
		margin-top: 20px !important;
	}

	:host([skeleton]) .d2l-activity-summarizer-header.d2l-skeletize::before {
		white-space: nowrap;
		width: 70%;
	}

	:host([skeleton]) .d2l-activity-summarizer-header.d2l-skeletize {
		height: 1.5rem;
	}
`;

export const summarizerSummaryStyles = css`
	.d2l-activity-summarizer-summary {
		color: var(--d2l-color-tungsten);
		list-style: none;
		margin-top: 5px;
		min-height: 20px;
		padding: 0;
	}

	ul.d2l-activity-summarizer-summary > li {
		margin-bottom: 8px;
	}

	ul.d2l-activity-summarizer-summary > li:last-child {
		margin-bottom: 0;
	}

	:host([skeleton]) .d2l-activity-summarizer-summary.d2l-skeletize::before {
		width: 60%;
	}
	:host([skeleton]) .d2l-activity-summarizer-summary.d2l-skeletize {
		height: 1rem;
	}
`;
