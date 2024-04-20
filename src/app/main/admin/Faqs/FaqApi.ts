import { apiService as api } from 'app/store/apiService';
import { createSelector } from '@reduxjs/toolkit';
import FuseUtils from '@fuse/utils';
import { selectSearchText } from '../store/searchTextSlice';

export const addTagTypes = ['faqs', 'faq'] as const;
export const urls = {
	GetAllFAQs: '/FAQ/GetAllFAQs/',
	GetFAQsByCategoryId: '/FAQ/GetFAQsByCategoryId/',
	GetFAQById: '/FAQ/GetFAQById/',
	AddEditFAQ: '/FAQ/AddEditFAQ/',
	DeleteFAQ: '/FAQ/DeleteFAQ/'
};

export type Faq = {
	id: string;
	faqCategoryId: string;
	faqCategoryTitle: string;
	languageId: number;
	langTitle: string;
	question: string;
	response: string;
	displayPriority: number;
};

const FaqApi = api
	.enhanceEndpoints({
		addTagTypes
	})
	.injectEndpoints({
		endpoints: (build) => ({
			getFaqs: build.query<FaqApiResponse[], GetFaqsApiArg>({
				query: () => ({ url: urls.GetAllFAQs }),
				providesTags: ['faqs']
			}),
			deleteFaq: build.mutation<FaqApiResponse, DeleteFaqApiArg>({
				query: (faqId) => ({
					url: `/FAQ/DeleteFAQ/${faqId}`,
					method: 'DELETE'
				}),
				invalidatesTags: ['faq']
			}),
			getFaqById: build.query<FaqApiResponse, GetFaqByIdApiArg>({
				query: (faqIds) => ({
					url: `/FAQ/GetFAQById`,
					data: faqIds
				}),
				providesTags: ['faq']
			}),
			getFaqByCategoryId: build.query<FaqApiResponse, GetFaqByCategoryIdApiArg>({
				query: (categoryIds) => ({
					url: urls.GetFAQsByCategoryId,
					data: categoryIds
				}),
				providesTags: ['faqs']
			}),
			createOrEditFaq: build.mutation<FaqApiResponse, CreateOrEditFaqApiArg>({
				query: (newFaq) => ({
					url: `/FAQ/AddEditFAQ`,
					method: 'POST',
					data: newFaq
				}),
				invalidatesTags: ['faqs', 'faqs']
			})
		}),
		overrideExisting: false
	});

export default FaqApi;

export const {
	useGetFaqsQuery,
	useGetFaqByIdQuery,
	useGetFaqByCategoryIdQuery,
	useDeleteFaqMutation,
	useCreateOrEditFaqMutation
} = FaqApi;

export type ApiType = {
	[FaqApi.reducerPath]: ReturnType<typeof FaqApi.reducer>;
};

export type FaqApiResponse = Faq;

export type GetFaqsApiArg = void;
export type DeleteFaqApiArg = string[];
export type GetFaqByIdApiArg = string;
export type GetFaqByCategoryIdApiArg = string[];
export type CreateOrEditFaqApiArg = {
	id?: string;
	faqCategoryId: string;
	languageId: number;
	question: string;
	response: string;
	displayPriority: number;
};

/**
 * Select faqs
 */
/**
 * Select filtered faqs
 */
export const selectFilteredFaqs = (faqs: FaqApiResponse[]) =>
	createSelector([selectSearchText], (searchText) => {
		if (searchText?.length === 0) {
			return faqs;
		}
		return FuseUtils.filterArrayByString<FaqApiResponse>(faqs, searchText);
	});

