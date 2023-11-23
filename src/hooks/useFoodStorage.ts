import AsyncStorage from "@react-native-async-storage/async-storage";
import { Meal } from "../types";
import { isToday } from "date-fns";

const MY_FOOD_KEY = "@myFood:Key";
const MY_TODAY_FOOD_KEY = "@myTodayFood:Key";

const useFoodStorage = () => {
    const saveInfoToStorage = async (storageKey: string, meal: Meal) => {
        try {
            const currentSaveFood = await AsyncStorage.getItem(storageKey);

            if (currentSaveFood !== null) {
                const currentSavedFoodParsed = JSON.parse(currentSaveFood);
                currentSavedFoodParsed.push(meal);
                await AsyncStorage.setItem(storageKey, JSON.stringify(currentSavedFoodParsed));
                return Promise.resolve();
            }
            await AsyncStorage.setItem(storageKey, JSON.stringify([meal]));
            return Promise.resolve();
        } catch (error) {
            return Promise.reject(error);
        }

    }
    const handleSaveFood = async ({ calories, name, quantity }: Meal) => {
        try {
            await saveInfoToStorage(MY_FOOD_KEY, { calories, name, quantity });
            return Promise.resolve();
        } catch (error) {
            return Promise.reject(error);
        }
    };
    const handleGetFood = async () => {
        try {
            const foods = await AsyncStorage.getItem(MY_FOOD_KEY);
            if (foods !== null) {
                const parsedFoods = JSON.parse(foods);
                return Promise.resolve(parsedFoods);
            }
            return Promise.resolve([]);
        } catch (error) {
            return Promise.reject(error);
        }
    };

    const handleSaveTodayFood = async ({ calories, name, quantity }: Meal) => {
        try {
            const result = await saveInfoToStorage(MY_TODAY_FOOD_KEY, { calories, name, quantity, date: new Date().toISOString() });
            return Promise.resolve(result);
        } catch (error) {
            return Promise.reject(error);
        }
    };

    const handleGetTodayFood = async () => {
        try {
            const foods = await AsyncStorage.getItem(MY_TODAY_FOOD_KEY);
            if (foods !== null) {
                const parsedFoods = JSON.parse(foods) as Meal[];
                return Promise.resolve(parsedFoods.filter(meal => meal.date && isToday(new Date(meal.date))));
            }
            return Promise.resolve([]);
        } catch (error) {
            return Promise.reject(error);
        }
    };

    const handleRemoveTodayFood = async (index: number) => {
        try {
            const todayFood = await handleGetTodayFood();
            const filteredItem = todayFood?.filter((_item: Meal, itemIndex) => {
                return itemIndex !== index;
            });

            await AsyncStorage.setItem(
                MY_TODAY_FOOD_KEY,
                JSON.stringify(filteredItem),
                );

            return Promise.resolve();
        } catch (error) {
            return Promise.reject(error);
        }
    };

    return {
        onSaveFood: handleSaveFood,
        onGetFood: handleGetFood,
        onSaveTodayFood: handleSaveTodayFood,
        onGetTodayFood: handleGetTodayFood,
        onRemoveTodayFood: handleRemoveTodayFood,
    }
}

export default useFoodStorage