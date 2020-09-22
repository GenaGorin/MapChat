import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, Button, TouchableOpacity, Modal } from 'react-native';

export default StartModal = ({ feedbackModal, chabgeFeedbcakModal }) => {

    return (
        <Modal visible={feedbackModal}>
            <View style={styles.header}>
                <View style={styles.policegrammWrapper}>
                    <Text style={styles.police}>Meet us</Text>
                </View>
                <Image source={require('../../images/controls/meetus.png')} style={{ width: 150, height: 70, marginBottom: 30 }} />
                <View style ={{marginBottom: 30,}}>
                    <Text >Наши контакты для сотрудничества и обратной связи</Text>
                </View>
                <View style = {styles.contacts}>
                    <Image source={require('../../images/controls/mail.png')} style={{ width: 50, height: 50 }} />
                    <Text style = {styles.contact}>m.baukov@mail.ru</Text>
                </View>
                <View style = {styles.contacts}>
                    <Image source={require('../../images/controls/telegramm.png')} style={{ width: 50, height: 50 }} />
                    <Text style = {styles.contact} >79872281488</Text>
                </View>
                <View style = {styles.contacts}>
                    <Image source={require('../../images/controls/instagramm.jpg')} style={{ width: 50, height: 50 }} />
                    <Text style = {styles.contact} >_big_dick_99</Text>
                </View>
                <TouchableOpacity style={styles.goToMyPositionIcon} onPress={() => chabgeFeedbcakModal(false)} >
                    <Image source={require('../../images/controls/under.png')} style={{ width: 100, height: 50 }} />
                </TouchableOpacity>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    header: {
        alignItems: 'center',
        marginTop: 50,
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
    },
    contacts: {
        display: 'flex',
        flexDirection: 'row',
        width: 300,
        marginBottom: 15,
    },
    contact: {
        fontSize: 20,
        marginTop: 10,
        marginLeft: 10,
    },
    goToMyPositionIcon: {
        marginTop: 30,
    }
});