import React, {useState, useCallback} from 'react'
import {View, Text, StyleSheet, TextInput, TouchableOpacity, ImageBackground, FlatList} from 'react-native'
import {StatusBar} from 'expo-status-bar';
import DropDownPicker from 'react-native-dropdown-picker';
import {Feather} from "@expo/vector-icons";

import {uStyles, colors} from '../styles.js'
import PostCard from '../components/PostCard'

export default FeedScreen = () => {
    const [category, setCategory] = useState("foryou");
    const [postIndex, setPostIndex] = useState();

    const tempData = [
        {id: "141415252", username: "Aritro", uid: "8301u410", imageUrl: "houar", link: "https://expo.io", caption: "uaohfauwf", type: "Volunteering", cause: "Environment", likes: 32, comments: [{username: "Rohan", uid: "owrhf", text: "oierjhe"},]},
        {id: "1414152523", username: "Hane", uid: "238823", imageUrl: "ref", link: "", caption: "fefe", type: "Volunteering", cause: "Environment", likes: 33, comments: [{username: "Rohan", uid: "owrhf", text: "oierjhe"},]},
    ];
    
    const renderPost = ({item}) => {
        return (
            <PostCard imageUrl={item.imageUrl} caption={item.caption} link={item.link}/>
        )
    }

    const onViewChange = useCallback(({ viewableItems, changed }) => {
        if (viewableItems.length > 0) {
            setPostIndex(viewableItems[0].index);
        }
    }, []);

    return (
        <View style={styles.container}>

            <FlatList
                data={tempData}
                renderItem={renderPost}
                keyExtractor={(item) => item.id.toString()}
                onViewableItemsChanged={onViewChange}
                viewabilityConfig={{itemVisiblePercentThreshold: 50}}
                snapToInterval={500}
                style={{flex: 1, height: "100%", paddingTop: 96}}
                contentContainerStyle={{paddingBottom: 192}}
                showsVerticalScrollIndicator={false}
                removeClippedSubviews={true} // Unmount components when outside of window 
                initialNumToRender={2} // Reduce initial render amount
                maxToRenderPerBatch={1} // Reduce number in each render batch
            />

            <View style={{position: "absolute", right: 8, bottom: 108}}>
                <TouchableOpacity style={[uStyles.pfpBubble, {width: 48, height: 48, backgroundColor: colors.black, shadowColor: colors.primary, marginTop: 12}]}>
                    <Feather name="heart" size={24} color={colors.white}/>
                </TouchableOpacity>
                <TouchableOpacity style={[uStyles.pfpBubble, {width: 48, height: 48, backgroundColor: colors.black, shadowColor: colors.primary, marginTop: 12}]}>
                    <Feather name="message-circle" size={24} color={colors.white}/>
                </TouchableOpacity>
                <TouchableOpacity style={[uStyles.pfpBubble, {width: 48, height: 48, backgroundColor: colors.black, shadowColor: colors.primary, marginTop: 12}]}>
                    <Feather name="user" size={24} color={colors.white}/>
                </TouchableOpacity>
                <TouchableOpacity style={[uStyles.pfpBubble, {width: 48, height: 48, backgroundColor: colors.black, shadowColor: colors.primary, marginTop: 12}]}>
                    <Feather name="share" size={24} color={colors.white}/>
                </TouchableOpacity>
                <TouchableOpacity style={[uStyles.pfpBubble, {width: 48, height: 48, backgroundColor: colors.black, shadowColor: colors.primary, marginTop: 12}]}>
                    <Feather name="calendar" size={24} color={colors.white}/>
                </TouchableOpacity>
            </View>

            <View style={uStyles.topBar}>
                <Text style={[uStyles.title, {color: colors.primary, textAlign: 'left', marginTop: 32}]}>SCA</Text>
                <View style={{flexDirection: "row"}}>
                    <DropDownPicker
                        items={[
                            {label: "For You", value: "foryou", icon: () => <Feather name="list" size={18} color={colors.primary}/>},
                            {label: "Fitness", value: "fitness", icon: () => <Feather name="activity" size={18} color={colors.primary}/>},
                            {label: "Environment", value: "environment", icon: () => <Feather name="globe" size={18} color={colors.primary}/>},
                        ]}
                        defaultValue={category}
                        containerStyle={{height: 32, width: 160, marginTop: 32}}
                        style={{backgroundColor: colors.black, color: colors.white, borderWidth: 0, flexDirection: "row-reverse"}}
                        dropDownStyle={{backgroundColor: colors.black, borderWidth: 0, height: 512, borderBottomRightRadius: 10, borderBottomLeftRadius: 10, borderTopRightRadius: 10, borderTopLeftRadius: 10}}
                        itemStyle={{justifyContent: "flex-start", textAlign: "right"}}
                        activeItemStyle={{backgroundColor: colors.primary, borderRadius: 10}}
                        globalTextStyle={uStyles.body}
                        onChangeItem={item => setCategory(item.value)}
                        autoScrollToDefaultValue
                        searchable
                        searchablePlaceholder={"Search..."}
                        searchableStyle={{borderRadius: 20}}
                    />
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