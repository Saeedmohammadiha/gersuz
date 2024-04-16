import { apiService as api } from 'app/store/apiService';
import { createSelector } from '@reduxjs/toolkit';
import FuseUtils from '@fuse/utils';
import { selectSearchText } from '../store/searchTextSlice';

export const addTagTypes = ['faqs', 'faq'] as const;
export const urls = {
	GetAllFAQs: '/api/FAQ/GetAllFAQs/',
	GetFAQsByCategoryId: '/api/FAQ/GetFAQsByCategoryId/',
	GetFAQById: '/api/FAQ/GetFAQById/',
	AddEditFAQ: '/api/FAQ/AddEditFAQ/',
	DeleteFAQ: '/api/FAQ/DeleteFAQ/'
};

export type Faq = {
	Id: string;
	FAQCategoryId: string;
	FAQCategoryTitle: string;
	LanguageId: number;
	LangTitle: string;
	Question: string;
	Response: string;
	DisplayPriority: number;
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
					url: `/api/FAQ/DeleteFAQ/${faqId}`,
					method: 'DELETE'
				}),
				invalidatesTags: ['faq']
			}),
			getFaqById: build.query<FaqApiResponse, GetFaqByIdApiArg>({
				query: (faqIds) => ({
					url: `/api/FAQ/GetFAQById`,
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
					url: `/api/FAQ/AddEditFAQ`,
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
	Id?: string;
	FAQCategoryId: string;
	LanguageId: number;
	Question: string;
	Response: string;
	DisplayPriority: number;
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

/**
 * Select filtered orders
 */
// export const selectFilteredOrders = (orders: EcommerceOrder[]) =>
// 	createSelector([selectSearchText], (searchText) => {
// 		if (searchText.length === 0) {
// 			return orders;
// 		}
// 		return FuseUtils.filterArrayByString<EcommerceOrder>(orders, searchText);
// 	});
