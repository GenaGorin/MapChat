import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, Button, TouchableOpacity, Modal } from 'react-native';

export default StartModal = ({startModal, hideModal}) => {

    return (
        <Modal visible={startModal}>
            <View style={styles.header}>
                <Text style={styles.welcomeText}>Добро пожаловать в</Text>
                <View style={styles.policegrammWrapper}>
                    <Text style={styles.police}>Drive</Text>
                    <Text style={styles.police}>Chat</Text>
                </View>
                <Image source={require('../../images/controls/instructions.png')} style={{ width: 270, height: 230, marginBottom: 90 }} />
                <TouchableOpacity style={styles.goToMyPositionIcon} onPress={() => hideModal()} >
                    <Image source={require('../../images/controls/start_btn.png')} style={{ width:180, height: 50 }} />
                </TouchableOpacity>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    header: {
        alignItems: 'center',
        marginTop: 50,
        marginBottom: 100,
    },
    welcomeText: {
        fontSize: 24,
        //fontWeight: 'bold',
        color: '#777777'
    },
    police: {
        color: '#777777',
        fontSize: 27,
        fontWeight: 'bold',
    },
    policegrammWrapper: {
        display: 'flex',
        flexDirection: 'row',
        marginBottom: 70,
    }
});