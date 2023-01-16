import { useDispatch, useSelector } from "react-redux";
import {
	CheckoutItemContainer,
	ImageContainer,
	BaseSpan,
	Quantity,
	Arrow,
	Value,
	RemoveButton,
} from "./checkout-item.styles";
import {
	removeItem,
	decreaseItemQuantity,
	increaseItemQuantity,
} from "../../store/cart/cart.action";
import { selectCartItems } from "../../store/cart/cart.selector";

const CheckoutItem = ({ cartItem }) => {
	const cartItems = useSelector(selectCartItems);
	const dispatch = useDispatch();
	const { name, imageUrl, quantity, price } = cartItem;

	const clearItemHandler = () => dispatch(removeItem(cartItems, cartItem));
	const addItemHandler = () =>
		dispatch(increaseItemQuantity(cartItems, cartItem));
	const removeItemHandler = () =>
		dispatch(decreaseItemQuantity(cartItems, cartItem));

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
