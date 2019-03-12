/**
`d2l-profile-image-base`
D2L Profile Image
@demo demo/d2l-profile-image-base.html
*/
/*
  FIXME(polymer-modulizer): the above comments were extracted
  from HTML and may be out of place here. Review them and
  then delete this comment!
*/
import '@polymer/polymer/polymer-legacy.js';

import 'd2l-colors/d2l-colors.js';
import 'd2l-icons/d2l-icon.js';
import 'd2l-icons/tier3-icons.js';
import 'd2l-fetch/d2l-fetch.js';
import './styles/d2l-profile-image-shared-styles.js';
import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';
const $_documentContainer = document.createElement('template');

$_documentContainer.innerHTML = `<dom-module id="d2l-profile-image-base">
	<template strip-whitespace="">
		<style include="d2l-profile-image-shared-styles">
			:host {
				display: inline-block;
			}
			.d2l-profile-image-container {
				height: 100%;
				width: 100%;
			}

			.d2l-profile-image-container.shady-person {
				--d2l-icon-fill-color: var(--d2l-color-ferrite);
			}

			.d2l-profile-image-container.initials {
				align-items : center;
				background-color: var(--initials-background-color);
				color: var(--d2l-color-regolith);
				display : flex;
				justify-content: center;
				text-align: center;
			}
		</style>
		<template is="dom-if" if="[[_showShadyPerson(_displayType)]]">
			<div class="d2l-profile-image-container shady-person">
				<d2l-icon icon="d2l-tier3:profile-pic"></d2l-icon>
			</div>
		</template>

		<template is="dom-if" if="[[_showInitials(_displayType)]]">
			<div id="initials" class="d2l-profile-image-container initials">
				[[_getInitials(firstName, lastName)]]
			</div>
		</template>

		<template is="dom-if" if="[[_showAvatar(_displayType)]]">
			<img class="d2l-profile-image-container" draggable="false" src="[[_imageUrl]]" onerror="[[_failedToLoadImageFunc()]]">
		</template>

	</template>
	
</dom-module>`;

document.head.appendChild($_documentContainer.content);
Polymer({
	is: 'd2l-profile-image-base',
	properties: {
		firstName: {
			type: String,
			value: ''
		},
		lastName: {
			type: String,
			value: ''
		},
		colourId: {
			type: Number,
			value: -1,
			observer: '_handleColourId'
		},
		href: {
			type: String,
			value: '',
			observer: '_resetImageState'
		},
		token: {
			type: String,
			value: ''
		},
		_imageUrl: {
			type: String,
			value: ''
		},
		_displayType: {
			type: String,
			observer: '_handleColourId'
		},
		_failedToLoadImage: {
			type: Boolean,
			value: false
		},
		_imageLoading: {
			type: Boolean,
			value: true
		},
		_domReady: {
			type: Boolean,
			value: false
		}
	},
	// WARNING
	// Changing the order, as well as adding or removing a colour
	// May result in background colours to change for a given colourId
	// Only update if you have the correct approval
	__backgroundColours: [
		'#8B271F',
		'#CF3A2F',
		'#C74F05',
		'#527F1F',
		'#346633',
		'#165F5B',
		'#1F826B',
		'#0C7683',
		'#3155BF',
		'#4476C1',
		'#383773',
		'#6F6BB8',
		'#50305F',
		'#9860AF',
		'#804167',
		'#AB578A',
		'#8C2855',
		'#D13B7F',
		'#47565E',
		'#5F727D',
		'#3B4148',
		'#59616C'
	],
	observers: [
		'_setDisplayType(href, _failedToLoadImage, colourId, firstName, _domReady, _imageLoading)'
	],
	attached: function() {
		this._handleColourId();
	},
	ready: function() {
		this._domReady = true;
		if (!this._imageUrl && this.href) {
			this._resetImageState();
		}
	},
	_handleColourId: function() {
		var backgroundColour = this._getInitialedBackgroundColour(this.colourId);
		this.updateStyles({'--initials-background-color': backgroundColour});
	},
	_setDisplayType: function(href, failedToLoadImage, colourId, firstName, domReady, imageLoading) {
		if (!domReady || (imageLoading && href)) {
			this.set('_displayType', 'empty');
		}
		else if (href && !failedToLoadImage) {
			this.set('_displayType', 'avatar');
		}
		else if (typeof colourId !== 'undefined' &&
				colourId !== null &&
				colourId > 0 &&
				firstName
		) {

			this.set('_displayType', 'initials');
		}
		else {
			this.set('_displayType', 'shady');
		}
	},
	_failedToLoadImageFunc: function() {
		return function() {
			this.set('_failedToLoadImage', true);
		}.bind(this);
	},
	_getInitialedBackgroundColour: function(colourId) {
		var idx = colourId % this.__backgroundColours.length;
		return this.__backgroundColours[idx];
	},
	_getInitials: function(firstName, lastName) {
		if (firstName && lastName) {
			return firstName[0].toUpperCase() + lastName[0].toUpperCase();
		}
		else if (firstName) {
			return firstName[0].toUpperCase();
		}
		return '';
	},
	_resetImageState: function() {
		this.set('_imageLoading', true);
		this.set('_failedToLoadImage', false);

		if (!this._domReady) {
			return Promise.resolve();
		}
		var headers = new Headers();
		headers.append('Authorization', 'Bearer ' + this.token);

		return window.d2lfetch
			.removeTemp('simpleCache')
			.removeTemp('dedupe')
			.fetch(this.href, {method: 'GET', headers: headers})
			.then(function(resp) {
				return resp.blob();
			})
			.then(function(blob) {
				this.set('_imageUrl', URL.createObjectURL(blob));
			}.bind(this))
			.catch(function() {
				this.set('_imageUrl', this.href);
			}.bind(this))
			.then(function() {
				this.set('_imageLoading', false);
			}.bind(this));
	},
	_showAvatar: function(displayType) {
		return displayType === 'avatar';
	},
	_showShadyPerson: function(displayType) {
		return displayType === 'shady';
	},
	_showInitials: function(displayType) {
		return displayType === 'initials';
	}
});
