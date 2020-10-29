import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal, TextInput, Alert, Image } from 'react-native';

export const ReportForm = ({ sendReport, focusedMarkerToReport, hideReport, sendMarkerConfirm }) => {

    const [reportDescription, setReportDescription] = useState('');

    const createReport = () => {
        if (reportDescription == '') {
            Alert.alert('Укажите описание')
        } else {
            let reportData = {
                markerId: focusedMarkerToReport[0].id,
                description: reportDescription,
            }
            sendReport(reportData);
            hideReport();
        }
    }

    const confirmMarker = () => {
       /* let confirmData = {
            latitude: focusedMarkerToReport.latitude.toFixed(4),
            longitude: focusedMarkerToReport.longitude.toFixed(4),
        }*/
        let markerId = focusedMarkerToReport[0].id;
        sendMarkerConfirm(markerId);
        hideReport();
    }

    return (
        <View>
            <View style={{ marginLeft: 10, marginTop: 10, marginRight: 30 }}>
                <Text style={styles.header}>Пожалуйтесь либо подтвердите метку</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={text => setReportDescription(text)}
                    value={reportDescription}
                    placeholder='Опишите жалобу'
                />
                <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                    <View style={{ alignItems: 'center' }}>
                        <TouchableOpacity style={[styles.reportButton, { backgroundColor: '#AEE80D' }]} activeOpacity={0.5} onPress={() => confirmMarker()}>
                            <Image source={require('../../../images/controls/accept.png')} style={{ width: 20, height: 20, marginRight: 10 }} />
                            <Text style = {{color: '#fff', fontSize: 12}}>ПОДТВЕРДИТЬ</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ alignItems: 'center' }}>
                        <TouchableOpacity style={[styles.reportButton, { backgroundColor: '#F67878' }]} activeOpacity={0.5} onPress={() => createReport()}>
                            <Image source={require('../../../images/controls/warning.png')} style={{ width: 23, height: 20, marginRight: 10 }} />
                            <Text style = {{color: '#fff', fontSize: 12}}>ПОЖАЛОВАТЬСЯ</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        fontSize: 16,
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
        width: 150,
        height: 45,
        //backgroundColor: '#d5d8d9',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        flexDirection: 'row'
    }
});