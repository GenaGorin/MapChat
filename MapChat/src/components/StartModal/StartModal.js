import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, Button, TouchableOpacity, Modal } from 'react-native';

export default StartModal = ({startModal, hideModal}) => {

    return (
        <Modal visible={startModal}>
            <View style={styles.header}>
                <Text style={styles.welcomeText}>Добро пожаловать в</Text>
                <View style={styles.policegrammWrapper}>
                    <Text style={styles.police}>Map</Text>
                    <Text style={styles.gramm}>Chat</Text>
                </View>
                <Image source={require('../../images/controls/light.png')} style={{ width: 50, height: 50 }} />
                <Image source={require('../../images/controls/instruction.jpg')} style={{ width: 270, height: 150, marginBottom: 130 }} />
                <TouchableOpacity style={styles.goToMyPositionIcon} onPress={() => hideModal()} >
                    <Image source={require('../../images/controls/start.png')} style={{ width: 100, height: 50 }} />
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
    welcomeText: {
        fontSize: 25,
        fontWeight: 'bold',
    },
    police: {
        color: '#f60000',
        fontSize: 26,
        fontWeight: 'bold',
    },
    gramm: {
        color: '#2101fe',
        fontSize: 26,
        fontWeight: 'bold',
    },
    policegrammWrapper: {
        display: 'flex',
        flexDirection: 'row',
        marginBottom: 90,
    }
});