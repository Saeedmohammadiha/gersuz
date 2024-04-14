import i18next from 'i18next';
import { FuseNavItemType } from '@fuse/core/FuseNavigation/types/FuseNavItemType';
import ar from './navigation-i18n/ar';
import en from './navigation-i18n/en';
import tr from './navigation-i18n/tr';

i18next.addResourceBundle('en', 'navigation', en);
i18next.addResourceBundle('tr', 'navigation', tr);
i18next.addResourceBundle('ar', 'navigation', ar);

/**
 * The navigationConfig object is an array of navigation items for the Fuse application.
 */
const navigationConfig: FuseNavItemType[] = [
	{
		id: 'Admin',
		title: 'Admin',
		subtitle: 'Admin Features',
		type: 'group',
		icon: 'heroicons-outline:cube',
		translate: 'ADMIN',
		children: [
			{
				id: 'Admin.about',
				title: 'about',
				type: 'item',
				icon: 'heroicons-outline:academic-cap',
				url: '/Admin/about',
				translate: 'ABOUT'
			},
			{
				id: 'Admin.Faqs',
				title: 'Faqs',
				type: 'item',
				icon: 'heroicons-outline:academic-cap',
				url: '/Admin/Faqs',
				translate: 'FAQS'
			}
			//   {
			//     id: "Admin.calendar",
			//     title: "Calendar",
			//     subtitle: "3 upcoming events",
			//     type: "item",
			//     icon: "heroicons-outline:calendar",
			//     url: "/Admin/calendar",
			//     translate: "CALENDAR",
			//   },
			//   {
			//     id: "Admin.messenger",
			//     title: "Messenger",
			//     type: "item",
			//     icon: "heroicons-outline:chat-alt",
			//     url: "/Admin/messenger",
			//     translate: "MESSENGER",
			//   },
			//   {
			//     id: "Admin.contacts",
			//     title: "Contacts",
			//     type: "item",
			//     icon: "heroicons-outline:user-group",
			//     url: "/Admin/contacts",
			//     translate: "CONTACTS",
			//   },

			//   {
			//     id: "Admin.site",
			//     title: "SITE",
			//     type: "collapse",
			//     icon: "heroicons-outline:support",
			//     url: "/Admin/site",
			//     children: [
			//       {
			//         id: "Admin.help-center.home",
			//         title: "Home",
			//         type: "item",
			//         url: "/Admin/help-center",
			//         end: true,
			//       },
			//       {
			//         id: "Admin.help-center.faqs",
			//         title: "FAQs",
			//         type: "item",
			//         url: "/Admin/help-center/faqs",
			//       },
			//       {
			//         id: "Admin.help-center.guides",
			//         title: "Guides",
			//         type: "item",
			//         url: "/Admin/help-center/guides",
			//       },
			//       {
			//         id: "Admin.help-center.support",
			//         title: "Support",
			//         type: "item",
			//         url: "/Admin/help-center/support",
			//       },
			//     ],
			//   },
		]
	}
];

export default navigationConfig;
