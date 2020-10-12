import React, { useState, useRef } from 'react';
import { StyleSheet, View, Image, TouchableOpacity, Animated } from 'react-native';
import MapView from 'react-native-maps';
import StartModal from '../StartModal/StartModal';
import FeedbackModal from '../FeedbackModal/FeedbackModal';
import SponsorsModal from '../SponsorsModal/SponsorsModal';
import CreateMarkerwindow from '../createMarkerWindow/CreateMarkerwindow';
import { activeImagesSource, clearImagesSourses, advImageSourses, messageImageSourses, cameraImageSourses } from '../imagesArray/imagesArray';
import GetLocation from 'react-native-get-location';
import { ReportForm } from './reportForm/ReportForm';

export default MyMap = ({ latitude, longitude, markers, createNewMarker, lastMarkerLatitude,
    lastMarkerLongitude, updateAppMarkers, startModal, hideModal, feedbackModal, chabgeFeedbcakModal,
    showUpdateBtn, feedbackData, sendReport, banInfo, sendMarkerConfirm, sponsorsModal, changeSponsorsModal, sponsorsData }) => {

    const fadeAnim = useRef(new Animated.Value(-200)).current;

    const showReport = (coords) => {
        setFocusedMarkerToReport(coords);
        Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: false
        }).start();
    };

    const [focusedMarkerToReport, setFocusedMarkerToReport] = useState('');

    const hideReport = () => {
        Animated.timing(fadeAnim, {
            toValue: -200,
            duration: 300,
            useNativeDriver: false
        }).start();
    };


    const [createMarkerMode, setCreateMarkerMode] = useState({
        createMode: false,
        coords: {},
    });


    const [regionData, setRegionData] = useState({
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    })

    const changeReg = (reg) => {
        setRegionData({
            latitude: reg.latitude,
            longitude: reg.longitude,
            latitudeDelta: reg.latitudeDelta,
            longitudeDelta: reg.longitudeDelta,
        })
    }

    const zoomIn = () => {
        let newZoom = {
            latitude: regionData.latitude,
            longitude: regionData.longitude,
            latitudeDelta: regionData.latitudeDelta / 5,
            longitudeDelta: regionData.longitudeDelta / 5,
        }
        myMap.animateToRegion(newZoom)
    }

    const zoomOut = () => {
        let newZoom = {
            latitude: regionData.latitude,
            longitude: regionData.longitude,
            latitudeDelta: regionData.latitudeDelta * 5,
            longitudeDelta: regionData.longitudeDelta * 5,
        }
        myMap.animateToRegion(newZoom)
    }

    const startCreateMarkerMode = (e) => {
        setCreateMarkerMode({
            createMode: true,
            coords: e.nativeEvent.coordinate,
        });
    }

    const createMarkerAndStopMode = (data) => {
        createNewMarker(createMarkerMode.coords, data);
        setCreateMarkerMode({
            createMode: false,
            coords: {},
        });
    }
    const stopMode = () => {
        setCreateMarkerMode({
            createMode: false,
            coords: {},
        });
    }

    /*
        const [activeImages, setActiveImages] = useState(false);
        const [passiveImages, setPassiveImages] = useState(false);
    
        const showActiveImg = () => {
            setPassiveImages(false);
            setActiveImages(true);
        }
    
        const showPassiveImg = () => {
            setActiveImages(false);
            setPassiveImages(true);
        }
    */

    const getMyLocation = () => {
        GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 15000,
        })
            .then(location => {
                myMap.animateToRegion({
                    latitude: location.latitude,
                    longitude: location.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                })
            })
            .catch(error => {
                const { code, message } = error;
                console.warn(code, message);
            })
    }



    return (
        createMarkerMode.createMode
            ? <CreateMarkerwindow chabgeFeedbcakModal = {chabgeFeedbcakModal} feedbackData={feedbackData} banInfo={banInfo} createMarkerAndStopMode={createMarkerAndStopMode} stopMode={stopMode} />
            :
            <View style={styles.container}>
                <StartModal hideModal={hideModal} startModal={startModal} />
                <FeedbackModal feedbackModal={feedbackModal} chabgeFeedbcakModal={chabgeFeedbcakModal} feedbackData={feedbackData} />
                <SponsorsModal feedbackData={feedbackData} sponsorsData= {sponsorsData} sponsorsModal = {sponsorsModal} changeSponsorsModal = {changeSponsorsModal} />

                <View style={{ display: 'flex', flexDirection: 'column', right: 10, position: 'absolute' }}>
                    <TouchableOpacity style={styles.zoomInNew} activeOpacity={0.5} onPress={() => zoomIn()}>
                        <Image source={require('../../images/controls/plusnew.png')} style={{ width: 30, height: 30, paddingTop: 10, paddingLeft: 10 }} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.zoomOutNew} activeOpacity={0.5} onPress={() => zoomOut()}>
                        <Image source={require('../../images/controls/minusnew.png')} style={{ width: 30, height: 30, paddingTop: 10, paddingLeft: 10 }} />
                    </TouchableOpacity>
                </View>
                <View style={{ display: 'flex', flexDirection: 'column', right: 10, position: 'absolute', bottom: 45 }}>
                    <TouchableOpacity style={styles.updateNew} activeOpacity={0.5} onPress={() => getMyLocation()}>
                        <Image source={require('../../images/controls/findme2.png')} style={{ width: 30, height: 30, paddingTop: 10, paddingLeft: 10 }} />
                    </TouchableOpacity>
                    {showUpdateBtn
                        ? <TouchableOpacity style={styles.updateNew} activeOpacity={0.5} onPress={() => updateAppMarkers()}>
                            <Image source={require('../../images/controls/update.png')} style={{ width: 20, height: 20, paddingTop: 10, paddingLeft: 10 }} />
                        </TouchableOpacity>
                        : <View></View>}
                </View>
                <TouchableOpacity style={styles.sponsors} activeOpacity={0.5} onPress={() => changeSponsorsModal(true)}>
                    <Image source={require('../../images/controls/money.png')} style={{ width: 25, height: 25 }} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.advitrisment} activeOpacity={0.5} onPress={() => chabgeFeedbcakModal(true)}>
                    <Image source={require('../../images/controls/info.png')} style={{ width: 30, height: 30 }} />
                </TouchableOpacity>
                <MapView
                    ref={map => { myMap = map }}
                    style={styles.map}
                    onLongPress={(e) => {
                        startCreateMarkerMode(e);
                    }}

                    onRegionChangeComplete={(reg) =>
                        changeReg(reg)
                        //console.log(reg)
                    }

                    onMarkerPress={(e) => showReport(e.nativeEvent.coordinate)}

                    initialRegion={{
                        latitude: lastMarkerLatitude ? lastMarkerLatitude : latitude,
                        longitude: lastMarkerLongitude ? lastMarkerLongitude : longitude,
                        latitudeDelta: regionData.latitudeDelta,
                        longitudeDelta: regionData.longitudeDelta,
                    }}
                    showsUserLocation={true}
                >
                    {markers.map(marker => {
                        let imageArr = marker.image.split('-');
                        let source;
                        //imageArr[0] == 'active' ? source = activeImagesSource[imageArr[1]] : source = clearImagesSourses[imageArr[1]];

                        if (imageArr[0] == 'active') source = activeImagesSource[imageArr[1]]
                        if (imageArr[0] == 'clear') source = clearImagesSourses[imageArr[1]]
                        if (imageArr[0] == 'adv') source = advImageSourses[imageArr[1]]
                        if (imageArr[0] == 'message') source = messageImageSourses[imageArr[1]]
                        if (imageArr[0] == 'camera') source = cameraImageSourses[imageArr[1]]


                        return <MapView.Marker
                            //centerOffset={{ x: -5, y: -5 }}
                            title={marker.title + ' (' + marker.date.substr(11) + ') Подтверждений - ' + marker.confirms}
                            description={marker.description}
                            key={marker.id}
                            coordinate={{
                                latitude: parseFloat(marker.latitude),
                                longitude: parseFloat(marker.longitude),
                            }}>
                            <Image source={source} style={{ width: 40, height: 50 }} />
                        </MapView.Marker>
                    })}
                </MapView>
                {!banInfo.banStatus &&
                    <Animated.View
                        style={{
                            height: 200,
                            width: '100%',
                            backgroundColor: 'white',
                            zIndex: 100,
                            bottom: fadeAnim,
                            position: 'absolute'
                        }}
                    >
                        <TouchableOpacity style={{ position: 'absolute', right: 5, top: 5 }} activeOpacity={0.5} onPress={() => hideReport()}>
                            <Image source={require('../../images/controls/close.png')} style={{ width: 30, height: 30 }} />
                        </TouchableOpacity>
                        <ReportForm sendMarkerConfirm ={sendMarkerConfirm} focusedMarkerToReport={focusedMarkerToReport} sendReport={sendReport} hideReport={hideReport} />

                    </Animated.View>
                }
            </View>
    );
}

