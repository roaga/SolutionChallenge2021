import React, { useState } from 'react';
import {View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, FlatList, SafeAreaView, KeyboardAvoidingView} from 'react-native'
import {Feather} from "@expo/vector-icons";

import {uStyles, colors} from '../styles.js'

export default CommentsModal = (props) => {
    const [input, setInput] = useState("");

    const tempData = [
        {id: "23804u2309", username: "Rohan", uid: "owrhf", text: "oierjhe"},
        {id: "238e4u2309", username: "Daniel", uid: "324", text: "urhliesu"},
    ];

    const renderComment = ({item}) => {
        return (
            <CommentCard comment={item}/>
        )
    }

    const addComment = () => {
        if (input.length > 0) {

        }
    }

    return (
        <View style={uStyles.modal}>
            <TouchableOpacity onPress={props.close} style={{alignSelf: 'flex-end', marginRight: 12, marginTop: 12}}>
                <Feather name="x" size={32} color={colors.black}/>
            </TouchableOpacity>

            <FlatList
                data={tempData.reverse()}
                renderItem={renderComment}
                keyExtractor={(item) => item.id.toString()}
                style={{flex: 1, height: "100%", paddingTop: 12}}
                contentContainerStyle={{paddingBottom: 192, paddingTop: 192}}
                showsVerticalScrollIndicator={false}
                removeClippedSubviews={true} // Unmount components when outside of window 
                initialNumToRender={2} // Reduce initial render amount
                maxToRenderPerBatch={1} // Reduce number in each render batch
                inverted
            />

            <KeyboardAvoidingView 
                behavior= {"padding"} 
                keyboardVerticalOffset={144}
                style={{position: "absolute", bottom: 160, marginHorizontal: 8, flexDirection: "row", alignItems: "center"}}
            >
                <TextInput 
                        style={[uStyles.input, {width: "85%", marginRight: 8, borderBottomColor: colors.primary, backgroundColor: colors.white, color: colors.black}]} 
                        autoCapitalize='none'
                        autoCorrect={false}
                        autoCompleteType="none"
                        placeholder={"Send a message..."}
                        placeholderTextColor={colors.dark}
                        onChangeText={text => setInput(text)}
                        value={input}
                        maxLength={2000}
                />

                <TouchableOpacity style={uStyles.roundButton} onPress={() => addComment()}>
                    <Feather name="send" size={24} color={colors.white}/>
                </TouchableOpacity>
            </KeyboardAvoidingView>
            
        </View>
    );
}

const CommentCard = (props) => {
    return (
        <View style={uStyles.commentCard}>
            <Text style={[uStyles.subheader, {color: colors.black, marginBottom: 8}]}>{props.comment.username}</Text>
            <Text style={[uStyles.body, {color: colors.black}]}>{props.comment.text}</Text>
        </View>
    );
}