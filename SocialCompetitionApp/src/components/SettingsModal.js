import React, { useState, useContext } from 'react';
import {View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, FlatList, Switch} from 'react-native'
import {Feather} from "@expo/vector-icons";

import {uStyles, colors} from '../styles.js'
import { SettingsContext } from '../context/SettingsContext.js';
import {setLocalSettings, getLocalSettings} from '../scripts/LocalSettings'

export default SettingsModal = (props) => {
    const [settings, setSettings] = useContext(SettingsContext);

    const renderSetting = (key) => {
        return (
            <SettingCard settingKey={key} item={settings[key]} toggle={() => toggleSwitch(key)}/>
        )
    }

    const toggleSwitch = (key) => {
        let oldSettings = settings;
        oldSettings[key].value = !oldSettings[key].value;
        setSettings(oldSettings);
    }

    return (
        <View style={uStyles.modal}>
            <TouchableOpacity onPress={() => {
                props.close();
                setLocalSettings(settings);
            }} style={{alignSelf: 'flex-end', marginRight: 12, marginTop: 12}}>
                <Feather name="x" size={32} color={colors.black}/>
            </TouchableOpacity>

            <FlatList
                data={Object.keys(settings)}
                renderItem={(key) => renderSetting(key.item)}
                keyExtractor={(item) => item.name}
                style={{flex: 1, height: "100%", paddingTop: 12}}
                contentContainerStyle={{paddingBottom: 96, paddingTop: 12}}
                showsVerticalScrollIndicator={false}
                removeClippedSubviews={true} // Unmount components when outside of window 
                initialNumToRender={2} // Reduce initial render amount
                maxToRenderPerBatch={1} // Reduce number in each render batch
            />
        </View>
    );
}

const SettingCard = (props) => {
    const [enabled, setEnabled] = useState(props.item.value);

    return (
        <View style={[uStyles.commentCard, {flexDirection: "row", alignItems: "center", justifyContent: "space-between"}]}>
            <Text style={[uStyles.body, {color: colors.black, marginLeft: 12}]}>{props.item.name}</Text>
            <Switch
                trackColor={{ false: colors.light, true: colors.primary }}
                thumbColor={colors.white}
                ios_backgroundColor={colors.light}
                onValueChange={() => {
                    props.toggle(props.settingKey);
                    setEnabled(!enabled);
                }}
                value={enabled}
            />
        </View>
    );
}