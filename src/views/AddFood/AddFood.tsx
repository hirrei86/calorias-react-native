import React, { useEffect, useState } from "react";
import { Alert, ScrollView, StyleSheet, View } from "react-native";
import { Button } from "@rneui/themed";
import { Input } from "@rneui/base";
import AddFoodModal from "../../components/AddFoodModal";
import useFoodStorage from "../../hooks/useFoodStorage";
import { Meal } from "../../types";
import MealItem from "../../components/MealItem";

const AddFood = () => {
    const [visible, setVisible] = useState<boolean>(false);
    const [foods, setFoods] = useState<Meal[]>([]);
    const { onGetFood } = useFoodStorage();
    const [search, setSearch] = useState<string>('');

    const loadFoods = async () => {
        try {
            const foodsResponse = await onGetFood();
            setFoods(foodsResponse);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        loadFoods().catch(null)
    }, []);
    const handleModalClose = async (shouldUpdate?: boolean) => {
        if (shouldUpdate) {
            Alert.alert(
                'Success',
            );
        loadFoods();
        };
        setVisible(false);
    };

    const handleSearchPress = async () => {
        try {
            const result = await onGetFood();
            setFoods(result.filter((item: Meal) => item.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())));
        } catch (error) {
            console.error(error);
            setFoods([]);
        }
    };

    return (
        <View style={styles.container}>
            <View>
                <Button
                    radius={"lg"}
                    type="solid"
                    color={'#4ecb71'}
                    style={styles.button}
                    onPress={() => setVisible(true)}
                >
                    Add
                </Button>
            </View>
            <View style={styles.searchContainer}>
                <View style={styles.leftContainer}>
                    <Input placeholder="Search" value={search} onChangeText={(text: string) => setSearch(text)} />
                </View>
                <View style={styles.rightContainer}>
                    <Button title={"Search"} radius={"lg"} color={'#ade8af'} titleStyle={{ color: 'black' }} onPress={handleSearchPress} />
                </View>
            </View>
            <ScrollView style={styles.contant}>
                {foods?.map(meal => (
                    <MealItem key={`my-meal-item-${meal.name}`} {...meal} isAbleToAdd />
                ))}
            </ScrollView>
            <AddFoodModal visible={visible} onClose={handleModalClose} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: 'white',
        flex: 1,
    },
    contant: {
    },
    button: {},
    searchContainer: {
        marginTop: 20,
        flexDirection: 'row',
    },
    leftContainer: {
        flex: 1,
    },
    rightContainer: {
        marginTop: 10,
    }
})

export default AddFood