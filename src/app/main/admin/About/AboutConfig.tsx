import i18next from 'i18next';
import { lazy } from 'react';
import en from './i18n/en';
import tr from './i18n/tr';
import ar from './i18n/ar';

i18next.addResourceBundle('en', 'examplePage', en);
i18next.addResourceBundle('tr', 'examplePage', tr);
i18next.addResourceBundle('ar', 'examplePage', ar);

const About = lazy(() => import('./About'));

/**
 * The Example page config.
 */
const AboutConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: '/Admin/about',
			element: <About />
		}
	]
};

export default AboutConfig;
