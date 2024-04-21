import { combineReducers } from '@reduxjs/toolkit';
import { RootStateType } from 'app/store/types';
import searchText, { searchTextSliceType } from './searchTextSlice';
import { FaqCategoryApiType } from '../FaqCategorys/FaqCategorysApi';

/**
 * The store reducer.
 */

const reducer = combineReducers({
	searchText
});

export type AppRootStateType = RootStateType<[searchTextSliceType]> & FaqCategoryApiType;

export default reducer;
