import React, {useState} from 'react'
import {View, Text, StyleSheet, TextInput, TouchableOpacity, ImageBackground, ScrollView, Platform} from 'react-native'
import {Feather} from "@expo/vector-icons";
import * as firebase from 'firebase'
import * as Permissions from 'expo-permissions'
import * as ImagePicker from 'expo-image-picker'

import {uStyles, colors} from '../styles.js'

export default SignUpScreen = ({navigation}) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState();
    const [loading, setLoading] = useState(false);

    const handleSignup = () => {
        if(name.length > 0){
            firebase.auth().createUserWithEmailAndPassword(email, password).then(userCredentials => {
                userCredentials.user.sendEmailVerification().then(function() {
                    firebase.auth().signOut()
                    setErrorMessage("Please check for a verification email.");
                }.bind(this));
                firebase.firestore().collection('users').doc(email).set({
                    posts: [], 
                });
                return userCredentials.user.updateProfile({
                    displayName: name
                })
            }).catch(error => setErrorMessage(error.message));
        } else{
            setErrorMessage("A name is required.")
        }
    }

    const getPermission = async () => {
        if (Platform.OS !== 'web') {
            const {status} = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);
            return status;
        }
    }

    const addProfilePhoto = async () => {
        const status = await getPermission();
        alert("Status: ", status);
    }

    return (
        // <ImageBackground style={styles.container} source={require('../assets/placeholder.png')} imageStyle={{opacity: 0.2}}>
        <ScrollView style={styles.container}>
            <Text style={uStyles.header}>
                {'Hello.\nAnd welcome to SCA.'}
            </Text>

            <View style={{alignItems: "center"}}>
                <TouchableOpacity style={uStyles.pfpBubble} onPress={() => addProfilePhoto()}>
                    <Feather name="plus" size={48} color={colors.black}/>
                </TouchableOpacity>
            </View>

            <View style={styles.errorMessage}>
                {errorMessage && <Text style={uStyles.message}>{errorMessage}</Text>}
            </View>
            
            <View style={styles.form}>
                <View>
                    <Text style={uStyles.subheader}>Name</Text>
                    <TextInput 
                        style={uStyles.input} 
                        autoCapitalize='none' 
                        autoCompleteType="name"
                        autoCorrect={false}
                        onChangeText={name => setName(name.trim())}
                        value={name}
                    ></TextInput>
                </View>

                <View style={{marginTop: 16}}>
                    <Text style={uStyles.subheader}>Email</Text>
                    <TextInput 
                        style={uStyles.input} 
                        autoCapitalize='none' 
                        autoCorrect={false}
                        autoCompleteType="email"
                        onChangeText={email => setEmail(email.trim())}
                        value={email}
                    ></TextInput>
                </View>

                <View style={{marginTop: 16}}>
                    <Text style={uStyles.subheader}>Password</Text>
                    <TextInput 
                        style={uStyles.input} 
                        secureTextEntry 
                        autoCapitalize='none'
                        autoCorrect={false}
                        autoCompleteType="password"
                        onChangeText={password => setPassword(password.trim())}
                        value={password}
                    ></TextInput>
                </View>
            </View>

            <TouchableOpacity style={uStyles.textButton} onPress={() => handleSignup()}>
                <Text style={uStyles.subheader}>Sign Up</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{alignSelf: "center", marginTop: 32}} onPress={() => navigation.navigate("LogIn")}>
                <Text style={uStyles.message}>
                    Have an account? <Text style={[uStyles.message, {color: colors.primary}]}>Log In.</Text>
                </Text>
            </TouchableOpacity>
        {/* </ImageBackground> */}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.dark,
    },
    errorMessage: {
        height: 72,
        alignItems: 'center',
        justifyContent: "center",
        marginHorizontal: 32
    },
    form: {
        marginBottom: 48,
        marginHorizontal: 36
    },
})