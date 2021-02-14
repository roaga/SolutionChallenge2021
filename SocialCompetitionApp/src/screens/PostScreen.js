import React, { useEffect, useState } from 'react'
import {View, Text, StyleSheet, TextInput, TouchableOpacity, ImageBackground} from 'react-native'
import {StatusBar} from 'expo-status-bar';
import {Feather} from "@expo/vector-icons";

import {uStyles, colors} from '../styles.js'
import {ImageUpload} from '../scripts/ImageUpload'
import PostCard from "../components/PostCard"

export default PostScreen = () => {
    const [post, setPost] = useState({id: "", username: "", uid: "", imageUrl: "", link: "", caption: "", type: "", cause: "", likes: 0, profileVisits: 0, shares: 0, comments: []});
    const [camVisible, setCamVisible] = useState(false);

    useEffect(() => {

    }, []);

    const addPostPhoto = async () => {
        const uri = await ImageUpload.addPhoto();
        if (uri) {
            let newPost = {...post};
            newPost.imageUrl = uri;
            setPost(newPost);
        }
        //TODO: on upload, Firebase needs to create a new URL (not URI) to replace this local value
    }

    const takePostPhoto = async () => {
        setCamVisible(true);
        const uri = await ImageUpload.takePhoto();
        if (uri) {
            let newPost = {...post};
            newPost.imageUrl = uri;
            setPost(newPost);
        }
        //TODO: on upload, Firebase needs to create a new URL (not URI) to replace this local value
    }

    return (
        <View style={styles.container}>
            <View style={{marginTop: 96}}>
                <PostCard post={post}/>
            </View>

            <View style={uStyles.roundButtonArray}>
                <TouchableOpacity style={uStyles.roundButton}>
                    <Feather name="camera" size={24} color={colors.white}/>
                </TouchableOpacity>
                <TouchableOpacity style={uStyles.roundButton} onPress={() => addPostPhoto()}>
                    <Feather name="image" size={24} color={colors.white}/>
                </TouchableOpacity>
            </View>

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