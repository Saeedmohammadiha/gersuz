import FusePageCarded from '@fuse/core/FusePageCarded';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import FaqsHeader from './FaqsHeader';
import FaqsTable from './FaqsTable';

/**
 * The Faqs page.
 */
function Faqs() {
	const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));

	return (
		<FusePageCarded
			header={<FaqsHeader />}
			content={<FaqsTable />}
			scroll={isMobile ? 'normal' : 'content'}
		/>
	);
}

export default Faqs;
