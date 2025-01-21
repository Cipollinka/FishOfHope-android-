import { View, Text, Image, Dimensions, StyleSheet, TouchableOpacity, SafeAreaView, Share, Alert } from 'react-native';
import React, { useEffect, useMemo, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { styled } from 'nativewind';
import { ScrollView } from 'react-native-gesture-handler';

const fontMontserratRegular = 'Montserrat-Regular';

const RecommendationsScreen = ({ selectedPage, savedRecomendations, setSavedRecomendations, recomendations }) => {
    const [dimensions, setDimensions] = useState(Dimensions.get('window'));

    const shareRecomendation = async (recTitle) => {
        try {
            if (!recTitle) {
                Alert.alert('Error', 'No recomendation here');
                return;
            }
            await Share.share({
                message: `Do you know about '${recTitle}'? No? Join FishOfHope and learn more about it!`,
            });
        } catch (error) {
            console.error('Error recomendation:', error);
        }
    };

    const saveRecomendation = async (recomendation) => {
        try {
            const savedReco = await AsyncStorage.getItem('savedRecomendations');
            const parsedReco = savedReco ? JSON.parse(savedReco) : [];

            const recoIndex = parsedReco.findIndex((recomend) => recomend.id === recomendation.id);

            if (recoIndex === -1) {
                const updatedRecos = [recomendation, ...parsedReco];
                await AsyncStorage.setItem('savedRecomendations', JSON.stringify(updatedRecos));
                setSavedRecomendations(updatedRecos);
                console.log('Recomendation збережена');
            } else {
                const updatedRecos = parsedReco.filter((recomend) => recomend.id !== recomendation.id);
                await AsyncStorage.setItem('savedRecomendations', JSON.stringify(updatedRecos));
                setSavedRecomendations(updatedRecos);
                console.log('Recomendation видалена');
            }
        } catch (error) {
            console.error('Помилка збереження/видалення локації:', error);
        }
    };

    const isRecomendationSaved = (recomendation) => {
        return savedRecomendations.some((rec) => rec.id === recomendation.id);
    };

    return (
        <View style={{ marginBottom: 100, height: '150%', backgroundColor: 'white', marginTop: '-30%' }}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={{ marginTop: '25%' }}
            >
                <View style={{
                    flex: 1,
                    maxHeight: dimensions.width < 380 ? '75%' : '80%',
                    borderRadius: dimensions.width * 0.05,
                    position: 'relative',
                    marginBottom: dimensions.width < 380 ? dimensions.height * 0.44 : dimensions.height * 0.4,
                    width: '95%',
                    alignSelf: 'center'
                }}>
                    <Text
                        style={{
                            fontFamily: 'Inter_18pt-Italic',
                            textAlign: "left",
                            fontSize: dimensions.width < 380 ? dimensions.width * 0.05 : dimensions.width * 0.07,
                            fontWeight: 800,
                            color: '#3991F5',
                            paddingBottom: 8,
                            marginTop: '7%',
                            left: '5%',

                        }}
                    >
                        RECOMENDATIONS
                    </Text>
                    <Text
                        style={{
                            fontFamily: 'Inter_18pt-Italic',
                            textAlign: "left",
                            fontSize: dimensions.width * 0.04,
                            fontWeight: 500,
                            color: '#828282',
                            paddingBottom: 8,
                            marginTop: '3%',
                            left: '5%',
                            width: '90%',
                            marginBottom: '3%',

                        }}
                    >
                        Every plastic bottle, bag, and wrapper that enters the water becomes a deadly threat to its inhabitants. You can change that! Use reusable items, sort your waste, and help keep our waters clean. Together, we can protect nature for future generations.
                    </Text>
                    {recomendations.map((recomendation, index) => (

                        <View key={recomendation.id} style={{
                            width: '95%',
                            alignSelf: 'center',
                            backgroundColor: 'white',
                            borderRadius: dimensions.width * 0.04,
                            borderWidth: 4.6,
                            borderColor: '#6DC6FF',
                            marginBottom: dimensions.width * 0.04,
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
                                                width: '85%'

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
                                        onPress={() => saveRecomendation(recomendation)}
                                        style={{ alignItems: 'center', padding: 8 }}
                                    >
                                        <View style={{
                                            alignItems: 'center',
                                            backgroundColor: isRecomendationSaved(recomendation) ? '#444444' : '#3991F5',
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
                    ))}

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

export default RecommendationsScreen;