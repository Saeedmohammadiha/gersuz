// import i18next from 'i18next';
import { lazy } from 'react';
// import en from './i18n/en';
// import tr from './i18n/tr';
// import ar from './i18n/ar';

// i18next.addResourceBundle('en', 'examplePage', en);
// i18next.addResourceBundle('tr', 'examplePage', tr);
// i18next.addResourceBundle('ar', 'examplePage', ar);

const FaqCategorys = lazy(() => import('./FaqCategorys'));
const FaqCategory = lazy(() => import('./FaqCategory/FaqCategory'));

const FaqCategorysConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: '/Admin/FaqCategorys',
			element: <FaqCategorys />
		},
		{
			path: '/Admin/FaqCategorys/:FaqCategoryId/*',
			element: <FaqCategory />
		}
	]
};

export default FaqCategorysConfig;
