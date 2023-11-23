import React, { FC } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Meal } from '../../types';
import MealItem from '../MealItem';

type TodayMealsProps = {
    foods: Meal[];
    onCompleteAddRemove?: () => void
}

const TodayMeals: FC<TodayMealsProps> = ( {foods, onCompleteAddRemove} ) => {
    return (
        <View style={styles.container}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#555' }}>Meals</Text>
            <ScrollView style={styles.content}>
                {foods.map((meal: Meal, index) => (<MealItem key={`today-meal-item-${meal.name}-${index}`} {...meal} onCompleteAddRemove={onCompleteAddRemove} itemPosition={index} />))}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 10
    },
    content: {
        padding: 10
    }
})

export default TodayMeals;
