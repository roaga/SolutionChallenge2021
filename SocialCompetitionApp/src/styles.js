import {StyleSheet} from 'react-native'

// for theming that needs to be consistently reused across the app
const colors = {
    primary: "#E9446A",
    white: "#FEFCFD",
    black: "#010400",
    dark: "#5D5D81",
    light: "#BFCDE0",
}

const uStyles = StyleSheet.create({
    title: {
        marginTop: 96,
        fontSize: 32,
        fontWeight: "700",
        textAlign: "center",
        color: colors.white,
    },
    header: {
        marginTop: 96,
        fontSize: 18,
        fontWeight: "700",
        textAlign: "center",
        color: colors.white,
    },
    subheader: {
        color: colors.white,
        fontSize: 16,
        fontWeight: "700",
    },
    body: {
        color: colors.white,
        fontSize: 14,
        fontWeight: "600",
    },
    message: {
        color: colors.light,
        fontSize: 12,
        fontWeight: "600",
    },
    input: {
        backgroundColor: colors.dark,
        height: 48,
        fontSize: 14,
        fontWeight: "600",
        color: colors.white,
        borderRadius: 10,
        paddingHorizontal: 16,
        marginTop: 8,
        borderBottomColor: colors.light,
        borderBottomWidth: 4
    },
    textButton: {
        marginHorizontal: 80,
        backgroundColor: colors.primary,
        borderRadius: 10,
        height: 64,
        shadowOpacity: 1,
        shadowRadius: 0,
        shadowOffset: {width: -4, height: 4},
        shadowColor: colors.black,    
        alignItems: "center",
        justifyContent: "center",   
    },
    pfpBubble: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: colors.light,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 48,
        shadowOpacity: 1,
        shadowRadius: 0,
        shadowOffset: {width: -4, height: 4},
        shadowColor: colors.black,
    },
    pfp: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: colors.light,
        justifyContent: "center",
        alignItems: "center",
        overflow: 'hidden'
    },
    tabBar: {
        backgroundColor: colors.black,
        paddingBottom: 12
    }
})

export {uStyles, colors};