import React, { useEffect, useRef, useState } from 'react';
import { View, FlatList, Animated, Text, TouchableOpacity, ImageBackground, Dimensions, Image, Platform, TextInput, SafeAreaView } from 'react-native';
import { styled } from 'nativewind';
import fishOnboardingData3 from '../components/fishOnboardingData3';
import { useNavigation } from '@react-navigation/native';


const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledView = styled(View);

const fontMontserReg = 'Montserrat-Regular';
const fontMontserSemBold = 'Montserrat-SemiBold';


const fontInterSemBoldItalic = 'Inter_18pt-SemiBoldItalic';
const fontInterRegular = 'Inter_18pt-Regular';

const chapterTexts = {
  win1: 'Finn gently frees the small fish from the plastic, who thanks her and promises to help warn others about the dangers of the floating debris. Finn feels proud, knowing she made a difference, and decides to be more alert for any trash that might threaten her friends.',
  win2: 'Finn’s friend, an old turtle named Shelldon, shares stories about humans and their boats. He explains how oil spills can harm the coral and advises Finn to spread awareness. Finn and Shelldon warn other sea creatures, who begin keeping a safe distance from the murky waters.',
}

const OnboardingScreen3 = () => {
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
      source={require('../assets/images/backgroundImages/onboardingBg3.png')}
      style={{ flex: 1, alignItems: 'center', justifyContent: 'space-between' }}
      resizeMode="cover"
    >

      <SafeAreaView style={{
        width: dimensions.width,
        flex: 1,
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'flex-start',
        position: 'relative',
        height: '100%'

      }} >



        <View style={{
          alignItems: 'center',
          height: currentIndex === 0 ? '55%' : '65%',
          zIndex: 0,
          width: '90%',
          alignSelf: 'center',
          backgroundColor: 'white',
          marginTop: '19%',
          borderRadius: '8%',
        }}>
          <Image
            source={item.image}
            style={{
              width: dimensions.width * 0.16,
              height: dimensions.width * 0.16,
              marginTop: '5%',
              textAlign: 'center'
            }}
            resizeMode="contain"
          />

          <Text
            style={{
              fontSize: dimensions.width * 0.05,
              fontFamily: fontInterSemBoldItalic,
              maxWidth: '90%',
              color: '#3991F5',
              marginTop: 21,
              textAlign: 'center',
              alignSelf: 'center',

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
              textAlign: 'center',
              marginTop: currentIndex === 0 ? 8 : '10%',

            }}>
            {item.description}
          </Text>


          <StyledTouchableOpacity
        onPress={() => {
          if(currentIndex === 0)
            scrollNext();
          else navigation.replace('Home')

        }}
        style={{
          borderRadius: dimensions.width * 0.04,
          alignSelf: 'center',
          backgroundColor: '#3991F5',
          paddingHorizontal: 28,

          marginTop: 40,
          paddingVertical: 16,
          width: '50%',

        }}
      >
        <Text
          style={{
            textAlign: 'center', fontWeight: 600,
            fontStyle: 'italic',
            fontWeight: 900,
            color: 'white',
            fontSize: fishOnboardingData3.length - 1 ?
              dimensions.width * 0.04 : dimensions.width * 0.05,
          }}>
          {currentIndex === 0 ? 'I`m in!' : 'Let`s Start!'}
        </Text>
      </StyledTouchableOpacity>
        </View>

      </SafeAreaView>
    </ImageBackground>
  );

  return (
    <StyledView
      style={{ justifyContent: 'space-between', flex: 1, backgroundColor: '#06263D', alignItems: 'center', }}
    >
      <StyledView style={{ display: 'flex' }}>
        <FlatList
          data={fishOnboardingData3}
          renderItem={renderItem}
          showsHorizontalScrollIndicator={false}
          horizontal
          keyExtractor={(item) => item.id.toString()}
          pagingEnabled
          bounces={false}
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
            useNativeDriver: false,
          })}
          onViewableItemsChanged={viewableItemsChanged}
          scrollEventThrottle={32}
          viewabilityConfig={viewConfig}
          ref={slidesRef}
        />
      </StyledView>

      

    </StyledView>
  );
};

export default OnboardingScreen3;
