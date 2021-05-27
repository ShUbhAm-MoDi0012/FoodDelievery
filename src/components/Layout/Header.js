import {Fragment} from 'react';
import classes from './Header.module.css'
import mealImg from '../../assets/mealImage.jpg' 
import HeaderCartButton from './HeaderCartButton'
const Header=(props)=>{
    return(
        <Fragment>
            <header className={classes.header}>
                <h1>ReactMeals</h1>
                <HeaderCartButton onClick={props.onShowCart}></HeaderCartButton>
            </header>
            <div className={classes['main-image']}>
                <img src={mealImg} alt="A plate full of delicious meals."></img>
            </div>
        </Fragment>
    )
}
export default Header;