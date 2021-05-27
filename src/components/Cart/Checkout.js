import classes from "./Checkout.module.css";
import { useRef, useState } from "react";

const isEmpty = (value) => value.trim().length === 0;

const isSix = (value) => value.trim().length === 6;

const Checkout = (props) => {
  const [formValidity, setFormvalidity] = useState({
    name: true,
    city: true,
    street: true,
    postal: true,
  });

  const nameRef = useRef();
  const streetRef = useRef();
  const postalRef = useRef();
  const cityRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();
    const userName = nameRef.current.value;
    const userStreet = streetRef.current.value;
    const userPostal = postalRef.current.value;
    const userCity = cityRef.current.value;

    const nameIsValid = !isEmpty(userName);
    const streetIsValid = !isEmpty(userStreet);
    const postalIsValid = isSix(userPostal);
    const cityIsValid = !isEmpty(userCity);

    setFormvalidity({
      name: nameIsValid,
      street: streetIsValid,
      postal: postalIsValid,
      city: cityIsValid,
    });

    const formIsValid =
      nameIsValid && streetIsValid && postalIsValid && cityIsValid;

    if (!formIsValid) {
      return;
    }
    props.onConfirm({
      name: userName,
      street: userStreet,
      postal: userPostal,
      city: userCity,
    });
  };

  const nameHelperCss = `${classes.control} ${
    formValidity.name ? "" : classes.invalid
  }`;
  const streetHelperCss = `${classes.control} ${
    formValidity.street ? "" : classes.invalid
  }`;
  const postalHelperCss = `${classes.control} ${
    formValidity.postal ? "" : classes.invalid
  }`;
  const cityHelperCss = `${classes.control} ${
    formValidity.city ? "" : classes.invalid
  }`;

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameHelperCss}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameRef} />
        {!formValidity.name && <p>Please enter a valid name</p>}
      </div>
      <div className={streetHelperCss}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetRef} />
        {!formValidity.street && <p>Please enter a valid street</p>}
      </div>
      <div className={postalHelperCss}>
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" ref={postalRef} />
        {!formValidity.postal && <p>Please enter a valid postal code</p>}
      </div>
      <div className={cityHelperCss}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityRef} />
        {!formValidity.city && <p>Please enter a valid city</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
