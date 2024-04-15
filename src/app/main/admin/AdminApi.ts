import { apiService as api } from 'app/store/apiService';
import { createSelector } from '@reduxjs/toolkit';
import FuseUtils from '@fuse/utils';
import { PartialDeep } from 'type-fest';
import { selectSearchText } from './store/searchTextSlice';

export const addTagTypes = ['admin_faqs', 'admin_faq'] as const;
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

export type AdminFaqApiResponse = Faq;

export type GetAdminFaqsApiArg = void;
export type DeleteAdminFaqApiArg = string[];
export type GetAdminFaqByIdApiArg = string;
export type GetAdminFaqByCategoryIdApiArg = string[];
export type CreateOrEditFaqApiArg = {
	Id?: string;
	FAQCategoryId: string;
	LanguageId: number;
	Question: string;
	Response: string;
	DisplayPriority: number;
};

const AdminApi = api
	.enhanceEndpoints({
		addTagTypes
	})
	.injectEndpoints({
		endpoints: (build) => ({
			getAdminFaqs: build.query<AdminFaqApiResponse[], GetAdminFaqsApiArg>({
				query: () => ({ url: urls.GetAllFAQs }),
				providesTags: ['admin_faqs']
			}),
			deleteAdminFaq: build.mutation<AdminFaqApiResponse, DeleteAdminFaqApiArg>({
				query: (faqId) => ({
					url: `/api/FAQ/DeleteFAQ/${faqId}`,
					method: 'DELETE'
				}),
				invalidatesTags: ['admin_faq']
			}),
			getAdminFaqById: build.query<AdminFaqApiResponse, GetAdminFaqByIdApiArg>({
				query: (faqIds) => ({
					url: `/api/FAQ/GetFAQById`,
					data: faqIds
				}),
				providesTags: ['admin_faq']
			}),
			getAdminFaqByCategoryId: build.query<AdminFaqApiResponse, GetAdminFaqByCategoryIdApiArg>({
				query: (categoryIds) => ({
					url: urls.GetFAQsByCategoryId,
					data: categoryIds
				}),
				providesTags: ['admin_faqs']
			}),
			createOrEditAdminFaq: build.mutation<AdminFaqApiResponse, CreateOrEditFaqApiArg>({
				query: (newFaq) => ({
					url: `/api/FAQ/AddEditFAQ`,
					method: 'POST',
					data: newFaq
				}),
				invalidatesTags: ['admin_faqs', 'admin_faqs']
			})
			// updateECommerceProduct: build.mutation<UpdateECommerceProductApiResponse, UpdateECommerceProductApiArg>({
			// 	query: (product) => ({
			// 		url: `/mock-api/ecommerce/products/${product.id}`,
			// 		method: 'PUT',
			// 		data: product
			// 	}),
			// 	invalidatesTags: ['eCommerce_product', 'eCommerce_products']
			// }),
			// deleteECommerceProduct: build.mutation<DeleteECommerceProductApiResponse, DeleteECommerceProductApiArg>({
			// 	query: (productId) => ({
			// 		url: `/mock-api/ecommerce/products/${productId}`,
			// 		method: 'DELETE'
			// 	}),
			// 	invalidatesTags: ['eCommerce_product', 'eCommerce_products']
			// }),
			// getECommerceOrders: build.query<GetECommerceOrdersApiResponse, GetECommerceOrdersApiArg>({
			// 	query: () => ({ url: `/mock-api/ecommerce/orders` }),
			// 	providesTags: ['eCommerce_orders']
			// }),
			// getECommerceOrder: build.query<GetECommerceOrderApiResponse, GetECommerceOrderApiArg>({
			// 	query: (orderId) => ({ url: `/mock-api/ecommerce/orders/${orderId}` }),
			// 	providesTags: ['eCommerce_order']
			// }),
			// updateECommerceOrder: build.mutation<UpdateECommerceOrderApiResponse, UpdateECommerceOrderApiArg>({
			// 	query: (order) => ({
			// 		url: `/mock-api/ecommerce/orders/${order.id}`,
			// 		method: 'PUT',
			// 		data: order
			// 	}),
			// 	invalidatesTags: ['eCommerce_order', 'eCommerce_orders']
			// }),
			// deleteECommerceOrder: build.mutation<DeleteECommerceOrderApiResponse, DeleteECommerceOrderApiArg>({
			// 	query: (orderId) => ({
			// 		url: `/mock-api/ecommerce/orders/${orderId}`,
			// 		method: 'DELETE'
			// 	}),
			// 	invalidatesTags: ['eCommerce_order', 'eCommerce_orders']
			// }),
			// deleteECommerceOrders: build.mutation<DeleteECommerceOrdersApiResponse, DeleteECommerceOrdersApiArg>({
			// 	query: (ordersId) => ({
			// 		url: `/mock-api/ecommerce/orders`,
			// 		method: 'DELETE',
			// 		data: ordersId
			// 	}),
			// 	invalidatesTags: ['eCommerce_order', 'eCommerce_orders']
			// })
		}),
		overrideExisting: false
	});

