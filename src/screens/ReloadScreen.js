import { View, Text, Image, Dimensions, StyleSheet, TouchableOpacity, SafeAreaView, Share, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNRestart from 'react-native-restart';

const ReloadScreen = ({ setSelectedPage }) => {
    const [dimensions, setDimensions] = useState(Dimensions.get('window'));
    const [isReloading, setIsReloading] = useState(false);
    const [dots, setDots] = useState('');

    useEffect(() => {
        const interval = setInterval(() => {
            setDots(prevDots => (prevDots.length < 3 ? prevDots + '.' : ''));
        }, 250);

        return () => clearInterval(interval);
    }, []);

    const clearAsyncStorage = async () => {
        try {
            await AsyncStorage.clear();
            RNRestart.Restart();
            console.log('AsyncStorage очищено');
        } catch (error) {
            console.error('Помилка при очищенні AsyncStorage', error);
        }
    };

    const ShareApp = async () => {
        try {

            await Share.share({
                message: `Join FishOfHope! Download the app now!`,
            });
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <View style={{ marginBottom: 100, width: '100%', height: '150%', backgroundColor: 'white', marginTop: '-30%' }}>
            {isReloading ? (
                <View>
                    <Text
                        style={{
                            fontFamily: 'Inter_18pt-Italic',
                            textAlign: "center",
                            fontSize: dimensions.width < 380 ? dimensions.width * 0.05 : dimensions.width * 0.07,
                            fontWeight: 700,
                            color: '#3991F5',
                            marginTop: '80%',
                            paddingBottom: 8,
                        }}
                    >

                        Reloading{dots}
                    </Text>
                    <Text
                        style={{
                            textAlign: "center",
                            fontSize: dimensions.width * 0.04,
                            fontWeight: 400,
                            color: '#black',
                            paddingBottom: 8,
                            fontStyle: 'italic',
                            marginTop: '3%',
                        }}
                    >

                        Wait for app reload
                    </Text>
                </View>

            ) : (
                <View>

                    <Text
                        style={{
                            fontFamily: 'Inter_18pt-Italic',
                            textAlign: "center",
                            fontSize: dimensions.width < 380 ? dimensions.width * 0.05 : dimensions.width * 0.07,
                            fontWeight: 700,
                            color: '#3991F5',
                            marginTop: '80%',
                            paddingBottom: 8,
                        }}
                    >
                        Reload Finn Story
                    </Text>
                    <Text
                        style={{
                            fontFamily: 'Inter_18pt-Italic',
                            textAlign: "center",
                            fontSize: dimensions.width * 0.04,
                            fontWeight: 400,
                            color: 'black',
                            marginTop: '3%',
                            paddingBottom: 8,
                            width: '85%',
                            alignSelf: 'center',
                        }}
                    >
                        Are you sure want to reload Finn Fish Story? You gonna lose all your progress
                    </Text>
                    <View style={{
                        flexDirection: 'row',
                        alignSelf: 'center',
                        paddingBottom: dimensions.width * 0.03,
                        justifyContent: 'center',
                        width: '95%',
                    }}>

                        <TouchableOpacity
                            onPress={() => setSelectedPage('Home')}
                            style={{ alignItems: 'center', padding: 8 }}
                        >
                            <View style={{
                                alignItems: 'center',
                                backgroundColor: '#3991F5',
                                padding: 16,
                                justifyContent: 'center',
                                borderRadius: dimensions.width * 0.04,

                                flexDirection: 'row',
                            }}>
                                <Text
                                    style={{
                                        textAlign: "center",
                                        fontSize: dimensions.width * 0.037,
                                        fontWeight: '700',
                                        fontStyle: 'italic',
                                        paddingHorizontal: dimensions.width * 0.05,
                                        color: 'white',
                                    }}
                                >
                                    Cancel
                                </Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => {
                                setTimeout(() => {
                                    clearAsyncStorage()

                                }, 3000)
                                setIsReloading(true);
                            }}
                            style={{ alignItems: 'center', padding: 8 }}
                        >
                            <View style={{
                                alignItems: 'center',
                                backgroundColor: '#444444',
                                padding: 16,
                                justifyContent: 'center',
                                borderRadius: dimensions.width * 0.04,

                                flexDirection: 'row',
                            }}>

                                <Text
                                    style={{
                                        textAlign: "center",
                                        fontSize: dimensions.width * 0.037,
                                        fontWeight: '700',
                                        fontStyle: 'italic',
                                        paddingHorizontal: dimensions.width * 0.05,
                                        color: 'white',
                                    }}
                                >
                                    Reload
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                        onPress={() => ShareApp()}
                        style={{ alignItems: 'center', padding: 8 }}
                    >
                        <Text
                            style={{

                                textAlign: "center",
                                fontSize: dimensions.width * 0.05,
                                fontWeight: '900',
                                fontStyle: 'italic',
                                paddingHorizontal: dimensions.width * 0.05,
                                color: '#3991F5',
                            }}
                        >
                            Share App
                        </Text>
                    </TouchableOpacity>
                </View>

            )}


        </View>
    );
};

const styles = StyleSheet.create({
    title: (dimensions) => ({
        color: 'white',
        fontFamily: 'MochiyPopOne-Regular',
        fontSize: dimensions.width * 0.07,
        marginBottom: 20,
        textAlign: 'center',
    }),
    generalText: (dimensions) => ({
        fontFamily: 'InknutAntiqua-Regular',
        fontSize: dimensions.width * 0.08,
        color: '#FAEDE1',
        textAlign: 'center',
        textShadowColor: '#000',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 1,
    }),
});

export default ReloadScreen;