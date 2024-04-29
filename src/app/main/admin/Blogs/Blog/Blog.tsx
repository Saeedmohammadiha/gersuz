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
import BlogHeader from './BlogHeader';
import InfoTab from './tabs/InfoTab';

import { useGetBlogByIdQuery } from '../BlogsApi';
import ProductImagesTab from './tabs/ImagesTab';
import ImagesTab from './tabs/ImagesTab';

/**
 * Form Validation Schema
 */
const schema = z.object({
	//language: z.object({label: z.string(), value: z.string()}).required(),
	title: z
		.string({
			required_error: 'Title is required'
		})
		.max(80, { message: 'title is too long' })
});

/**
 * The Blog page.
 */
function Blog() {
	const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
	const { BlogId } = useParams();
	const [tabValue, setTabValue] = useState(0);

	const {
		data: Blog,
		isLoading,
		isError
	} = useGetBlogByIdQuery(BlogId, {
		skip: !BlogId || BlogId === 'new'
	});

	const methods = useForm({
		mode: 'onChange',
		defaultValues: { language: { label: 'en-US', value: '1' }, ...Blog },
		resolver: zodResolver(schema)
	});

	const { reset, watch } = methods;
	const form = watch();
	useEffect(() => {
		if (BlogId === 'new') {
			reset({});
		}
	}, [BlogId, reset]);

	useEffect(() => {
		if (Blog) {
			reset({
				language: {
					label: Blog?.languageTitle,
					value: Blog?.languageId.toString()
				},
				title: Blog.title
			});
		}
	}, [Blog, reset]);

	if (isLoading) return <FuseLoading />;

	/**
	 * Show Message if the requested products is not exists
	 */
	if (isError && BlogId !== 'new') {
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
					There is no such Blog !
				</Typography>
				<Button
					className="mt-24"
					component={Link}
					variant="outlined"
					//TODO: change rout
					to="/Admin/Blogs"
					color="inherit"
				>
					Go to Blog  Page
				</Button>
			</motion.div>
		);
	}

	return (
		<FormProvider {...methods}>
			<FusePageCarded
				header={<BlogHeader />}
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
							<Tab
								className="h-64"
								label="Images"
							/>
						</Tabs>
						<div className="p-16 sm:p-24 max-w-3xl">
							<div className={tabValue !== 0 ? 'hidden' : ''}>
								<InfoTab />
							</div>
							<div className={tabValue !== 1 ? 'hidden' : ''}>
								<ImagesTab />
							</div>
						</div>
					</>
				}
				scroll={isMobile ? 'normal' : 'content'}
			/>
		</FormProvider>
	);
}

export default Blog;
