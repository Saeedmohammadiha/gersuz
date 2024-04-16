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
import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import FaqHeader from './FaqCategoryHeader';
import InfoTab from './tabs/InfoTab';

import { useGetFaqCategoryByIdQuery } from '../FaqCategorysApi';

/**
 * Form Validation Schema
 */
const schema = z.object({
	name: z.string().nonempty('You must enter a Faq name').min(5, 'The Faq name must be at least 5 characters')
});

/**
 * The Faq page.
 */
function Faq() {
	const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));

	const routeParams = useParams();

	const { FaqId } = routeParams;

	const {
		data: Faq,
		isLoading,
		isError
	} = useGetFaqCategoryByIdQuery(FaqId, {
		skip: !FaqId || FaqId === 'new'
	});

	const [tabValue, setTabValue] = useState(0);

	const methods = useForm({
		mode: 'onChange',
		defaultValues: {},
		resolver: zodResolver(schema)
	});

	const { reset, watch } = methods;

	const form = watch();

	useEffect(() => {
		if (FaqId === 'new') {
			reset({});
		}
	}, [FaqId, reset]);

	useEffect(() => {
		if (Faq) {
			reset({ ...Faq });
		}
	}, [Faq, reset]);

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
	if (isError && FaqId !== 'new') {
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
				header={<FaqHeader />}
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

export default Faq;