export default AdminApi;

// export type GetECommerceProductsApiResponse = /** status 200 OK */ EcommerceProduct[];
// export type GetECommerceProductsApiArg = void;

// export type DeleteECommerceProductsApiResponse = unknown;
// export type DeleteECommerceProductsApiArg = string[]; /** Product ids */

// export type GetECommerceProductApiResponse = /** status 200 OK */ EcommerceProduct;
// export type GetECommerceProductApiArg = string;

// export type CreateECommerceProductApiResponse = /** status 200 OK */ EcommerceProduct;
// export type CreateECommerceProductApiArg = PartialDeep<EcommerceProduct>;

// export type UpdateECommerceProductApiResponse = unknown;
// export type UpdateECommerceProductApiArg = EcommerceProduct; // Product

// export type DeleteECommerceProductApiResponse = unknown;
// export type DeleteECommerceProductApiArg = string; // Product id

// export type GetECommerceOrdersApiResponse = /** status 200 OK */ EcommerceOrder[];
// export type GetECommerceOrdersApiArg = void;

// export type GetECommerceOrderApiResponse = /** status 200 OK */ EcommerceOrder;
// export type GetECommerceOrderApiArg = string; // Order id

// export type UpdateECommerceOrderApiResponse = unknown;
// export type UpdateECommerceOrderApiArg = EcommerceOrder; // Order

// export type DeleteECommerceOrderApiResponse = unknown;
// export type DeleteECommerceOrderApiArg = string; // Order id

// export type DeleteECommerceOrdersApiResponse = unknown;
// export type DeleteECommerceOrdersApiArg = string[]; // Orders id

// export type EcommerceProductImageType = {
// 	id: string;
// 	url: string;
// 	type: string;
// };

// export type EcommerceProduct = {
// 	id: string;
// 	name: string;
// 	handle: string;
// 	description: string;
// 	categories: string[];
// 	tags: string[];
// 	featuredImageId: string;
// 	images: EcommerceProductImageType[];
// 	priceTaxExcl: number;
// 	priceTaxIncl: number;
// 	taxRate: number;
// 	comparedPrice: number;
// 	quantity: number;
// 	sku: string;
// 	width: string;
// 	height: string;
// 	depth: string;
// 	weight: string;
// 	extraShippingFee: number;
// 	active: boolean;
// };

// export type EcommerceOrder = {
// 	id: string;
// 	reference: string;
// 	subtotal: string;
// 	tax: string;
// 	discount: string;
// 	total: string;
// 	date: string;
// 	customer: {
// 		id: string;
// 		firstName: string;
// 		lastName: string;
// 		avatar: string;
// 		company: string;
// 		jobTitle: string;
// 		email: string;
// 		phone: string;
// 		invoiceAddress: {
// 			address: string;
// 			lat: number;
// 			lng: number;
// 		};
// 		shippingAddress: {
// 			address: string;
// 			lat: number;
// 			lng: number;
// 		};
// 	};
// 	products: Partial<EcommerceProduct & { image: string; price: string }>[];
// 	status: {
// 		id: string;
// 		name: string;
// 		color: string;
// 		date?: string;
// 	}[];
// 	payment: {
// 		transactionId: string;
// 		amount: string;
// 		method: string;
// 		date: string;
// 	};
// 	shippingDetails: {
// 		tracking: string;
// 		carrier: string;
// 		weight: string;
// 		fee: string;
// 		date: string;
// 	}[];
// };

export const {
	useGetAdminFaqsQuery,
	useGetAdminFaqByIdQuery,
	useGetAdminFaqByCategoryIdQuery,
	useDeleteAdminFaqMutation,
	useCreateOrEditAdminFaqMutation
	// useGetECommerceProductsQuery,
	// useDeleteECommerceProductsMutation,
	// useGetECommerceProductQuery,
	// useUpdateECommerceProductMutation,
	// useDeleteECommerceProductMutation,
	// useGetECommerceOrdersQuery,
	// useGetECommerceOrderQuery,
	// useUpdateECommerceOrderMutation,
	// useDeleteECommerceOrderMutation,
	// useDeleteECommerceOrdersMutation,
	// useCreateECommerceProductMutation
} = AdminApi;

export type AdminApiType = {
	[AdminApi.reducerPath]: ReturnType<typeof AdminApi.reducer>;
};

/**
 * Select products
 */
/**
 * Select filtered products
 */
export const selectFilteredFaqs = (faqs: AdminFaqApiResponse[]) =>
	createSelector([selectSearchText], (searchText) => {
		if (searchText?.length === 0) {
			return faqs;
		}
		return FuseUtils.filterArrayByString<AdminFaqApiResponse>(faqs, searchText);
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
