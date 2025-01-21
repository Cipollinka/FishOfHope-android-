import React, { useEffect, useState, useMemo, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  Share,
  ScrollView,
  Alert,
  SafeAreaView,
  ImageBackground,

} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


import SavedScreen from './SavedScreen';
import RecommendationsScreen from './RecommendationsScreen';
import ReloadScreen from './ReloadScreen';




const dailyFacts = [
  {
    id: 1,
    pollutionTitle: 'Annual Pollution',
    pollution: 'Over 8 million tons of plastic enter the oceans each year, equivalent to a garbage truck dumping plastic every minute.',
    sollution: 'Reduce single-use plastic by choosing reusable bags and bottles.',

  },
  {
    id: 2,
    pollutionTitle: '"Garbage Patches" in the Ocean',
    pollution: "The Great Pacific Garbage Patch is a floating mass of waste larger than France, Germany, and Spain combined.",
    sollution: 'Support clean-up projects and properly dispose of waste.',

  },
  {
    id: 3,
    pollutionTitle: 'Microplastics in Water',
    pollution: "Microplastics are found in 94% of global water samples, affecting marine life from tiny fish to large mammals.",
    sollution: 'Avoid products containing microbeads, like certain cosmetics.',
  },
  {
    id: 4,
    pollutionTitle: 'Plastic Bags and Turtles',
    pollution: "Sea turtles often mistake plastic bags for jellyfish, leading to deadly health issues.",
    sollution: 'Use cloth bags instead of plastic ones.',

  },
  {
    id: 5,
    pollutionTitle: 'Threats to Coral Reefs',
    pollution: "Pollution, climate change, and chemicals are damaging coral reefs that support diverse marine life.",
    sollution: 'Use reef-safe sunscreen and support eco-friendly practices.',
  },
  {
    id: 6,
    pollutionTitle: 'Impact on Marine Mammals',
    pollution: "Thousands of dolphins, whales, and seals die each year from entanglement in plastic waste.",
    sollution: 'Dispose of fishing nets and gear responsibly.',
  },
  {
    id: 7,
    pollutionTitle: 'Chemicals in Waterways',
    pollution: "Pesticides and industrial chemicals pollute rivers, affecting both wildlife and drinking water.",
    sollution: 'Choose eco-friendly products and limit chemical use at home.',
  },
  {
    id: 8,
    pollutionTitle: 'Ocean Dead Zones',
    pollution: 'Fertilizer runoff causes algae blooms that create "dead zones," where little to no marine life can survive.',
    sollution: 'Reduce fertilizer use and support sustainable farming.',
  },
  {
    id: 9,
    pollutionTitle: 'Slow Decomposition',
    pollution: "Plastic can take over 400 years to break down, polluting the ocean for centuries.",
    sollution: 'Recycle plastic and switch to biodegradable alternatives.',
  },
  {
    id: 10,
    pollutionTitle: 'Human Health Risks',
    pollution: "Pollutants in seafood, like heavy metals and plastics, can impact human health.",
    sollution: 'Protect marine life by supporting sustainable seafood choices.',
  },
];


const recomendations = [
  {
    id: 1,
    recomendationTitle: 'Say No to Plastic Bags',
    recomendationDescription: 'Carry a reusable bag when you shop to reduce plastic waste that could end up in the ocean.',
  },
  {
    id: 2,
    recomendationTitle: 'Switch to Reusable Bottles',
    recomendationDescription: 'Use a refillable water bottle instead of single-use plastic ones to cut down on plastic pollution.',
  },
  {
    id: 3,
    recomendationTitle: 'Choose Eco-Friendly Cleaning Products',
    recomendationDescription: 'Opt for biodegradable or eco-friendly cleaners to prevent harmful chemicals from entering waterways.',
  },
  {
    id: 4,
    recomendationTitle: 'Avoid Products with Microbeads',
    recomendationDescription: 'Choose personal care products without microbeads, which pollute the water and harm marine life.',
  },
  {
    id: 5,
    recomendationTitle: 'Dispose of Trash Properly',
    recomendationDescription: 'Make sure all your waste goes in the right bins, especially near rivers, beaches, or lakes.',
  },
  {
    id: 6,
    recomendationTitle: 'Recycle Correctly',
    recomendationDescription: 'Follow local recycling guidelines to ensure plastics, metals, and paper are properly recycled.',
  },
  {
    id: 7,
    recomendationTitle: 'Reduce Meat Consumption',
    recomendationDescription: 'Reducing meat can lessen agricultural runoff that contributes to water pollution.',
  },
  {
    id: 8,
    recomendationTitle: 'Pick Up Litter When You See It',
    recomendationDescription: 'Small acts, like picking up litter on the street or beach, prevent it from reaching the ocean.',
  },
  {
    id: 9,
    recomendationTitle: 'Limit Fertilizer Use',
    recomendationDescription: 'Use minimal fertilizer in your garden to prevent chemical runoff into waterways.',
  },
  {
    id: 10,
    recomendationTitle: 'Support Sustainable Seafood',
    recomendationDescription: 'Choose sustainable seafood options to support ocean-friendly fishing practices.',
  },
]

