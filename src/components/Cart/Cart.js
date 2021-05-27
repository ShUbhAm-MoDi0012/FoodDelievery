import { useContext, useState, Fragment } from "react";
import CartContext from "../store/cart-context";
import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import Checkout from "./Checkout";
const Cart = (props) => {
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const CartCtx = useContext(CartContext);

  const totalAmount = `$${CartCtx.totalAmount.toFixed(2)}`;
  const hasItems = CartCtx.items.length;
  const increaseItemHandler = (item) => {
    CartCtx.addItem({ ...item, amount: 1 });
  };
  const decreaseItemHandler = (id) => {
    CartCtx.removeItem(id);
  };

  const orderHandler = () => {
    setIsCheckout(true);
  };

  const submitHandler = async (userData) => {
    setIsSubmitting(true);
    await fetch(
      "https://food-delievery-31f04-default-rtdb.firebaseio.com/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          orderedItems: CartCtx.items,
        }),
      }
    );
    setIsSubmitting(false);
    setDidSubmit(true);
    CartCtx.clearItems();
  };
  const cartItems = (
    <ul className={classes["cart-items"]}>
      {CartCtx.items.map((item) => {
        return (
          <CartItem
            key={item.id}
            name={item.name}
            price={item.price}
            amount={item.amount}
            onIncrease={increaseItemHandler.bind(null, item)}
            onDecrease={decreaseItemHandler.bind(null, item.id)}
          ></CartItem>
        );
      })}
    </ul>
  );

  const modalActions = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onClose}>
        Close
      </button>
      {hasItems>0 ? (
        <button className={classes.button} onClick={orderHandler}>
          Order
        </button>
      ): null}
    </div>
  );

  const cartModalContent = (
    <Fragment>
      {cartItems}
      <div className={classes.total}>
        <span>Total Order</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && (
        <Checkout onConfirm={submitHandler} onCancel={props.onClose} />
      )}
      {!isCheckout && modalActions}
    </Fragment>
  );

  const submittingContent = <p>Sending the data...</p>;
  const submittedContent = (
    <Fragment>
      <p>Your order has been received.</p>
      <div className={classes.actions}>
        <button className={classes.button} onClick={props.onClose}>
          Close
        </button>
      </div>
    </Fragment>
  );

  return (
    <Modal onClose={props.onClose}>
      {!isSubmitting && !didSubmit && cartModalContent}
      {isSubmitting && submittingContent}
      {didSubmit && !isSubmitting && submittedContent}
    </Modal>
  );
};
export default Cart;
