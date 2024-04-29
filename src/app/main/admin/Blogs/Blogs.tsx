import FusePageCarded from '@fuse/core/FusePageCarded';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import FaqCategorysHeader from './BlogsHeader';
import FaqCategorysTable from './BlogsTable';
import reducer from '../store';
import withReducer from 'app/store/withReducer';

/**
 * The FaqCategorys page.
 */
function FaqCategorys() {
	const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));

	return (
		<FusePageCarded
			header={<FaqCategorysHeader />}
			content={<FaqCategorysTable />}
			scroll={isMobile ? 'normal' : 'content'}
		/>
	);
}

export default withReducer('admin', reducer)(FaqCategorys);
