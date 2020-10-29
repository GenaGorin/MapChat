import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal, TextInput, Alert, Image } from 'react-native';

export const PresentForm = ({  focusedMarkerToReport, hideReport, incrementPresentViewsAndLinking }) => {



    return (
        <View>
            <View style={{ marginLeft: 10, marginTop: 10, marginRight: 30 }}>
                <Text style={styles.header}>Подарок пользователям driveChat</Text>
                <Text style = {styles.description}>{focusedMarkerToReport[0].description}</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                    <View style={{ alignItems: 'center' }}>
                        <TouchableOpacity style={[styles.reportButton, { backgroundColor: '#AEE80D' }]} activeOpacity={0.5} onPress={() => incrementPresentViewsAndLinking(focusedMarkerToReport[0].id, focusedMarkerToReport[0].url)}>
                            <Image source={require('../../../images/controls/accept.png')} style={{ width: 20, height: 20, marginRight: 10 }} />
                            <Text style = {{color: '#fff', fontSize: 16}}>ПОДРОБНЕЕ</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        fontSize: 18,
        color: '#777777',
    },
    description: {
        marginTop: 20,
        marginBottom: 15,
    },
    reportButton: {
        width: 200,
        height: 45,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 5,
        flexDirection: 'row'
    }
});