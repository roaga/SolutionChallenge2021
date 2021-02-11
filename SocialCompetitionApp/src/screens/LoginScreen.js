import React, {useState} from 'react'
import {View, Text, StyleSheet, TextInput, TouchableOpacity, ImageBackground, ScrollView, ActivityIndicator} from 'react-native'
import {StatusBar} from 'expo-status-bar';
import * as firebase from 'firebase'

import {uStyles, colors} from '../styles'

export default LoginScreen = ({navigation}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState();
    const [loading, setLoading] = useState(false);

    handleLogin = () => {
        firebase.auth().signInWithEmailAndPassword(email, password).catch(error => setErrorMessage(error.message));
        firebase.auth().onAuthStateChanged(user => {
            if(user && !user.emailVerified){
                setErrorMessage("Your email is not verified. Check your inbox.");
            }
        });
    }

    resetPassword = () => {
        firebase.auth().sendPasswordResetEmail(email).then(function() {
            // Email sent.
        }).catch(function(error) {
            // An error happened.
        });
    }

    return(
        // <ImageBackground style={styles.container} source={require('../assets/placeholder.png')} imageStyle={{opacity: 0.2}}>
        <ScrollView style={styles.container}>
            <Text style={uStyles.header}>
                {'Hello.\nAnd welcome back.'}
            </Text>

            <View style={styles.errorMessage}>
                {errorMessage && <Text style={uStyles.message}>{errorMessage}</Text>}
            </View>
            
            <View style={styles.form}>
                <View>
                    <Text style={uStyles.subheader}>Email</Text>
                    <TextInput 
                        style={uStyles.input} 
                        autoCapitalize='none' 
                        autoCompleteType="email"
                        autoCorrect={false}
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

            <TouchableOpacity style={uStyles.textButton} onPress={() => handleLogin()}>
                {loading ? (
                    <ActivityIndicator size="small" color={colors.white}/>
                ) : (
                    <Text style={uStyles.subheader}>Log In</Text>
                )}
            </TouchableOpacity>

            <TouchableOpacity style={{alignSelf: "center", marginTop: 32}} onPress={() => resetPassword()}
            >
                <Text style={uStyles.message}>
                    Reset password.
                </Text>
            </TouchableOpacity>

            <TouchableOpacity style={{alignSelf: "center", marginTop: 32}} onPress={() => navigation.navigate("SignUp")}>
                <Text style={uStyles.message}>
                    New around here? <Text style={uStyles.message, {color: colors.primary}}>Sign up.</Text>
                </Text>
            </TouchableOpacity>
            <StatusBar style="light" />
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