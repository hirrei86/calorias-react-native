import { Button, Input } from '@rneui/themed';
import React, { FC, useEffect, useState } from 'react';
import { Modal, View, StyleSheet, Text } from 'react-native';
import useFoodStorage from '../../hooks/useFoodStorage';

type AddFoodModalProps = {
    onClose: (shouldUpdate?: boolean) => void;
    visible: boolean;
}

const AddFoodModal: FC<AddFoodModalProps> = ({ onClose, visible }) => {
    const [name, setName] = useState('');
    const [calories, setCalories] = useState('');
    const [quantity, setQuantity] = useState('');
    const {onSaveFood} = useFoodStorage();

    const handleAddPress = async () => {
        try {
          await onSaveFood({calories, name, quantity});
          onClose(true);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        setCalories('');
        setName('');
        setQuantity('');
    }, [visible]);
    
    return (
        <Modal visible={visible} onRequestClose={() => onClose} transparent animationType='fade'>
            <View style={styles.container}>
                <View style={styles.content}>
                    <View style={{ alignItems: 'flex-end' }}>
                        <Button title="Close" onPress={() => onClose(false)} type="solid" color={'#f50'} titleStyle={{ color: 'white' }} buttonStyle={{ borderRadius: 10 }} />
                    </View>
                    <View style={styles.formItem}>
                        <View style={styles.inputContainer}>
                            <Input value={calories} onChangeText={(text: string) => setCalories(text)} />
                        </View>
                        <View style={styles.legendContainer}>
                            <Text style={styles.legend}> Kcal</Text>
                        </View>
                    </View>
                    <View style={styles.formItem}>
                        <View style={styles.inputContainer}>
                            <Input value={name} onChangeText={(text: string) => setName(text)} />
                        </View>
                        <View style={styles.legendContainer}>
                            <Text style={styles.legend}> Name</Text>
                        </View>
                    </View>
                    <View style={styles.formItem}>
                        <View style={styles.inputContainer}>
                            <Input value={quantity} onChangeText={(text: string) => setQuantity(text)} />
                        </View>
                        <View style={styles.legendContainer}>
                            <Text style={styles.legend}> Quantity</Text>
                        </View>
                    </View>
                    <View>
                        <Button title="Add" type="solid" color={'#4ecb71'} buttonStyle={{ borderRadius: 10 }} disabled={!calories.trim() || !name.trim() || !quantity.trim()} onPress={handleAddPress} />
                    </View>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    content: {
        width: '80%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        elevation: 5,
    },
    formItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    inputContainer: {
        flex: 2,
    },
    legendContainer: {
        flex: 1,
    },
    legend: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#666',
    }

})

export default AddFoodModal