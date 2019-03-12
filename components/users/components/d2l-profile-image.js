/**
`d2l-profile-image`
D2L Profile Image Hypermedia
@demo demo/d2l-profile-image.html
*/
/*
  FIXME(polymer-modulizer): the above comments were extracted
  from HTML and may be out of place here. Review them and
  then delete this comment!
*/
import '@polymer/polymer/polymer-legacy.js';

import 'd2l-polymer-siren-behaviors/store/entity-behavior.js';
import 'd2l-polymer-siren-behaviors/store/siren-action-behavior.js';
import { Rels } from 'd2l-hypermedia-constants';
import './d2l-profile-image-base.js';
import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';
const $_documentContainer = document.createElement('template');

$_documentContainer.innerHTML = `<dom-module id="d2l-profile-image">
	<template strip-whitespace="">
			<style>
				:host {
					display: inline-block;
					line-height: 0;
				}
			</style>
			<d2l-profile-image-base id="d2l-profile-image" small$="[[small]]" medium$="[[medium]]" large$="[[large]]" x-large$="[[xLarge]]" first-name="[[_firstName]]" last-name="[[_lastName]]" colour-id="[[_colourId]]" href="[[_imageUrl]]" token="[[token]]" loading$="[[_loading]]">
			</d2l-profile-image-base>
	</template>

</dom-module>`;

document.head.appendChild($_documentContainer.content);
Polymer({
	is: 'd2l-profile-image',
	properties: {
		small: {
			type: Boolean
		},
		medium: {
			type: Boolean
		},
		large: {
			type: Boolean
		},
		xLarge: {
			type: Boolean
		},
		_firstName: {
			type: String,
			value: ''
		},
		_lastName: {
			type: String,
			value: ''
		},
		_colourId: {
			type: Number,
			value: -1
		},
		_imageUrl: {
			type: String,
			value: ''
		},
		_loading: {
			type: Boolean,
			value: true
		}
	},
	behaviors: [
		D2L.PolymerBehaviors.Siren.EntityBehavior
	],
	observers: [
		'_configureProfileImage(entity, href)',
	],
	ready: function() {
		var self = this;
		this.addEventListener('d2l-siren-entity-error', function() {
			self._configureProfileImage(null).then(function() {
				self.set('_loading', false);
			});
		});
	},
	_configureProfileImage: function(entity) {
		if (!this._loading) {
			this.set('_imageUrl', '');
			this.set('_firstName', '');
			this.set('_lastName', '');
			this.set('_colourId', -1);
		}

		if (!entity) {
			return Promise.resolve();
		}

		return Promise.resolve(entity)
			.then(function(data) {

				this.set('_imageUrl', '');
				if (data.hasSubEntityByRel(Rels.userProfile)) {

					var userProfile = data.getSubEntityByRel(Rels.userProfile);
					if (userProfile) {

						var profileImage = userProfile.getSubEntityByRel(Rels.profileImage);
						if (profileImage && !profileImage.hasClass('default-image')) {

							var imageEntity = profileImage.getLinkByRel('alternate');
							this.set('_imageUrl', imageEntity.href);
						}
					}
				}

				this.set('_firstName', '');
				var firstName = data.getSubEntityByRel(Rels.firstName);
				if (!firstName.hasClass('default-name')) {
					this.set('_firstName', firstName.properties.name);
				}

				this.set('_lastName', '');
				var lastName = data.getSubEntityByRel(Rels.lastName);
				if (!lastName.hasClass('default-name')) {
					this.set('_lastName', lastName.properties.name);
				}

				this.set('_colourId', -1);
				var selfLink = data.getLinkByRel('self').href;
				var userId = selfLink.split('/').pop();
				if (!isNaN(userId)) {
					this.set('_colourId', userId);
				}

			}.bind(this))
			.catch(function() {
				this.set('_imageUrl', '');
				this.set('_firstName', '');
				this.set('_lastName', '');
				this.set('_colourId', -1);
			}.bind(this))
			.then(function() {
				this.set('_loading', false);
			}.bind(this));
	}
});
