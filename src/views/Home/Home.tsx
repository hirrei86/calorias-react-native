import React, { useCallback, useState } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Meal, RootStackParams } from "../../types";
import { View, Text, StyleSheet } from "react-native";
import Header from "../../components/Header";
import { Button } from '@rneui/themed';
import useFoodStorage from "../../hooks/useFoodStorage";
import TodaysCalories from "../../components/TodaysCalories";
import { TodaysCaloriesProps } from "../../components/TodaysCalories/TodaysCalories";
import TodayMeals from "../../components/TodayMeals";

const totalCalories = 2000;

const Home = () => {
    const [todayFood, setTodayFood] = useState<Meal[]>([]);
    const [todayStatistics, setTodayStatistics] = useState<TodaysCaloriesProps>();
    const { onGetTodayFood } = useFoodStorage();
    const { navigate } = useNavigation<StackNavigationProp<RootStackParams, 'Home'>>();
    const calculateTodayStatistics = async (meals: Meal[]) => {
        try {
            const caloriesConsumed = meals.reduce((acum, curr) => acum + Number(curr.calories), 0);
            const remainingCalories = totalCalories - caloriesConsumed;
            const percentage = (caloriesConsumed / totalCalories) * 100;

            setTodayStatistics({
                total: totalCalories,
                consumed: caloriesConsumed,
                calories: remainingCalories,
                percentage: percentage
            });
        } catch (error) {
            console.error(error);
        }
    };

    const loadTodayFood = useCallback(async () => {
        try {
            const todayFoodResponse = (await onGetTodayFood()) as Meal[];
            calculateTodayStatistics(todayFoodResponse);
            setTodayFood(todayFoodResponse);
        } catch (error) {
            setTodayFood([]);
            console.error(error);
        }
    }, [])

    useFocusEffect(
        useCallback(() => {
            loadTodayFood().catch(null)
        }, [loadTodayFood])
        );

    const handleAddCaloriesPress = () => {
        navigate('AddFood');
    }
    return (
        <View style={styles.container}>
            <Header />
            <View style={styles.caloriesContainer}>
                <View style={styles.leftContainer}>
                    <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#555' }}>Calories</Text>
                </View>
                <View style={styles.rightContainer}>
                    <Button radius={"lg"} type="solid" color={'#4ecb71'} onPress={handleAddCaloriesPress}>
                        Add
                    </Button>
                </View>
            </View>
            {todayStatistics && <TodaysCalories {...todayStatistics} />}
            <TodayMeals foods={todayFood} onCompleteAddRemove={() => loadTodayFood()} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: '#fff',
        flex: 1
    },
    caloriesContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 30,
    },
    leftContainer: {
        flex: 1,
        justifyContent: 'center'
    },
    rightContainer: {
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'center'
    },
})

export default Home