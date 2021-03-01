import React, {useState, useCallback, useEffect, useRef, createRef} from 'react'
import {View, Text, StyleSheet, TextInput, TouchableOpacity, ImageBackground, FlatList, Modal} from 'react-native'
import {StatusBar} from 'expo-status-bar';
import DropDownPicker from 'react-native-dropdown-picker';
import {Feather} from "@expo/vector-icons";
import ViewShot from "react-native-view-shot";
import * as Sharing from 'expo-sharing';

import {uStyles, colors} from '../styles.js'
import PostCard from '../components/PostCard'
import CommentsModal from '../components/CommentsModal.js';
import checkIfFirstLaunch from '../scripts/CheckFirstLaunch';
import ProfileModal from '../components/ProfileModal.js';

export default FeedScreen = () => {
    const tempData = [
        {id: "141415252", username: "Aritro", uid: "8301u410", pfpUrl: "default", imageUrl: "houar", link: "https://expo.io", caption: "uaohfauwf", type: "Volunteering", cause: "Environment", likes: 32, profileVisits: 10, shares: 2, comments: [{id: "23804u2309", username: "Rohan", uid: "owrhf", text: "oierjhe"},]},
        {id: "1414152523", username: "Hane", uid: "238823", pfpUrl: "default", imageUrl: "ref", link: "", caption: "fefe", type: "Volunteering", cause: "Environment", likes: 33, profileVisits: 3, shares: 12, comments: [{id: "2049230942", username: "Rohan", uid: "owrhf", text: "oierjhe"},]},
    ];
    const [liked, setLiked] = useState([]);
    const [category, setCategory] = useState("foryou"); 
    const [postIndex, setPostIndex] = useState();
    const [commentsModalVisible, setCommentsModalVisible] = useState(false);
    const [profileModalVisible, setProfileModalVisible] = useState(false);
    const [onboardingVisible, setOnboardingVisible] = useState(false);
    const [recentPoints, setRecentPoints] = useState();
    const [timer, setTimer] = useState(0);
    const postRefs = useRef(tempData.map(() => createRef()));
    

    useEffect(() => {
        //TODO: get posts from backend, setLiked

        const getIsFirstLaunch = async () => {
            const isFirstLaunch = await checkIfFirstLaunch();
            setOnboardingVisible(isFirstLaunch);
        }
        getIsFirstLaunch();

        const timer = setInterval(() => {
          if (timer > 0) {
              setTimer(timer - 1);
          }
        }, 1000);
        return () => clearInterval(timer);
      }, []);
    
    const renderPost = ({item, index}) => {
        return (
            <ViewShot ref={postRefs.current[index]}>
                <PostCard post={item}/>
            </ViewShot>
        )
    }

    const onViewChange = useCallback(({ viewableItems, changed }) => {
        if (viewableItems.length > 0) {
            setPostIndex(viewableItems[0].index);
        }
    }, []);

    const toggleComments = (index) => {
        setCommentsModalVisible(!commentsModalVisible);
    }


    const toggleOnboarding = () => {
        setOnboardingVisible(!onboardingVisible);
    }

    const visitProfile = () => {
        setProfileModalVisible(!profileModalVisible);
        // TODO: add count to profileVisits for that post
    }

    const sharePost = async (index) => {
        postRefs.current[index].current.capture().then(uri => {
            Sharing.shareAsync(uri);
        });
        //TODO: 
    }

    const toggleLikePost = (index) => {
        // TODO: handle logic (setLike) and backend for liking/unliking
    }

    return (
        <View style={styles.container}>

            <FlatList
                data={tempData}
                renderItem={renderPost}
                keyExtractor={(item) => item.id.toString()}
                onViewableItemsChanged={onViewChange}
                viewabilityConfig={{itemVisiblePercentThreshold: 50}}
                style={{flex: 1, height: "100%", paddingTop: 96}}
                contentContainerStyle={{paddingBottom: 192}}
                showsVerticalScrollIndicator={false}
                removeClippedSubviews={true} // Unmount components when outside of window 
                initialNumToRender={2} // Reduce initial render amount
                maxToRenderPerBatch={1} // Reduce number in each render batch
            />

            <View style={uStyles.roundButtonArray}>
                <Text style={[uStyles.body, {color: colors.primary, textAlign: 'center'}]}>{recentPoints && timer > 0 ? "+" + recentPoints + "!" : ""}</Text>

                <TouchableOpacity style={uStyles.roundButton} onPress={() => likePost(postIndex)}>
                    <Feather name="heart" size={24} color={postIndex !== undefined && liked[postIndex] === true ? colors.primary : colors.white}/>
                    <Text style={[uStyles.message, {fontSize: 8}]}>{postIndex !== undefined ? tempData[postIndex].likes : "-"}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={uStyles.roundButton} onPress={() => toggleComments(postIndex)}>
                    <Feather name="message-square" size={24} color={colors.white}/>
                    <Text style={[uStyles.message, {fontSize: 8}]}>{postIndex !== undefined ? tempData[postIndex].comments.length : "-"}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={uStyles.roundButton} onPress={() => visitProfile(postIndex)}>
                    <Feather name="user" size={24} color={colors.white}/>
                    <Text style={[uStyles.message, {fontSize: 8}]}>{postIndex !== undefined ? tempData[postIndex].profileVisits : "-"}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={uStyles.roundButton} onPress={() => sharePost(postIndex)}>
                    <Feather name="share" size={24} color={colors.white}/>
                    <Text style={[uStyles.message, {fontSize: 8}]}>{postIndex !== undefined ? tempData[postIndex].shares : "-"}</Text>
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
                        dropDownStyle={{backgroundColor: colors.black, borderWidth: 0, height: 512, borderBottomRightRadius: 10, borderBottomLeftRadius: 10}}
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

            <Modal
                animationType="slide" 
                visible={commentsModalVisible} 
                onRequestClose={() => toggleComments()}
                transparent={true}
            >
                <CommentsModal comments={postIndex !== undefined ? tempData[postIndex].comments : []} close={() => toggleComments()}/>
            </Modal>

            <Modal
                animationType="slide" 
                visible={profileModalVisible} 
                onRequestClose={() => visitProfile()}
                transparent={true}
            >
                <ProfileModal 
                    user={postIndex !== undefined ? tempData[postIndex].uid : ""}
                    username={postIndex !== undefined ? tempData[postIndex].username : ""}
                    close={() => visitProfile()}
                />
            </Modal>

            <Modal
                animationType="slide" 
                visible={onboardingVisible} 
                onRequestClose={() => toggleOnboarding()}
                transparent={true}
            >
                <OnboardingModal close={() => toggleOnboarding()}/>
            </Modal>

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
