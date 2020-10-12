import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, Button, TouchableOpacity, Modal, Linking, ActivityIndicator } from 'react-native';

export default StartModal = ({ sponsorsModal, changeSponsorsModal, sponsorsData }) => {




    return (
        <Modal visible={sponsorsModal}>
            {sponsorsData.length == 0
                ?
                <ActivityIndicator style={styles.loadApp} size="large" color="red" />
                :
                <>
                    {
                        sponsorsData.map(sponsor => {
                            if (sponsor.name == '') {
                                sponsor.name = 'Anonim'
                            }
                            return <Text>{sponsor.name}</Text>
                        })
                    }
                    <TouchableOpacity style={{ position: 'absolute', right: 5, top: 5 }} activeOpacity={0.5} onPress={() => changeSponsorsModal(false)}>
                        <Image source={require('../../images/controls/close.png')} style={{ width: 30, height: 30 }} />
                    </TouchableOpacity>
                </>
            }
        </Modal>
    );
}

const styles = StyleSheet.create({
    loadApp: {
        top: 300,
    },

});