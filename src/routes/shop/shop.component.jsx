import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import CategoriesPreview from "../categories-preview/categories-preview.component";
import Category from "../category/category.component";

import { fetchCategoriesAsync } from "../../store/categories/categories.action";

import "./shop.styles.jsx";

const Shop = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchCategoriesAsync());
	}, [dispatch]);
	
	return (
		<Routes>
			<Route index element={<CategoriesPreview />} />
			<Route path=":category" element={<Category />} />
		</Routes>
	);
};

export default Shop;
