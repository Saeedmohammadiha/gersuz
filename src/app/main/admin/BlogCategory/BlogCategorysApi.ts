import { apiService as api } from 'app/store/apiService';
import { createSelector } from '@reduxjs/toolkit';
import FuseUtils from '@fuse/utils';
import { selectSearchText } from '../store/searchTextSlice';

export const addTagTypes = ['BlogCategorys', 'BlogCategory', 'BlogCategorysLanding'] as const;
export const urls = {
	GetAllBlogCategoriesForLandingPage: '/BlogCategory/GetAllBlogCategory/',
	GetAllBlogCategory: '/BlogCategory/GetAllBlogCategories/',
	GetBlogCategoryById: '/BlogCategory/GetBlogCategoryById/',
	AddEditBlogCategory: '/BlogCategory/AddEditBlogCategory/',
	DeleteBlogCategory: '/BlogCategory/DeleteBlogCategory/'
};

export type BlogCategory = {
	id: string;
	title: string;
	languageId: number;
	languageTitle: string;
};

const BlogCategoryApi = api
	.enhanceEndpoints({
		addTagTypes
	})
	.injectEndpoints({
		endpoints: (build) => ({
			getBlogCategorys: build.query<GetAllBlogCategoryApiResponse, GetBlogCategorysApiArg>({
				query: () => ({ url: urls.GetAllBlogCategory }),
				providesTags: ['BlogCategorys']
			}),
			GetAllBlogCategoriesForLandingPage: build.query<GetAllBlogCategoryApiResponse, GetBlogCategorysApiArg>({
				query: () => ({ url: urls.GetAllBlogCategoriesForLandingPage }),
				providesTags: ['BlogCategorysLanding']
			}),

			deleteBlogCategory: build.mutation<DeleteBlogCategoryApiResponse, DeleteBlogCategoryApiArg>({
				query: (BlogCategoryId) => ({
					url: `${urls.DeleteBlogCategory}${BlogCategoryId}`,
					method: 'DELETE'
				}),
				invalidatesTags: ['BlogCategory', 'BlogCategorys']
			}),

			getBlogCategoryById: build.query<GetBlogCategoryByIdApiResponse, GetBlogCategoryByIdApiArg>({
				query: (BlogCategoryIds) => ({
					url: `${urls.GetBlogCategoryById}${BlogCategoryIds}`
				}),
				providesTags: ['BlogCategory']
			}),

			createOrEditBlogCategory: build.mutation<BlogCategoryApiResponse, CreateOrEditBlogCategoryApiArg>({
				query: (newBlogCategory) => ({
					url: urls.AddEditBlogCategory,
					method: 'POST',
					data: newBlogCategory
				}),
				invalidatesTags: ['BlogCategorys', 'BlogCategorys']
			})
		}),
		overrideExisting: false
	});

export default BlogCategoryApi;

export const {
	useGetBlogCategorysQuery,
	useGetBlogCategoryByIdQuery,
	useDeleteBlogCategoryMutation,
	useCreateOrEditBlogCategoryMutation
} = BlogCategoryApi;

export type BlogCategoryApiType = {
	[BlogCategoryApi.reducerPath]: ReturnType<typeof BlogCategoryApi.reducer>;
};

export type BlogCategoryApiResponse = {
	code: string;
	message: string;
	status: string;
	body: BlogCategory;
};
export type GetAllBlogCategoryApiResponse = BlogCategory[];
export type GetBlogCategoryByIdApiResponse = BlogCategory;
export type DeleteBlogCategoryApiResponse = {
	code: string;
	message: string;
	status: string;
	body: null;
};

export type GetBlogCategorysApiArg = void;
//TODO: group deleting
export type DeleteBlogCategoryApiArg = string[] | string;
export type GetBlogCategoryByIdApiArg = string;
export type CreateOrEditBlogCategoryApiArg = {
	id?: string;
	title: string;
	languageId: number;
	languageTitle: string;
};

/**
 * Select filtered BlogCategorys
 */
export const selectFilteredBlogCategorys = (BlogCategorys: BlogCategory[]) => {
	return createSelector([selectSearchText], (searchText) => {
		if (searchText?.length === 0) {
			return BlogCategorys;
		}
		return FuseUtils.filterArrayByString<BlogCategory>(BlogCategorys, searchText);
	});
};
