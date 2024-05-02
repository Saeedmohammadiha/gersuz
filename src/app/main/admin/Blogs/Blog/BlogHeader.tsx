import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import { useFormContext } from 'react-hook-form';
import { Link, useNavigate, useParams } from 'react-router-dom';
import _ from '@lodash';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { useCreateOrEditBlogMutation, useDeleteBlogMutation } from '../BlogsApi';

/**
 * The Blog header.
 */
function BlogHeader() {
	const { BlogId } = useParams();
	const theme = useTheme();
	const navigate = useNavigate();

	const [createOrEditBlog] = useCreateOrEditBlogMutation();
	const [removeBlog] = useDeleteBlogMutation();

	const methods = useFormContext();
	const { formState, getValues, handleSubmit } = methods;
	const { isValid, dirtyFields } = formState;

	function handleSaveProduct() {
		const formDate = new FormData();
		formDate.append('id', BlogId);
		formDate.append('languageId', getValues().language.value);
		formDate.append('languageTitle', getValues().language.label);
		formDate.append('blogCategoryId', getValues().blogCategory.value);
		formDate.append('blogCategory', getValues().blogCategory.label);
		formDate.append('title', getValues().title);
		formDate.append('image', getValues().images?.[0]);
		formDate.append('description', getValues().description);

		createOrEditBlog(formDate)
			.unwrap()
			.then((res) => {
				navigate(`/admin/Blogs`);
			})
			.catch((err) => {
				console.log(err);
			});
	}

	function handleCreateBlog(data) {
		console.log(getValues());
		
		const formDate = new FormData();
		formDate.append('languageId', getValues().language.value);
		formDate.append('languageTitle', getValues().language.label);
		formDate.append('blogCategoryId', getValues().blogCategory.value);
		formDate.append('blogCategory', getValues().blogCategory.label);
		formDate.append('title', getValues().title);
		formDate.append('Image', getValues().images?.[0]);
		formDate.append('description', getValues().description);

		createOrEditBlog(formDate)
			.unwrap()
			.then((res) => {
				navigate(`/admin/Blogs/${res.body.id}`);
			})
			.catch((err) => {
				console.log(err);
			});
	}

	function handleRemoveProduct() {
		removeBlog(BlogId)
			.unwrap()
			.then((res) => {
				navigate('/admin/Blogs');
			})
			.catch((err) => {
				console.log(err);
			});
	}

	return (
		<div className="flex flex-col sm:flex-row flex-1 w-full items-center justify-between space-y-8 sm:space-y-0 py-24 sm:py-32 px-24 md:px-32">
			<div className="flex flex-col items-start space-y-8 sm:space-y-0 w-full sm:max-w-full min-w-0">
				<motion.div
					initial={{ x: 20, opacity: 0 }}
					animate={{ x: 0, opacity: 1, transition: { delay: 0.3 } }}
				>
					<Typography
						className="flex items-center sm:mb-12"
						component={Link}
						role="button"
						to="/admin/Blogs"
						color="inherit"
					>
						<FuseSvgIcon size={20}>
							{theme.direction === 'ltr'
								? 'heroicons-outline:arrow-sm-left'
								: 'heroicons-outline:arrow-sm-right'}
						</FuseSvgIcon>
						<span className="flex mx-4 font-medium">Blog </span>
					</Typography>
				</motion.div>

				<div className="flex items-center max-w-full">
					<motion.div
						className="hidden sm:flex"
						initial={{ scale: 0 }}
						animate={{ scale: 1, transition: { delay: 0.3 } }}
					>
						{/* {images && images.length > 0 && featuredImageId ? (
							<img
								className="w-32 sm:w-48 rounded"
								src={_.find(images, { id: featuredImageId })?.url}
								alt={name}
							/>
						) : (
							<img
								className="w-32 sm:w-48 rounded"
								src="assets/images/apps/ecommerce/product-image-placeholder.png"
								alt={name}
							/>
						)} */}
					</motion.div>
					<motion.div
						className="flex flex-col min-w-0 mx-8 sm:mx-16"
						initial={{ x: -20 }}
						animate={{ x: 0, transition: { delay: 0.3 } }}
					>
						<Typography className="text-16 sm:text-20 truncate font-semibold">
							{/* {name || 'New Product'} */}
						</Typography>
						<Typography
							variant="caption"
							className="font-medium"
						>
							Blog Detail
						</Typography>
					</motion.div>
				</div>
			</div>
			<motion.div
				className="flex flex-1 w-full"
				initial={{ opacity: 0, x: 20 }}
				animate={{ opacity: 1, x: 0, transition: { delay: 0.3 } }}
			>
				{BlogId !== 'new' ? (
					<>
						<Button
							className="whitespace-nowrap mx-4"
							variant="contained"
							color="secondary"
							onClick={handleRemoveProduct}
							startIcon={<FuseSvgIcon className="hidden sm:flex">heroicons-outline:trash</FuseSvgIcon>}
						>
							Remove
						</Button>
						<Button
							className="whitespace-nowrap mx-4"
							variant="contained"
							color="secondary"
							//disabled={_.isEmpty(dirtyFields) || !isValid}
							disabled={!dirtyFields || !isValid}
							onClick={handleSaveProduct}
						>
							Save
						</Button>
					</>
				) : (
					<Button
						className="whitespace-nowrap mx-4"
						variant="contained"
						color="secondary"
						disabled={_.isEmpty(dirtyFields) || !isValid}
						onClick={handleSubmit(handleCreateBlog)}
					>
						Add
					</Button>
				)}
			</motion.div>
		</div>
	);
}

export default BlogHeader;
