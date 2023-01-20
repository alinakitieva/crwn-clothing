import { Fragment } from "react";

import Spinner from "../../components/spinner/spinner.component";
import { useSelector } from "react-redux";
import CategoryPreview from "../../components/category-preview/category-preview.component";
import {
	selectCategoriesMap,
	selectCategoriesIsLoading,
} from "../../store/categories/categories.selector";

const CategoriesPreview = () => {
	const categoriesMap = useSelector(selectCategoriesMap);
	const isLoading = useSelector(selectCategoriesIsLoading);

	return (
		<Fragment>
			{isLoading ? (
				<Spinner />
			) : (
				Object.keys(categoriesMap).map((title) => (
					<CategoryPreview
						key={title}
						title={title}
						products={categoriesMap[title]}
					/>
				))
			)}
		</Fragment>
	);
};

export default CategoriesPreview;
