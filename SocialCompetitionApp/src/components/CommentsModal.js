import React, { useState } from 'react';
import {View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView} from 'react-native'
import {Feather} from "@expo/vector-icons";

import {uStyles, colors} from '../styles.js'

export default CommentsModal = (props) => {
    return (
        <View style={uStyles.modal}>
            <TouchableOpacity onPress={props.close} style={{alignSelf: 'flex-end', marginRight: 12, marginTop: 12}}>
                <Feather name="x" size={32} color={colors.black}/>
            </TouchableOpacity>
            
        </View>
    );
}

const CommentCard = (props) => {
    return (
        <View style={{}}>
            <Text style={uStyles.subheader}>{props.comment.username}</Text>
            <Text style={uStyles.body}>{props.comment.text}</Text>
        </View>
    );
}