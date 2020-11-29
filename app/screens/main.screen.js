import React from 'react';
import {
    TouchableOpacity,
    StyleSheet,
    View,
    Text,
    Image,
} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icons from 'react-native-vector-icons/FontAwesome';
import Theme from '../theme';
import Ionicons from 'react-native-vector-icons/Ionicons';


Icons.loadFont();


const MainScreen = ({navigation}) => {

    return (
        <View style={styles.container}>
            <Ionicons
                onPress={() => {
                    navigation.openDrawer();
                }}
                name={'menu'}
                size={40}
                color={Theme.mainColor}
                style={{position: 'absolute', top: 20, left: 10}}
            />
            <View style={{flex: 1}}>
                <View style={{flexDirection: 'row', paddingTop: 80, paddingBottom: 0}}>
                    <View style={styles.divider_A}/>
                    <View style={styles.title_A}>
                        <Image source={require('../resources/icon.png')} width={150} height={150}/>
                    </View>
                    <View style={styles.divider_A}/>
                </View>
                <Text style={{
                    textAlign: 'center',
                    fontSize: 20,
                    color: Theme.mainColor,
                    fontFamily: 'TruenoSemibold',
                }}>Witamy</Text>
                <Text style={{textAlign: 'center', fontSize: 20, color: Theme.mainColor, fontFamily: 'TruenoSemibold'}}>w
                    wypożyczalni kubków</Text>
                <Text style={{textAlign: 'center', fontSize: 20, color: Theme.mainColor, fontFamily: 'TruenoSemibold'}}>wielorazowego
                    użytku</Text>
            </View>

            <View style={{flex: 1, flexDirection: 'column-reverse'}}>
                <View>
                    <TouchableOpacity
                        style={[styles.button, {width: Theme.width * 0.8}]}
                        onPress={() => {
                            navigation.navigate('tab');
                        }}
                    >
                        <Text style={{color: '#FFF', fontFamily: 'TruenoSemibold'}}>Znajdź punkt</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[
                            styles.button,
                            {
                                borderColor: '#23A6D9',
                                borderWidth: 1,
                                marginTop: 12,
                                backgroundColor: '#FFF',
                                marginBottom: 40,
                                width: Theme.width * 0.5,
                                alignSelf: "center"
                            },
                        ]}
                        onPress={() => {
                            navigation.navigate('signUp');

                        }}
                    >
                        <Text style={{color: '#23A6D9', fontFamily: 'TruenoSemibold'}}>Zarejestruj nowy punkt</Text>
                    </TouchableOpacity>
                </View>

                {/*<View*/}
                {/*style={{borderWidth: 1, borderRadius: 14, borderColor: Theme.mainColor}}*/}
                {/*>*/}
                {/*<View style={[styles.cupCounter]}>*/}
                {/*<View style={styles.iconframe}>*/}
                {/*<Text style={{fontSize: 45, color: Theme.mainColor}}>2300</Text>*/}
                {/*</View>*/}

                {/*<View*/}
                {/*style={{*/}
                {/*textAlign: 'center',*/}
                {/*justifyContent: 'center',*/}
                {/*backgroundColor: Theme.mainColor,*/}
                {/*borderRadius: 11,*/}
                {/*width: 90,*/}
                {/*}}*/}
                {/*>*/}
                {/*<Icons*/}
                {/*name={'coffee'}*/}
                {/*size={44}*/}
                {/*color={'white'}*/}
                {/*style={{textAlign: 'center'}}*/}
                {/*/>*/}
                {/*<Text*/}
                {/*style={{*/}
                {/*fontSize: 12,*/}
                {/*color: 'white',*/}
                {/*textAlign: 'center',*/}
                {/*paddingLeft: 5,*/}
                {/*width: 80,*/}
                {/*}}*/}
                {/*>*/}
                {/*Oddanych kubków*/}
                {/*</Text>*/}
                {/*</View>*/}
                {/*</View>*/}
                {/*</View>*/}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        backgroundColor: Theme.mainColor,
        paddingVertical: 12,
        borderRadius: 12,
        alignItems: 'center',
    },
    divider_A: {
        backgroundColor: Theme.mainColor,
        height: 1,
        flex: 1,
        alignSelf: 'center',
    },
    title_A: {
        fontSize: 38,
        fontWeight: '800',
        color: Theme.blackColor,
        paddingHorizontal: 64,
    },
    cupCounter: {
        borderRadius: 14,
        width: 250,
        height: 100,
        flexDirection: 'row',
        borderColor: Theme.mainColor,
    },
    iconframe: {
        width: 160,
        height: 100,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
    },
});
export default MainScreen;
