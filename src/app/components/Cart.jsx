import {
  Button,
  Divider,
  Header,
  Label,
  List,
  Icon,
  Popup,
} from "semantic-ui-react";
import CartItemGroup from "./CartItemGroup";
import { formatCurrency } from "./../helpers/number-helper";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import CheckOutModal from "../pages/Checkout/CheckOutModal";
import { useRef } from "react";

const Cart = ({ cart, removeItem, isChange }) => {
  const modalRef = useRef(null);

  const dispatch = useDispatch();
  const userAuth = useSelector((state) => state.auth);
  const groups = useSelector((state) => state.shop.groups);

  const { cartId, itemsInCart, totalPrice, customerId } = cart;

  const checkout = () => {
    modalRef.current.open();
  };

  useEffect(() => {
    dispatch({ type: "SETTING_GROUP", payload: { itemsInCart: itemsInCart } });
  }, [dispatch, itemsInCart]);

  const share = () => {
    navigator.clipboard.writeText("http://localhost:3000/cart/" + cartId);
  };
  return (
    <>
      <Header>
        <Popup
          content="Copied !"
          onMount={share}
          on="click"
          trigger={
            <Button size={"large"}>
              <Icon name="share alternate" />
              Cart {cartId}
            </Button>
          }
        />
      </Header>
      <List divided selection>
        <List.Item className="total">
          Total
          <Label horizontal style={{ float: "right" }}>
            {formatCurrency(totalPrice || 0)}
          </Label>
        </List.Item>
      </List>
      <Button
        basic
        content="Submit"
        labelPosition="left"
        icon="thumbs up outline"
        color="green"
        onClick={checkout}
        disabled={
          customerId !== userAuth.customerId || itemsInCart.length === 0
        }
        style={{ marginTop: 15, width: "100%" }}
      />
      <Divider></Divider>
      {groups &&
        groups
          .filter((groupFilter) => groupFilter.userId === customerId)
          .map((group) => (
            <CartItemGroup
              isChange={isChange}
              removeItem={removeItem}
              cartId={cartId}
              key={group.id}
              group={group}
              customerId={customerId}
              permission={group.userId === userAuth.customerId}
            ></CartItemGroup>
          ))}
      {groups &&
        groups
          .filter((groupFilter) => groupFilter.userId !== customerId)
          .map((group) => (
            <CartItemGroup
              isChange={isChange}
              removeItem={removeItem}
              cartId={cartId}
              key={group.id}
              group={group}
              customerId={customerId}
              permission={group.userId === userAuth.customerId}
            ></CartItemGroup>
          ))}
      <CheckOutModal
        cartId={cartId}
        ref={modalRef}
        groups={groups}
        totalPrice={totalPrice}
      ></CheckOutModal>
    </>
  );
};

export default Cart;
