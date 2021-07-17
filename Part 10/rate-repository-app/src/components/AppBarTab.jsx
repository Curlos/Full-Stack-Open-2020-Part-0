import React from 'react';
import Text from './Text';
import { Pressable, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    title: {
        color: "#FFFFFF",
        fontSize: 24,
        padding: 10,
    }
});
const AppBarTab = ({ tabName }) => {
    return (
        <Pressable>
            <Text style={styles.title}>{tabName}</Text>
        </Pressable>
    );
};

export default AppBarTab;