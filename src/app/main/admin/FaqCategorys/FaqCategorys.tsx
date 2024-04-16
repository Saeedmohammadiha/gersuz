import FusePageCarded from '@fuse/core/FusePageCarded';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import FaqCategorysHeader from './FaqCategorysHeader';
import FaqCategorysTable from './FaqCategorysTable';

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

export default FaqCategorys;
