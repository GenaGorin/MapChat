import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, Button, TouchableOpacity, Modal, ActivityIndicator } from 'react-native';

export default StartModal = ({ feedbackModal, chabgeFeedbcakModal, feedbackData, clicksOnContact }) => {

    const contactClick = (contactId) => {
        clicksOnContact(contactId);
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
                        <TouchableOpacity onPress={() => contactClick(1)} >
                        <Image source={require('../../images/controls/goInstagrammbtn.png')} style={{ width: 200, height: 50, marginBottom: 10 }} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => contactClick(2)} style={[styles.buttons, { backgroundColor: '#33bbff' }]}>
                            <View style={{ flexDirection: 'row' }}>
                                <Image source={require('../../images/controls/telegramm.png')} style={{ width: 40, height: 40, marginLeft: 5 }} />
                                <Text style={styles.buttonText}>TELEGRAM</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => contactClick(3)} style={[styles.buttons, { backgroundColor: '#AEE80D' }]}>
                            <View style={{ flexDirection: 'row' }}>
                                <Image source={require('../../images/controls/site.png')} style={{ width: 40, height: 40, marginLeft: 5 }} />
                                <Text style={[styles.buttonText, {fontSize: 17}]}>DRIVECHAT-WEB</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => contactClick(4)} style={[styles.buttons, { backgroundColor: '#ffcc00' }]}>
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