import React, { FC } from "react";
import { View, Text, StyleSheet } from "react-native";
import CircularProgress from 'react-native-circular-progress-indicator';

export type TodaysCaloriesProps = {
    total: number | string,
    consumed: number | string,
    calories: number | string,
    percentage: number
}


const TodaysCalories: FC<TodaysCaloriesProps> = ({ 
    total = 2000,
    consumed = 0,
    calories = 0,
    percentage = 0 }) => {

    return (
        <View style={styles.container}>
            <View style={styles.leftContainer}>
                <CircularProgress value={percentage} valueSuffix="%" />
            </View>

            <View style={styles.rightContainer}>
                <View style={styles.leftItem}>
                    <Text style={{ fontSize: 20, color: '#444', fontWeight: 'bold', top: -10 }}>Today</Text>
                    <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#555' }}>Total</Text>
                    <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#555' }}>Consumed</Text>
                    <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#555' }}>Remaining</Text>
                </View>
                <View style={styles.rightItem}>
                    <Text style={{ fontSize: 15, color: '#555' }}>{total}</Text>
                    <Text style={{ fontSize: 15, color: '#555' }}>{consumed}</Text>
                    <Text style={{ fontSize: 15, color: '#555' }}>{calories}</Text>
                </View>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderStyle: 'solid',
        borderWidth: 0.5,
        borderColor: 'black',
        borderRadius: 10,
        paddingTop: 10,
    },
    leftContainer: {
        flex: 1,
        padding: 10,
    },
    rightContainer: {
        flexDirection: 'row',
        flex: 2,
        padding: 30,
        justifyContent: 'center',
        alignItems: 'center',
        top: 12

    },
    leftItem: {
        flex: 1,
        alignItems: 'flex-start',
        left: 15,
        top: -15,
    },
    rightItem: {
        flex: 1,
        alignItems: 'flex-end',
        right: -15,
    }
});

export default TodaysCalories