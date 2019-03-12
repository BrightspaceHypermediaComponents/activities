import '@polymer/polymer/polymer-legacy.js';
import 'd2l-typography/d2l-typography-shared-styles.js';
const $_documentContainer = document.createElement('template');

$_documentContainer.innerHTML = `<dom-module id="d2l-profile-image-shared-styles">
	<template strip-whitespace="">
		<style>
			:host {
				--d2l-icon-height: 100%;
				--d2l-icon-width: 100%;
			}

			:host([loading]) {
				opacity: 0;
			}

			:host(:not([small]):not([medium]):not([large]):not([x-large])) {
				display: none;
			}

			:host([small]) {
				@apply --d2l-label-text;
				height: 30px;
				margin: 0;
				min-width: 30px;
				width: 30px;
			}
			:host([small]) .d2l-profile-image-container {
				border-radius: 4px;
			}

			:host([medium]) {
				@apply --d2l-heading-4;
				height: 42px;
				margin: 0;
				min-width: 42px;
				width: 42px;
			}
			:host([medium]) .d2l-profile-image-container {
				border-radius: 6px;
			}

			:host([large]) {
				@apply --d2l-heading-3;
				height: 60px;
				margin: 0;
				min-width: 60px;
				width: 60px;
			}
			:host([large]) .d2l-profile-image-container {
				border-radius: 8px;
			}

			:host([x-large]) {
				@apply --d2l-heading-2;
				height: 84px;
				margin: 0;
				min-width: 84px;
				width: 84px;
			}
			:host([x-large]) .d2l-profile-image-container {
				border-radius: 8px;
			}
		</style>
	</template>
</dom-module>`;

document.head.appendChild($_documentContainer.content);
