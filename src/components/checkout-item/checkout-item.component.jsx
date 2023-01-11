import { useContext } from "react";

import { CartContext } from "../../contexts/cart.context";

import {
	CheckoutItemContainer,
	ImageContainer,
	BaseSpan,
	Quantity,
	Arrow,
	Value,
	RemoveButton,
} from "./checkout-item.styles";

const CheckoutItem = ({ cartItem }) => {
	const { name, imageUrl, quantity, price } = cartItem;

	const { removeItem, decreaseItemQuantity, increaseItemQuantity } =
		useContext(CartContext);

	const clearItemHandler = () => removeItem(cartItem);
	const addItemHandler = () => increaseItemQuantity(cartItem);
	const removeItemHandler = () => decreaseItemQuantity(cartItem);

	return (
		<CheckoutItemContainer>
			<ImageContainer>
				<img src={imageUrl} alt={`${name}`} />
			</ImageContainer>
			<BaseSpan> {name} </BaseSpan>
			<Quantity>
				<Arrow onClick={removeItemHandler}>&#10094;</Arrow>
				<Value>{quantity}</Value>
				<Arrow onClick={addItemHandler}>&#10095;</Arrow>
			</Quantity>
			<BaseSpan> {price * quantity}</BaseSpan>
			<RemoveButton onClick={clearItemHandler}>&#10005;</RemoveButton>
		</CheckoutItemContainer>
	);
};

export default CheckoutItem;
