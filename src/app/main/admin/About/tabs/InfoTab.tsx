import { Controller, useFormContext } from 'react-hook-form';
import { Autocomplete, TextField } from '@mui/material';
import WYSIWYGEditor from 'app/shared-components/WYSIWYGEditor';

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
				name="language"
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
				name="Title"
				control={control}
				render={({ field }) => (
					<TextField
						{...field}
						className="mt-8 mb-16"
						id="Title"
						label="Title"
						type="text"
						variant="outlined"
						fullWidth
					/>
				)}
			/>

			<WYSIWYGEditor onChange={() => {}} />
		</div>
	);
}

export default InfoTab;
