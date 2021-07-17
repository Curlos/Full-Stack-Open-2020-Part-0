import React from 'react';
import { View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import AppBarTab from './AppBarTab';

const styles = StyleSheet.create({
    container: {
        paddingTop: Constants.statusBarHeight,
        backgroundColor: "#24292e",
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
    }
});

const AppBar = () => {
    return (
        <View style={styles.container}>
            <AppBarTab tabName="Repositories"/>
            <AppBarTab tabName="Sign In"/>
        </View>
    );
};

export default AppBar;