const fontMontserratRegular = 'Montserrat-Regular';



const HomeScreen = () => {
  const [dimensions, setDimensions] = useState(Dimensions.get('window'));
  const [selectedPage, setSelectedPage] = useState('Home');


  const [todayDay, setTodayDay] = useState(1);
  const [todayFact, setTodayFact] = useState(null);
  const [todayRecomendation, setTodayRecomendation] = useState(null);
  const [savedRecomendations, setSavedRecomendations] = useState([]);
  const [savedFacts, setSavedFacts] = useState([]);


  useEffect(() => {
    const fetchSavedRecomendations = async () => {
      try {
        const saved = await AsyncStorage.getItem('savedRecomendations');
        setSavedRecomendations(saved ? JSON.parse(saved) : []);
      } catch (error) {
        console.error('Помилка  savedRecomendations:', error);
      }
    };

    fetchSavedRecomendations();

    const fetchSavedfacts = async () => {
      try {
        const saved = await AsyncStorage.getItem('savedFacts');
        setSavedFacts(saved ? JSON.parse(saved) : []);
      } catch (error) {
        console.error('Помилка завантаження facts:', error);
      }
    };

    fetchSavedfacts();


  }, [selectedPage,]);

  const saveRecomendation = async (recomendation) => {
    try {
      const saved = await AsyncStorage.getItem('savedRecomendations');
      const parsedRecomends = saved ? JSON.parse(saved) : [];

      const recomendIndex = parsedRecomends.findIndex((reco) => reco.id === recomendation.id);

      if (recomendIndex === -1) {
        const updatedRecomends = [recomendation, ...parsedRecomends];
        await AsyncStorage.setItem('savedRecomendations', JSON.stringify(updatedRecomends));
        setSavedRecomendations(updatedRecomends);
        console.log('Recomendation збережена');
      } else {
        const updatedRecomends = parsedRecomends.filter((loc) => loc.id !== recomendation.id);
        await AsyncStorage.setItem('savedRecomendations', JSON.stringify(updatedRecomends));
        setSavedRecomendations(updatedRecomends);
        console.log('Recomendation видалена');
      }
    } catch (error) {
      console.error('Помилка збереження/видалення локації:', error);
    }
  };



  const saveFact = async (thisFact) => {
    try {
      const saved = await AsyncStorage.getItem('savedFacts');
      const parsedFacts = saved ? JSON.parse(saved) : [];

      const factIndex = parsedFacts.findIndex((fact) => fact.id === thisFact.id);

      if (factIndex === -1) {
        const updatedFacts = [thisFact, ...parsedFacts];
        await AsyncStorage.setItem('savedFacts', JSON.stringify(updatedFacts));
        setSavedFacts(updatedFacts);
        console.log('Fact збережена');
      } else {
        const updatedFacts = parsedFacts.filter((fact) => fact.id !== thisFact.id);
        await AsyncStorage.setItem('savedFacts', JSON.stringify(updatedFacts));
        setSavedFacts(updatedFacts);
        console.log('Fact видалена');
      }
    } catch (error) {
      console.error('Помилка збереження/видалення локації:', error);
    }
  };

  const isRecomendationSaved = useMemo(() => {
    return todayRecomendation && savedRecomendations.some((rec) => rec.id === todayRecomendation.id);
  }, [todayRecomendation, savedRecomendations, selectedPage,]);

  const isFactSaved = useMemo(() => {
    return todayFact && savedFacts.some((fact) => fact.id === todayFact.id);
  }, [todayFact, savedFacts, selectedPage,]);

  useEffect(() => {
    const fetchThisCurTodayDay = async () => {
      try {
        const savedDay = await AsyncStorage.getItem('todayDay');
        if (savedDay !== null) {
          setTodayDay(parseInt(savedDay, 10));
        }
      } catch (error) {
        console.error('Помилка todayDay:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchThisCurTodayDay();
  }, []);

  useEffect(() => {
    if (recomendations[todayDay]) {
      setTodayRecomendation(recomendations.find(rec => rec.id === todayDay));
    }
    setTodayFact(dailyFacts.find(dailyFact => dailyFact.id === todayDay));
  }, [todayDay, selectedPage]);

  const shareFact = async () => {
    try {
      if (!todayFact) {
        Alert.alert('Error', 'No fact here');
        return;
      }
      await Share.share({
        message: `My today fact is '${todayFact.pollutionTitle}'`,
      });
    } catch (error) {
      console.error('Error fact:', error);
    }
  };

  const shareRecomendation = async () => {
    try {
      if (!todayRecomendation) {
        Alert.alert('Error', 'No recomendation here');
        return;
      }
      await Share.share({
        message: `My today recomendation is '${todayRecomendation.recomendationTitle}'`,
      });
    } catch (error) {
      console.error('Error recomendation:', error);
    }
  };

  return (
    <ImageBackground
      source={require('../assets/images/backgroundImages/mainBackground.png')}
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

        {selectedPage === 'Home' ? (
          <View style={{ width: '88%', flex: 1, paddingHorizontal: 4 }}>
            <ScrollView
              showsVerticalScrollIndicator={false}
            >
              <Text
                style={{
                  fontFamily: 'Inter18pt-Italic',
                  textAlign: "left",
                  fontSize: dimensions.width < 380 ? dimensions.width * 0.05 : dimensions.width * 0.07,
                  fontWeight: 800,
                  color: 'white',
                  paddingBottom: 8,


                }}
              >
                DAILY FACT
              </Text>
              <View style={{
                flex: 1,
                maxHeight: dimensions.width < 380 ? '75%' : '80%',
                borderRadius: dimensions.width * 0.05,
                position: 'relative',
                marginBottom: dimensions.height * 0.16,
              }}>


                <View style={{
                  width: '100%',
                  backgroundColor: 'white',
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
                          textAlign: "left",
                          fontSize: dimensions.width * 0.046,
                          paddingBottom: dimensions.width * 0.02,
                          fontWeight: 800,
                          fontStyle: 'italic',
                          fontWeight: 700,
                          color: '#3991F5',

                        }}
                      >
                        {todayFact?.pollutionTitle}
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
                      {todayFact?.pollution}
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
                          fontWeight: 700,
                          color: '#00D207',


                        }}
                      >
                        Sollution:
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
                      {todayFact?.sollution}
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
                      onPress={() => shareFact()}
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
                            fontStyle: 'italic',
                            fontWeight: 900,
                            textAlign: "center",
                            fontSize: dimensions.width * 0.04,
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
                      onPress={() => saveFact(todayFact)}
                      style={{ alignItems: 'center', padding: 8 }}
                    >
                      <View style={{
                        alignItems: 'center',
                        backgroundColor: isFactSaved ? '#444444' : '#3991F5',
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
                            fontStyle: 'italic',
                            fontWeight: 900,
                            textAlign: "center",
                            fontSize: dimensions.width * 0.04,
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

                <Text
                  style={{
                    fontFamily: 'Inter_18pt-Italic',
                    textAlign: "left",
                    fontSize: dimensions.width < 380 ? dimensions.width * 0.05 : dimensions.width * 0.07,
                    fontWeight: 800,
                    color: 'white',
                    paddingBottom: 8,
                    marginTop: '7%'

                  }}
                >
                  RECOMMENDATIONS
                </Text>
                <View style={{
                  width: '100%',
                  backgroundColor: 'white',
                  borderRadius: dimensions.width * 0.04,
                  borderWidth: 4.6,
                  borderColor: '#6DC6FF',
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
                            textAlign: "left",
                            fontSize: dimensions.width * 0.046,
                            paddingBottom: dimensions.width * 0.02,
                            fontWeight: 800,
                            fontStyle: 'italic',
                            fontWeight: 700,
                            paddingRight: dimensions.width * 0.04,
                            color: '#00D207',

                          }}
                        >
                          {todayRecomendation?.recomendationTitle}:
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
                        {todayRecomendation?.recomendationDescription}
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
                        onPress={() => shareRecomendation()}
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
                              fontStyle: 'italic',
                              fontWeight: 900,
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
                        onPress={() => saveRecomendation(todayRecomendation)}
                        style={{ alignItems: 'center', padding: 8 }}
                      >
                        <View style={{
                          alignItems: 'center',
                          backgroundColor: isRecomendationSaved ? '#444444' : '#3991F5',
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
                              fontStyle: 'italic',
                              fontWeight: 900,
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
                    {/* <Pager data={infoData} scrollX={scrollX} color="#FF3838" />  */}
                  </View>



                </View>

              </View>
            </ScrollView>

            <View style={{ position: 'absolute', bottom: '14%', left: '50%', backgroundColor: '#3179AC' }}>

            </View>
          </View>

        ) : selectedPage === 'Saved' ? (
          <SavedScreen savedRecomendations={savedRecomendations} savedFacts={savedFacts} setSavedFacts={setSavedFacts} setSavedRecomendations={setSavedRecomendations} />
        ) : selectedPage === 'Recommendations' ? (
          <RecommendationsScreen recomendations={recomendations} setSavedRecomendations={setSavedRecomendations} selectedPage={selectedPage} savedRecomendations={savedRecomendations} />
        ) : selectedPage === 'ReloadApp' ? (
          <ReloadScreen setSelectedPage={setSelectedPage} />
        ) : null}


        <View
          style={{
            position: 'absolute',
            bottom: '3%',
            backgroundColor: 'white',
            width: '100%,',
            paddingHorizontal: dimensions.width * 0.03,
            borderRadius: dimensions.width * 0.1,
            borderWidth: 1.9,
            borderColor: '#3991F5',
            height: '8%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            alignSelf: 'center',
            paddingVertical: dimensions.height * 0.03,
          }}
        >

          <TouchableOpacity
            onPress={() => setSelectedPage('ReloadApp')}
            style={{
              borderRadius: '50%',
              padding: dimensions.width * 0.03,
              backgroundColor: 'white',
              alignItems: 'center',
            }}
          >
            <Image
              source={selectedPage === 'ReloadApp' ? require('../assets/icons/selecIcons/selReloadIcon.png') : require('../assets/icons/unchosenIcons/reloadIcon.png')}
              style={{
                width: dimensions.width * 0.055,
                height: dimensions.width * 0.055,
                textAlign: 'center'
              }}
              resizeMode="contain"
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setSelectedPage('Saved')}
            style={{
              borderRadius: '50%',
              padding: dimensions.width * 0.03,
              backgroundColor: 'white',
              alignItems: 'center',
              marginLeft: 10,
            }}
          >
            <Image
              source={selectedPage === 'Saved' ? require('../assets/icons/selecIcons/selSavedIcon.png') : require('../assets/icons/unchosenIcons/savedIcon.png')}
              style={{
                width: dimensions.width * 0.055,
                height: dimensions.width * 0.055,
                textAlign: 'center'
              }}
              resizeMode="contain"
            />
          </TouchableOpacity>



          <TouchableOpacity
            onPress={() => setSelectedPage('Home')}
            style={{
              alignItems: 'center',
              borderRadius: '50%',
              backgroundColor: 'white',
              padding: dimensions.width * 0.03,
              marginHorizontal: 10,
            }}
          >
            <Image
              source={selectedPage === 'Home' ? require('../assets/icons/selecIcons/selHomeIcon.png') : require('../assets/icons/unchosenIcons/homeIcon.png')}
              style={{
                width: dimensions.width * 0.055,
                height: dimensions.width * 0.055,
                textAlign: 'center'
              }}
              resizeMode="contain"
            />
          </TouchableOpacity>


          <TouchableOpacity
            onPress={() => setSelectedPage('Recommendations')}
            style={{
              backgroundColor: 'white',
              alignItems: 'center',
              padding: dimensions.width * 0.03,
              borderRadius: '50%',
              marginRight: 10,
            }}
          >
            <Image
              source={selectedPage === 'Recommendations' ? require('../assets/icons/selecIcons/selRecomendationsIcon.png') : require('../assets/icons/unchosenIcons/recomendationsIcon.png')}
              style={{
                width: dimensions.width * 0.055,
                height: dimensions.width * 0.055,
                textAlign: 'center'
              }}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>

      </SafeAreaView>
    </ImageBackground>
  );
};

export default HomeScreen;
