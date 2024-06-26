import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Controller, useFormContext } from 'react-hook-form';
import { useGetAllLanguageQuery } from '../../../languagesApi';
import FuseLoading from '@fuse/core/FuseLoading';
import { useTranslation } from 'react-i18next';
import { useGetBlogCategorysQuery } from '../../../BlogCategory/BlogCategorysApi';
import TextEditor from 'app/shared-components/TextEditor';

/**
 * The basic info tab.
 */
function InfoTab() {
	const { t } = useTranslation();
	const methods = useFormContext();
	const { data: languages, isLoading: isLoadinglanguage } = useGetAllLanguageQuery();
	const { data: BlogCategorys, isLoading: isLoadingcategory } = useGetBlogCategorysQuery();

	const { control, formState } = methods;
	const { errors } = formState;

	if (isLoadinglanguage && isLoadingcategory) return <FuseLoading />;

	return (
		<div>
			<Controller
				name="language"
				control={control}
				render={({ field: { onChange, value } }) => (
					<Autocomplete
						className="mt-8 mb-16"
						value={value as { label: string; value: string }}
						options={languages?.map((l) => ({ label: l.languageTitle, value: l.id }))}
						defaultValue={{ label: 'en-US', value: '1' }}
						onChange={(event, newValue) => {
							onChange(newValue);
						}}
						renderInput={(params) => (
							<TextField
								{...params}
								label={t('language')}
								variant="outlined"
								InputLabelProps={{
									shrink: true
								}}
								error={!!errors.language}
								helperText={errors?.language ? (errors.language.message as string) : ''}
							/>
						)}
					/>
				)}
			/>

			<Controller
				name="title"
				control={control}
				render={({ field }) => (
					<TextField
						{...field}
						className="mt-8 mb-16"
						id="title"
						label="Title"
						type="text"
						variant="outlined"
						fullWidth
						error={!!errors.title}
						helperText={errors?.title ? (errors.title.message as string) : ''}
					/>
				)}
			/>
			<Controller
				name="blogCategory"
				control={control}
				render={({ field: { onChange, value } }) => (
					<Autocomplete
						className="mt-8 mb-16"
						value={value as { label: string; value: string }}
						options={BlogCategorys?.map((l) => ({ label: l.title, value: l.id }))}
						onChange={(event, newValue) => {
							onChange(newValue);
						}}
						renderInput={(params) => (
							<TextField
								{...params}
								label={t('Category')}
								variant="outlined"
								error={!!errors.language}
								helperText={errors?.language ? (errors.language.message as string) : ''}
							/>
						)}
					/>
				)}
			/>
			<Controller
				name="description"
				control={control}
				render={({ field }) => <TextEditor handleChange={(value) => field.onChange(value)} />}
			/>
		</div>
	);
}

export default InfoTab;
