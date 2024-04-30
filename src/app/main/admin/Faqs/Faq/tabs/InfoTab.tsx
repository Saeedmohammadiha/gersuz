import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Controller, useFormContext } from 'react-hook-form';
import { useGetAllLanguageQuery } from '../../../languagesApi';
import FuseLoading from '@fuse/core/FuseLoading';
import { useTranslation } from 'react-i18next';
import { useGetFaqCategorysQuery } from '../../../FaqCategorys/FaqCategorysApi';

/**
 * The basic info tab.
 */
function InfoTab() {
	const { t } = useTranslation();
	const methods = useFormContext();
	const { data: languages, isLoading: langLoading } = useGetAllLanguageQuery();
	const { data: faqCategory, isLoading: faqLoading } = useGetFaqCategorysQuery();

	const { control, formState } = methods;
	const { errors } = formState;

	if (langLoading || faqLoading) return <FuseLoading />;

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
				name="faqCategory"
				control={control}
				render={({ field: { onChange, value } }) => (
					<Autocomplete
						className="mt-8 mb-16"
						value={value as { label: string; value: string }}
						options={faqCategory?.map((cat) => ({ value: cat.id, label: cat.title }))}
						onChange={(event, newValue) => {
							onChange(newValue);
						}}
						renderInput={(params) => (
							<TextField
								{...params}
								label="Faq Category"
								variant="outlined"
								InputLabelProps={{
									shrink: true
								}}
								error={!!errors.faqCategory}
								helperText={errors?.faqCategory ? (errors.faqCategory.message as string) : ''}
							/>
						)}
					/>
				)}
			/>

			<Controller
				name="question"
				control={control}
				render={({ field }) => (
					<TextField
						{...field}
						className="mt-8 mb-16"
						id="question"
						label="Question"
						type="text"
						multiline
						rows={5}
						variant="outlined"
						fullWidth
						error={!!errors.question}
						helperText={errors?.question ? (errors.question.message as string) : ''}
					/>
				)}
			/>
			<Controller
				name="response"
				control={control}
				render={({ field }) => (
					<TextField
						{...field}
						className="mt-8 mb-16"
						id="response"
						label="Response"
						type="text"
						multiline
						rows={5}
						variant="outlined"
						fullWidth
						error={!!errors.answer}
						helperText={errors?.answer ? (errors.answer.message as string) : ''}
					/>
				)}
			/>

			<Controller
				name="displayPriority"
				control={control}
				render={({ field }) => (
					<TextField
						{...field}
						className="mt-8 mb-16"
						id="displayPriority"
						label="Display Priority"
						type="number"
						variant="outlined"
						fullWidth
						error={!!errors.displayPriority}
						helperText={errors?.displayPriority ? (errors.displayPriority.message as string) : ''}
					/>
				)}
			/>
		</div>
	);
}

export default InfoTab;