const styles = StyleSheet.create({
    map: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        position: 'absolute'
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    updateIcon: {
        position: 'absolute',
        zIndex: 100,
        left: 210,
        bottom: 30,
        opacity: 0.7,
    },
    goToMyPositionIcon: {
        position: 'absolute',
        zIndex: 100,
        left: 140,
        bottom: 30,
        opacity: 0.7,
    },
    advitrisment: {
        position: 'absolute',
        right: 10,
        top: 50,
        width: 40, height: 40,
        backgroundColor: '#FFFFFF',
        opacity: 0.8,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 100,
        marginBottom: 10,
    },
    zoomInNew: {
        width: 40, height: 50,
        backgroundColor: '#FFFFFF',
        opacity: 0.8,
        borderTopStartRadius: 10,
        borderTopRightRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 100
    },
    zoomOutNew: {
        width: 40, height: 50,
        backgroundColor: '#FFFFFF',
        opacity: 0.8,
        borderBottomEndRadius: 10,
        borderBottomLeftRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 100,
    },
    updateNew: {
        width: 40, height: 40,
        backgroundColor: '#FFFFFF',
        opacity: 0.8,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 100,
        marginBottom: 10,
    },
    sponsors: {
        position: 'absolute',
        left: 10,
        top: 50,
        width: 40, height: 40,
        backgroundColor: '#FFFFFF',
        opacity: 0.8,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 100,
        marginBottom: 10,
    },
});