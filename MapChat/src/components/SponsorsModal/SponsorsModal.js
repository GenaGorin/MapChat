import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, Button, TouchableOpacity, Modal, Linking, ActivityIndicator, ScrollView } from 'react-native';

export default StartModal = ({ sponsorsModal, changeSponsorsModal, sponsorsData, feedbackData }) => {

    const goDonate = () => {
        const url = feedbackData[3].url;
        Linking.openURL(url).catch(err => console.error('An error occurred', err));
    }
    let i = 0;

    return (
        <Modal visible={sponsorsModal}>
            {sponsorsData.length == 0
                ?
                <ActivityIndicator style={styles.loadApp} size="large" color="red" />
                :
                <>
                    <ScrollView>
                        <View style={styles.allSponsorsWarp}>
                            <Text style={{ fontSize: 21, }}>ТОП Спонсоров</Text>
                            <Text>Чтобы попасть в список, поддержите проект</Text>
                            <TouchableOpacity onPress={goDonate} style={[styles.buttons, { backgroundColor: '#ffcc00' }]}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Image source={require('../../images/controls/yandex.png')} style={{ width: 40, height: 40, marginLeft: 5 }} />
                                    <Text style={styles.buttonText}>ПОДДЕРЖАТЬ</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        {
                            sponsorsData.map(sponsor => {
                                if (sponsor.name == '') {
                                    sponsor.name = 'Anonim'
                                }
                                i++;
                                let backgroundColor;
                                if (i == 1) backgroundColor = { backgroundColor: '#ffffb8' }
                                if (i == 2) backgroundColor = { backgroundColor: '#f5f5f5' }
                                if (i == 3) backgroundColor = { backgroundColor: '#f2dec2' }
                                return (
                                    <View style={[styles.singleSponsor, backgroundColor]}>
                                        <View style={styles.singleSponsorNumblock}>
                                            <Text>{i}</Text>
                                        </View>
                                        <View style={styles.singleSponsorMessage}>
                                            <Text>{sponsor.message} --- {sponsor.name} </Text>
                                        </View>
                                        <View style={styles.singleSponsorSumBlock}>
                                            <Text>{sponsor.sum} RUB</Text>
                                        </View>
                                    </View>
                                )
                            })
                        }
                        <TouchableOpacity style={{ position: 'absolute', right: 5, top: 5 }} activeOpacity={0.5} onPress={() => changeSponsorsModal(false)}>
                            <Image source={require('../../images/controls/close.png')} style={{ width: 30, height: 30 }} />
                        </TouchableOpacity>
                    </ScrollView>
                </>
            }
        </Modal>
    );
}

const styles = StyleSheet.create({
    loadApp: {
        top: 300,
    },
    allSponsorsWarp: {
        alignItems: 'center',
        marginTop: 30,
        marginBottom: 30,
    },
    singleSponsor: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderBottomColor: '#A9A9A9',
        borderBottomWidth: 1,
        backgroundColor: '#FFF',
        minHeight: 40
    },
    singleSponsorNumblock: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRightColor: '#A9A9A9',
        borderRightWidth: 1,
        width: 35,
    },
    singleSponsorSumBlock: {
        justifyContent: 'center',
        alignItems: 'center',
        borderLeftColor: '#A9A9A9',
        borderLeftWidth: 1,
        width: 85,
    },
    singleSponsorMessage: {
        maxWidth: 300,
        paddingLeft: 10,
        minWidth: 300,
        paddingTop: 5
    },
    buttons: {
        width: 200,
        height: 50,
        borderRadius: 7,
        justifyContent: 'center',
        marginTop: 10,
    },
    buttonText: {
        fontSize: 18,
        color: '#FFFFFF',
        marginTop: 10,
        marginLeft: 15,
    }

});