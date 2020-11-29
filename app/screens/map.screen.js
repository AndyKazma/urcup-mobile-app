import React from 'react';
import {
    Platform,
    StyleSheet,
    View,
    Image,
    Animated,
    TouchableOpacity,
    Text, ScrollView,
    SafeAreaView, Alert,
} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker, Callout} from 'react-native-maps';
import {request, PERMISSIONS} from 'react-native-permissions';
import Geolocation from '@react-native-community/geolocation';
import DummyMarkers from '../data/DummyData';
import Theme from '../theme';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {BottomSheet} from 'react-native-btr';

import {SocialIcon} from 'react-native-elements';
import api from '../api/api';


const CARD_HEIGHT = Theme.height / 4;
const CARD_WIDTH = CARD_HEIGHT + 50;

const MapScreen = ({navigation}) => {
    const [initialPosition, setInitialPosition] = React.useState(initialPosition);
    const [isVisible, setVisibility] = React.useState(false);
    const [data, setData] = React.useState({});
    const [places, setPlaces] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    const _map = React.useRef(null);
    const scroll = React.useRef(null);


    React.useEffect(() => {
        requestLocationPermission().catch(error => {
            Alert.alert(error.message);
        });
    }, []);

    React.useEffect(() => {
        (async () => {
            try {
                await api
                    .get('/places', {
                        headers: {
                            accept: 'application/json',
                        },
                    })
                    .then((res) => {
                        setLoading(false);
                        console.log(res.data);
                        if (res.data) {
                            setPlaces(res.data);
                        } else {
                            Alert.alert('You API request has been failed');
                        }
                    })
                    .catch(() => {
                        setLoading(false);
                        console.log('catch error');
                    });
            } catch (err) {
                setLoading(false);
                console.log(err);
            }
        })();
    }, []);

    const requestLocationPermission = async () => {
        if (Platform.OS === 'ios') {
            var response = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
            console.log('iPhone: ' + response);

            if (response === 'granted') {
                locateCurrentPosition();
            }
        } else {
            var response = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
            console.log('Android: ' + response);

            if (response === 'granted') {
                locateCurrentPosition();
            }
        }
    };

    const locateCurrentPosition = () => {
        console.log('current step 1');
        Geolocation.getCurrentPosition(
            (position) => {
                console.log('position', JSON.stringify(position));

                let initialPosition = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    //latitude: 52.237049,
                    //longitude: 21.017532,
                    latitudeDelta: 0.09,
                    longitudeDelta: 0.035,
                };

                setInitialPosition(initialPosition);
            },
            (error) => console.log(error.message),
            {enableHighAccuracy: true, timeout: 5000, maximumAge: 3600000},
        );
    };

    const handleMarkerPress = (index, marker) => {
        scroll.current.getNode().scrollTo({x: index * 225, y: 0, animated: true});

        _map.current.animateToRegion(
            {
                latitude: marker.coordinate.latitude,
                longitude: marker.coordinate.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            },
            500,
        );

    };
    const toggleBottomNavigationView = () => {
        setVisibility(!isVisible);
    };
    const animation = new Animated.Value(0);

    const interpolations = DummyMarkers.map((marker, index) => {

        const inputRange = [
            (index - 1) * CARD_WIDTH,
            index * CARD_WIDTH,
            ((index + 1) * CARD_WIDTH),
        ];
        const scale = animation.interpolate({
            inputRange,
            outputRange: [1, 2.5, 1],
            extrapolate: 'clamp',
        });
        const opacity = animation.interpolate({
            inputRange,
            outputRange: [0.35, 1, 0.35],
            extrapolate: 'clamp',
        });
        return {scale, opacity};
    });

    const renderBottomSheet = () => {
        //console.log("marker", marker);
        if (data) {
            //console.log('check:', data);
            return (
                <BottomSheet
                    visible={isVisible}
                    onBackButtonPress={toggleBottomNavigationView}
                    onBackdropPress={toggleBottomNavigationView}
                >

                    <View style={styles.bottomNavigationView}>
                        <ScrollView showsVerticalScrollIndicator={false}>
                            <Image style={{
                                width: Theme.width * 0.85,
                                height: Theme.height * 0.25,
                                resizeMode: 'cover',
                                borderRadius: 20,
                                marginTop: 10,
                                alignSelf: 'center',
                            }}
                                   source={{uri: data.place_image}}/>
                            <Text
                                style={{
                                    fontSize: Theme.height * 0.027,
                                    textAlign: 'center',
                                    margin: 15,
                                    marginBottom: 5,
                                }}>{data.place_title}</Text>
                            <Text style={styles.textDetails}>{data.place_postal_code + " " + data.place_city}</Text>
                            <Text style={styles.textDetails}>{data.adress}</Text>
                            <Text style={[styles.textDetails, {marginBottom: 10}]}>{data.place_URL}</Text>
                            <View style={{
                                width: Theme.width * 0.85,
                                backgroundColor: Theme.whiteColor,
                                borderRadius: 10,
                            }}>
                                <Text style={{padding: 10}}>{data.place_description}</Text>
                            </View>
                        </ScrollView>
                    </View>

                </BottomSheet>
            );
        }
    };

    React.useEffect(() => {
        animation.addListener(({value}) => {
            let index = Math.floor(value / CARD_WIDTH + 0.3); // animate 30% away from landing on the next item
            if (index >= DummyMarkers.length) {
                index = DummyMarkers - 1;
            }
            if (index <= 0) {
                index = 0;
            }

            clearTimeout(regionTimeout);
            let regionTimeout = setTimeout(() => {
                if (index !== index) {
                    let index = index;
                    const {coordinate} = DummyMarkers[index];
                    map.current.animateToRegion(
                        {
                            ...coordinate,
                            latitudeDelta: initialPosition.latitudeDelta,
                            longitudeDelta: initialPosition.longitudeDelta,
                        },
                        350,
                    );
                }
            }, 10);
        });
    }, []);

    //console.log('data: ', data);

    return (
        <SafeAreaView style={styles.container}>
            <MapView
                ref={_map}
                provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                style={styles.map}
                initialRegion={{
                    latitude: 52.2368434,
                    longitude: 21.0246758,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
                zoomEnabled={true}
                zoomControlEnabled={true}
                showsMyLocationButton={true}
                followsUserLocation={true}
                showsUserLocation={true}
            >
                {DummyMarkers.map((marker, index) => {
                    const scaleStyle = {
                        transform: [
                            {
                                scale: interpolations[index].scale,
                            },
                        ],
                    };
                    const opacityStyle = {
                        opacity: interpolations[index].opacity,
                    };
                    return (
                        <MapView.Marker key={index} onPress={() => handleMarkerPress(index, marker)}
                                        coordinate={marker.coordinate}>
                            <Animated.View style={[styles.markerWrap, opacityStyle]}>
                                <Animated.View style={[styles.ring, scaleStyle]}/>
                                <View style={styles.marker}/>
                            </Animated.View>
                        </MapView.Marker>
                    );
                })}
            </MapView>
            {isVisible && renderBottomSheet()}

            <Animated.ScrollView
                horizontal
                ref={scroll}
                scrollEventThrottle={1}
                showsHorizontalScrollIndicator={false}
                snapToInterval={CARD_WIDTH}
                onScroll={Animated.event(
                    [
                        {
                            nativeEvent: {
                                contentOffset: {
                                    x: animation,
                                },
                            },
                        },
                    ],
                    {useNativeDriver: true},
                )}
                style={styles.scrollView}
                contentContainerStyle={styles.endPadding}
            >
                {places.map((marker, index) => (
                    <TouchableOpacity onPress={() => {
                        setData(marker);
                        setVisibility(true);
                    }}>
                        <View style={styles.card} key={index}>
                            <Image
                                source={{uri: marker.place_image}}
                                style={styles.cardImage}
                                resizeMode="cover"
                            />
                            <View style={styles.textContent}>
                                <Text numberOfLines={1} style={styles.cardtitle}>{marker.place_title}</Text>
                                <Text numberOfLines={1} style={styles.cardDescription}>
                                    {marker.place_address}
                                </Text>
                            </View>
                            <TouchableOpacity>
                                <View style={{borderWidth:3/4, borderColor: Theme.mainColor, padding:6, borderRadius: 25, alignItems:"center", marginTop:10, width: Theme.width * 0.4, alignSelf:"center"}}>
                                    <Text style={{fontSize:12}}>Nwaiguj</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                ))}
            </Animated.ScrollView>


            <View style={{
                position: 'absolute',
                top: 15,
                left: 10,
                flexDirection: 'row',

            }}>
                <View style={{}}>
                    <Ionicons
                        onPress={() => {
                            navigation.openDrawer();
                        }}
                        name={'menu'}
                        size={40}
                        color={Theme.mainColor}
                        style={{position: 'absolute', top: 10, left: 0}}
                    />
                </View>
                <View>
                    <Image style={{
                        height: 50,
                        width: 130,
                        overflow: 'visible',
                        resizeMode: 'cover',
                        marginLeft: Theme.width * 0.30,
                    }}
                           source={require('../resources/urcup.png')}/>
                </View>
            </View>

        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,

    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    scrollView: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        paddingVertical: 5,
    },
    endPadding: {
        paddingRight: Theme.width - CARD_WIDTH,
    },
    card: {
        padding: 10,
        elevation: 2,
        backgroundColor: '#FFF',
        marginHorizontal: 10,
        shadowColor: '#000',
        shadowRadius: 5,
        shadowOpacity: 0.3,
        shadowOffset: {x: 2, y: -2},
        height: CARD_HEIGHT,
        width: CARD_WIDTH,
        overflow: 'hidden',
        borderRadius: 10,
    },
    cardImage: {
        flex: 3,
        width: '100%',
        height: '100%',
        alignSelf: 'center',
        borderRadius: 5,
    },
    textContent: {
        flex: 1,
    },
    cardtitle: {
        fontSize: 12,
        marginTop: 5,
        fontWeight: 'bold',
    },
    cardDescription: {
        fontSize: 12,
        color: '#444',
    },
    markerWrap: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    marker: {
        width: 25,
        height: 25,
        borderRadius: 15,
        backgroundColor: 'rgba(130,4,150, 0.9)',
    },
    ring: {
        width: 25,
        height: 25,
        borderRadius: 15,
        backgroundColor: 'rgba(130,4,150, 0.3)',
        position: 'absolute',
        borderWidth: 1,
        borderColor: 'rgba(130,4,150, 0.3)',
    },
    bottomNavigationView: {
        backgroundColor: Theme.lessGrey,
        width: '100%',
        height: Theme.height * 0.6,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20
    },
    textDetails: {
        fontSize: 14, textAlign: 'center', color: Theme.mainColor, flexWrap: 'wrap', flex: 1,
    },
});

export default MapScreen;
