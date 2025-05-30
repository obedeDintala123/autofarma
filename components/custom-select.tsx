import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Modal,
    FlatList,
    StyleSheet,
    ViewStyle,
    TextStyle,
} from 'react-native';

type Option = string;

interface CustomSelectProps {
    options: Option[];
    selected: Option;
    onSelect: (value: Option) => void;
    placeholder?: string;
    containerStyle?: ViewStyle;
    textStyle?: TextStyle;
}

export function CustomSelect({
    options,
    selected,
    onSelect,
    placeholder = 'Hoje',
    containerStyle,
    textStyle,
}: CustomSelectProps) {
    const [visible, setVisible] = useState(false);

    const handleSelect = (value: Option) => {
        onSelect(value);
        setVisible(false);
    };

    return (
        <View style={[styles.container, containerStyle]}>
            <TouchableOpacity style={styles.selectBox} onPress={() => setVisible(true)}>
                <Text style={[styles.selectText, textStyle]}>
                    {selected || placeholder}
                </Text>
            </TouchableOpacity>

            <Modal visible={visible} transparent animationType="fade">
                <TouchableOpacity
                    style={styles.modalBackground}
                    onPress={() => setVisible(false)}
                    activeOpacity={1}
                >
                    <View style={styles.modalContainer}>
                        <FlatList
                            data={options}
                            keyExtractor={(item) => item.toString()}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={styles.option}
                                    onPress={() => handleSelect(item)}
                                >
                                    <Text style={styles.optionText}>{item}</Text>
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                </TouchableOpacity>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 0,
    },
    selectBox: {
        borderWidth: 1,
        borderColor: '#429867',
        paddingHorizontal: 14,
        paddingVertical: 4,
        borderRadius: 6,
        backgroundColor: '#fff',
    },
    selectText: {
        fontSize: 14,
        color: '#429867',
    },
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.4)',
    },
    modalContainer: {
        marginHorizontal: 20,
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 10,
        maxHeight: 300,
    },
    option: {
        padding: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    optionText: {
        fontSize: 16,
        color: '#333',
    },
});
