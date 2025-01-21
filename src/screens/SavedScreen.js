import { View, Text, Image, Dimensions, StyleSheet, TouchableOpacity, SafeAreaView, Share, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ArrowUpOnSquareIcon } from 'react-native-heroicons/solid';
import { styled } from 'nativewind';
import { ScrollView } from 'react-native-gesture-handler';

const fontMontserratRegular = 'Montserrat-Regular';
const fontMontserratSemiBold = 'Montserrat-SemiBold';

const SavedScreen = ({ selectedPage, savedRecomendations, savedFacts, setSavedRecomendations, setSavedFacts }) => {
    const [dimensions, setDimensions] = useState(Dimensions.get('window'));

    const shareFact = async (factTitle) => {
        try {
            if (!factTitle) {
                Alert.alert('Error', 'No fact here');
                return;
            }
            await Share.share({
                message: `My saved fact is '${factTitle}'`,
            });
        } catch (error) {
            console.error('Error fact:', error);
        }
    };

    const shareRecomendation = async (recTitle) => {
        try {
            if (!recTitle) {
                Alert.alert('Error', 'No recomendation here');
                return;
            }
            await Share.share({
                message: `My saved recomendation is '${recTitle}'`,
            });
        } catch (error) {
            console.error('Error recomendation:', error);
        }
    };

    const handleDeleteFact = async (id) => {
        try {
            const updatedFacts = savedFacts.filter(fact => fact.id !== id);
            setSavedFacts(updatedFacts);
            await AsyncStorage.setItem('savedFacts', JSON.stringify(updatedFacts));
        } catch (error) {
            console.error("Error deleting fact:", error);
        }
    };

    const handleDeleteRecomendation = async (id) => {
        try {
            const updatedRecs = savedRecomendations.filter(rec => rec.id !== id);
            setSavedRecomendations(updatedRecs);
            await AsyncStorage.setItem('savedRecomendations', JSON.stringify(updatedRecs));
        } catch (error) {
            console.error("Error deleting recomendation:", error);
        }
    };
    return (
        <View style={{ marginBottom: 100, width: '100%', height: '150%', backgroundColor: 'white', marginTop: '-30%' }}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={{ marginTop: '28%' }}
            >
                <View style={{
                    flex: 1,
                    maxHeight: dimensions.width < 380 ? '75%' : '80%',
                    borderRadius: dimensions.width * 0.05,
                    position: 'relative',
                    marginBottom: dimensions.width < 380 ? dimensions.height * 0.44 : dimensions.height * 0.4,
                    width: '95%',
                    alignSelf: 'center',
                }}>
                    <Text
                        style={{
                            fontFamily: 'Inter_18pt-Italic',
                            textAlign: "left",
                            fontSize: dimensions.width < 380 ? dimensions.width * 0.05 : dimensions.width * 0.07,
                            fontWeight: 800,
                            color: '#3991F5',
                            marginTop: '3%',
                            paddingBottom: 8,
                            marginLeft: '3%'
                        }}
                    >
                        SAVED FACTS
                    </Text>
                    {savedFacts.length === 0 ? (
                        <View style={{
                            width: '95%',
                            backgroundColor: 'white',
                            alignSelf: 'center',
                            position: 'relative',
                            borderRadius: dimensions.width * 0.04,
                            marginTop: dimensions.height * 0.01,
                            borderWidth: 4.6,
                            borderColor: '#6DC6FF',
                        }}>
                            <View style={{
                                width: '100%',
                                alignSelf: 'center',
                                paddingVertical: dimensions.width * 0.04,
                                paddingHorizontal: dimensions.width * 0.04,
                            }}>
                                <Text
                                    style={{
                                        textAlign: "center",
                                        fontSize: dimensions.width * 0.05,
                                        paddingBottom: dimensions.width * 0.02,
                                        fontWeight: 800,
                                        fontFamily: fontMontserratSemiBold,
                                        color: '#3991F5',
                                    }}
                                >
                                    Save some facts to see them here
                                </Text>
                            </View>
                        </View>
                    ) : (
                        savedFacts.map((fact, index) => (
                            <View key={fact.id} style={{
                                width: '95%',
                                backgroundColor: 'white',
                                alignSelf: 'center',
                                position: 'relative',
                                borderRadius: dimensions.width * 0.04,
                                marginTop: dimensions.height * 0.01,
                                borderWidth: 4.6,
                                borderColor: '#6DC6FF',
                                marginBottom: dimensions.height * 0.03,

                            }}>
                                <View style={{
                                    width: '100%',
                                    alignSelf: 'center',
                                    paddingVertical: dimensions.width * 0.04,
                                    paddingHorizontal: dimensions.width * 0.04,
                                }}>
                                    <View style={{ flexDirection: 'row', paddingLeft: '3%' }}>
                                        <Image
                                            source={require('../assets/icons/infoIcon.png')}
                                            style={{
                                                width: dimensions.width * 0.064,
                                                height: dimensions.width * 0.064,
                                                marginRight: dimensions.width * 0.02,
                                                top: '0%',
                                                textAlign: 'center'
                                            }}
                                            resizeMode="contain"
                                        />
                                        <Text
                                            style={{
                                                textAlign: "center",
                                                fontSize: dimensions.width * 0.05,
                                                paddingBottom: dimensions.width * 0.02,
                                                fontWeight: 700,
                                                fontStyle: 'italic',
                                                color: '#3991F5',
                                            }}
                                        >
                                            {fact.pollutionTitle}
                                        </Text>
                                    </View>
                                    <Text
                                        style={{
                                            fontFamily: fontMontserratRegular,
                                            textAlign: "left",
                                            fontSize: dimensions.width < 380 ? dimensions.width * 0.034 : dimensions.width * 0.037,
                                            fontWeight: 400,
                                            color: 'black',
                                            left: '3%',
                                        }}
                                    >
                                        {fact.pollution}
                                    </Text>
                                    <View style={{ flexDirection: 'row', paddingLeft: '3%', marginTop: '5%' }}>
                                        <Image
                                            source={require('../assets/icons/correctIcon.png')}
                                            style={{
                                                width: dimensions.width * 0.064,
                                                height: dimensions.width * 0.064,
                                                marginRight: dimensions.width * 0.02,
                                                top: '0%',
                                                textAlign: 'center'
                                            }}
                                            resizeMode="contain"
                                        />
                                        <Text
                                            style={{
                                                textAlign: "center",
                                                fontSize: dimensions.width * 0.05,
                                                paddingBottom: dimensions.width * 0.02,
                                                fontWeight: 800,
                                                fontStyle: 'italic',
                                                color: '#00D207',
                                            }}
                                        >
                                            Solution:
                                        </Text>
                                    </View>
                                    <Text
                                        style={{
                                            fontFamily: fontMontserratRegular,
                                            textAlign: "left",
                                            fontSize: dimensions.width < 380 ? dimensions.width * 0.034 : dimensions.width * 0.037,
                                            fontWeight: 400,
                                            color: 'black',
                                            left: '3%',
                                        }}
                                    >
                                        {fact.sollution}
                                    </Text>
                                </View>
                                <View style={{
                                    flexDirection: 'row',
                                    alignSelf: 'center',
                                    paddingBottom: dimensions.width * 0.03,
                                    justifyContent: 'center',
                                    width: '95%',
                                }}>
                                    <TouchableOpacity
                                        style={{ alignItems: 'center', padding: 8 }}
                                        onPress={() => shareFact(fact.pollutionTitle)}
                                    >
                                        <View style={{
                                            alignItems: 'center',
                                            backgroundColor: '#3991F5',
                                            padding: 16,
                                            justifyContent: 'center',
                                            borderRadius: dimensions.width * 0.04,
                                            flexDirection: 'row',
                                        }}>
                                            <Image
                                                source={require('../assets/icons/shareIcon.png')}
                                                style={{
                                                    width: dimensions.width * 0.064,
                                                    height: dimensions.width * 0.064,
                                                    top: '0%',
                                                    textAlign: 'center'
                                                }}
                                                resizeMode="contain"
                                            />
                                            <Text
                                                style={{
                                                    fontWeight: 800,
                                                    fontStyle: 'italic',
                                                    textAlign: "center",
                                                    fontSize: dimensions.width * 0.037,
                                                    fontWeight: 'bold',
                                                    paddingHorizontal: dimensions.width * 0.05,
                                                    color: 'white',
                                                }}
                                            >
                                                Share
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => handleDeleteFact(fact.id)}
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
                                            <Image
                                                source={require('../assets/icons/saveIcon.png')}
                                                style={{
                                                    width: dimensions.width * 0.064,
                                                    height: dimensions.width * 0.064,
                                                    top: '0%',
                                                    textAlign: 'center'
                                                }}
                                                resizeMode="contain"
                                            />
                                            <Text
                                                style={{
                                                    fontWeight: 800,
                                                    fontStyle: 'italic',
                                                    textAlign: "center",
                                                    fontSize: dimensions.width * 0.037,
                                                    fontWeight: 'bold',
                                                    paddingHorizontal: dimensions.width * 0.05,
                                                    color: 'white',
                                                }}
                                            >
                                                Saved
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        ))
                    )}
                    <Text
                        style={{
                            fontFamily: 'Inter_18pt-Italic',
                            textAlign: "left",
                            fontSize: dimensions.width * 0.066,
                            fontWeight: 800,
                            color: '#3991F5',
                            paddingBottom: 8,
                            marginTop: '7%',
                            marginLeft: '3%'
                        }}
                    >
                        SAVED RECOMENDATIONS
                    </Text>
                    {savedRecomendations.length === 0 ? (
                        <View style={{
                            width: '95%',
                            backgroundColor: 'white',
                            alignSelf: 'center',
                            position: 'relative',
                            borderRadius: dimensions.width * 0.04,
                            marginTop: dimensions.height * 0.01,
                            borderWidth: 4.6,
                            borderColor: '#6DC6FF',
                        }}>
                            <View style={{
                                width: '100%',
                                alignSelf: 'center',
                                paddingVertical: dimensions.width * 0.04,
                                paddingHorizontal: dimensions.width * 0.04,
                            }}>
                                <Text
                                    style={{
                                        textAlign: "center",
                                        fontSize: dimensions.width * 0.05,
                                        paddingBottom: dimensions.width * 0.02,
                                        fontWeight: 800,
                                        fontFamily: fontMontserratSemiBold,
                                        color: '#3991F5',
                                    }}
                                >
                                    Save some recommendations to see them here
                                </Text>
                            </View>
                        </View>
                    ) : (
                        savedRecomendations.map((recomendation, index) => (
                            <View key={recomendation.id} style={{
                                width: '95%',
                                alignSelf: 'center',
                                backgroundColor: 'white',
                                borderRadius: dimensions.width * 0.04,
                                borderWidth: 4.6,
                                borderColor: '#6DC6FF',
                                marginBottom: dimensions.height * 0.01,
                            }}>
                                <View style={{
                                    width: '100%',
                                    backgroundColor: 'white',
                                    position: 'relative',
                                    borderRadius: dimensions.width * 0.04,
                                }}>
                                    <View style={{
                                        width: '100%',
                                        alignSelf: 'center',
                                        paddingBottom: dimensions.width * 0.04,
                                        paddingHorizontal: dimensions.width * 0.04,
                                    }}>
                                        <View style={{ flexDirection: 'row', paddingLeft: '3%', marginTop: '5%' }}>
                                            <Image
                                                source={require('../assets/icons/likeIcon.png')}
                                                style={{
                                                    width: dimensions.width * 0.064,
                                                    height: dimensions.width * 0.064,
                                                    marginRight: dimensions.width * 0.02,
                                                    top: '0%',
                                                    textAlign: 'center'
                                                }}
                                                resizeMode="contain"
                                            />
                                            <Text
                                                style={{
                                                    textAlign: "center",
                                                    fontSize: dimensions.width * 0.05,
                                                    paddingBottom: dimensions.width * 0.02,
                                                    fontWeight: 800,
                                                    fontStyle: 'italic',
                                                    color: '#00D207',
                                                    width: '85%',
                                                }}
                                            >
                                                {recomendation.recomendationTitle}
                                            </Text>
                                        </View>
                                        <Text
                                            style={{
                                                fontFamily: fontMontserratRegular,
                                                textAlign: "center",
                                                fontSize: dimensions.width < 380 ? dimensions.width * 0.034 : dimensions.width * 0.037,
                                                fontWeight: 400,
                                                color: 'black',
                                            }}
                                        >
                                            {recomendation.recomendationDescription}
                                        </Text>
                                    </View>
                                    <View style={{
                                        flexDirection: 'row',
                                        alignSelf: 'center',
                                        paddingBottom: dimensions.width * 0.03,
                                        justifyContent: 'center',
                                        width: '95%',
                                    }}>
                                        <TouchableOpacity
                                            onPress={() => shareRecomendation(recomendation.recomendationTitle)}
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
                                                <Image
                                                    source={require('../assets/icons/shareIcon.png')}
                                                    style={{
                                                        width: dimensions.width * 0.064,
                                                        height: dimensions.width * 0.064,
                                                        top: '0%',
                                                        textAlign: 'center'
                                                    }}
                                                    resizeMode="contain"
                                                />
                                                <Text
                                                    style={{
                                                        fontWeight: 800,
                                                        fontStyle: 'italic',
                                                        textAlign: "center",
                                                        fontSize: dimensions.width * 0.037,
                                                        fontWeight: 'bold',
                                                        paddingHorizontal: dimensions.width * 0.05,
                                                        color: 'white',
                                                    }}
                                                >
                                                    Share
                                                </Text>
                                            </View>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            onPress={() => handleDeleteRecomendation(recomendation.id)}
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
                                                <Image
                                                    source={require('../assets/icons/saveIcon.png')}
                                                    style={{
                                                        width: dimensions.width * 0.064,
                                                        height: dimensions.width * 0.064,
                                                        top: '0%',
                                                        textAlign: 'center'
                                                    }}
                                                    resizeMode="contain"
                                                />
                                                <Text
                                                    style={{
                                                        fontWeight: 800,
                                                        fontStyle: 'italic',
                                                        textAlign: "center",
                                                        fontSize: dimensions.width * 0.037,
                                                        fontWeight: 'bold',
                                                        paddingHorizontal: dimensions.width * 0.05,
                                                        color: 'white',
                                                    }}
                                                >
                                                    Save
                                                </Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        ))
                    )}
                </View>
            </ScrollView>
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

export default SavedScreen;