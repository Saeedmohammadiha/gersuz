import FuseUtils from '@fuse/utils';
import FuseLoading from '@fuse/core/FuseLoading';
import { Navigate } from 'react-router-dom';
import settingsConfig from 'app/configs/settingsConfig';
import { FuseRouteConfigsType, FuseRoutesType } from '@fuse/utils/FuseUtils';
import SignInConfig from '../main/sign-in/SignInConfig';
import SignUpConfig from '../main/sign-up/SignUpConfig';
import SignOutConfig from '../main/sign-out/SignOutConfig';
import Error404Page from '../main/404/Error404Page';
// import AboutConfig from '../main/admin/About/AboutConfig';
import FaqsConfig from '../main/admin/Faqs/FaqsConfig';
import FaqCategorysConfig from '../main/admin/FaqCategorys/FaqCategorysConfig';
import BlogCategorysConfig from '../main/admin/BlogCategory/BlogCategorysConfig';
import BlogsConfig from '../main/admin/Blogs/BlogsConfig';

const routeConfigs: FuseRouteConfigsType = [
	SignOutConfig,
	SignInConfig,
	SignUpConfig,
	//	AboutConfig,
	FaqsConfig,
	FaqCategorysConfig,
	BlogCategorysConfig,
	BlogsConfig
];

/**
 * The routes of the application.
 */
const routes: FuseRoutesType = [
	...FuseUtils.generateRoutesFromConfigs(routeConfigs, settingsConfig.defaultAuth),
	{
		path: '/',
		element: <Navigate to="/Admin/faqs" />,
		auth: settingsConfig.defaultAuth
	},
	{
		path: 'loading',
		element: <FuseLoading />
	},
	{
		path: '404',
		element: <Error404Page />
	},
	{
		path: '*',
		element: <Navigate to="404" />
	}
];

export default routes;
