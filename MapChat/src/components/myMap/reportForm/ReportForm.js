import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, Button, TouchableOpacity, Modal, TextInput } from 'react-native';

export const ReportForm = ({ sendReport }) => {

    const [reportDescription, setReportDescription] = useState('');

    const createReport = () => {
        console.log('send - '+ reportDescription)
    }

    return (
        <View>
            <View style={{ marginLeft: 10, marginTop: 10, marginRight: 30 }}>
                <Text style={styles.header}>Пожаловаться на метку</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={text => setReportDescription(text)}
                    value={reportDescription}
                    placeholder='Опишите жалобу'
                />
                <View style={{ alignItems: 'center' }}>
                    <TouchableOpacity style={styles.reportButton} activeOpacity={0.5} onPress={() => createReport()}>
                        <Text>ОТПРАВИТЬ</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        fontSize: 21,
        color: '#777777',
    },
    input: {
        borderStyle: 'solid',
        borderBottomColor: '#3EABFB',
        borderBottomWidth: 2,
        paddingLeft: 5,
        height: 70,
        marginBottom: 10,
    },
    reportButton: {
        width: 120,
        height: 50,
        backgroundColor: '#d5d8d9',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10
    }
});