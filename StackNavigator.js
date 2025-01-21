import React, { useContext, useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ActivityIndicator, View, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { loadUserData } from './src/redux/userSlice';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DeviceInfo from 'react-native-device-info';
import { TailwindProvider } from 'tailwind-rn';
import OnboardingScreen from './src/screens/OnboardingScreen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import utilities from './tailwind.json';
import { Provider, useDispatch } from 'react-redux';
import HomeScreen from './src/screens/HomeScreen';
import { UserProvider, UserContext } from './src/context/UserContext';
import store from './src/redux/store';
import OnboardingScreen2 from './src/screens/OnboardingScreen2';
import OnboardingScreen3 from './src/screens/OnboardingScreen3';

const Stack = createNativeStackNavigator();

const FishOfHopeStack = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <UserProvider>
            <TailwindProvider utilities={utilities}>
              <SafeAreaProvider>
                <AppNavigator />
              </SafeAreaProvider>
            </TailwindProvider>
        </UserProvider>
      </Provider>
    </GestureHandlerRootView>
  );
};

const AppNavigator = () => {
  const { user, setUser } = useContext(UserContext);
  const [initializingApp, setInitializingApp] = useState(true);
  const [onbVisible, setOnbVisible] = useState(false);
  const dispatch = useDispatch();

  const [todayDay, setTodayDay] = useState(1);

  useEffect(() => {
    const checkIsNewDayNow = async () => {
      const previousDayStr = await AsyncStorage.getItem('prevDay');
      const lastprevDay = await AsyncStorage.getItem('todayDay');
      const currentDay = format(new Date(), 'yyyy-MM-dd'); 
      if (previousDayStr !== currentDay) {
        let newTodayDay = lastprevDay ? (parseInt(lastprevDay) % 23) + 1 : 1;
        await AsyncStorage.setItem('prevDay', currentDay);
        await AsyncStorage.setItem('todayDay', newTodayDay.toString());
        setTodayDay(newTodayDay);
      } else if (lastprevDay) {
        setTodayDay(parseInt(lastprevDay));
      }
  
      setInitializingApp(false); 
    };
  
    checkIsNewDayNow();
  }, []); 
  
  useEffect(() => {
    dispatch(loadUserData());
  }, [dispatch]);

  useEffect(() => {
    const loadCuUser = async () => {
      try {
        const deviceId = await DeviceInfo.getUniqueId();
        const storageKey = `currentUser_${deviceId}`;
        const storedUser = await AsyncStorage.getItem(storageKey);
        const isOnboardingWasStarted = await AsyncStorage.getItem('isOnboardingWasStarted');

        if (storedUser) {
          setUser(JSON.parse(storedUser));
          setOnbVisible(false);
        } else if (isOnboardingWasStarted) {
          setOnbVisible(false);
        } else {
          setOnbVisible(true);
          await AsyncStorage.setItem('isOnboardingWasStarted', 'true');
        }
      } catch (error) {
        console.error('Error cur loading of user', error);
      } finally {
        setInitializingApp(false);
      }
    };
    loadCuUser();
  }, [setUser]);

  if (initializingApp) {
    return (
      <View style={{
        backgroundColor: '#3991F5',  
        alignItems: 'center',  
        justifyContent: 'center', 
        flex: 1, 
        }}>
        <ActivityIndicator size="large" color="white" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={onbVisible ? 'OnboardingScreen' : 'Home'}>
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="OnboardingScreen" component={OnboardingScreen} options={{ headerShown: false }} />
        <Stack.Screen name="OnboardingScreen2" component={OnboardingScreen2} options={{ headerShown: false }} />
        <Stack.Screen name="OnboardingScreen3" component={OnboardingScreen3} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};



export default FishOfHopeStack;
