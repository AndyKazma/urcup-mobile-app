import React, {useEffect, useState} from 'react';
import {View, StyleSheet, ActivityIndicator, TouchableOpacity, Alert, Linking, Image} from 'react-native';
import {Avatar, Title, Drawer} from 'react-native-paper';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import Theme from '../theme';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';


import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {showMessage} from 'react-native-flash-message';


export function DrawerContentComponent(props) {

    const mapDrawerItem = () => {
        return (
            <DrawerItem
                labelStyle={{fontSize: 18, fontWeight: 'normal'}}
                icon={({color, size}) => (
                    <FontAwesome5 name="map-marked-alt" color={Theme.mainColor} size={size}/>
                )}
                label="MAPA"
                onPress={() => props.navigation.navigate('tab', {
                    screen: "map",
                })}
            />
        );
    };

    const blogDrawerItem = () => {
        return (
            <DrawerItem
                labelStyle={{fontSize: 18, fontWeight: 'normal'}}
                icon={({color, size}) => <FontAwesome5 name="blog" color={Theme.mainColor} size={size}/>}
                label="BLOG"
                onPress={() => props.navigation.navigate('blog')}
            />
        );
    };

    const listDrawerItem = () => {
        return (
            <DrawerItem
                labelStyle={{fontSize: 18, fontWeight: 'normal'}}
                icon={({color, size}) => <FontAwesome5 name="th-list" color={Theme.mainColor} size={size}/>}
                label="LISTA PUNKTÓW"
                onPress={() => props.navigation.navigate('tab', {
                    screen: "list",
                })}
            />
        );
    };
    const homeDrawerItem = () => {
        return (
            <DrawerItem
                labelStyle={{fontSize: 18, fontWeight: 'normal'}}
                icon={({color, size}) => <FontAwesome5 name="home" color={Theme.mainColor} size={size}/>}
                label="HOME"
                onPress={() => props.navigation.navigate('home')}
            />
        );
    };

    return (
        <View style={{flex: 1}}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                        <Image style={{
                            height: 50,
                            width: 130,
                            overflow: 'visible',
                            resizeMode: 'cover',
                            //marginLeft: Theme.width * 0.30,
                        }}
                               source={require('../resources/urcup.png')}/>

                    </View>
                    <Drawer.Section style={styles.drawerSection}>
                        {homeDrawerItem()}
                    </Drawer.Section>
                    <Drawer.Section>{mapDrawerItem()}</Drawer.Section>
                    <Drawer.Section>{listDrawerItem()}</Drawer.Section>
                    <Drawer.Section>{blogDrawerItem()}</Drawer.Section>

                </View>
            </DrawerContentScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    drawerContent: {
        flex: 1,
    },
    userInfoSection: {
        paddingLeft: 20,
        height: Theme.height * 0.2,
        backgroundColor: Theme.whiteColor,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center', marginRight: 100,
    },
    title: {
        fontSize: 20,
        fontWeight: '600',
        color: Theme.whiteColor,
        marginTop: Theme.height * 0.15,
    },
    caption: {
        fontSize: Theme.height * 0.018,

        width: wp('45%'),
    },
    row: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
    },
    paragraph: {
        fontWeight: 'bold',
        marginRight: 3,
    },
    drawerSection: {
        marginTop: 15,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1,
    },
    preference: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
});
