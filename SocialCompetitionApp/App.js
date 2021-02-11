import * as firebase from 'firebase'
import React from 'react'
import {NavigationContainer} from '@react-navigation/native'

import AppStackScreens from './src/stacks/AppStackScreens'

var firebaseConfig = {
    apiKey: "AIzaSyCuPmbSJmsUUUSoZrQrjSlp7n5LZzQ4OZM",
    authDomain: "socialcompetitionapp.firebaseapp.com",
    projectId: "socialcompetitionapp",
    storageBucket: "socialcompetitionapp.appspot.com",
    messagingSenderId: "595008339469",
    appId: "1:595008339469:web:c4487fec4dc2c58a53df44"
};

firebase.initializeApp(firebaseConfig);

export default App = () => {
    return (
        <NavigationContainer>
            <AppStackScreens />
        </NavigationContainer>
    )
}