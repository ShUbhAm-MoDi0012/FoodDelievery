import { useState, useEffect } from "react";
import classes from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading,setIsLoading]=useState(true);
  const [httpError,setHttpError]=useState();
  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch(
        "https://food-delievery-31f04-default-rtdb.firebaseio.com/meals.json"
      );
      if(!response.ok){
        throw new Error('Oops..Something went wrong');
      }
      const responseData = await response.json();
      const loadedMeals = [];
      for (const key in responseData) {
        loadedMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
        });
      }
      setMeals(loadedMeals);
      setIsLoading(false);
    };

    fetchMeals().catch(error=>{
        setIsLoading(false);
        setHttpError(error.message);
    });
  }, []);

  if(isLoading){
    return(
      <section className={classes.mealsLoading}>
        <p>Loading...</p>
      </section>
    )
  }
  if(httpError){
    return(
      <section className={classes.mealsLoading}>
        <p>{httpError}</p>
      </section>
    )
  }

  const mealsList = meals.map((meal) => {
    return (
      <MealItem
        id={meal.id}
        key={meal.id}
        name={meal.name}
        price={meal.price}
        description={meal.description}
      />
    );
  });
  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};
export default AvailableMeals;
