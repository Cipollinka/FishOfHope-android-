import React, { useEffect, useRef, useState } from 'react';
import { View, FlatList, Animated, Text, TouchableOpacity, ImageBackground, Dimensions, Image, Platform, TextInput, SafeAreaView } from 'react-native';
import { styled } from 'nativewind';
import fishOnboardingDataFile from '../components/fishOnboardingDataFile';
import { useNavigation } from '@react-navigation/native';
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledView = styled(View);

const fontMontserReg = 'Montserrat-Regular';
const fontMontserSemBold = 'Montserrat-SemiBold';
const fontInterRegular = 'Inter18pt-Regular';

const chapterTexts = {
  win: 'Finn gently frees the small fish from the plastic, who thanks her and promises to help warn others about the dangers of the floating debris. Finn feels proud, knowing she made a difference, and decides to be more alert for any trash that might threaten her friends.',
  lost: 'Finn swims away from the debris but feels a twinge of guilt, knowing it may continue to harm other fish. Later, she hears that one of her friends was hurt by the same plastic wrapper. Finn regrets not taking action, realizing that even small efforts can help make her world safer.',
}

const OnboardingScreen = () => {
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
      source={answer === 'correct' ? require('../assets/images/backgroundImages/winBg1.png') : answer === 'uncorrect' ? require('../assets/images/backgroundImages/lostBg1.png') : require('../assets/images/backgroundImages/fishBg.png')}
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




        <Image
          resizeMode="contain"
          source={require('../assets/images/onboardingImagesVerde/fish1.png')}
          style={{

            height: '46%',
            width: '64%',
            position: 'absolute',
            bottom: currentIndex === 0 ? '25%' : '55%',
            right: '-7%',
            opacity: currentIndex !== 2 ? 1 : 0,
          }}
        />
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
                onPress={() => { setAnswer('correct'); scrollNext(); }}
                style={{
                  zIndex: 50,
                  height: '45%', 
                  width: '100%',
                  justifyContent: 'center', 
                  alignItems: 'center', 
                }}>
                <Image
                  resizeMode="contain"
                  source={require('../assets/images/onboardingImagesVerde/scr2-messageTop.png')}
                  style={{
                    height: '75%',
                    width: '95%',
                    zIndex: 0,
                  }}
                />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => { setAnswer('uncorrect'); scrollNext(); }}
                style={{
                  zIndex: 50,
                  top: '-14%',
                  height: '45%', 
                  width: '100%',
                  justifyContent: 'center', 
                  alignItems: 'center', 
                }}>
                <Image
                  resizeMode="contain"
                  source={require('../assets/images/onboardingImagesVerde/scr2-messageBottom.png')}
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
                  top: '0%',
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
                  bottom: '25%',
                  color: 'black',
                  fontSize: dimensions.width < 380 ? dimensions.width * 0.04 : dimensions.width * 0.043,
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
              height: '48.1%',
              opacity: 0.88,
              alignItems: 'center',
              backgroundColor: answer === 'correct' ? '#00D207' : '#FF0000',
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
              height: '47.5%',
              alignItems: 'center',
              backgroundColor: 'white',
              padding: 10,
              borderRadius: 10,
              borderTopLeftRadius: dimensions.width * 0.07,
              borderTopRightRadius: dimensions.width * 0.07,

            }}>
              <View style={{ position: 'relative' }} >
                <Image
                  source={answer === 'correct' ? require('../assets/icons/winIcon.png') : require('../assets/icons/looseIcon.png')}
                  style={{
                    width: dimensions.width * 0.12,
                    height: dimensions.width * 0.12,
                    top: '-17%',
                    left: '33%',
                    textAlign: 'center',
                    position: 'absolute',

                  }}
                  resizeMode="contain"
                />

                <Text
                  style={{
                    fontStyle: 'italic',
                    fontSize: dimensions.width * 0.055,
                    fontWeight: '700',
                    maxWidth: '80%',
                    color: answer === 'correct' ? '#00D207' : '#FF0000',
                    textAlign: 'left',
                    marginTop: '3%',

                  }}>
                  Chapter 1 Outcome:
                </Text>
                <Text
                  style={{
                    color: 'black',
                    fontFamily: fontMontserReg,
                    maxWidth: '80%',
                    textAlign: 'left',
                    fontSize:  dimensions.width * 0.04,
                    marginTop: '3%',

                  }}>
                  {answer === 'correct' ? chapterTexts.win : chapterTexts.lost}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                  navigation.replace('OnboardingScreen2');
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
                    fontSize: fishOnboardingDataFile.length - 1 ?
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
          data={fishOnboardingDataFile}
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
            fontSize: fishOnboardingDataFile.length - 1 ?
              dimensions.width * 0.04 : dimensions.width * 0.05,
          }}>
          Next
        </Text>
      </StyledTouchableOpacity>

    </StyledView>
  );
};

export default OnboardingScreen;
