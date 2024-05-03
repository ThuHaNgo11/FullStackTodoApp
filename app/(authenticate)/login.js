import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    KeyboardAvoidingView,
    TextInput,
    Pressable
} from 'react-native'
import React, { useState, useEffect } from 'react'
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    // if token has not expired 
    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                const token = AsyncStorage.getItem('authToken');
                if(token){
                    router.replace("/(tabs)/Home")
                }
            } catch (error) {
                console.log(error)
            }
        }

        checkLoginStatus();
    }, [])

    const handleLogin = () => {
        const user = {
            email: email,
            password: password
        }
        axios.post("http://localhost:3000/login", user).then((res) => {
            const token = res.data.token;
            AsyncStorage.setItem("authToken", token);
            router.replace("/(tabs)/Home")
        }).catch((e) => {
            console.log(e)
        })
    }

    return (
        <SafeAreaView style={styles.safeAreaView}>
            <View style={{ marginTop: 100 }}>
                <Text style={styles.heading}>Not-a-normal Todo App</Text>
            </View>
            <KeyboardAvoidingView>
                <View style={{ alignItems: 'center' }}>
                    <Text style={styles.subHeading}>Log in to your account</Text>
                </View>

                <View style={{ marginTop: 70 }}>
                    <View style={styles.inputContainer}>
                        <MaterialIcons style={{ marginHorizontal: 5 }} name="email" size={24} color="gray" />
                        <TextInput
                            placeholder='Enter your email'
                            style={styles.textInput}
                            value={email}
                            onChangeText={(text) => { setEmail(text) }}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <FontAwesome name="lock" size={26} color="gray" style={{ marginHorizontal: 5 }} />
                        <TextInput
                            placeholder='Enter your password'
                            style={styles.textInput}
                            value={password}
                            onChangeText={(text) => { setPassword(text) }}
                            secureTextEntry={true}
                        />
                    </View>

                    <View style={styles.bottomContainer}>
                        <Text>Keep me logged in</Text>
                        <Text
                            style={{
                                color: "#007FFF",
                                fontWeight: "500"
                            }}
                        >Forgot password</Text>
                    </View>

                    <View style={{ marginTop: 60 }} />
                    <Pressable
                        onPress={handleLogin}
                        style={styles.loginButton}
                    >
                        <Text style={styles.loginButtonText}>Login</Text>
                    </Pressable>
                    <Pressable onPress={() => { router.replace("/register") }} style={{ marginTop: 12 }}>
                        <Text style={styles.signupText}>Don't have an account? Sign up</Text>
                    </Pressable>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default login

const styles = StyleSheet.create({
    safeAreaView: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center'
    },
    container: {

    },
    heading: {
        fontSize: 18,
        fontWeight: 600,
        color: '#0066B2'
    },
    subHeading: {
        fontSize: 16,
        fontWeight: 600,
        marginTop: 20
    },
    textInput: {
        color: 'gray',
        marginVertical: 10,
        width: 300
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
        backgroundColor: "#E0E0E0",
        padding: 5,
        borderRadius: 5,
        marginTop: 30
    },
    bottomContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "space-between",
        marginTop: 12
    },
    loginButton: {
        width: 200,
        backgroundColor: "#6699CC",
        padding: 15,
        borderRadius: 10,
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    loginButtonText: {
        color: "white",
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center'
    },
    signupText: {
        color: "gray",
        fontSize: 12,
        textAlign: 'center'
    }
})