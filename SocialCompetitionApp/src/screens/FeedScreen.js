import React from 'react'
import {View, Text, StyleSheet, TextInput, TouchableOpacity, ImageBackground} from 'react-native'
import * as firebase from 'firebase'
import {uStyles, colors} from '../styles.js'

export default class HomeScreen extends React.Component {

    render() {
        return (
            <View style={styles.container}>
                <Text>
                    Feed screen
                </Text>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.dark,
    },
});