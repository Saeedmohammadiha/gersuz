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
import { Faq, selectFilteredFaqs, useGetFaqsQuery } from './FaqsApi';

type FaqsTableProps = WithRouterProps & {
	navigate: (path: string) => void;
};

/**
 * The Faqs table.
 */
function FaqsTable(props: FaqsTableProps) {
	const { navigate } = props;

	const { data, isLoading } = useGetFaqsQuery();
	const Faqs = useSelector(selectFilteredFaqs(data));

	const [selected, setSelected] = useState<Faq['id'][]>([]);

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
			setSelected(Faqs.map((n) => n.id));
			return;
		}

		setSelected([]);
	}

	function handleDeselect() {
		setSelected([]);
	}

	function handleClick(item: Faq) {
		//TODO: chnge route
		navigate(`/admin/Faqs/${item.id}`);
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

	if (Faqs?.length === 0) {
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
					There are no Faq !
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
						rowCount={Faqs.length}
						onMenuItemClick={handleDeselect}
						setSelected={setSelected}
					/>

					<TableBody>
						{_.orderBy(
							Faqs,
							[
								(o: Faq) => {
									switch (o.id) {
										//TODO: need to customize
										case 'categories': {
											return o.faqCategoryId;
										}
										default: {
											return o.id;
										}
									}
								}
							],
							[tableOrder.direction] as Many<boolean | 'asc' | 'desc'>
						)
							.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
							.map((n: Faq) => {
								console.log(n);

								const isSelected = selected.indexOf(n.id) !== -1;
								return (
									<TableRow
										className="h-72 cursor-pointer"
										hover
										role="checkbox"
										aria-checked={isSelected}
										tabIndex={-1}
										key={n.id}
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
												onChange={(event) => handleCheck(event, n.id)}
											/>
										</TableCell>

										<TableCell
											className="p-4 md:p-16"
											component="th"
											scope="row"
										>
											{n.faqCategoryTitle}
										</TableCell>
										<TableCell
											className="p-4 md:p-16"
											component="th"
											scope="row"
										>
											{n.langTitle}
										</TableCell>

										<TableCell
											className="p-4 md:p-16"
											component="th"
											scope="row"
										>
											{n.displayPriority}
										</TableCell>
										<TableCell
											className="p-4 md:p-16"
											component="th"
											scope="row"
										>
											{n.question}
										</TableCell>
										<TableCell
											className="p-4 md:p-16"
											component="th"
											scope="row"
										>
											{n.response}
										</TableCell>
									</TableRow>
								);
							})}
					</TableBody>
				</Table>
			</FuseScrollbars>

			<TablePagination
				className="shrink-0 border-t-1"
				component="div"
				count={Faqs.length}
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
