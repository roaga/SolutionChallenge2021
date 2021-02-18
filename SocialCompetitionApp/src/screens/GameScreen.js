import React, {useRef, useState} from 'react'
import {View, Text, StyleSheet, TextInput, TouchableOpacity, ImageBackground, ScrollView, FlatList} from 'react-native'
import {StatusBar} from 'expo-status-bar';
import * as Sharing from 'expo-sharing';
import {Feather} from "@expo/vector-icons";
import ViewShot from "react-native-view-shot";
import DropDownPicker from 'react-native-dropdown-picker';
import { StackedBarChart, ProgressCircle, YAxis, XAxis } from 'react-native-svg-charts'

import {uStyles, colors} from '../styles.js'

export default GameScreen = () => {
    const view = useRef();
    const [category, setCategory] = useState("foryou");

    const tempMilestonesData = {
        labels: ["Swim", "Bike", "Run"], // optional
        data: [0.4, 0.6, 0.8]
    };

    const tempPointsData = [
        {
            cause: "Environment",
            Thoughts: 3840,
            Volunteering: 1920,
            Activism: 960,
            Contribution: 400,
            Awareness: 400,
        },
        {
            cause: "Fitness",
            Thoughts: 4140,
            Volunteering: 190,
            Activism: 960,
            Contribution: 350,
            Awareness: 400,
        },
    ]

    const types = ['Thoughts', 'Volunteering', 'Activism', 'Contribution', 'Awareness'];

    const sharePost = async () => {
        view.current.capture().then(uri => {
            Sharing.shareAsync(uri);
        });
    }

    return (
        <View style={styles.container}>
            <ViewShot ref={view} style={{height: "100%"}}>
                <ScrollView style={{marginTop: 98}} contentContainerStyle={{paddingBottom: 96}}>
                    <View style={[uStyles.searchCard, {height: 384}]}>
                        <Text style={[uStyles.header, {marginTop: 4, color: colors.black, paddingBottom: 8}]}>Points</Text>

                        <Text style={[uStyles.subheader, {alignSelf: "center", color: colors.black, marginVertical: 16}]}>Your top cause is {tempPointsData[0].cause}!</Text>

                        <View style={{flexDirection: "row", marginBottom: 8}}>
                            <YAxis
                                data={tempPointsData}
                                contentInset={{ left: 16, right: 16 }}
                                style={{width: 10}}
                                svg={{fill: colors.black, fontSize: 10}}
                                formatLabel={(value) => value.cause}
                                numberOfTicks={tempPointsData.length}
                            />
                            <StackedBarChart
                                style={{height: 200, width: "90%"}}
                                keys={types} 
                                colors={[colors.dark, colors.primary, colors.white, colors.black]}
                                data={tempPointsData}
                                showGrid={false}
                                contentInset={{ top: 8, bottom: 8 }}
                                horizontal={true}
                            />
                        </View>
                        <XAxis
                            style={{ marginHorizontal: 10, width: "90%" }}
                            data={[0, 1, 2, 3, 4]}
                            formatLabel={(a, index) => (index * (tempPointsData[0].Thoughts + tempPointsData[0].Volunteering + tempPointsData[0].Activism + tempPointsData[0].Contribution + tempPointsData[0].Awareness) / [0, 1, 2, 3, 4].length)}
                            contentInset={{ left: 16, right: 16 }}
                            svg={{ fontSize: 10, fill: colors.black }}
                        />                        

                        <Text style={[uStyles.subheader, {alignSelf: "center", color: colors.black, marginTop: 16}]}>You earned {tempPointsData.map(item => (item.Thoughts + item.Volunteering + item.Activism + item.Contribution + item.Awareness)).reduce((a, b) => a + b)} points total!</Text>
                    </View>

                    <View style={[uStyles.searchCard, {height: 340}]}>
                        <Text style={[uStyles.header, {marginTop: 4, color: colors.black, paddingBottom: 8}]}>Impact Facts</Text>

                        <Feather name="plus-circle" color={colors.primary} size={32} style={{alignSelf: "center"}}/>
                        <Text style={[uStyles.body, {alignSelf: "center", color: colors.black, marginTop: 16, marginHorizontal: 12, textAlign: "center"}]}>You made a post that engaged 1321 people on Environment!</Text>
                        <Feather name="share" color={colors.primary} size={32} style={{alignSelf: "center", marginTop: 8}}/>
                        <Text style={[uStyles.body, {alignSelf: "center", color: colors.black, marginTop: 16, marginHorizontal: 12, textAlign: "center"}]}>You shared a post representing 120 people on Fitness!</Text>
                        <Feather name="message-circle" color={colors.primary} size={32} style={{alignSelf: "center", marginTop: 8}}/>
                        <Text style={[uStyles.body, {alignSelf: "center", color: colors.black, marginTop: 16, marginHorizontal: 12, textAlign: "center"}]}>You made a comment on a post that engaged 149 people!</Text>
                    </View>
                    
                    <View style={[uStyles.searchCard, {height: 640}]}>
                        <Text style={[uStyles.header, {marginTop: 4, color: colors.black, paddingBottom: 8}]}>Milestones</Text>

                        <View>
                            <ProgressCircle style={{ height: 150, marginTop: 12}} progress={0.7} progressColor={colors.primary}/>
                            <Text style={[uStyles.body,{color: colors.black, position: "absolute", top: "50%", alignSelf: "center"}]}>Milestone 1</Text>
                        </View>
                        <View>
                            <ProgressCircle style={{ height: 150, marginTop: 16}} progress={0.5} progressColor={colors.primary}/>
                            <Text style={[uStyles.body,{color: colors.black, position: "absolute", top: "50%", alignSelf: "center"}]}>Milestone 2</Text>
                        </View>
                        <View>
                            <ProgressCircle style={{ height: 150, marginTop: 16}} progress={0.6} progressColor={colors.primary}/>
                            <Text style={[uStyles.body,{color: colors.black, position: "absolute", top: "50%", alignSelf: "center"}]}>Milestone 3</Text>
                        </View>
                        
                        <Text style={[uStyles.body,{color: colors.black, alignSelf: "center", marginTop: 32}]}>Last completed milestone 4!</Text>
                        <Text style={[uStyles.subheader, {alignSelf: "center", color: colors.black, marginTop: 16}]}>32 milestones already reached!</Text>

                    </View>

                </ScrollView>
            </ViewShot>

            <View style={uStyles.roundButtonArray}>
                <TouchableOpacity style={uStyles.roundButton} onPress={() => sharePost()}>
                    <Feather name="share" size={24} color={colors.white}/>
                </TouchableOpacity>
            </View>

            <View style={uStyles.topBar}>
                <Text style={[uStyles.title, {color: colors.primary, textAlign: 'left', marginTop: 32}]}>Impact</Text>
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