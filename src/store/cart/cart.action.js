import { CART_ACTION_TYPES } from "./cart.types";

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

export const setIsCartOpen = (isOpen) => {
	return {
		type: CART_ACTION_TYPES.SET_IS_CART_OPEN,
		payload: isOpen,
	};
};

export const addItemToCart = (cartItems, productToAdd) => {
	const newCartItems = addCartItem(cartItems, productToAdd);
	return { type: CART_ACTION_TYPES.SET_CART_ITEMS, payload: newCartItems };
};
export const removeItem = (cartItems, productToRemove) => {
	const newCartItems = clearItemFromCart(cartItems, productToRemove);
	return { type: CART_ACTION_TYPES.SET_CART_ITEMS, payload: newCartItems };
};
export const increaseItemQuantity = (cartItems, productToChange) => {
	const newCartItems = increaseCartItemQuantity(cartItems, productToChange);
	return { type: CART_ACTION_TYPES.SET_CART_ITEMS, payload: newCartItems };
};
export const decreaseItemQuantity = (cartItems, productToChange) => {
	const newCartItems = decreaseCartItemQuantity(cartItems, productToChange);
	return { type: CART_ACTION_TYPES.SET_CART_ITEMS, payload: newCartItems };
};
