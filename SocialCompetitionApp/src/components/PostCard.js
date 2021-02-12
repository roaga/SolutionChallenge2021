import React, { useState } from 'react';
import {View, Text, StyleSheet, TextInput, TouchableOpacity, ImageBackground, ScrollView} from 'react-native'
import * as WebBrowser from 'expo-web-browser';

import {uStyles, colors} from '../styles.js'

export default PostCard = (props) => {

    return (
        <View style={uStyles.postCard}>
            <ImageBackground style={{width: "100%", height: "100%", borderRadius: 20}} source={props.imageUri}>
                <Caption text={props.caption} link={props.link}/>
            </ImageBackground>
        </View>
    );
}
const styles = StyleSheet.create({

});

const Caption = (props) => {    
    if (props.text !== undefined && props.text.length > 0) {
        return (
            <TouchableOpacity 
                style={{position: "absolute", bottom: 0, padding: 12, maxHeight: "50%", backgroundColor: colors.dark, width: "100%", borderRadius: 20}}
                onPress={() => {if (props.link !== null) { WebBrowser.openBrowserAsync(props.link) }} }
            >
                <Text style={[uStyles.body, {color: colors.white}]}>{props.text}</Text>
            </TouchableOpacity>
        );
    } else {
        return null;
    }
}