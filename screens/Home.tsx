import React, { useEffect } from "react";
import {
    Text,
    StyleSheet,
    View,
    Image,
    ImageBackground,
    Dimensions,
    ActivityIndicator
} from "react-native";
import { CommonActions } from "@react-navigation/native";
import { db } from "../constants/firebase-config";

const { width, height } = Dimensions.get("window");
export default ({ navigation }) => {
    useEffect(() => {
        db.ref().on(
            "value",
            snapshot => {
                const val = snapshot.val();
                navigation.dispatch(
                    CommonActions.reset({
                        index: 0,
                        routes: [
                            {
                                name: "Dashboard",
                                params: {
                                    data: val.posts,
                                    groups: val.groups,
                                    groupsInfo: val.groupsInfo
                                }
                            }
                        ]
                    })
                );
            },
            err => console.log(err)
        );

        /*
        db.ref('posts/' + (new Date()).getTime()).set({
			logoSmall: "https://images-platform.99static.com/dL1tG9IV4DedF82OBqLiCXazrjw=/0x0:1500x1500/500x500/top/smart/99designs-contests-attachments/66/66970/attachment_66970956",
            logoLarge: "https://images-platform.99static.com/dL1tG9IV4DedF82OBqLiCXazrjw=/0x0:1500x1500/500x500/top/smart/99designs-contests-attachments/66/66970/attachment_66970956",
            postName: "Post X",
            timeStamp: new Date().toString(),
            groupName: "Group A",
            postSubName: "Post sub X",
            postAuthor: "Escanor",
            postContent:
                " Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed aliquet mauris quis venenatis suscipit. Pellentesque laoreet ultrices libero. Cras eget quam condimentum ipsum eleifend convallis et ac velit. Donec quis iaculis nulla. Donec vulputate tristique neque eget porttitor. Sed elit nisl, pharetra sed interdum ut, pulvinar ac sem. Phasellus posuere volutpat mi vitae posuere. Sed nec aliquet orci. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Phasellus ac dapibus nibh.\nInteger nec mauris sed ante sagittis efficitur. Proin consequat ultrices enim eu aliquet. Aliquam tincidunt ex eu lobortis imperdiet. Nulla ante quam, condimentum sed eros id, sagittis convallis ante. Phasellus fermentum aliquam odio, sit amet pharetra nibh. Donec vel feugiat metus, non fermentum ligula. Aliquam at libero pellentesque, dapibus nunc vel, volutpat tortor.\nAenean lobortis libero lorem, sit amet pellentesque lectus feugiat in. Praesent non metus turpis. Sed porttitor hendrerit est at aliquam. In quis urna a est aliquam porta sed non magna. Fusce rhoncus vel arcu sed eleifend. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Proin vitae mauris quam. Nulla vel molestie lacus, at pos",
            postContentImages: {
                "1": "https://images.pexels.com/photos/1236701/pexels-photo-1236701.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
                "2": "https://images.pexels.com/photos/1236701/pexels-photo-1236701.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
                "3": "https://images.pexels.com/photos/1236701/pexels-photo-1236701.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
            }
        })
        */
    }, []);
    return (
        <View style={{ ...styles.container }}>
            <ImageBackground
                source={require("../assets/images/background.png")}
                style={{ ...styles.background }}
            >
                <View
                    style={{
                        ...styles.container,
                        flex: 0.4,
                        justifyContent: "flex-end",
                        marginBottom: 32
                    }}
                >
                    <Image
                        source={require("../assets/images/lnctIcon.png")}
                        resizeMode="contain"
                        style={{ ...styles.logo }}
                    />
                </View>
                <View style={{ ...styles.container, flex: 0.4, marginTop: 16 }}>
                    <Text style={{ ...styles.text, marginBottom: 32 }}>
                        LNCT Notify
                    </Text>
                    <View style={{ flex: 0.2 }}>
                        <Text style={{ ...styles.text, fontSize: 24 }}>
                            Vision To Share
                        </Text>
                    </View>
                    <View style={{ width: 0.85 * width, flex: 0.4 }}>
                        <Text
                            style={{
                                ...styles.text,
                                fontSize: 18,
                                fontWeight: "500",
                                fontStyle: "italic"
                            }}
                        >
                            Club Feeds Never Been So Smooth.
                        </Text>
                    </View>
                    <View style={{ width: 0.85 * width, flex: 0.2 }}>
                        <Text
                            style={{
                                ...styles.text,
                                fontSize: 16,
                                justifyContent: "flex-end",
                                marginBottom: 12,
                                textDecorationLine: "underline"
                            }}
                        >
                            By @Team tkessentials_
                        </Text>
                    </View>
                </View>
                <View
                    style={{
                        ...styles.container,
                        flex: 0.2,
                        justifyContent: "flex-end",
                        marginBottom: 24
                    }}
                >
                    <ActivityIndicator size={26} color="white" />
                    <Text
                        style={{
                                ...styles.text,
                                fontSize: 16,
                                justifyContent: "flex-end",
                                marginTop: 24,
                                textDecorationLine: "underline"
                            }}>Github: real4suraj2/LnctNotify</Text>
                </View>
            </ImageBackground>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        width
    },
    logo: {
        width: 150,
        height: 150,
        borderRadius: 250
    },
    background: {
        flex: 1,
        resizeMode: "cover",
        width,
        justifyContent: "center"
    },
    text: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 32,
        marginBottom: 16,
        textAlign: "center"
    }
});
