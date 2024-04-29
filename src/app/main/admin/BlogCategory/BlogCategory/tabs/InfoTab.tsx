import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Controller, useFormContext } from 'react-hook-form';
import { useGetAllLanguageQuery } from '../../../languagesApi';
import FuseLoading from '@fuse/core/FuseLoading';
import { useTranslation } from 'react-i18next';

/**
 * The basic info tab.
 */
function InfoTab() {
	const { t } = useTranslation();
	const methods = useFormContext();
	const { data: languages, isLoading } = useGetAllLanguageQuery();

	const { control, formState } = methods;
	const { errors } = formState;

	if (isLoading) return <FuseLoading />;

	return (
		<div>
			<Controller
				name="language"
				control={control}
				render={({ field: { onChange, value } }) => (
					<Autocomplete
						className="mt-8 mb-16"
						value={value as { label: string; value: string }}
						options={languages.map((l) => ({ label: l.languageTitle, value: l.id }))}
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
		</div>
	);
}

export default InfoTab;
