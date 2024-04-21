import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Controller, useFormContext } from 'react-hook-form';

//TODO: get languages
//TODO: set the languages in the select
//TODO: get inputed date maybe in parent
//TODO: post the data to backend
//TODO: navigate the user to faq list page

/**
 * The basic info tab.
 */
function BasicInfoTab() {
	const methods = useFormContext();
	const { control, formState } = methods;
	const { errors } = formState;

	return (
		<div>
			<Controller
				name="Language"
				control={control}
				render={({ field: { onChange, value } }) => (
					<Autocomplete
						className="mt-8 mb-16"
						value={value as { label: string; value: number }}
						options={[{ label: 'test', value: 12 }]}
						onChange={(event, newValue) => {
							onChange(newValue);
						}}
						renderInput={(params) => (
							<TextField
								{...params}
								label="Language"
								variant="outlined"
								InputLabelProps={{
									shrink: true
								}}
							/>
						)}
					/>
				)}
			/>
			<Controller
				name="Faq Category"
				control={control}
				render={({ field: { onChange, value } }) => (
					<Autocomplete
						className="mt-8 mb-16"
						value={value as { label: string; value: number }}
						options={[{ label: 'test', value: 12 }]}
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
						label="question"
						type="text"
						multiline
						rows={5}
						variant="outlined"
						fullWidth
					/>
				)}
			/>
			<Controller
				name="answer"
				control={control}
				render={({ field }) => (
					<TextField
						{...field}
						className="mt-8 mb-16"
						id="answer"
						label="answer"
						type="text"
						multiline
						rows={5}
						variant="outlined"
						fullWidth
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
						label="DisplayPriority"
						type="number"
						variant="outlined"
						fullWidth
					/>
				)}
			/>
		</div>
	);
}

export default BasicInfoTab;
