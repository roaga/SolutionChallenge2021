import React from 'react'
import {View, Text, StyleSheet, TextInput, TouchableOpacity, ImageBackground} from 'react-native'
import {uStyles, colors} from '../styles.js'
import LottieView from 'lottie-react-native';

export default LoadingScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={uStyles.title}>SCA</Text>

            <LottieView source={require("../../assets/51-preloader.json")} autoPlay loop style={{width: "100%"}}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.dark,
        justifyContent: "center"
    },
});