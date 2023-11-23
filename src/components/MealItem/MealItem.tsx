import React, { FC } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { Meal } from '../../types';
import { Button } from '@rneui/themed';
import useFoodStorage from '../../hooks/useFoodStorage';

type MealItemProps = Meal & {
    isAbleToAdd?: boolean;
    onCompleteAddRemove?: () => void;
    itemPosition?: number;
};

const MealItem: FC<MealItemProps> = ({
    calories,
    name,
    quantity,
    isAbleToAdd,
    onCompleteAddRemove,
    itemPosition
}) => {
    const { onSaveTodayFood, onRemoveTodayFood } = useFoodStorage();

    const handleIconPress = async () => {
        try {
            if (isAbleToAdd) {
                await onSaveTodayFood({ calories, name, quantity });
                Alert.alert('Food added successfully');
            } else {
                await onRemoveTodayFood(itemPosition ?? -1);
                Alert.alert('Food removed successfully');
            }
            onCompleteAddRemove?.();
        } catch (error) {
            Alert.alert('Something went wrong');
            console.error(error);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.leftContainer}>
                <View>
                    <Text style={styles.name}>{name}</Text>
                    <Text style={styles.quantity}>{quantity}</Text>
                </View>
            </View>

            <View>
                <View style={styles.rightContainer}>
                    <Button title={isAbleToAdd ? "+" : "remove"} buttonStyle={{ borderRadius: 10, backgroundColor: '#4ecb71', paddingVertical: 5, paddingHorizontal: 15, marginRight: 4 }}
                        onPress={handleIconPress} />
                    <Text style={styles.calories}>{calories} kcal</Text>
                </View>
            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        backgroundColor: '#ade8af',
        borderRadius: 10,
        margin: 3,
    },
    leftContainer: {
        flex: 2,
        alignContent: 'center',
    },
    rightContainer: {
        flex: 1,
    },
    removeContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
        marginLeft: 10,
        color: '#666',
    },
    calories: {
        marginRight: 5,
        marginTop: 10,
        color: '#666',
    },
    quantity: {
        fontSize: 15,
        marginBottom: 8,
        marginLeft: 10,
        color: '#666',
    }
})

export default MealItem