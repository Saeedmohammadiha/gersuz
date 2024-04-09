import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { motion } from "framer-motion";
import { useAppDispatch } from "app/store/store";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import NavLinkAdapter from "@fuse/core/NavLinkAdapter";
import { useTheme } from "@mui/material";
import { Link } from "react-router-dom";
//import { useSelector } from 'react-redux';
//import { resetSearchText, selectSearchText, setSearchText } from '../store/searchTextSlice';

/**
 * The products header.
 */
function ProductsHeader() {
  const dispatch = useAppDispatch();
  // const searchText = useSelector(selectSearchText);

  // useEffect(() => {
  // 	return () => {
  // 		dispatch(resetSearchText());
  // 	};
  // }, []);
  const theme = useTheme();
  return (
    <div className="flex w-full justify-between">
      <div className="flex flex-1 flex-col py-32 px-24 md:px-32">
        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1, transition: { delay: 0.3 } }}
        >
          <Typography
            className="flex items-center sm:mb-12"
            component={Link}
            role="button"
            to="/apps/e-commerce/orders"
            color="inherit"
          >
            <FuseSvgIcon size={20}>
              {theme.direction === "ltr"
                ? "heroicons-outline:arrow-sm-left"
                : "heroicons-outline:arrow-sm-right"}
            </FuseSvgIcon>
            <span className="mx-4 font-medium">back</span>
          </Typography>
        </motion.div>

        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1, transition: { delay: 0.3 } }}
          className="flex flex-col min-w-0"
        >
          <Typography className="text-20 truncate font-semibold">
            {`About Us`}
          </Typography>
          {/* <Typography variant="caption" className="font-medium">
            {`From `}
          </Typography> */}
        </motion.div>
      </div>
      <div className="flex w-full sm:w-auto flex-1 items-center justify-end space-x-8">
        <motion.div
          className="flex flex-grow-0"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0, transition: { delay: 0.2 } }}
        >
          <Button
            className="mx-8"
            variant="contained"
            color="secondary"
            component={NavLinkAdapter}
            to="/apps/e-commerce/products/new"
          >
            <FuseSvgIcon size={20}>heroicons-outline:plus</FuseSvgIcon>
            <span className="hidden sm:flex mx-8">Add</span>
          </Button>
        </motion.div>
      </div>
    </div>
  );
}

export default ProductsHeader;
