import React, {useState, useContext, createContext, useEffect} from 'react'

import {setLocalSettings, getLocalSettings} from '../scripts/LocalSettings'

const SettingsContext = createContext([{}, () => {}]);

const SettingsProvider = (props) => {
    const [state, setState] = useState({
        testSetting: {name: "Test Setting", value: false}
    });

    useEffect(() => {
        // get settings from local storage
        const localSettings = async () => {
            let newSettings = await getLocalSettings();
            if (newSettings !== null) {
                setState(newSettings);
            }
        }
        localSettings();
      }, []);


    return <SettingsContext.Provider value={[state, setState]}>{props.children}</SettingsContext.Provider>;
}

export {SettingsContext, SettingsProvider};