import React, { useEffect, useRef, useState } from 'react';
import { View, FlatList, Animated, Text, TouchableOpacity, ImageBackground, Dimensions, Image, Platform, TextInput, SafeAreaView } from 'react-native';
import { styled } from 'nativewind';
import fishOnboardingData2 from '../components/fishOnboardingData2';
import { useNavigation } from '@react-navigation/native';


const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledView = styled(View);

const fontMontserReg = 'Montserrat-Regular';
const fontMontserSemBold = 'Montserrat-SemiBold';
const fontInterRegular = 'Inter_18pt-Regular';

const chapterTexts = {
  win1: 'Finn gently frees the small fish from the plastic, who thanks her and promises to help warn others about the dangers of the floating debris. Finn feels proud, knowing she made a difference, and decides to be more alert for any trash that might threaten her friends.',
  win2: 'Finn’s friend, an old turtle named Shelldon, shares stories about humans and their boats. He explains how oil spills can harm the coral and advises Finn to spread awareness. Finn and Shelldon warn other sea creatures, who begin keeping a safe distance from the murky waters.',
}

const OnboardingScreen2 = () => {
  const [answer, setAnswer] = useState('');
  const scrollX = useRef(new Animated.Value(0)).current;
  const [dimensions, setDimensions] = useState(Dimensions.get('window'));
  const [currentIndex, setCurrentIndex] = useState(0);
  const slidesRef = useRef(null);
  const navigation = useNavigation();
  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const scrollNext = () => {
    slidesRef.current.scrollToIndex({ index: currentIndex + 1 });
  };


  useEffect(() => {
    const onChange = ({ window }) => {
      setDimensions(window);
    };
    const dimensionListener = Dimensions.addEventListener('change', onChange);
    return () => {
      dimensionListener.remove();
    };

  }, []);

  const viewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems && viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;


  const renderItem = ({ item }) => (
    <ImageBackground
      source={currentIndex === 0 ? require('../assets/images/backgroundImages/onboardingBg2.png') : answer !== '' ? require('../assets/images/backgroundImages/onboarding2Bg3.png') : require('../assets/images/backgroundImages/onboarding2Bg2.png')}
      style={{ flex: 1, alignItems: 'center', justifyContent: 'space-between' }}
      resizeMode="cover"
    >

      <SafeAreaView style={{
        width: dimensions.width,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        position: 'relative',

      }} >
        {currentIndex === 0 && (

          <View style={{
            alignItems: 'center',
            height: dimensions.width < 380 ? '46%' : '43%',
            zIndex: 0,
            width: '90%',
            alignSelf: 'center',
            backgroundColor: 'white',
            marginTop: '10%',
            borderRadius: '8%',
          }}>

            <Text
              style={{
                fontSize: dimensions.width * 0.05,
                fontStyle: 'italic',
                maxWidth: '90%',
                color: '#3991F5',
                marginTop: 21,
                textAlign: 'left',
                fontWeight: 'bold',
                right: '5%'
              }}>
              {item.title}
            </Text>
            <Text
              style={{
                fontFamily: fontInterRegular,
                fontSize: dimensions.width < 400 ? dimensions.width * 0.04 : dimensions.width * 0.045,
                maxWidth: '80%',
                color: 'black',
                textAlign: 'left',
                marginTop: currentIndex === 0 ? 8 : '10%',

              }}>
              {item.description}
            </Text>
          </View>
        )}
        {currentIndex === 1 && (
          <View style={{
            flexDirection: 'row', justifyContent: 'space-between', width: '100%', position: 'absolute',
            bottom: '16%', alignSelf: 'center',
            left: '-7%', height: '64%'
          }}>
            <Image
              resizeMode="contain"
              source={require('../assets/images/onboardingImagesVerde/fish2.png')}
              style={{
                height: '46%',
                width: '64%',
                position: 'absolute',
                bottom: '25%',
                left: '-8%'
              }}
            />
            <View style={{
              height: '46%',
              width: '64%',
              position: 'absolute',
              bottom: '14%',
              right: '-5%',

            }}>
              <TouchableOpacity
                onPress={() => { setAnswer('answer1'); scrollNext(); }}
                style={{
                  zIndex: 50,
                  height: '45%',
                  width: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  resizeMode="contain"
                  source={require('../assets/images/onboardingImagesVerde/messageTop2.png')}
                  style={{
                    height: '75%',
                    width: '95%',
                    zIndex: 0,
                  }}
                />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => { setAnswer('answer2'); scrollNext(); }}
                style={{
                  zIndex: 50,
                  top: '-7%',
                  height: '45%',
                  width: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  resizeMode="contain"
                  source={require('../assets/images/onboardingImagesVerde/messageBottom2.png')}
                  style={{
                    height: '75%',
                    width: '95%',
                  }}
                />
              </TouchableOpacity>
            </View>

          </View>
        )}
        {currentIndex === 1 && (

          <View style={{
            position: 'absolute',
            bottom: '0%',
            width: '100%',
            height: '25.5%',
            opacity: 0.88,
            alignItems: 'center',
            backgroundColor: '#3991F5',
            padding: 10,
            borderRadius: 10,
            borderTopLeftRadius: dimensions.width * 0.07,
            borderTopRightRadius: dimensions.width * 0.07,
            zIndex: -1,
          }}></View>
        )}
        {currentIndex === 1 && (

          <View style={{
            zIndex: 1,
            position: 'absolute',
            bottom: '0%',
            width: '100%',
            height: '25%',
            alignItems: 'center',
            backgroundColor: 'white',

            padding: 10,
            borderRadius: 10,
            borderTopLeftRadius: dimensions.width * 0.07,
            borderTopRightRadius: dimensions.width * 0.07,
          }}>
            <View style={{ flexDirection: 'row' }} >
              <Image
                source={require('../assets/icons/infoIcon.png')}
                style={{
                  width: dimensions.width * 0.08,
                  height: dimensions.width * 0.08,
                  top: '10%',
                  textAlign: 'center'
                }}
                resizeMode="contain"
              />

              <Text
                style={{
                  fontFamily: fontMontserReg,
                  maxWidth: '80%',
                  textAlign: 'left',
                  marginTop: currentIndex === 0 ? 8 : '10%',
                  bottom: '21%',
                  color: 'black',
                  fontSize:  dimensions.width * 0.04,
                  left: '3%',

                }}>
                {item.bottomText}
              </Text>
            </View>

          </View>
        )}

        {currentIndex === 2 && (
          <View style={{
            position: 'absolute',
            bottom: '0%',
            width: '100%',
            height: '100%',
          }}>
            <View style={{
              position: 'absolute',
              bottom: '0%',
              width: '100%',
              height: '55.5%',
              opacity: 0.88,
              alignItems: 'center',
              backgroundColor: '#00D207',
              padding: 10,
              borderRadius: 10,
              borderTopLeftRadius: dimensions.width * 0.07,
              borderTopRightRadius: dimensions.width * 0.07,
              zIndex: -1,
            }}></View>

            <View style={{
              zIndex: 1,
              position: 'absolute',
              bottom: '0%',
              width: '100%',
              height: '55%',
              alignItems: 'center',
              backgroundColor: 'white',
              padding: 10,
              borderRadius: 10,
              borderTopLeftRadius: dimensions.width * 0.07,
              borderTopRightRadius: dimensions.width * 0.07,

            }}>
              <View style={{ position: 'relative' }} >
                <Image
                  source={require('../assets/icons/winIcon.png')}
                  style={{
                    width: dimensions.width * 0.12,
                    height: dimensions.width * 0.12,
                    top: '-14%',
                    left: '33%',
                    textAlign: 'center',
                    position: 'absolute',

                  }}
                  resizeMode="contain"
                />
                {answer === 'answer2' && (
                  <Image
                    source={require('../assets/images/onboardingImagesVerde/turtle.png')}
                    style={{
                      width: dimensions.width * 0.4,
                      height: dimensions.width * 0.4,
                      top: '-52%',
                      right: '-12%',
                      textAlign: 'center',
                      position: 'absolute',

                    }}
                    resizeMode="contain"
                  />
                )}


                <Text
                  style={{
                    fontStyle: 'italic',
                    fontSize: dimensions.width * 0.04,
                    fontWeight: 'bold',
                    maxWidth: '80%',
                    color: '#00D207',
                    textAlign: 'left',
                    marginTop: '3%',

                  }}>
                  Chapter 2 Outcome:
                </Text>
                <Text
                  style={{
                    color: 'black',
                    fontFamily: fontMontserReg,
                    maxWidth: '80%',
                    textAlign: 'left',
                    fontSize: dimensions.width < 380 ? dimensions.width * 0.04 : dimensions.width * 0.046,
                    marginTop: '3%',

                  }}>
                  {answer === 'answer1' ? chapterTexts.win1 : chapterTexts.win2}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                  navigation.replace('OnboardingScreen3');
                }}
                style={{
                  left: '10%',
                  top: '5%',
                  alignSelf: 'left',
                  backgroundColor: '#3991F5',
                  borderRadius: dimensions.width * 0.04,
                  paddingHorizontal: 28,
                  paddingVertical: 14,
                  width: '50%',

                }}
              >
                <Text
                  style={{
                    fontFamily: fontMontserSemBold,
                    color: 'white',
                    fontSize: fishOnboardingData2.length - 1 ?
                      dimensions.width * 0.04 : dimensions.width * 0.05,
                    fontWeight: 600,
                    textAlign: 'center',
                  }}>
                  Next chapter
                </Text>
              </TouchableOpacity>

            </View>

          </View>
        )}

      </SafeAreaView>
    </ImageBackground>
  );

  return (
    <StyledView
      style={{ justifyContent: 'space-between', flex: 1, backgroundColor: '#06263D', alignItems: 'center', }}
    >
      <StyledView style={{ display: 'flex' }}>
        <FlatList
          data={fishOnboardingData2}
          renderItem={renderItem}
          showsHorizontalScrollIndicator={false}
          horizontal
          keyExtractor={(item) => item.id.toString()}
          pagingEnabled
          bounces={false}
          scrollEnabled={currentIndex === 0}
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
            useNativeDriver: false,
          })}
          onViewableItemsChanged={viewableItemsChanged}
          scrollEventThrottle={32}
          viewabilityConfig={viewConfig}
          ref={slidesRef}
        />
      </StyledView>

      <StyledTouchableOpacity
        disabled={currentIndex !== 0}
        onPress={() => {
          scrollNext();
        }}
        style={{
          bottom: '12%',
          borderRadius: 1000,
          alignSelf: 'center',
          backgroundColor: '#3991F5',
          paddingHorizontal: 28,
          opacity: currentIndex !== 0 ? 0 : 0.85,
          marginBottom: 40,
          paddingVertical: 21,
          width: '50%',

        }}
      >
        <Text
          style={{
            textAlign: 'center', fontWeight: 600,
            fontFamily: fontMontserSemBold,
            color: 'white',
            fontSize: fishOnboardingData2.length - 1 ?
              dimensions.width * 0.04 : dimensions.width * 0.05,
          }}>
          Next
        </Text>
      </StyledTouchableOpacity>

    </StyledView>
  );
};

export default OnboardingScreen2;
