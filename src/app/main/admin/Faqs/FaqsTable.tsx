import FuseScrollbars from '@fuse/core/FuseScrollbars';
import _ from '@lodash';
import Checkbox from '@mui/material/Checkbox';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import { ChangeEvent, MouseEvent, useState } from 'react';
import withRouter from '@fuse/core/withRouter';
import FuseLoading from '@fuse/core/FuseLoading';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { Many } from 'lodash';
import { WithRouterProps } from '@fuse/core/withRouter/withRouter';
import * as React from 'react';
import { useSelector } from 'react-redux';
import FaqsTableHead from './FaqsTableHead';
import { Faq, selectFilteredFaqs, useGetAdminFaqsQuery } from '../AdminApi';

type FaqsTableProps = WithRouterProps & {
	navigate: (path: string) => void;
};

/**
 * The faqs table.
 */
function FaqsTable(props: FaqsTableProps) {
	const { navigate } = props;

	const { data, isLoading } = useGetAdminFaqsQuery();
	const faqs = useSelector(selectFilteredFaqs(data));

	const [selected, setSelected] = useState<Faq['Id'][]>([]);

	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [tableOrder, setTableOrder] = useState<{
		direction: 'asc' | 'desc';
		id: string;
	}>({
		direction: 'asc',
		id: ''
	});

	function handleRequestSort(event: MouseEvent<HTMLSpanElement>, property: string) {
		const newOrder: {
			direction: 'asc' | 'desc';
			id: string;
		} = { id: property, direction: 'desc' };

		if (tableOrder.id === property && tableOrder.direction === 'desc') {
			newOrder.direction = 'asc';
		}

		setTableOrder(newOrder);
	}

	function handleSelectAllClick(event: ChangeEvent<HTMLInputElement>) {
		if (event.target.checked) {
			setSelected(faqs.map((n) => n.Id));
			return;
		}

		setSelected([]);
	}

	function handleDeselect() {
		setSelected([]);
	}

	function handleClick(item: Faq) {
		//TODO: chnge route
		navigate(`/apps/e-commerce/products/${item.Id}`);
	}

	function handleCheck(event: ChangeEvent<HTMLInputElement>, id: string) {
		const selectedIndex = selected.indexOf(id);
		let newSelected: string[] = [];

		if (selectedIndex === -1) {
			newSelected = newSelected.concat(selected, id);
		} else if (selectedIndex === 0) {
			newSelected = newSelected.concat(selected.slice(1));
		} else if (selectedIndex === selected.length - 1) {
			newSelected = newSelected.concat(selected.slice(0, -1));
		} else if (selectedIndex > 0) {
			newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
		}

		setSelected(newSelected);
	}

	function handleChangePage(event: React.MouseEvent<HTMLButtonElement> | null, page: number) {
		setPage(+page);
	}

	function handleChangeRowsPerPage(event: React.ChangeEvent<HTMLInputElement>) {
		setRowsPerPage(+event.target.value);
	}

	if (isLoading) {
		return (
			<div className="flex items-center justify-center h-full">
				<FuseLoading />
			</div>
		);
	}

	if (faqs?.length === 0) {
		return (
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1, transition: { delay: 0.1 } }}
				className="flex flex-1 items-center justify-center h-full"
			>
				<Typography
					color="text.secondary"
					variant="h5"
				>
					There are no faqs!
				</Typography>
			</motion.div>
		);
	}

	return (
		<div className="w-full flex flex-col min-h-full">
			<FuseScrollbars className="grow overflow-x-auto">
				<Table
					stickyHeader
					className="min-w-xl"
					aria-labelledby="tableTitle"
				>
					<FaqsTableHead
						selectedFaqIds={selected}
						tableOrder={tableOrder}
						onSelectAllClick={handleSelectAllClick}
						onRequestSort={handleRequestSort}
						rowCount={faqs.length}
						onMenuItemClick={handleDeselect}
					/>

					<TableBody>
						{_.orderBy(
							faqs,
							[
								(o: Faq) => {
									switch (o.Id) {
										case 'categories': {
											return o.FAQCategoryTitle[0];
										}
										default: {
											return o.Id;
										}
									}
								}
							],
							[tableOrder.direction] as Many<boolean | 'asc' | 'desc'>
						)
							.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
							.map((n: Faq) => {
								const isSelected = selected.indexOf(n.Id) !== -1;
								return (
									<TableRow
										className="h-72 cursor-pointer"
										hover
										role="checkbox"
										aria-checked={isSelected}
										tabIndex={-1}
										key={n.Id}
										selected={isSelected}
										onClick={() => handleClick(n)}
									>
										<TableCell
											className="w-40 md:w-64 text-center"
											padding="none"
										>
											<Checkbox
												checked={isSelected}
												onClick={(event) => event.stopPropagation()}
												onChange={(event) => handleCheck(event, n.Id)}
											/>
										</TableCell>

										{/* <TableCell
											className="w-52 px-4 md:px-0"
											component="th"
											scope="row"
											padding="none"
										>
											{n?.images?.length > 0 && n.featuredImageId ? (
												<img
													className="w-full block rounded"
													src={_.find(n.images, { id: n.featuredImageId })?.url}
													alt={n.name}
												/>
											) : (
												<img
													className="w-full block rounded"
													src="assets/images/apps/ecommerce/product-image-placeholder.png"
													alt={n.name}
												/>
											)}
										</TableCell> */}

										<TableCell
											className="p-4 md:p-16"
											component="th"
											scope="row"
										>
											{n.FAQCategoryTitle}
										</TableCell>

										{/* <TableCell
											className="p-4 md:p-16 truncate"
											component="th"
											scope="row"
										>
											{n.categories.join(', ')}
										</TableCell> */}

										<TableCell
											className="p-4 md:p-16"
											component="th"
											scope="row"
											align="right"
										>
											{n.DisplayPriority}
										</TableCell>

										<TableCell
											className="p-4 md:p-16"
											component="th"
											scope="row"
											align="right"
										>
											{n.Question}
											{/* <i
												className={clsx(
													'inline-block w-8 h-8 rounded mx-8',
													n.quantity <= 5 && 'bg-red',
													n.quantity > 5 && n.quantity <= 25 && 'bg-orange',
													n.quantity > 25 && 'bg-green'
												)}
											/> */}
										</TableCell>
										<TableCell
											className="p-4 md:p-16"
											component="th"
											scope="row"
											align="right"
										>
											{n.Response}
										</TableCell>

										{/* <TableCell
											className="p-4 md:p-16"
											component="th"
											scope="row"
											align="right"
										>
											{n.active ? (
												<FuseSvgIcon
													className="text-green"
													size={20}
												>
													heroicons-outline:check-circle
												</FuseSvgIcon>
											) : (
												<FuseSvgIcon
													className="text-red"
													size={20}
												>
													heroicons-outline:minus-circle
												</FuseSvgIcon>
											)}
										</TableCell> */}
									</TableRow>
								);
							})}
					</TableBody>
				</Table>
			</FuseScrollbars>

			<TablePagination
				className="shrink-0 border-t-1"
				component="div"
				count={faqs.length}
				rowsPerPage={rowsPerPage}
				page={page}
				backIconButtonProps={{
					'aria-label': 'Previous Page'
				}}
				nextIconButtonProps={{
					'aria-label': 'Next Page'
				}}
				onPageChange={handleChangePage}
				onRowsPerPageChange={handleChangeRowsPerPage}
			/>
		</div>
	);
}

export default withRouter(FaqsTable);
