import { Animated, Dimensions, Image, PanResponder, StyleSheet, Text, useAnimatedValue, View } from 'react-native'
import React, { useRef, useState } from 'react'

const DragDropImage = ({ imgPath, correctDropArea, color }: { imgPath: any, correctDropArea: string, color: string }) => {
    const pos = useRef(new Animated.ValueXY()).current;
    const [draging, setDraging] = useState(false);
    const [isDropped, setIsDropped] = useState(false);
    const opacity = useRef(new Animated.Value(1)).current;
    const panResponder = useRef(PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => true,
        onPanResponderGrant: () => {
            setDraging(true);
        },
        onPanResponderMove: (e, gestureState) => {

            Animated.event([null, { dx: pos.x, dy: pos.y }], {
                useNativeDriver: false,
            })(e, gestureState);

            // if(isDropArea(gestureState,correctDropArea))
            // {
            // Animated.event([null, { dx: pos.x, dy: pos.y }], {
            //         useNativeDriver: false,
            //     })(e, gestureState);
            // }





        },
        onPanResponderRelease: (e, gestureState) => {
            if (isDropArea(gestureState, correctDropArea)) {
                //setIsDropped(true)
                Animated.parallel([
                    Animated.timing(opacity, {
                        toValue: 0,
                        duration: 500,
                        useNativeDriver: true,
                    }),
                ]).start(() => {
                    setIsDropped(true);
                });
            }
            else {
                Animated.spring(pos, { toValue: { x: 0, y: 0 }, useNativeDriver: false }).start();

            }
            setDraging(false);
        }
    }));
    const isDropArea = (gesture: any, dropArea: string) => {
        const widthHalf = (Dimensions.get('window').width) / 2;
        console.log("widthhalf", widthHalf);
        switch (dropArea) {
            case 'Triangle':
                return gesture.moveX > widthHalf && gesture.moveY > 0 && gesture.moveY < 100
            case 'Star':
                return gesture.moveX > widthHalf && gesture.moveY > 100 && gesture.moveY < 200
            case 'Square':
                return gesture.moveX > widthHalf && gesture.moveY > 200 && gesture.moveY < 300
            case 'Circle':
                return gesture.moveX > widthHalf && gesture.moveY > 300 && gesture.moveY < 400
            case 'Hexagon':
                return gesture.moveX > widthHalf && gesture.moveY > 400 && gesture.moveY < 500
            default:
                return false;
        }

    }
    return !isDropped ? (
        <Animated.View style={[
            styles.imageContainer,
            {
                transform: pos.getTranslateTransform(),
                opacity: draging ? 0.8 : 1,
            },

        ]}
            {...panResponder.current.panHandlers}
        >
            <Image style={styles.image}
                source={imgPath} tintColor={color} />
        </Animated.View>
    ) : null;
}
const Home = () => {
    const square = require('../assets/images/square.png');
    const Circle = require('../assets/images/circle.png');
    const Triangle = require('../assets/images/triangle.png');
    const Hexagon = require('../assets/images/hexagon.png');
    const Star = require('../assets/images/star.png');

    const green = '#7dd957';
    const blue = '#43b6fe';
    const red = '#f55757';
    const yellow = '#fbde58';
    const violet = '#8c52ff';
    const grey = '#d9d9d9'


    return (
        <View style={styles.container}>
            <View style={{ width: '50%', flexDirection: 'column' }}>
                <DragDropImage imgPath={square} correctDropArea='Square' color={green} />
                <DragDropImage imgPath={Circle} correctDropArea='Circle' color={blue} />
                <DragDropImage imgPath={Triangle} correctDropArea='Triangle' color={red} />
                <DragDropImage imgPath={Hexagon} correctDropArea='Hexagon' color={yellow} />
                <DragDropImage imgPath={Star} correctDropArea='Star' color={violet} />
            </View>
            <View style={{ width: '50%', flexDirection: 'column' }}>
                <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center', height: 100, backgroundColor: grey, borderWidth: 1, borderColor: 'black' }}>
                    <Text style={{ fontWeight: 500, fontSize: 25, color: 'black' }}>Triangle</Text>
                </View>
                <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center', height: 100, backgroundColor: grey, borderWidth: 1, borderColor: 'black' }}>
                    <Text style={{ fontWeight: 500, fontSize: 25, color: 'black' }}>Star</Text>
                </View>
                <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center', height: 100, backgroundColor: grey, borderWidth: 1, borderColor: 'black' }}>
                    <Text style={{ fontWeight: 500, fontSize: 25, color: 'black' }}>Square</Text>
                </View>
                <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center', height: 100, backgroundColor: grey, borderWidth: 1, borderColor: 'black' }}>
                    <Text style={{ fontWeight: 500, fontSize: 25, color: 'black' }}>Circle</Text>
                </View>
                <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center', height: 100, backgroundColor: grey, borderWidth: 1, borderColor: 'black' }}>
                    <Text style={{ fontWeight: 500, fontSize: 25, color: 'black' }}>Hexagon</Text>
                </View>
            </View>

        </View>
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#F5F5F5',
    },
    imageContainer: {
        width: '100%',
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',

    },
    image: {
        width: 50,
        height: 50,
    },
})