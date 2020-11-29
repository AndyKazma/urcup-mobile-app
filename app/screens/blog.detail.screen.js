import React from 'react';
import {
    FlatList,
    StyleSheet,
    View,
    Image,
    TouchableOpacity,
    Text,
    SafeAreaView,
} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Theme from '../theme';
import Moment from "moment";
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const BlogDetailScreen = ({navigation, route}) => {

    const details = route.params.blogDetails;

    console.log(details);


    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerStyle: {
                backgroundColor: Theme.whiteColor,
            },
            headerTitleStyle: {
                color: Theme.blackColor,
            },
            headerTitle: 'Details',
            headerLeft: () =>
                <Ionicons
                    onPress={() => {
                        navigation.goBack();
                    }}
                    name={'arrow-back'}
                    size={25}
                    color={Theme.mainColor}
                    style={{marginLeft: 10}}
                />
            ,
            headerRight: () =>

                    <Ionicons
                        onPress={() => {
                            navigation.openDrawer();
                        }}
                        name={'menu'}
                        size={25}
                        color={Theme.mainColor}
                        style={{marginRight: 20}}
                    />


        });
    }, []);

    React.useEffect(() => {

    }, []);


    return (
        <SafeAreaView style={styles.container}>
            <Image style={{
                width: Theme.width * 0.95,
                height: Theme.height * 0.30,
                borderRadius: 10,
                alignSelf: 'center',
                marginTop: 10,
            }}
                   source={{uri: details.post_picture}}/>
            <View style={{
                position: 'absolute',
                flexDirection: 'row',
                marginTop: Theme.height * 0.265,
                width: Theme.width * 0.88,
                alignSelf: 'center',
                justifyContent: 'space-between',
            }}>
                <View style={{flexDirection: 'row'}}>
                    <Ionicons
                        onPress={() => {
                            navigation.openDrawer();
                        }}
                        name={'heart'}
                        size={20}
                        color={Theme.whiteColor}
                        style={{}}
                    />
                    <Text style={{color: Theme.whiteColor, fontSize: 16, marginLeft: 10}}>Like</Text>

                    <Ionicons
                        onPress={() => {
                            navigation.openDrawer();
                        }}
                        name={'share-social'}
                        size={20}
                        color={Theme.whiteColor}
                        style={{marginLeft: 20}}
                    />
                    <Text style={{color: Theme.whiteColor, fontSize: 16, marginLeft: 10}}>Share</Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                    <FontAwesome
                        onPress={() => {
                            navigation.openDrawer();
                        }}
                        name={'comment'}
                        size={20}
                        color={Theme.whiteColor}
                        style={{}}
                    />
                    <Text style={{
                        color: Theme.whiteColor,
                        fontSize: 16,
                        marginLeft: 10,
                        marginRight: 20,
                    }}>{details.post_likes}</Text>

                    <Ionicons
                        onPress={() => {
                            navigation.openDrawer();
                        }}
                        name={'eye'}
                        size={20}
                        color={Theme.whiteColor}
                        style={{}}
                    />
                    <Text style={{color: Theme.whiteColor, fontSize: 16, marginLeft: 10}}>120</Text>
                </View>
            </View>
            <View style={{width: Theme.width * 0.95, alignSelf: 'center'}}>
                <Text style={{fontSize: 16, fontWeight: '700', marginTop: 5}}>{details.post_title}</Text>

                <Text>{Moment(details.post_date).format('D MMMM YYYY')}</Text>


                <Text style={{marginTop: 20}}>{details.post_content}</Text>
            </View>

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Theme.lessGrey,
    },
});

export default BlogDetailScreen;
