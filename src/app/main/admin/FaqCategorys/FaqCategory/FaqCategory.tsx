import FuseLoading from '@fuse/core/FuseLoading';
import FusePageCarded from '@fuse/core/FusePageCarded';
import Button from '@mui/material/Button';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import { SyntheticEvent, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import _ from '@lodash';
import { FormProvider, useForm } from 'react-hook-form';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import FaqCategoryHeader from './FaqCategoryHeader';
import InfoTab from './tabs/InfoTab';

import { useGetFaqCategoryByIdQuery } from '../FaqCategorysApi';

/**
 * Form Validation Schema
 */
const schema = z.object({
	//language: z.object({label: z.string(), value: z.string()}).required(),
	title: z
		.string({
			required_error: 'Title is required'
		})
		.max(80, { message: 'title is too long' }),
	displayPriority: z.string({
		required_error: 'Display Priority is required',
		invalid_type_error: 'Display Priority must be a number'
	})
});

/**
 * The FaqCategory page.
 */
function FaqCategory() {
	const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
	const { FaqCategoryId } = useParams();
	const [tabValue, setTabValue] = useState(0);

	const {
		data: FaqCategory,
		isLoading,
		isError
	} = useGetFaqCategoryByIdQuery(FaqCategoryId, {
		skip: !FaqCategoryId || FaqCategoryId === 'new'
	});

	const methods = useForm({
		mode: 'onChange',
		defaultValues: { language: { label: 'en-US', value: '1' }, ...FaqCategory },
		resolver: zodResolver(schema)
	});

	const { reset, watch } = methods;
	const form = watch();
	useEffect(() => {
		if (FaqCategoryId === 'new') {
			reset({});
		}
	}, [FaqCategoryId, reset]);

	useEffect(() => {
		if (FaqCategory) {
			reset({
				language: {
					label: FaqCategory?.langTitle,
					value: FaqCategory?.languageId.toString()
				},
				title: FaqCategory.title,
				displayPriority: FaqCategory.displayPriority
			});
		}
	}, [FaqCategory, reset]);

	if (isLoading) return <FuseLoading />;

	/**
	 * Show Message if the requested products is not exists
	 */
	if (isError && FaqCategoryId !== 'new') {
		return (
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1, transition: { delay: 0.1 } }}
				className="flex flex-col flex-1 items-center justify-center h-full"
			>
				<Typography
					color="text.secondary"
					variant="h5"
				>
					There is no such Faq Category!
				</Typography>
				<Button
					className="mt-24"
					component={Link}
					variant="outlined"
					//TODO: change rout
					to="/Admin/FaqCategorys"
					color="inherit"
				>
					Go to Faq Category Page
				</Button>
			</motion.div>
		);
	}

	return (
		<FormProvider {...methods}>
			<FusePageCarded
				header={<FaqCategoryHeader />}
				content={
					<>
						<Tabs
							value={tabValue}
							onChange={(e: SyntheticEvent, value: number) => setTabValue(value)}
							indicatorColor="secondary"
							textColor="secondary"
							variant="scrollable"
							scrollButtons="auto"
							classes={{ root: 'w-full h-64 border-b-1' }}
						>
							<Tab
								className="h-64"
								label="Info"
							/>
						</Tabs>
						<div className="p-16 sm:p-24 max-w-3xl">
							<div className={tabValue !== 0 ? 'hidden' : ''}>
								<InfoTab />
							</div>
						</div>
					</>
				}
				scroll={isMobile ? 'normal' : 'content'}
			/>
		</FormProvider>
	);
}

export default FaqCategory;
