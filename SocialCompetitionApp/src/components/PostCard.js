import React, { useState } from 'react';
import {View, Text, StyleSheet, TextInput, TouchableOpacity, ImageBackground, ScrollView} from 'react-native'
import * as WebBrowser from 'expo-web-browser';

import {uStyles, colors} from '../styles.js'

export default PostCard = (props) => {
    return (
        <View style={uStyles.postCard}>
            <ImageBackground style={{width: "100%", height: "100%", borderRadius: 20}} source={props.imageUrl}>
                <Caption text={props.caption} link={props.link}/>
            </ImageBackground>
        </View>
    );
}

const Caption = (props) => {    
    if (props.text !== undefined && props.text.length > 0) {
        return (
            <TouchableOpacity 
                style={{position: "absolute", bottom: 0, padding: 12, maxHeight: 144, backgroundColor: colors.dark, width: "100%", borderRadius: 20}}
                onPress={() => {
                    if (props.link !== null && props.link.length > 0) { 
                        try {
                            WebBrowser.openBrowserAsync(props.link) 
                        } catch (error) {
                            console.log("Error opening link: ", error.message);
                        }
                    }
                }}
            >
                <Text style={[uStyles.body, {color: colors.white}]}>{props.text}</Text>
            </TouchableOpacity>
        );
    } else {
        return null;
    }
}

const styles = StyleSheet.create({

});