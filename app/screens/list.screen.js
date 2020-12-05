import React from "react";
import {
    FlatList,
    StyleSheet,
    View,
    Image,
    TouchableOpacity,
    Text,
    RefreshControl,
    SafeAreaView, Alert, ActivityIndicator, Linking,
} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Theme from "../theme";
import DummyMarkers from "../data/DummyData";
import api from '../api/api';
const ListScreen = (props) => {
    const [refreshing, setRefreshing] = React.useState(false);
    const [places, setPlaces] = React.useState([]);
    const [loading, setLoading] = React.useState(true);



    const wait = (timeout: any) => {
        return new Promise(resolve => {
            setTimeout(resolve, timeout);
        });
    };

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => setRefreshing(false));
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


    const renderItem = ({item}) => {

        return (
            <View style={{backgroundColor: Theme.whiteColor, borderRadius: 15, flexDirection: "row", width: Theme.width * 0.90, alignSelf: "center", marginTop: 10, padding: 10}}>
                <Image style={{width: 120, height: 90, borderRadius: 10}} source={{uri: item.place_image}}/>
                <View style={{justifyContent:"center", marginLeft:10, width: Theme.width * 0.55}}>
                    <Text style={{fontSize: 14, fontWeight: "600"}}>{item.place_title}</Text>
                    <Text style={{fontSize: 12, flexWrap:"wrap"}}>{item.place_address}</Text>
                    <TouchableOpacity onPress={()=> {
                        Linking.openURL(
                            `geo:0,0?q=${parseFloat(item.place_latitude)},${parseFloat(item.place_longitude)}`,
                        )
                    }}>
                        <View style={{borderWidth:3/4, borderColor: Theme.mainColor, padding:6, borderRadius: 25, alignItems:"center", marginTop:10, width: Theme.width * 0.3}}>
                            <Text style={{fontSize:12}}>Nwaiguj</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        );
    };

    if (loading) {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <ActivityIndicator size="large" color={Theme.mainColor}/>
            </View>
        );
    }


    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                style={{ height: '100%' }}
                data={places}
                renderItem={renderItem}
                maxToRenderPerBatch={10}
                initialNumToRender={10}
                // @ts-ignore
                keyExtractor={(item, index) => item.toString() + index.toString()}
                ListEmptyComponent={<View style={{ alignItems: 'center', justifyContent: 'center', marginTop: Theme.height * 0.4 }}><Text style={{  }}>Nothing Found</Text></View>}
                refreshControl={ <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/> }
            />

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Theme.lessGrey,
    },
});

export default ListScreen;
