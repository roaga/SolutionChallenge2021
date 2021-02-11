import React from 'react'
import {View, Text, StyleSheet, TextInput, TouchableOpacity, ImageBackground} from 'react-native'
import * as firebase from 'firebase'
import {StatusBar} from 'expo-status-bar';

import {uStyles, colors} from '../styles.js'

export default FeedScreen = () => {

    return (
        <View style={styles.container}>
            <View style={uStyles.topBar}>
                <Text style={[uStyles.title, {color: colors.primary, textAlign: 'left', marginTop: 32}]}>SCA</Text>
                <Text style={[uStyles.header, {color: colors.white, textAlign: "right", marginTop: 32}]}>[dropdown]</Text>
            </View>

            <StatusBar style="light" />
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.dark,
    },
});