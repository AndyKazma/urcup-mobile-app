import React from 'react';
import {
    FlatList,
    StyleSheet,
    View,
    Image,
    TouchableOpacity,
    Text,
    RefreshControl,
    SafeAreaView,
    Alert, ActivityIndicator,
} from 'react-native';
import Theme from '../theme';
import api from '../api/api';
import DummyMarkers from '../data/DummyData';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Moment from "moment";
const BlogScreen = ({navigation}) => {
    const [refreshing, setRefreshing] = React.useState(false);
    const [blogs, setBlogs] = React.useState(false);
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
    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: 'BLOG',
            headerLeft: () =>
                <Ionicons
                    onPress={() => {
                        navigation.openDrawer();
                    }}
                    name={'menu'}
                    size={30}
                    color={Theme.mainColor}
                    style={{marginLeft: 10}}
                />
            ,
        });
    }, []);

    React.useEffect(() => {
        (async () => {
            try {
                await api
                    .get('/blog', {
                        headers: {
                            accept: 'application/json',
                        },
                    })
                    .then((res) => {
                        setLoading(false);
                        //console.log("This is get success : ", res.data);
                        if (res.data) {
                            setBlogs(res.data);
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
            <TouchableOpacity onPress={() => {
                navigation.navigate('blogDetails', {
                    blogDetails: item,
                });
            }}>
                <View style={{width: Theme.width * 0.95, alignSelf: 'center', marginTop: 10}}>
                    <Image style={{width: Theme.width * 0.95, height: Theme.height * 0.25, borderRadius: 10}}
                           source={{uri: item.post_picture}}/>

                    <Text style={{
                        fontSize: 14,
                        fontWeight: '600',
                        flexWrap: 'wrap',
                        padding: 10,
                        paddingLeft: 0,
                        paddingBottom: 5,
                        color: Theme.mainColor,
                    }}>{Moment(item.post_date).format('D MMMM YYYY')}</Text>
                    <Text style={{fontSize: 20, flexWrap: 'wrap', fontWeight: 'bold'}}>{item.post_title}</Text>

                    <View style={{height: 1, backgroundColor: Theme.disabledColor, marginTop: 10, marginBottom: 10}}/>

                </View>
            </TouchableOpacity>
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
                style={{height: '100%'}}
                data={blogs}
                renderItem={renderItem}
                // @ts-ignore
                keyExtractor={(item, index) => item + index}
                ListEmptyComponent={<View style={{alignItems: 'center', justifyContent: 'center', marginTop: Theme.height * 0.4}}><Text style={{}}>Nothing
                    Found</Text></View>}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
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

export default BlogScreen;
