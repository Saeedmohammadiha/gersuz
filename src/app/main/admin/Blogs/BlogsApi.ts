import { apiService as api } from 'app/store/apiService';
import { createSelector } from '@reduxjs/toolkit';
import FuseUtils from '@fuse/utils';
import { selectSearchText } from '../store/searchTextSlice';

export const addTagTypes = ['Blogs', 'Blog', 'BlogsLanding'] as const;
export const urls = {
	GetAllBlogForLandingPage: '/Blog/',
	GetAllBlog: '/Blog/GetAllBlogs/',
	GetBlogById: '/Blog/GetBlogById/',
	GetBlogByCategoryId: '/Blog/GetBlogByCategoryId/',
	AddEditBlog: '/Blog/AddEditBlog/',
	DeleteBlog: '/Blog/DeleteBlog/'
};

export type Blog = {
	id: string;
	title: string;
	languageId: number;
	languageTitle: string;
	Image: File;
	ImageUrl: string;
	ImagePatch: string;
	Description: string;
	BlogCategoryId: string;
	BlogCategory: string;
	CreatedDateTime: Date;
};

const BlogApi = api
	.enhanceEndpoints({
		addTagTypes
	})
	.injectEndpoints({
		endpoints: (build) => ({
			getBlogs: build.query<GetAllBlogApiResponse, GetBlogsApiArg>({
				query: () => ({ url: urls.GetAllBlog }),
				providesTags: ['Blogs']
			}),
			GetAllBlogForLandingPage: build.query<GetAllBlogApiResponse, GetBlogsApiArg>({
				query: () => ({ url: urls.GetAllBlogForLandingPage }),
				providesTags: ['BlogsLanding']
			}),

			deleteBlog: build.mutation<DeleteBlogApiResponse, DeleteBlogApiArg>({
				query: (BlogId) => ({
					url: `${urls.DeleteBlog}${BlogId}`,
					method: 'DELETE'
				}),
				invalidatesTags: ['Blog', 'Blogs']
			}),

			getBlogById: build.query<GetBlogByIdApiResponse, GetBlogByIdApiArg>({
				query: (BlogIds) => ({
					url: `${urls.GetBlogById}${BlogIds}`
				}),
				providesTags: ['Blog']
			}),
			getBlogByCategoryId: build.query<GetBlogByIdApiResponse, GetBlogByIdApiArg>({
				query: (CategoryId) => ({
					url: `${urls.GetBlogById}${CategoryId}`
				}),
				providesTags: ['Blog']
			}),

			createOrEditBlog: build.mutation<BlogApiResponse, CreateOrEditBlogApiArg>({
				query: (newBlog) => ({
					url: urls.AddEditBlog,
					method: 'POST',
					data: newBlog
				}),
				invalidatesTags: ['Blogs', 'Blogs']
			})
		}),
		overrideExisting: false
	});

export default BlogApi;

export const { useGetBlogsQuery, useGetBlogByIdQuery, useDeleteBlogMutation, useCreateOrEditBlogMutation } = BlogApi;

export type BlogApiType = {
	[BlogApi.reducerPath]: ReturnType<typeof BlogApi.reducer>;
};

export type BlogApiResponse = {
	code: string;
	message: string;
	status: string;
	body: Blog;
};
export type GetAllBlogApiResponse = Blog[];
export type GetBlogByIdApiResponse = Blog;
export type DeleteBlogApiResponse = {
	code: string;
	message: string;
	status: string;
	body: null;
};

export type GetBlogsApiArg = void;
//TODO: group deleting
export type DeleteBlogApiArg = string[] | string;
export type GetBlogByIdApiArg = string;
export type CreateOrEditBlogApiArg = {
	id?: string;
	title: string;
	languageId: number;
	languageTitle: string;
};

/**
 * Select filtered Blogs
 */
export const selectFilteredBlogs = (Blogs: Blog[]) => {
	return createSelector([selectSearchText], (searchText) => {
		if (searchText?.length === 0) {
			return Blogs;
		}
		return FuseUtils.filterArrayByString<Blog>(Blogs, searchText);
	});
};
