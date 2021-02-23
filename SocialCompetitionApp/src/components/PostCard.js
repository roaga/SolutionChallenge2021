import React, { useState } from 'react';
import {View, Text, StyleSheet, TextInput, TouchableOpacity, ImageBackground, ScrollView} from 'react-native'
import * as WebBrowser from 'expo-web-browser';
import {Feather} from "@expo/vector-icons";
import * as Reanimatable from 'react-native-animatable';

import {uStyles, colors} from '../styles.js'

export default PostCard = (props) => {
    return (
        <Reanimatable.View animation="slideInUp" duration={500}>
            <View style={uStyles.postCard}>
                <ImageBackground style={{width: "100%", height: "100%", borderRadius: 20}} source={{uri: props.post.imageUrl}} imageStyle={{borderRadius: 20}}>
                    <Caption text={props.post.caption} link={props.post.link} type={props.post.type} cause={props.post.cause}/>
                </ImageBackground>
            </View>
        </Reanimatable.View>
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
                <View style={{flexDirection: "row", marginTop: 12, alignItems: "center"}}>
                    <Tag tag={props.cause}/>
                    <Tag tag={props.type}/>
                    {(props.link !== null && props.link.length > 0) ? <Feather name="link" size={18} color={colors.light} style={{marginHorizontal: 8}}/> : null}
                </View>
            </TouchableOpacity>
        );
    } else {
        return null;
    }
}

const Tag = (props) => {
    return (
        <View style={[uStyles.tag, {backgroundColor: colors.dark}]}>
            <Text style={uStyles.message}>{props.tag}</Text>
        </View>
    )
}

const styles = StyleSheet.create({

});