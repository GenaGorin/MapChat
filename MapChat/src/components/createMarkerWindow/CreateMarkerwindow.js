import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, Image, Button, TouchableOpacity, TextInput, Alert, Animated, ActivityIndicator } from 'react-native';
import ImageMarker from './ImageMarker/ImageMarker';
import { activeImagesSource, clearImagesSourses, messageImageSourses } from '../imagesArray/imagesArray';

export default CreateMarkerwindow = ({ chabgeFeedbcakModal, createMarkerAndStopMode, stopMode, banInfo }) => {


    const [currentIndex, setCurrentIndex] = useState(0);
    const [activeImages, setActiveImages] = useState(false);
    const [passiveImages, setPassiveImages] = useState(false);
    const [messageImages, setMessageImages] = useState(false);
    const [markerDesc, setMarkerDesc] = useState('');

    const fadeAnim = useRef(new Animated.Value(200)).current;

    const buttonsUp = () => {
        Animated.timing(fadeAnim, {
            toValue: 30,
            duration: 500,
            useNativeDriver: false
        }).start();
    };

    const buttonsDown = () => {
        Animated.timing(fadeAnim, {
            toValue: 200,
            duration: 500,
            useNativeDriver: false
        }).start();
    };


    const setImage = (source) => {
        console.log(source);
        setCurrentImage(source);
    }

    const showActiveImg = () => {
        buttonsUp()
        setPassiveImages(false);
        setMessageImages(false);
        setActiveImages(true);
    }

    const showPassiveImg = () => {
        buttonsUp()
        setActiveImages(false);
        setMessageImages(false);
        setPassiveImages(true);
    }

    const showMessageImg = () => {
        buttonsUp()
        setActiveImages(false);
        setPassiveImages(false);
        setMessageImages(true);
    }

    const changeImageToLeft = () => {
        if (currentIndex == 0) {
            setCurrentIndex(activeImagesSource.length - 1);
        } else {
            let newIndex = currentIndex - 1;
            setCurrentIndex(newIndex);
        }
    }

    const changeImageToRight = () => {
        if (currentIndex == activeImagesSource.length - 1) {
            setCurrentIndex(0)
        } else {
            let newIndex = currentIndex + 1;
            setCurrentIndex(newIndex);
        }
    }

    const goContacts = () => {
        stopMode()
        chabgeFeedbcakModal(true)
    }

    const createMarker = () => {
        let title;
        let image;
        if (activeImages) {
            title = 'АКТИВ';
            image = 'active-' + currentIndex;
        }
        if (passiveImages) {
            title = 'ЧИСТО';
            image = 'clear-0';
        }
        if (messageImages) {
            title = 'СООБЩЕНИЕ';
            image = 'message-0'
        }

        let date = new Date();
        let data = {
            title: title,
            description: markerDesc,
            image: image,
            date: '2288-22-33 ' + date.getHours() + ':' + date.getMinutes(),
        }
        createMarkerAndStopMode(data);
    }

    if (banInfo.banStatus) {
        return (
            <View style={styles.header}>
                <View style={styles.policegrammWrapper}>
                    <Text style={styles.police}>Вы были забанены</Text>
                </View>
                <View style={{ marginBottom: 30, marginTop: 100, }}>
                    <Text >Причина - {banInfo.banReason}</Text>
                    <Text>Для разблокировки перейдите в контакты</Text>
                    <Text>и напишите нам</Text>
                </View>
                <TouchableOpacity activeOpacity={0.5} onPress ={goContacts} style = {[styles.buttons, {backgroundColor: '#50ACFF'}]}>
                    <Text style={{fontSize: 18, color: '#FFFFFF', marginTop: 3, marginLeft: 35}}>В КОНТАКТЫ</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={{ position: 'absolute', right: 5, top: 5 }} activeOpacity={0.5} onPress={stopMode}>
                    <Image source={require('../../images/controls/close.png')} style={{ width: 30, height: 30 }} />
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <View style={styles.windowWrapper}>
            <Animated.View style={{ justifyContent: 'center', alignItems: 'center', marginTop: fadeAnim }}>
                <TouchableOpacity onPress={showActiveImg} style={[styles.buttons, { backgroundColor: '#FF4E4E' }]}>
                    <View style={{ flexDirection: 'row' }}>
                        <Image source={require('../../images/controls/starFull.png')} style={{ width: 40, height: 40, marginLeft: 5 }} />
                        <Text style={styles.buttonText}>АКТИВ</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={showPassiveImg} style={[styles.buttons, { backgroundColor: '#50ACFF' }]}>
                    <View style={{ flexDirection: 'row' }}>
                        <Image source={require('../../images/controls/starEmpty.png')} style={{ width: 40, height: 40, marginLeft: 5 }} />
                        <Text style={styles.buttonText}>ЧИСТО</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={showMessageImg} style={[styles.buttons, { backgroundColor: '#ADADAD' }]}>
                    <View style={{ flexDirection: 'row' }}>
                        <Image source={require('../../images/controls/message.png')} style={{ width: 43, height: 40, marginLeft: 5 }} />
                        <Text style={styles.buttonText}>СООБЩЕНИЕ</Text>
                    </View>
                </TouchableOpacity>

            </Animated.View>
            {activeImages
                &&
                <View style={{ top: 30 }}>
                    <TextInput
                        style={styles.input}
                        onChangeText={text => setMarkerDesc(text)}
                        value={markerDesc}
                        placeholder='Описание к метке'
                    />
                    <ImageMarker
                        withArrows={true}
                        source={activeImagesSource[currentIndex]}
                        changeImageToLeft={changeImageToLeft}
                        changeImageToRight={changeImageToRight}
                    />
                </View>
            }
            {passiveImages
                &&
                <View style={{ top: 30 }}>
                    <TextInput
                        style={styles.input}
                        onChangeText={text => setMarkerDesc(text)}
                        value={markerDesc}
                        placeholder='Описание к метке'
                    />
                    <ImageMarker
                        withArrows={false}
                        source={clearImagesSourses[0]}
                        changeImageToLeft={changeImageToLeft}
                        changeImageToRight={changeImageToRight} />
                </View>
            }
            {messageImages
                &&
                <View style={{ top: 30 }}>
                    <TextInput
                        style={styles.input}
                        onChangeText={text => setMarkerDesc(text)}
                        value={markerDesc}
                        placeholder='Описание к метке'
                    />
                    <ImageMarker
                        withArrows={false}
                        source={messageImageSourses[0]}
                        changeImageToLeft={changeImageToLeft}
                        changeImageToRight={changeImageToRight} />
                </View>
            }
            { (passiveImages || activeImages || messageImages)
                &&
                <TouchableOpacity onPress={createMarker} style={[styles.buttons, { backgroundColor: '#4fd057ba', marginTop: 70 }]} >
                    <View style={{ flexDirection: 'row' }}>
                        <Image source={require('../../images/controls/accept.png')} style={{ width: 35, height: 35, marginLeft: 5 }} />
                        <Text style={styles.buttonText}>УСТАНОВИТЬ</Text>
                    </View>
                </TouchableOpacity>
            }
            <View style={{ marginTop: 15 }}>
                <TouchableOpacity onPress={stopMode} style={[styles.buttons, { backgroundColor: '#ADADAD' }]}>
                    <View style={{ flexDirection: 'row' }}>
                        <Image source={require('../../images/controls/deny.png')} style={{ width: 35, height: 35, marginLeft: 5 }} />
                        <Text style={styles.buttonText}>ОТМЕНА</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>)
}

const styles = StyleSheet.create({
    input: {
        borderStyle: 'solid',
        borderBottomColor: '#3EABFB',
        borderBottomWidth: 2,
        paddingLeft: 5,
        height: 70,
        marginBottom: 10,
    },
    windowWrapper: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        //justifyContent: 'center',
        width: '100%',
    },
    header: {
        fontSize: 25,
        top: 30,
        color: '#777777'
    },
    buttonWrapper: {
        top: 70,
        flexDirection: 'row',
        //width: '100%',
        paddingHorizontal: 15,
        justifyContent: 'space-around',
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
    },
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
});