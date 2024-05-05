import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { AntDesign, Entypo, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useLocalSearchParams } from 'expo-router';

const info = () => {
    const router = useRouter();
    const params = useLocalSearchParams();
    return (
        <View style={styles.container}>
            <View style={styles.topBarContainer}>
                <AntDesign onPress={() => { router.back('/Home') }} name="arrowleft" size={24} color="black" />
                <Entypo name="dots-three-vertical" size={24} color="black" />
            </View>
            <View style={{ gap: 10 }}>
                <Text>Category - {params.category}</Text>
                <Text style={styles.title}>{params.title}</Text>
            </View>
            <View>
                <TouchableOpacity style={styles.addSubtaskContainter}>
                    <Entypo name="plus" size={28} color="#7CB9E8" />
                    <Text style={{ fontSize: 20, color: "#7CB9E8" }}>Add a subtask</Text>
                </TouchableOpacity>
                <View style={styles.dueDateContainer}>
                    <AntDesign name="calendar" size={24} color="black" />
                    <Text>Due date</Text>
                    <TouchableOpacity style={{ marginLeft: 'auto', backgroundColor: '#F0F0F0', borderRadius: 5, padding: 7 }}>
                        <Text>{params.dueDate}</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.dueDateContainer}>
                    <AntDesign name="clockcircleo" size={24} color="black" />
                    <Text>Time and reminder</Text>
                    <TouchableOpacity style={{ marginLeft: 'auto', backgroundColor: '#F0F0F0', borderRadius: 5, padding: 7 }}>
                        <Text>No</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.dueDateContainer}>
                    <MaterialCommunityIcons name="note-edit-outline" size={24} color="black" />
                    <Text>Note</Text>
                    <TouchableOpacity style={{ marginLeft: 'auto', backgroundColor: '#F0F0F0', borderRadius: 5, padding: 7 }}>
                        <Text>Not added</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default info

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 10
    },
    topBarContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        marginBottom: 20
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
    },
    addSubtaskContainter: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
        marginTop: 20,
    },
    dueDateContainer: {
        flexDirection: 'row',
        gap: 8,
        alignItems: 'center',
        marginTop: 20
    }
})