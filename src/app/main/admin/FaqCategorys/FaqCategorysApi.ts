import { apiService as api } from 'app/store/apiService';
import { createSelector } from '@reduxjs/toolkit';
import FuseUtils from '@fuse/utils';
import { selectSearchText } from '../store/searchTextSlice';

export const addTagTypes = ['FaqCategorys', 'FaqCategory'] as const;
export const urls = {
	GetAllFAQCategory: 'api/FAQCategory/GetAllFAQCategory/',
	GetFAQCategoryById: '/api/FAQCategory/GetFAQCategoryById/',
	AddEditFAQCategory: '/api/FAQCategory/AddEditFAQCategory/',
	DeleteFAQCategory: '/api/FAQCategory/DeleteFAQCategory/'
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
			getFaqCategorys: build.query<FaqCategoryApiResponse[], GetFaqCategorysApiArg>({
				query: () => ({ url: urls.GetAllFAQCategory }),
				providesTags: ['FaqCategorys']
			}),

			deleteFaqCategory: build.mutation<FaqCategoryApiResponse, DeleteFaqCategoryApiArg>({
				query: (FaqCategoryId) => ({
					url: `${urls.DeleteFAQCategory}${FaqCategoryId}`,
					method: 'DELETE'
				}),
				invalidatesTags: ['FaqCategory']
			}),

			getFaqCategoryById: build.query<FaqCategoryApiResponse, GetFaqCategoryByIdApiArg>({
				query: (FaqCategoryIds) => ({
					url: urls.GetFAQCategoryById,
					data: FaqCategoryIds
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

export type ApiType = {
	[FaqCategoryApi.reducerPath]: ReturnType<typeof FaqCategoryApi.reducer>;
};

export type FaqCategoryApiResponse = FaqCategory;

export type GetFaqCategorysApiArg = void;
export type DeleteFaqCategoryApiArg = string[];
export type GetFaqCategoryByIdApiArg = string;
export type CreateOrEditFaqCategoryApiArg = {
	id?: string;
	title: string;
	languageId: number;
	displayPriority: number;
};

/**
 * Select FaqCategorys
 */
/**
 * Select filtered FaqCategorys
 */
export const selectFilteredFaqCategorys = (FaqCategorys: FaqCategoryApiResponse[]) =>
	createSelector([selectSearchText], (searchText) => {
		if (searchText?.length === 0) {
			return FaqCategorys;
		}
		return FuseUtils.filterArrayByString<FaqCategoryApiResponse>(FaqCategorys, searchText);
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
