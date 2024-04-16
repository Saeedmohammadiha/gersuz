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
function InfoTab() {
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
				name="title"
				control={control}
				render={({ field }) => (
					<TextField
						{...field}
						className="mt-8 mb-16"
						id="title"
						label="title"
						type="text"
						variant="outlined"
						fullWidth
					/>
				)}
			/>

			<Controller
				name="DisplayPriority"
				control={control}
				render={({ field }) => (
					<TextField
						{...field}
						className="mt-8 mb-16"
						id="DisplayPriority"
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

export default InfoTab;
