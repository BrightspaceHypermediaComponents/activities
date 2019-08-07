import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';

/**
 * @customElement
 * @polymer
 */
class D2LQuickEvalSubmissionsSkeleton extends PolymerElement {
	static get template() {
		return html`
			<style>
				:host {
                    display: inline-block;
                }
                .desktop {
                    width: 100%;
                }
                .mobile {
                    display: none;
                }
                @media (max-width: 768px) {
                    .mobile {
                        display: block;
                    }
                    .desktop {
                        display: none;
                    }
                }
            </style>
            <div class="desktop">
            <svg viewBox="0 0 1170 197" xmlns="http://www.w3.org/2000/svg">
                <g fill="none" fill-rule="evenodd">
                    <rect fill="#F2F3F5" y="7" width="180" height="14" rx="4"/>
                    <rect fill="#F2F3F5" x="312" y="7" width="120" height="14" rx="4"/>
                    <rect fill="#F2F3F5" x="620" y="7" width="120" height="14" rx="4"/>
                    <rect fill="#F2F3F5" x="930" y="7" width="120" height="14" rx="4"/>
                    <rect fill="#F2F3F5" y="38" width="30" height="30" rx="4"/>
                    <rect fill="#F2F3F5" y="93" width="30" height="30" rx="4"/>
                    <rect fill="#F2F3F5" y="148" width="30" height="30" rx="4"/>
                    <rect fill="#F2F3F5" x="316" y="45" width="18" height="18" rx="4"/>
                    <rect fill="#F2F3F5" x="316" y="100" width="18" height="18" rx="4"/>
                    <rect fill="#F2F3F5" x="316" y="155" width="18" height="18" rx="4"/>
                    <rect fill="#F2F3F5" x="40" y="46" width="120" height="14" rx="4"/>
                    <rect fill="#F2F3F5" x="40" y="101" width="120" height="14" rx="4"/>
                    <rect fill="#F2F3F5" x="40" y="156" width="120" height="14" rx="4"/>
                    <rect fill="#F2F3F5" x="347" y="46" width="240" height="14" rx="4"/>
                    <rect fill="#F2F3F5" x="347" y="101" width="240" height="14" rx="4"/>
                    <rect fill="#F2F3F5" x="347" y="156" width="240" height="14" rx="4"/>
                    <rect fill="#F2F3F5" x="620" y="46" width="240" height="14" rx="4"/>
                    <rect fill="#F2F3F5" x="620" y="101" width="240" height="14" rx="4"/>
                    <rect fill="#F2F3F5" x="620" y="156" width="240" height="14" rx="4"/>
                    <rect fill="#F2F3F5" x="930" y="46" width="180" height="14" rx="4"/>
                    <rect fill="#F2F3F5" x="930" y="101" width="180" height="14" rx="4"/>
                    <rect fill="#F2F3F5" x="930" y="156" width="180" height="14" rx="4"/>
                    <path d="M0 26h1170M0 80h1170M0 135h1170" stroke="#F2F3F5" stroke-linecap="square"/>
                </g>
                </svg>
            </div>
            <div class="mobile">
                <svg viewBox="0 0 237 209" xmlns="http://www.w3.org/2000/svg">
                    <g fill="none" fill-rule="evenodd">
                        <rect fill="#F2F3F5" x="-1" y="11" width="180" height="14" rx="4"/>
                        <rect fill="#F2F3F5" y="42" width="30" height="30" rx="4"/>
                        <rect fill="#F2F3F5" y="97" width="30" height="30" rx="4"/>
                        <rect fill="#F2F3F5" y="152" width="30" height="30" rx="4"/>
                        <rect fill="#F2F3F5" x="39" y="50" width="120" height="14" rx="4"/>
                        <rect fill="#F2F3F5" x="39" y="105" width="120" height="14" rx="4"/>
                        <rect fill="#F2F3F5" x="39" y="160" width="120" height="14" rx="4"/>
                        <path d="M-1 30h238M-1 83.5h238M-1 138.5h238" stroke="#F2F3F5" stroke-linecap="square"/>
                    </g>
                </svg>
            </div>
		`;
	}

	static get is() { return 'd2l-quick-eval-submissions-skeleton'; }

}

window.customElements.define('d2l-quick-eval-submissions-skeleton', D2LQuickEvalSubmissionsSkeleton);
