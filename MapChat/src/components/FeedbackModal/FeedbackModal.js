import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, Button, TouchableOpacity, Modal, Linking, ActivityIndicator } from 'react-native';

export default StartModal = ({ feedbackModal, chabgeFeedbcakModal, feedbackData }) => {

    const goInstagramm = () => {
        const url = feedbackData[0].url;
        Linking.openURL(url).catch(err => console.error('An error occurred', err));
    }

    const goTelegramm = () => {
        const url = feedbackData[1].url;
        Linking.openURL(url).catch(err => console.error('An error occurred', err));
    }

    const goDrivechat = () => {
        const url = feedbackData[2].url;
        Linking.openURL(url).catch(err => console.error('An error occurred', err));
    }

    const goDonate = () => {
        const url = feedbackData[3].url;
        Linking.openURL(url).catch(err => console.error('An error occurred', err));
    }




    return (
        <Modal visible={feedbackModal}>
            <View style={styles.header}>
                {feedbackData.length == 0
                    ?
                    <ActivityIndicator style={styles.loadApp} size="large" color="red" />
                    :
                    <>
                        <View style={styles.policegrammWrapper}>
                            <Text style={styles.police}>Meet us</Text>
                        </View>
                        <Image source={require('../../images/controls/meetus.png')} style={{ width: 150, height: 70, marginBottom: 30 }} />
                        <View style={{ marginBottom: 30, }}>
                            <Text >Наши контакты для сотрудничества и обратной связи</Text>
                        </View>
                        <TouchableOpacity onPress={goInstagramm} style={[styles.buttons, { backgroundColor: '#833ab4' }]}>
                            <View style={{ flexDirection: 'row' }}>
                                <Image source={require('../../images/controls/instagramm.png')} style={{ width: 40, height: 40, marginLeft: 5 }} />
                                <Text style={styles.buttonText}>INSTAGRAMM</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={goTelegramm} style={[styles.buttons, { backgroundColor: '#0088cc' }]}>
                            <View style={{ flexDirection: 'row' }}>
                                <Image source={require('../../images/controls/telegramm.png')} style={{ width: 40, height: 40, marginLeft: 5 }} />
                                <Text style={styles.buttonText}>TELEGRAMM</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={goDrivechat} style={[styles.buttons, { backgroundColor: '#FDD138' }]}>
                            <View style={{ flexDirection: 'row' }}>
                                <Image source={require('../../images/controls/site.png')} style={{ width: 40, height: 40, marginLeft: 5 }} />
                                <Text style={styles.buttonText}>DRIVECHAT</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={goDonate} style={[styles.buttons, { backgroundColor: '#ffcc00' }]}>
                            <View style={{ flexDirection: 'row' }}>
                                <Image source={require('../../images/controls/yandex.png')} style={{ width: 40, height: 40, marginLeft: 5 }} />
                                <Text style={styles.buttonText}>DONATE</Text>
                            </View>
                        </TouchableOpacity>
                    </>
                }
                <TouchableOpacity style={{ position: 'absolute', right: 5, top: 5 }} activeOpacity={0.5} onPress={() => chabgeFeedbcakModal(false)}>
                    <Image source={require('../../images/controls/close.png')} style={{ width: 30, height: 30 }} />
                </TouchableOpacity>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    header: {
        alignItems: 'center',
        marginBottom: 200,
    },
    police: {
        color: 'black',
        fontSize: 26,
        fontWeight: 'bold',
    },
    policegrammWrapper: {
        display: 'flex',
        flexDirection: 'row',
        marginBottom: 30,
        marginTop: 50,
    },
    loadApp: {
        top: 300,
    },
    buttons: {
        width: 200,
        height: 50,
        marginBottom: 10,
        borderRadius: 7,
        justifyContent: 'center'
    },
    buttonText: {
        fontSize: 18,
        color: '#FFFFFF',
        marginTop: 10,
        marginLeft: 15,
    }
});