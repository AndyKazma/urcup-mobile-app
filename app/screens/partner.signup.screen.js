import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    TextInput,
    ScrollView,
    Alert, ActivityIndicator,
} from 'react-native';
import Theme from '../theme';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import api from '../api/api';

export default function PartnerSignUpScreen({route, navigation}) {
    const [loading, setLoading] = React.useState(false);
    const [name, setName] = React.useState('');
    const [pNumber, setPNumber] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [nip, setNip] = React.useState('');
    const [venue, setVenue] = React.useState('');
    const [city, setCity] = React.useState('');
    const [address, setAddress] = React.useState('');
    const [link, setLink] = React.useState('');
    const [pCode, setPCode] = React.useState('');

    const clearData = () => {
        setName('');
        setPNumber('');
        setEmail('');
        setNip('');
        setVenue('');
        setCity('');
        setAddress('');
        setLink('');
        setPCode('');
    };

    const signUp = async () => {
        try {
            await api
                .post('/signUpForm', {
                    form_name: name,
                    form_ph_number: pNumber,
                    form_email: email,
                    form_NIP: nip,
                    form_venue_name: venue,
                    form_postal_code: pCode,
                    form_city: city,
                    form_address: address,
                    form_URL: link,
                    form_photo: 'photo.url',
                    form_date: new Date(),
                })
                .then((res) => {
                    setLoading(false);
                    console.log(res);
                    if (res.data.success) {
                        Alert.alert('Signed up successfully');
                        clearData();
                    } else {

                        Alert.alert('Fail to send data');
                    }
                })
                .catch((err) => {

                    setLoading(false);
                    console.log(err);
                });
        } catch (err) {
            console.log(err);
            setLoading(false);
        }
    };

    return (
        <ScrollView style={styles.scrollView}>
            <View style={styles.container}>
                <View
                    style={{width: '100%', justifyContent: 'flex-start', marginTop: 34}}
                ></View>
                <View style={{flex: 2, alignItems: 'center'}}>

                    <Text style={{fontWeight: '600', marginTop: 60, color: Theme.mainColor}}>
                        Wypełnij formularz i czekaj na
                        kontakt
                    </Text>

                    <TextInput value={venue} onChangeText={(text) => {
                        setVenue(text);
                    }} style={styles.input} placeholder="Nazwa lokalu *"/>
                    <TextInput value={nip} onChangeText={(text) => {
                        setNip(text);
                    }} style={styles.input} placeholder="SKAKAĆ *"/>

                    <TextInput value={name} onChangeText={(text) => {
                        setName(text);
                    }} style={styles.input} placeholder="Imie i nazwisko *"/>
                    <TextInput value={pNumber} onChangeText={(text) => {
                        setPNumber(text);
                    }} style={styles.input} keyboardType={'number-pad'} placeholder="Telefon *"/>
                    <TextInput value={email} onChangeText={(text) => {
                        setEmail(text);
                    }} style={styles.input} keyboardType={'email-address'} placeholder="Adres email *"/>
                    <TextInput value={pCode} onChangeText={(text) => {
                        setPCode(text);
                    }} style={styles.input} placeholder="kod pocztowy"/>
                    <TextInput value={city} onChangeText={(text) => {
                        setCity(text);
                    }} style={styles.input} placeholder="Miasto"/>
                    <TextInput value={address} onChangeText={(text) => {
                        setAddress(text);
                    }} style={styles.input} placeholder="Dokładny adres"/>



                    <TextInput value={link} onChangeText={(text) => {
                        setLink(text);
                    }}
                               style={styles.input}
                               placeholder="Link do zdjęcia lokalu"
                    />


                    <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
                        <TouchableOpacity
                            style={[styles.button, {marginRight: 10}]}
                            disabled={loading}
                            onPress={() => {
                                if (name && pNumber && email && nip && venue && pCode && city && address && link) {
                                    setLoading(true);
                                    signUp();
                                } else {
                                    Alert.alert('please fill all fields');
                                }
                            }}
                        >
                            {loading ? (
                                <ActivityIndicator size={'small'} color={Theme.whiteColor}/>
                            ) : (
                                <Text style={{color: '#FFF'}}>Wyślij formularz</Text>
                            )}
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[
                                styles.button,
                                {
                                    borderColor: '#23A6D9',
                                    borderWidth: 1,
                                    backgroundColor: '#FFF',
                                    marginLeft: 10,
                                },
                            ]}
                            onPress={() => {
                                navigation.goBack();
                            }}
                        >
                            <Text style={{color: '#23A6D9'}}>Wróć</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{
                    position: 'absolute',
                    top: 20,
                    left: 10,
                    flexDirection: 'row',

                }}>
                    <View>
                        <MaterialIcons onPress={() => {
                            navigation.goBack();
                        }} style={{alignSelf: 'center', marginTop: 15, marginLeft: 10}} name={'arrow-back-ios'}
                                       size={25}
                                       color={Theme.mainColor}/>
                    </View>
                    <View style={{marginLeft:Theme.width * 0.25}}>
                        <Image
                            resizeMode={"cover"}
                            width={130}
                            height={60}
                            source={require('../resources/top.png')}/>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingBottom: 100,
    },
    button: {
        marginTop: 32,
        backgroundColor: '#23A6D9',
        paddingVertical: 12,
        width: Theme.width * 0.4,
        borderRadius: 12,
        alignItems: 'center',
    },
    input: {
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: Theme.mainColor,
        borderRadius: 6,
        height: 50,
        marginTop: 15,
        paddingHorizontal: 16,
        fontSize: 14,
        width: Theme.width * 0.85,

    },
});
