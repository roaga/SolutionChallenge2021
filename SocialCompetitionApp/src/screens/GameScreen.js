import React, {useRef, useState} from 'react'
import {View, Text, StyleSheet, TextInput, TouchableOpacity, ImageBackground, ScrollView} from 'react-native'
import {StatusBar} from 'expo-status-bar';
import * as Sharing from 'expo-sharing';
import {Feather} from "@expo/vector-icons";
import ViewShot from "react-native-view-shot";
import DropDownPicker from 'react-native-dropdown-picker';
import {LineChart, BarChart, PieChart, ProgressChart, ContributionGraph, StackedBarChart} from "react-native-chart-kit";

import {uStyles, colors} from '../styles.js'

export default GameScreen = () => {
    const view = useRef();
    const [category, setCategory] = useState("foryou");

    const tempMilestonesData = {
        labels: ["Swim", "Bike", "Run"], // optional
        data: [0.4, 0.6, 0.8]
      };

    const sharePost = async () => {
        view.current.capture().then(uri => {
            Sharing.shareAsync(uri);
        });
    }

    return (
        <View style={styles.container}>
            <ViewShot ref={view}>
                <ScrollView style={{marginTop: 98, height: "100%"}}>
                    <View style={uStyles.searchCard}>
                        <Text style={[uStyles.header, {marginTop: 4, color: colors.black, paddingBottom: 8}]}>Points</Text>
                    </View>
                    
                    <View style={uStyles.searchCard}>
                        <Text style={[uStyles.header, {marginTop: 4, color: colors.black, paddingBottom: 8}]}>Milestones</Text>

                        <ProgressChart
                            data={tempMilestonesData}
                            width={"60%"}
                            height={220}
                            strokeWidth={16}
                            radius={32}
                            chartConfig={{
                                backgroundColor: '#022173',
                                backgroundGradientFrom: '#022173',
                                backgroundGradientTo: '#1b3fa0',
                                color: `rgba(255, 255, 255, 1)`,
                                style: {borderRadius: 16}
                            }}
                            hideLegend={false}
                        />
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