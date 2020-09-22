import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, Button, TouchableOpacity, TextInput, Alert } from 'react-native';
import ImageMarker from './ImageMarker/ImageMarker';
import {activeImagesSource, clearImagesSourses} from '../imagesArray/imagesArray';

export default CreateMarkerwindow = ({ createMarkerAndStopMode, stopMode }) => {

    const [currentIndex, setCurrentIndex] = useState(0);
    const [activeImages, setActiveImages] = useState(false);
    const [passiveImages, setPassiveImages] = useState(false);
    const [markerDesc, setMarkerDesc] = useState('');
    //const [currentImage, setCurrentImage] = useState('');

    const setImage = (source) => {
        console.log(source);
        setCurrentImage(source);
    }

    const showActiveImg = () => {
        setPassiveImages(false);
        setActiveImages(true);
    }

    const showPassiveImg = () => {
        setActiveImages(false);
        setPassiveImages(true);
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

    const createMarker = () => {
        let title = activeImages ? 'АКТИВ' : 'ЧИСТО';
        let date = new Date();
        let data = {
            title: title,
            description: markerDesc,
            image: activeImages ? 'active-'+currentIndex : 'clear-'+currentIndex, //require('../../images/venik.png')
            date: '2288-22-33 ' + date.getHours() + ':' + date.getMinutes(),
        }
        createMarkerAndStopMode(data);
    }

    return (
        <View style={styles.windowWrapper}>
            <Text style={styles.header} >Создание метки</Text>
            <View style={styles.buttonWrapper}>
                <TouchableOpacity onPress={showActiveImg} >
                    <Image source={require('../../images/controls/aktiv.png')} style={{ width: 100, height: 40 }} />
                </TouchableOpacity>
                <TouchableOpacity onPress={showPassiveImg} >
                    <Image source={require('../../images/controls/chisto.png')} style={{ width: 100, height: 40 }} />
                </TouchableOpacity>
            </View>
            {activeImages
                &&
                <View style={{ top: 100 }}>
                    <TextInput
                        style={styles.input}
                        onChangeText={text => setMarkerDesc(text)}
                        value={markerDesc}
                        placeholder='Описание к метке'
                    //keyboardType='numeric'
                    />
                    <ImageMarker
                        source={activeImagesSource[currentIndex]}
                        changeImageToLeft={changeImageToLeft}
                        changeImageToRight={changeImageToRight}
                    />
                </View>
            }
            {passiveImages
                &&
                <View style={{ top: 100 }}>
                    <TextInput
                        style={styles.input}
                        onChangeText={text => setMarkerDesc(text)}
                        value={markerDesc}
                        placeholder='Описание к метке'
                    //keyboardType='numeric'
                    />
                    <ImageMarker
                        source={clearImagesSourses[currentIndex]}
                        changeImageToLeft={changeImageToLeft}
                        changeImageToRight={changeImageToRight} />
                </View>
            }
            { (passiveImages || activeImages)
                &&
                <TouchableOpacity onPress={createMarker} style ={{top: 110}} >
                    <Image source={require('../../images/controls/createMarker.png')} style={{ width: 100, height: 40 }} />
                </TouchableOpacity>
            }
            <View style={{ top: 450, position: 'absolute', }}>
                <TouchableOpacity onPress={stopMode} >
                    <Image source={require('../../images/controls/otmena.png')} style={{ width: 100, height: 40 }} />
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
    },
    buttonWrapper: {
        top: 50,
        flexDirection: 'row',
        width: '100%',
        paddingHorizontal: 15,
        justifyContent: 'space-around',
    }
});