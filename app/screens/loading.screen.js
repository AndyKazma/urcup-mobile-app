import React from 'react';
import {
    StyleSheet,
    View,
    Image, ActivityIndicator,
} from 'react-native';
import Theme from '../theme';

const LoadingScreen = ({navigation}) => {

    React.useEffect(() => {
        setTimeout(() => navigation.replace('drawer'), 3000);
    }, []);
    return (
        <View style={styles.container}>

            <Image style={styles.logo} source={require('../resources/splash.png')}/>
            <ActivityIndicator size={"large"} color={Theme.mainColor}/>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Theme.lessGrey,
    },
    logo: {
        width: 400,
        height: 400
    }
});

export default LoadingScreen;
