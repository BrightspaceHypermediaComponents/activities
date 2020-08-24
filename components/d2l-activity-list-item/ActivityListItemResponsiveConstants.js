import { dedupingMixin } from '@polymer/polymer/lib/utils/mixin.js';

/* @polymerMixin */
const ActivityListItemResponsiveConstantsImpl = (superClass) => class extends superClass {
	get _descriptionLineCount() {
		return 2;
	}
	get _responsiveConfigs() {
		return [
			{
				minWidth: 0,
				image: {
					width: 90,
					height: 52,
					marginRight: '0.9rem'
				},
				title: {
					fontSize: 0.8, //rem
					lineHeight: 1.2, //rem
					fontWeight: 700,
					marginTop: '0.4', // rem
					marginRight: '0',
					marginBottom: '0', // rem
					marginLeft: '0'
				},
				padding: '0.9rem 0',
				showDescription: false,
				placeholder: {
					category: {
						width: '45%'
					},
					title: {
						width: '90%'
					},
					footer: {
						count: 1,
						width: '55%'
					}
				}
			},
			{
				minWidth: 339,
				image: {
					width: 120,
					height: 71,
					marginRight: '1.2rem'
				},
				title: {
					fontSize: 0.8, //rem
					lineHeight: 1.2, //rem
					fontWeight: 700,
					marginTop: '0.4', // rem
					marginRight: '0',
					marginBottom: '0', // rem
					marginLeft: '0'
				},
				padding: '0.9rem 0',
				showDescription: false,
				placeholder: {
					category: {
						width: '45%'
					},
					title: {
						width: '90%'
					},
					footer: {
						count: 2,
						width: '45%'
					}
				}
			},
			{
				minWidth: 385,
				image: {
					width: 120,
					height: 71,
					marginRight: '1.2rem'
				},
				title: {
					fontSize: 0.8, //rem
					lineHeight: 1.2, //rem
					fontWeight: 700,
					marginTop: '0.4', // rem
					marginRight: '0',
					marginBottom: '0.3', // rem
					marginLeft: '0'
				},
				padding: '0.9rem 0',
				showDescription: true,
				placeholder: {
					category: {
						width: '30%'
					},
					title: {
						width: '50%'
					},
					footer: {
						count: 2,
						width: '30%'
					}
				}
			},
			{
				minWidth: 580,
				image: {
					width: 120,
					height: 71,
					marginRight: '1.2rem'
				},
				title: {
					fontSize: 0.95, //rem
					lineHeight: 1.5, //rem
					fontWeight: 400,
					marginTop: '0.2', // rem
					marginRight: '0',
					marginBottom: '0.2', // rem
					marginLeft: '0'
				},
				padding: '1.2rem 0',
				showDescription: true,
				placeholder: {
					category: {
						width: '25%'
					},
					title: {
						width: '50%'
					},
					footer: {
						count: 2,
						width: '25%'
					}
				}
			},
			{
				minWidth: 636,
				image: {
					width: 180,
					height: 102,
					marginRight: '1.2rem'
				},
				title: {
					fontSize: 0.95, //rem
					lineHeight: 1.5, //rem
					fontWeight: 400,
					marginTop: '0.2', // rem
					marginRight: '0',
					marginBottom: '0.2', // rem
					marginLeft: '0'
				},
				padding: '1.2rem 0',
				showDescription: true,
				placeholder: {
					category: {
						width: '25%'
					},
					title: {
						width: '50%'
					},
					footer: {
						count: 2,
						width: '25%'
					}
				}
			},
			{
				minWidth: 842,
				image: {
					width: 216,
					height: 120,
					marginRight: '1.2rem'
				},
				title: {
					fontSize: 0.95, //rem
					lineHeight: 1.5, //rem
					fontWeight: 400,
					marginTop: '0.2', // rem
					marginRight: '0',
					marginBottom: '0.2', // rem
					marginLeft: '0'
				},
				padding: '1.2rem 0',
				showDescription: true,
				placeholder: {
					category: {
						width: '25%'
					},
					title: {
						width: '50%'
					},
					footer: {
						count: 2,
						width: '25%'
					}
				}
			}
		];
	}

	_getResponsiveConfig(width) {
		let responsiveConfig  = this._responsiveConfigs[0];
		for (const nextConfig of this._responsiveConfigs) {
			if (nextConfig.minWidth > width) {
				break;
			}
			responsiveConfig = nextConfig;
		}

		return responsiveConfig;
	}
};

export const ActivityListItemResponsiveConstants = dedupingMixin(ActivityListItemResponsiveConstantsImpl);
