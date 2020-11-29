import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import LoadingScreen from './screens/loading.screen';
import MainScreen from './screens/main.screen';
import PartnerSignUpScreen from './screens/partner.signup.screen';
import MapScreen from './screens/map.screen';
import BlogScreen from './screens/blog.screen';
import BlogDetailScreen from './screens/blog.detail.screen';
import ListScreen from './screens/list.screen';
import Icons from 'react-native-vector-icons/Ionicons';
import {DrawerContentComponent} from './compoennts/drawer.content.component';


import Theme from './theme';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();


const TabNavigator = () => {
    return (
        <Tab.Navigator tabBarOptions={{activeTintColor: Theme.mainColor, inactiveTintColor: Theme.blackColor}}>
            <Tab.Screen name="map"  component={MapScreen} options={{

                tabBarLabel: 'Mapa',
                tabBarIcon: ({color, size}) => (
                    <Icons name="map-sharp" color={color} size={size}/>
                ),
            }}/>
            <Tab.Screen name="list" component={ListScreen} options={{
                tabBarLabel: 'Najbliższe',
                tabBarIcon: ({color, size}) => (
                    <Icons name="list" color={color} size={size}/>
                ),
            }}/>
        </Tab.Navigator>
    );
};

const DrawerNavigator = () => {
    return (
        <Drawer.Navigator
            drawerStyle={{
                width: Theme.width * 0.7,
                borderTopRightRadius: 10,
                borderBottomRightRadius: 10,
            }}
            initialRouteName="home"
            drawerContent={props => <DrawerContentComponent {...props} />}>
            <Drawer.Screen name="map" options={{headerShown: false}}  component={MapScreen}/>
            <Drawer.Screen name="home" options={{headerShown: false}} component={MainScreen}/>
            <Drawer.Screen name="signUp" options={{headerShown: false}} component={PartnerSignUpScreen}/>
            <Drawer.Screen name="tab" options={{headerShown: false}} component={TabNavigator}/>
            <Drawer.Screen name="blog" component={BlogScreen}/>
            <Drawer.Screen name="blogDetails" component={BlogDetailScreen}/>
        </Drawer.Navigator>
    );
};


export function Routes() {



    return (
        <NavigationContainer>
            <Stack.Navigator headerMode="none">
                <Stack.Screen name="loading" component={LoadingScreen}/>
                <Stack.Screen name="drawer" component={DrawerNavigator}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}
