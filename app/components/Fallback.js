import { StyleSheet, View, Image, Text } from 'react-native'
import React from 'react'

const Fallback = () => {
    return (
        <View style={{
            margin: 40,
            alignItems: 'center'
        }}>
            <Image
                source={require("../../assets/fallback_todo_app.webp")}
            />
            <Text
                style={{
                    color: 'grey',
                    fontWeight: "600",
                    fontSize: 20,
                    fontStyle:"italic"
                }}
            >Add your todo !</Text>
        </View>
    )
}

export default Fallback

const styles = StyleSheet.create({})