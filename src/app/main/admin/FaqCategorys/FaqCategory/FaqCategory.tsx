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
	title: z.string().max(80, {message: 'title is too long'}),
	DisplayPriority: z.string({
		required_error: "Display Priority is required",
		invalid_type_error: "Display Priority must be a number",
	  })
});

/**
 * The FaqCategory page.
 */
function FaqCategory() {
	const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
	const routeParams = useParams();

	const { FaqCategoryId } = routeParams;

	const {
		data: FaqCategory,
		isLoading,
		isError
	} = useGetFaqCategoryByIdQuery(FaqCategoryId, {
		skip: !FaqCategoryId || FaqCategoryId === 'new'
	});

	const [tabValue, setTabValue] = useState(0);

	const methods = useForm({
		mode: 'onChange',
	//	defaultValues: { language: { label: 'en-US', value: '1' }, title: '', DisplayPriority: null  },
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
			//reset({ ...FaqCategory });
			reset({
				language: { label: FaqCategory.langTitle, value: FaqCategory.languageId.toString() },
				title: FaqCategory.title,
				DisplayPriority: FaqCategory.displayPriority
			});
		}
	}, [FaqCategory, reset]);

	/**
	 * Tab Change
	 */
	function handleTabChange(event: SyntheticEvent, value: number) {
		setTabValue(value);
	}

	if (isLoading) {
		return <FuseLoading />;
	}

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
					to="/apps/e-commerce/products"
					color="inherit"
				>
					Go to Faq Category Page
				</Button>
			</motion.div>
		);
	}

	/**
	 * Wait while product data is loading and form is setted
	 */
	// if (_.isEmpty(form) || (FaqId && routeParams.productId !== Faq.Id && routeParams.FaqId !== 'new')) {
	// 	return <FuseLoading />;
	// }

	return (
		<FormProvider {...methods}>
			<FusePageCarded
				header={<FaqCategoryHeader />}
				content={
					<>
						<Tabs
							value={tabValue}
							onChange={handleTabChange}
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
