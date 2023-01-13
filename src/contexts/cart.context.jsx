import { createContext, useReducer } from "react";

const addCartItem = (cartItems, productToAdd) => {
	const existingCartItem = cartItems.find(
		(cartItem) => cartItem.id === productToAdd.id
	);
	if (existingCartItem) {
		return cartItems.map((cartItem) =>
			cartItem.id === productToAdd.id
				? { ...cartItem, quantity: cartItem.quantity + 1 }
				: cartItem
		);
	}
	return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const clearItemFromCart = (cartItems, cartItemToRemove) => {
	return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
};

const increaseCartItemQuantity = (cartItems, productToChange) => {
	return cartItems.map((cartItem) =>
		cartItem.id === productToChange.id
			? { ...cartItem, quantity: cartItem.quantity + 1 }
			: cartItem
	);
};
const decreaseCartItemQuantity = (cartItems, productToChange) => {
	if (productToChange.quantity === 1) {
		return cartItems.filter((cartItem) => cartItem.id !== productToChange.id);
	}

	return cartItems.map((cartItem) =>
		cartItem.id === productToChange.id
			? { ...cartItem, quantity: cartItem.quantity - 1 || 0 }
			: cartItem
	);
};

export const CartContext = createContext({
	isCartOpen: false,
	setIsCartOpen: () => {},
	cartItems: [],
	addItemToCart: () => {},
	clearItemFromCart: () => {},
	increaseCartItemQuantity: () => {},
	decreaseCartItemQuantity: () => {},
	cartCount: 0,
	cartTotal: 0,
});

export const CART_ACTION_TYPES = {
	SET_IS_CART_OPEN: "SET_IS_CART_OPEN",
	SET_CART_ITEMS: "SET_CART_ITEMS",
};

const INITIAL_STATE = {
	isCartOpen: false,
	cartItems: [],
	cartCount: 0,
	cartTotal: 0,
};

const cartReducer = (state, action) => {
	const { type, payload } = action;

	switch (type) {
		case CART_ACTION_TYPES.SET_CART_ITEMS:
			return {
				...state,
				...payload,
			};
		case CART_ACTION_TYPES.SET_IS_CART_OPEN:
			return {
				...state,
				isCartOpen: payload,
			};
		default:
			throw new Error(`Unhandled type ${type} in cartReducer`);
	}
};

export const CartProvider = ({ children }) => {
	const [state, dispatch] = useReducer(cartReducer, INITIAL_STATE);
	const { isCartOpen, cartCount, cartTotal, cartItems } = state;

	const updateCartItemsReducer = (newCartItems) => {
		const newCartCount = newCartItems.reduce(
			(total, cartItem) => total + cartItem.quantity,
			0
		);
		const newCartTotal = newCartItems.reduce(
			(total, cartItem) => total + cartItem.quantity * cartItem.price,
			0
		);
		dispatch({
			type: CART_ACTION_TYPES.SET_CART_ITEMS,
			payload: {
				cartItems: newCartItems,
				cartTotal: newCartTotal,
				cartCount: newCartCount,
			},
		});
	};

	const setIsCartOpen = (isOpen) => {
		dispatch({ type: CART_ACTION_TYPES.SET_IS_CART_OPEN, payload: isOpen });
	};

	const addItemToCart = (productToAdd) => {
		const newCartItems = addCartItem(cartItems, productToAdd);
		updateCartItemsReducer(newCartItems);
	};
	const removeItem = (productToRemove) => {
		const newCartItems = clearItemFromCart(cartItems, productToRemove);
		updateCartItemsReducer(newCartItems);
	};
	const increaseItemQuantity = (productToChange) => {
		const newCartItems = increaseCartItemQuantity(cartItems, productToChange);
		updateCartItemsReducer(newCartItems);
	};
	const decreaseItemQuantity = (productToChange) => {
		const newCartItems = decreaseCartItemQuantity(cartItems, productToChange);
		updateCartItemsReducer(newCartItems);
	};

	const value = {
		isCartOpen,
		setIsCartOpen,
		addItemToCart,
		removeItem,
		increaseItemQuantity,
		decreaseItemQuantity,
		cartItems,
		cartCount,
		cartTotal,
	};

	return (
		<CartContext.Provider value={value}> {children} </CartContext.Provider>
	);
};
