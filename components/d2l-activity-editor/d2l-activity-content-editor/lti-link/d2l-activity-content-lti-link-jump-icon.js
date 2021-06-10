import { css, html } from 'lit-element/lit-element.js';
import { MobxLitElement } from '@adobe/lit-mobx';
import { RtlMixin } from '@brightspace-ui/core/mixins/rtl-mixin.js';

class ActivityContentLTILinkJumpIcon extends RtlMixin(MobxLitElement) {
	static get styles() {
		return [
			css`
				.d2l-jump-icon-outer-frame {
					align-items: center;
					text-align: center;
				}
				.d2l-lti-jump-icon {
					height: 50%;
					margin: 0 auto;
					width: 50%;
				}
			`
		];
	}

	render() {
		return html`
			<div class="d2l-jump-icon-outer-frame">
				<div class="d2l-lti-jump-icon">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 252 200" preserveAspectRatio="xMidYMid meet" focusable="false">
						<g fill="none" fill-rule="evenodd" transform="translate(-1180 -98)">
							<circle cx="1280" cy="198" r="100" fill="#E8F2F9"></circle>
							<g fill-rule="nonzero">
								<path fill="#006FBF" d="M1430.047 192.72l-13.67-16a7.803 7.803 0 0 0-5.886-2.72c-.958 0-1.908.183-2.797.54a7.992 7.992 0 0 0-5.026 7.46v10h-52.801a6.001 6.001 0 0 0 0 12h52.801v10a8.005 8.005 0 0 0 5.085 7.48 7.34 7.34 0 0 0 2.738.52 7.694 7.694 0 0 0 5.886-2.74l13.69-15.98a8.144 8.144 0 0 0-.02-10.56zm-2.934 7.92l-13.689 16a3.83 3.83 0 0 1-2.933 1.36 3.621 3.621 0 0 1-1.37-.26 3.998 3.998 0 0 1-2.541-3.74v-12a1.984 1.984 0 0 0-1.956-2h-54.757a2 2 0 0 1 0-4h54.757a1.984 1.984 0 0 0 1.956-2v-12a3.998 3.998 0 0 1 2.542-3.74c.435-.175.9-.263 1.369-.26a3.86 3.86 0 0 1 2.933 1.36l13.69 16a4.038 4.038 0 0 1 0 5.28z"></path>
								<path fill="#FFF" d="M1427.11 200.64l-13.69 16a3.83 3.83 0 0 1-2.933 1.36 3.621 3.621 0 0 1-1.369-.26 3.998 3.998 0 0 1-2.542-3.74v-12a1.984 1.984 0 0 0-1.956-2h-54.757a2 2 0 0 1 0-4h54.757a1.984 1.984 0 0 0 1.956-2v-12a3.998 3.998 0 0 1 2.542-3.74c.435-.175.9-.263 1.369-.26a3.86 3.86 0 0 1 2.933 1.36l13.69 16a4.038 4.038 0 0 1 0 5.28z"></path>
							</g>
							<circle cx="1280" cy="198" r="100" fill="#E8F2F9"></circle>
							<path fill="#006FBF" fill-rule="nonzero" d="M1333.13 145.46l-2.9-2.9c-8.764-8.747-22.955-8.747-31.72 0l-20.26 20.28c-7.671 7.68-8.741 19.751-2.54 28.66l-.52.52c-8.915-6.201-20.992-5.132-28.68 2.54l-20.26 20.28c-8.746 8.757-8.746 22.943 0 31.7l2.9 2.9c8.765 8.747 22.956 8.747 31.72 0l20.26-20.26c7.672-7.687 8.742-19.764 2.54-28.68l.52-.52c8.917 6.201 20.993 5.132 28.68-2.54l20.26-20.26c8.747-8.764 8.747-22.956 0-31.72zm-54.82 80.88l-20.28 20.28c-7.205 7.173-18.854 7.173-26.06 0l-2.9-2.9c-7.18-7.203-7.18-18.857 0-26.06l20.28-20.26a18.433 18.433 0 0 1 22.96-2.5l-3 3a14.316 14.316 0 0 0-17.06 2.38l-20.28 20.28c-5.58 5.6-5.58 14.66 0 20.26l2.9 2.9c5.604 5.573 14.657 5.573 20.26 0l20.28-20.28a14.35 14.35 0 0 0 2.4-17.08l2.98-2.98a18.439 18.439 0 0 1-2.48 22.96zm-26.02-2.94a5.987 5.987 0 0 0 8.48 0l14.04-14.04c1.59 3.862.707 8.3-2.24 11.26l-20.26 20.26c-4.041 4.027-10.578 4.027-14.62 0l-2.88-2.88a10.333 10.333 0 0 1 0-14.62l20.26-20.26a10.368 10.368 0 0 1 11.26-2.24l-14.04 14.04a6 6 0 0 0 0 8.48zm28.82-25.96l-2.84 2.82-2.88 2.9-2.84 2.82-14.6 14.6c-.382.367-.89.574-1.42.58a2.049 2.049 0 0 1-1.42-.58 1.992 1.992 0 0 1 0-2.82l14.62-14.6 2.82-2.84 2.9-2.9 2.82-2.82.02-.02 2.82-2.82 2.9-2.9 2.84-2.82 14.6-14.62c.373-.37.876-.578 1.4-.58.531.002 1.04.21 1.42.58.78.786.78 2.054 0 2.84l-14.6 14.6-2.82 2.84-5.74 5.74zm25.98-28.84a5.987 5.987 0 0 0-8.48 0l-14.04 14.04a10.322 10.322 0 0 1 2.24-11.26l20.26-20.26c4.042-4.027 10.579-4.027 14.62 0l2.88 2.88c4.027 4.042 4.027 10.578 0 14.62l-20.26 20.26a10.368 10.368 0 0 1-11.26 2.24l14.04-14.04a6 6 0 0 0 0-8.48zm23.22 5.74l-20.28 20.28a18.461 18.461 0 0 1-22.96 2.48l2.98-2.98a14.4 14.4 0 0 0 17.08-2.4l20.28-20.28c5.58-5.6 5.58-14.66 0-20.26l-2.9-2.9c-5.603-5.574-14.656-5.574-20.26 0l-20.28 20.28a14.35 14.35 0 0 0-2.4 17.08l-2.98 2.98a18.439 18.439 0 0 1 2.48-22.96l20.28-20.26a18.42 18.42 0 0 1 26.06 0l2.9 2.88c7.18 7.203 7.18 18.857 0 26.06z"></path>
							<g fill-rule="nonzero">
								<path fill="#006FBF" d="M1430.047 192.72l-13.67-16a7.803 7.803 0 0 0-5.886-2.72c-.958 0-1.908.183-2.797.54a7.992 7.992 0 0 0-5.026 7.46v10h-52.801a6.001 6.001 0 0 0 0 12h52.801v10a8.005 8.005 0 0 0 5.085 7.48 7.34 7.34 0 0 0 2.738.52 7.694 7.694 0 0 0 5.886-2.74l13.69-15.98a8.144 8.144 0 0 0-.02-10.56zm-2.934 7.92l-13.689 16a3.83 3.83 0 0 1-2.933 1.36 3.621 3.621 0 0 1-1.37-.26 3.998 3.998 0 0 1-2.541-3.74v-12a1.984 1.984 0 0 0-1.956-2h-54.757a2 2 0 0 1 0-4h54.757a1.984 1.984 0 0 0 1.956-2v-12a3.998 3.998 0 0 1 2.542-3.74c.435-.175.9-.263 1.369-.26a3.86 3.86 0 0 1 2.933 1.36l13.69 16a4.038 4.038 0 0 1 0 5.28z"></path>
								<path fill="#FFF" d="M1427.11 200.64l-13.69 16a3.83 3.83 0 0 1-2.933 1.36 3.621 3.621 0 0 1-1.369-.26 3.998 3.998 0 0 1-2.542-3.74v-12a1.984 1.984 0 0 0-1.956-2h-54.757a2 2 0 0 1 0-4h54.757a1.984 1.984 0 0 0 1.956-2v-12a3.998 3.998 0 0 1 2.542-3.74c.435-.175.9-.263 1.369-.26a3.86 3.86 0 0 1 2.933 1.36l13.69 16a4.038 4.038 0 0 1 0 5.28z"></path>
							</g>
						</g>
					</svg>
				</div>
				<slot></slot>
			</div>
		`;
	}
}
customElements.define('d2l-activity-content-lti-link-jump-icon', ActivityContentLTILinkJumpIcon);