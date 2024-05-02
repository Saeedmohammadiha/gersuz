import { apiService as api } from 'app/store/apiService';
import { createSelector } from '@reduxjs/toolkit';
import FuseUtils from '@fuse/utils';

export const addTagTypes = ['Blogs', 'Blog', 'BlogsLanding'] as const;
export const urls = {
	getWelcomText: '/WelcomeSetting/ {pageType}'
};

type welcomText = {
	id: string;
	title: string;
	description: string;
	pageType: string;

	languageId: string;
	languageTitel: string;
};

const WelcomeSettingApi = api
	.enhanceEndpoints({
		addTagTypes
	})
	.injectEndpoints({
		endpoints: (build) => ({
			getWelcomText: build.query<WelcomeSettingApiResponse, WelcomeSettingApiArgs>({
				query: (pageType) => ({ url: `${urls.getWelcomText}/${pageType}` }),
				providesTags: ['Blogs']
			})
		}),
		overrideExisting: false
	});

export default WelcomeSettingApi;

export const { useGetWelcomTextQuery } = WelcomeSettingApi;

export type BlogApiType = {
	[WelcomeSettingApi.reducerPath]: ReturnType<typeof WelcomeSettingApi.reducer>;
};

export type WelcomeSettingApiResponse = {
	code: string;
	message: string;
	status: string;
	body: welcomText;
};

export type WelcomeSettingApiArgs = string;
