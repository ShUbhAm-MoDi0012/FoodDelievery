//import { useContext } from "react";
import classes from "./HeaderCartButton.module.css";
import CartIcon from "../Cart/CartIcon";
import CartContext from "../store/cart-context";
import { useContext,useEffect,useState } from "react";
const HeaderCartButton = (props) => {
  const [btnIsHigh,setBtnIsHigh]=useState(false)
  const cartCtx = useContext(CartContext);
  const badgeDisplayNumber = cartCtx.items.reduce((curNum, item) => {
    return curNum + item.amount;
  }, 0);

  const {items}=cartCtx

  const btnClasses=`${classes.button} ${btnIsHigh? classes.bump: ''}` 
  useEffect(()=>{
    if(items.length===0)
      return;
    setBtnIsHigh(true);

    const timer=setTimeout(()=>{
      setBtnIsHigh(false)
    },300);

    return ()=>{
      clearTimeout(timer);
    }
  },[items])

  
  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon></CartIcon>
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{badgeDisplayNumber}</span>
    </button>
  );
};
export default HeaderCartButton;
