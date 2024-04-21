import { apiService as api } from 'app/store/apiService';
import { createSelector } from '@reduxjs/toolkit';
import FuseUtils from '@fuse/utils';
import { selectSearchText } from '../store/searchTextSlice';

export const addTagTypes = ['FaqCategorys', 'FaqCategory'] as const;
export const urls = {
	GetAllFAQCategory: '/FAQCategory/GetAllFAQCategory/',
	GetFAQCategoryById: '/FAQCategory/GetFAQCategoryById/',
	AddEditFAQCategory: '/FAQCategory/AddEditFAQCategory/',
	DeleteFAQCategory: '/FAQCategory/DeleteFAQCategory/'
};

export type FaqCategory = {
	id: string;
	title: string;
	languageId: number;
	langTitle: string;
	displayPriority: number;
};

const FaqCategoryApi = api
	.enhanceEndpoints({
		addTagTypes
	})
	.injectEndpoints({
		endpoints: (build) => ({
			getFaqCategorys: build.query<GetAllFaqCategoryApiResponse, GetFaqCategorysApiArg>({
				query: () => ({ url: urls.GetAllFAQCategory }),
				providesTags: ['FaqCategorys']
			}),

			deleteFaqCategory: build.mutation<DeleteFaqCategoryApiResponse, DeleteFaqCategoryApiArg>({
				query: (FaqCategoryId) => ({
					url: `${urls.DeleteFAQCategory}${FaqCategoryId}`,
					method: 'DELETE'
				}),
				invalidatesTags: ['FaqCategory','FaqCategorys']
			}),

			getFaqCategoryById: build.query<GetFaqCategoryByIdApiResponse, GetFaqCategoryByIdApiArg>({
				query: (FaqCategoryIds) => ({
					url: `${urls.GetFAQCategoryById}${FaqCategoryIds}`
				}),
				providesTags: ['FaqCategory']
			}),

			createOrEditFaqCategory: build.mutation<FaqCategoryApiResponse, CreateOrEditFaqCategoryApiArg>({
				query: (newFaqCategory) => ({
					url: urls.AddEditFAQCategory,
					method: 'POST',
					data: newFaqCategory
				}),
				invalidatesTags: ['FaqCategorys', 'FaqCategorys']
			})
		}),
		overrideExisting: false
	});

export default FaqCategoryApi;

export const {
	useGetFaqCategorysQuery,
	useGetFaqCategoryByIdQuery,
	useDeleteFaqCategoryMutation,
	useCreateOrEditFaqCategoryMutation
} = FaqCategoryApi;

export type FaqCategoryApiType = {
	[FaqCategoryApi.reducerPath]: ReturnType<typeof FaqCategoryApi.reducer>;
};

export type FaqCategoryApiResponse = {
	code: string;
	message: string;
	status: string;
	body: FaqCategory;
};
export type GetAllFaqCategoryApiResponse = FaqCategory[];
export type GetFaqCategoryByIdApiResponse = FaqCategory;
export type DeleteFaqCategoryApiResponse = {
	code: string;
	message: string;
	status: string;
	body: null;
};

export type GetFaqCategorysApiArg = void;
//TODO: group deleting 
export type DeleteFaqCategoryApiArg = string[] | string;
export type GetFaqCategoryByIdApiArg = string;
export type CreateOrEditFaqCategoryApiArg = {
	id?: string;
	title: string;
	languageId: number;
	displayPriority: number;
};

/**
 * Select filtered FaqCategorys
 */
export const selectFilteredFaqCategorys = (FaqCategorys: FaqCategory[]) => {
	console.log(FaqCategorys);
	return createSelector([selectSearchText], (searchText) => {
		if (searchText?.length === 0) {
			return FaqCategorys;
		}
		console.log({ searchText });

		return FuseUtils.filterArrayByString<FaqCategory>(FaqCategorys, searchText);
	});
};
