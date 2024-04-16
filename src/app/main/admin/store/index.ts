import { combineReducers } from '@reduxjs/toolkit';
import { RootStateType } from 'app/store/types';
import searchText, { searchTextSliceType } from './searchTextSlice';
import { ECommerceApiType } from '../Faqs/FaqApi';

/**
 * The E-Commerce store reducer.
 */

const reducer = combineReducers({
	searchText
});

export type AppRootStateType = RootStateType<[searchTextSliceType]> & ECommerceApiType;

export default reducer;
