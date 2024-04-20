import { apiService as api } from 'app/store/apiService';

export const addTagTypes = ['languages', 'change'] as const;
export const urls = {
	GetAllLanguage: '/Language/GetAllLanguage/',
	ChangeLanguage: '/Language/ChangeLanguage/'
};

export type Language = {
	id: string;
	languageTitle: string;
};

const LanguageApi = api
	.enhanceEndpoints({
		addTagTypes
	})
	.injectEndpoints({
		endpoints: (build) => ({
			getAllLanguage: build.query<LanguageApiResponse, GetLanguagesApiArg>({
				query: () => ({ url: urls.GetAllLanguage }),
				providesTags: ['languages']
			}),
			changeLanguage: build.mutation<ChangeLanguagesApiResponse, ChangeLanguagesApiArg>({
				query: (faqId) => ({
					url: `/api/FAQ/DeleteFAQ/${faqId}`,
					method: 'DELETE'
				}),
				invalidatesTags: ['change']
			})
		}),
		overrideExisting: false
	});

export default LanguageApi;

export const { useGetAllLanguageQuery, useChangeLanguageMutation } = LanguageApi;

export type ApiType = {
	[LanguageApi.reducerPath]: ReturnType<typeof LanguageApi.reducer>;
};

export type LanguageApiResponse = Language[];

export type GetLanguagesApiArg = void;
export type ChangeLanguagesApiArg = Omit<Language, 'languageTitle'>;
export type ChangeLanguagesApiResponse = void;
