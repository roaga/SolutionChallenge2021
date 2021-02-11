import React, {useContext} from 'react'
import {View, Text, StyleSheet, TextInput, TouchableOpacity, ImageBackground} from 'react-native'

import {uStyles, colors} from '../styles.js'
import {FirebaseContext} from "../context/FirebaseContext"

export default class ProfileScreen extends React.Component {

    render() {
        return (
            <Text>
                Profile screen
            </Text>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.dark,
    },
});