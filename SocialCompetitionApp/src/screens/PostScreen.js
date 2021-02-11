import React from 'react'
import {View, Text, StyleSheet, TextInput, TouchableOpacity, ImageBackground} from 'react-native'
import {StatusBar} from 'expo-status-bar';
import {Feather} from "@expo/vector-icons";

import {uStyles, colors} from '../styles.js'

export default PostScreen = () => {

    return (
        <View style={styles.container}>
            <View style={uStyles.topBar}>
                <Text style={[uStyles.title, {color: colors.primary, textAlign: 'left', marginTop: 32}]}>Contribute</Text>
                <View style={{flexDirection: "row"}}>
                    <TouchableOpacity style={{alignItems: "right", marginTop: 32, marginLeft: 16}}>
                            <Feather name="send" size={24} color={colors.white}/>
                    </TouchableOpacity>
                </View>
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