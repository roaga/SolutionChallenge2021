import React, {useContext} from 'react'
import {View, Text, StyleSheet, TextInput, TouchableOpacity, ImageBackground, ScrollView} from 'react-native'
import {Feather} from "@expo/vector-icons";

import {uStyles, colors} from '../styles.js'
import {FirebaseContext} from "../context/FirebaseContext"
import { UserContext } from '../context/UserContext.js'

export default ProfileScreen = () => {
    const [user, setUser] = useContext(UserContext);
    const firebase = useContext(FirebaseContext);

    const logOut = async () => {
        const loggedOut = await firebase.logOut();
        if (loggedOut) {
            setUser(state => ({...state, isLoggedIn: false}))
        }
    }

    return (
        <View style={styles.container}>
            <ScrollView style={{marginTop: 64}}>
                <TouchableOpacity style={[uStyles.pfpBubble, {alignSelf: "center"}]}>
                    <ImageBackground 
                        style={uStyles.pfp}
                        source={
                            user.profilePhotoUrl === "default" ?
                            require("../../assets/defaultProfilePhoto.png")
                            : {uri: user.profilePhotoUrl}
                        }
                    />
                </TouchableOpacity>
                <Text style={[uStyles.header, {marginTop: 16}]}>{user.username}</Text>

                <View style={{alignItems: "center", marginTop: 16, flexDirection: "row", justifyContent: "space-between"}}>
                    <View style={{flex: 1, alignItems: "center"}}>
                        <Text style={uStyles.subheader}>21</Text>
                        <Text style={uStyles.body}>Posts</Text>
                    </View>
                    <View style={{flex: 1, alignItems: "center"}}>
                        <Text style={uStyles.subheader}>489</Text>
                        <Text style={uStyles.body}>Points</Text>
                    </View>
                    <View style={{flex: 1, alignItems: "center"}}>
                        <Text style={uStyles.subheader}>7</Text>
                        <Text style={uStyles.body}>Causes</Text>
                    </View>
                </View>
            </ScrollView>

            <View style={uStyles.topBar}>
                <Text style={[uStyles.title, {color: colors.primary, textAlign: 'left', marginTop: 32}]}>Profile</Text>
                <View style={{flexDirection: "row"}}>
                    <TouchableOpacity style={{alignItems: "right", marginTop: 32}} onPress={() => logOut()}>
                            <Feather name="log-out" size={24} color={colors.white}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={{alignItems: "right", marginTop: 32, marginLeft: 16}}>
                            <Feather name="settings" size={24} color={colors.white}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={{alignItems: "right", marginTop: 32, marginLeft: 16}}>
                            <Feather name="bell" size={24} color={colors.white}/>
                    </TouchableOpacity>
                </View>
            </View>
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.dark,
    },
});