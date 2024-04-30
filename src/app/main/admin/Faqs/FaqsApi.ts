import { apiService as api } from 'app/store/apiService';
import { createSelector } from '@reduxjs/toolkit';
import FuseUtils from '@fuse/utils';
import { selectSearchText } from '../store/searchTextSlice';

export const addTagTypes = ['Faqs', 'Faq'] as const;
export const urls = {
	GetAllFAQs: '/FAQ/GetAllFAQs/',
	GetFAQById: '/FAQ/GetFAQById/',
	GetFAQsByCategoryId: '/FAQ/GetFAQsByCategoryId/',
	AddEditFAQ: '/FAQ/AddEditFAQ/',
	DeleteFAQ: '/FAQ/DeleteFAQ/'
};

export type Faq = {
	id: string;
	languageId: number;
	langTitle: string;
	displayPriority: number;
	question: string;
	response: string;
	faqCategoryId: string;
	faqCategoryTitle: string;
};

const FaqApi = api
	.enhanceEndpoints({
		addTagTypes
	})
	.injectEndpoints({
		endpoints: (build) => ({
			getFaqs: build.query<GetAllFaqApiResponse, GetFaqsApiArg>({
				query: () => ({ url: urls.GetAllFAQs }),
				providesTags: ['Faqs']
			}),
			getFaqsByCategoryId: build.query<GetFaqsByCategoryIdApiResponse, GetFaqsByCategoryIdApiArg>({
				query: (ByCategoryId) => ({ url: urls.GetFAQsByCategoryId, data: ByCategoryId }),
				providesTags: ['Faqs']
			}),

			deleteFaq: build.mutation<DeleteFaqApiResponse, DeleteFaqApiArg>({
				query: (FaqId) => ({
					url: `${urls.DeleteFAQ}${FaqId}`,
					method: 'DELETE'
				}),
				invalidatesTags: ['Faq', 'Faqs']
			}),

			getFaqById: build.query<GetFaqByIdApiResponse, GetFaqByIdApiArg>({
				query: (FaqIds) => ({
					url: `${urls.GetFAQById}${FaqIds}`
				}),
				providesTags: ['Faq']
			}),

			createOrEditFaq: build.mutation<FaqApiResponse, CreateOrEditFaqApiArg>({
				query: (newFaq) => ({
					url: urls.AddEditFAQ,
					method: 'POST',
					data: newFaq
				}),
				invalidatesTags: ['Faqs', 'Faqs']
			})
		}),
		overrideExisting: false
	});

export default FaqApi;

export const { useGetFaqsQuery, useGetFaqByIdQuery, useDeleteFaqMutation, useCreateOrEditFaqMutation } = FaqApi;

export type FaqApiType = {
	[FaqApi.reducerPath]: ReturnType<typeof FaqApi.reducer>;
};


export type OptionalProperty<Type, Key extends keyof Type> = Omit<Type, Key> &
    Partial<Pick<Type, Key>>;


export type FaqApiResponse = {
	code: string;
	message: string;
	status: string;
	body: Faq;
};
export type GetAllFaqApiResponse = Faq[];
export type GetFaqsByCategoryIdApiResponse = Faq[];
export type GetFaqByIdApiResponse = Faq;
export type DeleteFaqApiResponse = {
	code: string;
	message: string;
	status: string;
	body: null;
};

export type GetFaqsApiArg = void;
//TODO: group deleting
export type DeleteFaqApiArg = string[] | string;
export type GetFaqByIdApiArg = string;
export type GetFaqsByCategoryIdApiArg = string;
export type CreateOrEditFaqApiArg = OptionalProperty<Faq, "id">

/**
 * Select filtered Faqs
 */
export const selectFilteredFaqs = (Faqs: Faq[]) => {
	return createSelector([selectSearchText], (searchText) => {
		if (searchText?.length === 0) {
			return Faqs;
		}

		return FuseUtils.filterArrayByString<Faq>(Faqs, searchText);
	});
};
