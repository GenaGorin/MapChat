import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';

export default ImageMarker = ({ source, changeImageToLeft, changeImageToRight, withArrows }) => {

    if (withArrows) {
        return (
            <GestureRecognizer
                onSwipeLeft={changeImageToRight}
                onSwipeRight={changeImageToLeft}
                style={{ flexDirection: 'row', justifyContent: 'space-around'}}
            >
                <TouchableOpacity style={styles.arrows} onPress={changeImageToLeft}>
                    <Image source={require('../../../images/controls/left.png')} style={{ width: 60, height: 30 }} />
                </TouchableOpacity>
                <Image source={source} style={{ width: 77, height: 125, marginHorizontal: 35, }} />
                <TouchableOpacity style={styles.arrows} onPress={changeImageToRight}>
                    <Image source={require('../../../images/controls/right.png')} style={{ width: 60, height: 30 }} />
                </TouchableOpacity>
            </GestureRecognizer>
        )
    } else {
        return (
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', }}>
                <View style={{ width: 60 }}></View>
                <Image source={source} style={{ width: 77, height: 125, marginHorizontal: 35, }} />
                <View style={{ width: 60 }}></View>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    arrows: {
        marginTop: 35,
    },
});
