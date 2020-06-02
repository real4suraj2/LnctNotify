import React, { useEffect, useState } from "react";
import {
    StyleSheet,
    View,
    Text,
    ScrollView,
    ImageBackground,
    Dimensions,
    FlatList,
    Image,
    Modal,
    Alert,
    TouchableOpacity
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Entypo, Feather } from "@expo/vector-icons";
import * as Updates from "expo-updates";
import * as Linking from "expo-linking";

import {
    COLOR1,
    COLOR2,
    COLOR3,
    COLOR4,
    BGCOLOR,
    GRAD1,
    GRAD2
} from "../constants/color-config";
const { width, height } = Dimensions.get("window");

export default ({ navigation, route }) => {
    const [id, setId] = useState("");
    const [visible, setVisible] = useState(false);
    const [showMedia, setShowMedia] = useState(false);
    const [media, setMedia] = useState({});
    const [filter, setFilter] = useState("");
    const [openFilter, setOpenFilter] = useState(false);
    const [showInfo, setShowInfo] = useState(false);
    const [info, setInfo] = useState({});

    useEffect(() => {
        const _checkForUpdate = async () => {
            try {
                const update = await Updates.checkForUpdateAsync();
                if (update.isAvailable) {
                    await Updates.fetchUpdateAsync();
                    Alert.alert(
                        "Update",
                        "App Update Available! Please Restart the application",
                        [
                            {
                                text: "Restart",
                                onPress: async () => await Updates.reloadAsync()
                            }
                        ],
                        { cancelable: false }
                    );
                }
            } catch (e) {
                console.log("Update Check Failed");
            }
        };
        _checkForUpdate();
    }, []);
    //--------------------MOCK------------------------//
    /*
    const data = {
        "1": {
            logoSmall: require("../assets/images/temp.png"),
            logoLarge: require("../assets/images/temp.png"),
            postName: "Post X",
            timeStamp: new Date().toString(),
            groupName: "Group A",
            postSubName: "Post sub X",
            postAuthor: "Escanor",
            postContent:
                " Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed aliquet mauris quis venenatis suscipit. Pellentesque laoreet ultrices libero. Cras eget quam condimentum ipsum eleifend convallis et ac velit. Donec quis iaculis nulla. Donec vulputate tristique neque eget porttitor. Sed elit nisl, pharetra sed interdum ut, pulvinar ac sem. Phasellus posuere volutpat mi vitae posuere. Sed nec aliquet orci. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Phasellus ac dapibus nibh.\nInteger nec mauris sed ante sagittis efficitur. Proin consequat ultrices enim eu aliquet. Aliquam tincidunt ex eu lobortis imperdiet. Nulla ante quam, condimentum sed eros id, sagittis convallis ante. Phasellus fermentum aliquam odio, sit amet pharetra nibh. Donec vel feugiat metus, non fermentum ligula. Aliquam at libero pellentesque, dapibus nunc vel, volutpat tortor.\nAenean lobortis libero lorem, sit amet pellentesque lectus feugiat in. Praesent non metus turpis. Sed porttitor hendrerit est at aliquam. In quis urna a est aliquam porta sed non magna. Fusce rhoncus vel arcu sed eleifend. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Proin vitae mauris quam. Nulla vel molestie lacus, at pos",
            postContentImages: {
                "1": "../assests/images/temp.png",
                "2": "../assests/images/temp.png",
                "3": "../assets/images/temp.png"
            }
        },
        "2": {
            logoSmall: require("../assets/images/temp.png"),
            logoLarge: require("../assets/images/temp.png"),
            postName: "Post Y",
            timeStamp: new Date().toString(),
            groupName: "Group A",
            postAuthor: "Lelouch",
            postSubName: "Post sub X",
            postContent:
                " Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed aliquet mauris quis venenatis suscipit. Pellentesque laoreet ultrices libero. Cras eget quam condimentum ipsum eleifend convallis et ac velit. Donec quis iaculis nulla. Donec vulputate tristique neque eget porttitor. Sed elit nisl, pharetra sed interdum ut, pulvinar ac sem. Phasellus posuere volutpat mi vitae posuere. Sed nec aliquet orci. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Phasellus ac dapibus nibh.\nInteger nec mauris sed ante sagittis efficitur. Proin consequat ultrices enim eu aliquet. Aliquam tincidunt ex eu lobortis imperdiet. Nulla ante quam, condimentum sed eros id, sagittis convallis ante. Phasellus fermentum aliquam odio, sit amet pharetra nibh. Donec vel feugiat metus, non fermentum ligula. Aliquam at libero pellentesque, dapibus nunc vel, volutpat tortor.\nAenean lobortis libero lorem, sit amet pellentesque lectus feugiat in. Praesent non metus turpis. Sed porttitor hendrerit est at aliquam. In quis urna a est aliquam porta sed non magna. Fusce rhoncus vel arcu sed eleifend. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Proin vitae mauris quam. Nulla vel molestie lacus, at pos",
            postContentImages: {
                "1": "../assests/images/temp.png",
                "2": "../assests/images/temp.png",
                "3": "../assets/images/temp.png"
            }
        },
        "3": {
            logoSmall: require("../assets/images/temp.png"),
            logoLarge: require("../assets/images/temp.png"),
            postName: "Post Z",
            timeStamp: new Date().toString(),
            groupName: "Group A",
            postAuthor: "Luffy",
            postSubName: "Post sub X",
            postContent:
                " Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed aliquet mauris quis venenatis suscipit. Pellentesque laoreet ultrices libero. Cras eget quam condimentum ipsum eleifend convallis et ac velit. Donec quis iaculis nulla. Donec vulputate tristique neque eget porttitor. Sed elit nisl, pharetra sed interdum ut, pulvinar ac sem. Phasellus posuere volutpat mi vitae posuere. Sed nec aliquet orci. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Phasellus ac dapibus nibh.\nInteger nec mauris sed ante sagittis efficitur. Proin consequat ultrices enim eu aliquet. Aliquam tincidunt ex eu lobortis imperdiet. Nulla ante quam, condimentum sed eros id, sagittis convallis ante. Phasellus fermentum aliquam odio, sit amet pharetra nibh. Donec vel feugiat metus, non fermentum ligula. Aliquam at libero pellentesque, dapibus nunc vel, volutpat tortor.\nAenean lobortis libero lorem, sit amet pellentesque lectus feugiat in. Praesent non metus turpis. Sed porttitor hendrerit est at aliquam. In quis urna a est aliquam porta sed non magna. Fusce rhoncus vel arcu sed eleifend. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Proin vitae mauris quam. Nulla vel molestie lacus, at pos",
            postContentImages: {
                "1": "../assests/images/temp.png",
                "2": "../assests/images/temp.png",
                "3": "../assets/images/temp.png"
            }
        },
        "4": {
            logoSmall: require("../assets/images/temp.png"),
            logoLarge: require("../assets/images/temp.png"),
            postName: "Post AZ",
            timeStamp: new Date().toString(),
            postAuthor: "Capt. Levi",
            groupName: "Group A",
            postSubName: "Post sub X",
            postContent:
                " Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed aliquet mauris quis venenatis suscipit. Pellentesque laoreet ultrices libero. Cras eget quam condimentum ipsum eleifend convallis et ac velit. Donec quis iaculis nulla. Donec vulputate tristique neque eget porttitor. Sed elit nisl, pharetra sed interdum ut, pulvinar ac sem. Phasellus posuere volutpat mi vitae posuere. Sed nec aliquet orci. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Phasellus ac dapibus nibh.\nInteger nec mauris sed ante sagittis efficitur. Proin consequat ultrices enim eu aliquet. Aliquam tincidunt ex eu lobortis imperdiet. Nulla ante quam, condimentum sed eros id, sagittis convallis ante. Phasellus fermentum aliquam odio, sit amet pharetra nibh. Donec vel feugiat metus, non fermentum ligula. Aliquam at libero pellentesque, dapibus nunc vel, volutpat tortor.\nAenean lobortis libero lorem, sit amet pellentesque lectus feugiat in. Praesent non metus turpis. Sed porttitor hendrerit est at aliquam. In quis urna a est aliquam porta sed non magna. Fusce rhoncus vel arcu sed eleifend. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Proin vitae mauris quam. Nulla vel molestie lacus, at pos",
            postContentImages: {
                "1": "../assests/images/temp.png",
                "2": "../assests/images/temp.png",
                "3": "../assets/images/temp.png"
            }
        }
    };
    */
    //-------------------------------------------------------------//
    const { data, groups, groupsInfo } = route.params;

    const renderFilter = () => {
        return (
            <View style={{ ...styles.modal }}>
                <View
                    style={{
                        flex: 0.2,
                        flexDirection: "row",
                        justifyContent: "flex-end",
                        marginTop: 32,
                        marginRight: 16
                    }}
                >
                    <TouchableOpacity onPress={() => setOpenFilter(false)}>
                        <Feather name="arrow-left" color={COLOR1} size={32} />
                    </TouchableOpacity>
                </View>
                <View
                    style={{
                        ...styles.container,
                        flex: 0.3,
                        marginBottom: 12,
                        justifyContent: "flex-start"
                    }}
                >
                    <Image
                        source={require("../assets/icon.png")}
                        resizeMode="contain"
                        style={{ width: 150, height: 150 }}
                    />
                    <Text
                        style={{
                            ...styles.heading,
                            fontSize: 32,
                            textDecorationLine: "underline"
                        }}
                    >
                        Available Clubs
                    </Text>
                </View>
                <View
                    style={{
                        ...styles.container,
                        flex: 0.5,
                        justifyContent: "flex-start"
                    }}
                >
                    <FlatList
                        data={groups}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={(item, index) => "filter" + index}
                        renderItem={({ item, index }) => {
                            if (item == null) return null;
                            return (
                                <TouchableOpacity
                                    onPress={() => {
                                        setFilter(item);
                                        setOpenFilter(false);
                                    }}
                                    style={{
                                        ...styles.button,
                                        marginBottom: 12
                                    }}
                                >
                                    <Text
                                        style={{
                                            ...styles.heading,
                                            color: { COLOR1 },
                                            fontSize: 18,
                                            textAlign: "center"
                                        }}
                                    >
                                        {item}
                                    </Text>
                                </TouchableOpacity>
                            );
                        }}
                    />
                    <TouchableOpacity
                        onPress={() => Updates.reloadAsync()}
                        style={{ width: width * 0.85, marginBottom: 12 }}
                    >
                        <Text
                            style={{
                                ...styles.subHeading,
                                fontSize: 18,
                                textDecorationLine: "underline"
                                ,textAlign: 'center'
                            }}
                        >
                            Reset
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    };
    const renderImages = images => (
        <View
            style={{
                ...styles.modal,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "rgba(0, 0, 0, 0.8)"
            }}
        >
            <FlatList
                horizontal
                pagingEnabled
                scrollEnabled
                snapToAlignment="center"
                scrollEventThrottle={16}
                showsHorizontalScrollIndicator={false}
                data={Object.values(images)}
                keyExtractor={(item, index) => "image" + index}
                renderItem={({ item, index }) => {
                    return (
                        <View>
                            <Image
                                source={{
                                    uri: item
                                }}
                                style={{ width, height, resizeMode: "contain" }}
                            />
                        </View>
                    );
                }}
            />
            <TouchableOpacity
                style={{
                    ...styles.button,
                    marginBottom: 12,
                    backgroundColor: { COLOR1 }
                }}
                onPress={() => setShowMedia(false)}
            >
                <Text
                    style={{
                        textAlign: "center",
                        color: COLOR2,
                        fontWeight: "bold"
                    }}
                >
                    Back
                </Text>
            </TouchableOpacity>
        </View>
    );
    const renderPost = post => (
        <View style={{ ...styles.modal }}>
            <View style={{ flex: 0.3 }}>
                <Image
                    source={{ uri: post.logoLarge }}
                    resizeMode="cover"
                    style={{ width, height: 200, overflow: "hidden" }}
                />
                <TouchableOpacity
                    onPress={() => setVisible(false)}
                    style={{
                        flex: 0,
                        position: "absolute",
                        top: 24,
                        left: 24,
                        backgroundColor: COLOR2,
                        borderRadius: 32,
                        opacity: 0.85
                    }}
                >
                    <Feather name="arrow-left" color={COLOR1} size={32} />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        setShowInfo(true);
                        setInfo(groupsInfo[post.groupName]);
                    }}
                    style={{
                        flex: 0,
                        position: "absolute",
                        top: 24,
                        right: 24,
                        backgroundColor: COLOR2,
                        borderRadius: 32,
                        opacity: 0.85
                    }}
                >
                    <Feather name="info" color={COLOR1} size={32} />
                </TouchableOpacity>
            </View>
            <View style={{ flex: 0.6 }}>
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        paddingHorizontal: 12
                    }}
                >
                    <View>
                        <Text style={{ ...styles.heading }}>
                            {post.postName}
                        </Text>
                        <Text style={{ ...styles.subHeading }}>
                            {post.postSubName}
                        </Text>
                    </View>
                    <View>
                        <Text style={{ ...styles.subHeading }}>
                            {post.groupName}
                        </Text>
                    </View>
                </View>
                <ScrollView style={{ paddingHorizontal: 12 }}>
                    <Text style={{ ...styles.content }}>
                        {post.postContent}
                    </Text>
                </ScrollView>
            </View>
            <View
                style={{
                    flex: 0.1,
                    justifyContent: "flex-end",
                    marginBottom: 12,
                    alignItems: "center"
                }}
            >
                <TouchableOpacity
                    onPress={() => {
                        setShowMedia(true);
                        setMedia(post.postContentImages);
                    }}
                    style={{ ...styles.button, marginBottom: 6 }}
                >
                    <Text style={{ color: { COLOR1 }, textAlign: "center" }}>
                        Media : ({post.postContentImages.length - 1}) Image(s)
                    </Text>
                </TouchableOpacity>
                <Text style={{ ...styles.author }}>By: {post.postAuthor}</Text>
            </View>
        </View>
    );

    const renderInfo = club => {
        return (
            <View style={{ ...styles.modal }}>
                <View style={{ ...styles.container }}>
                    <View
                        style={{
                            flex: 0.1,
                            width: width * 0.85,
                            flexDirection: "row",
                            justifyContent: "flex-end"
                        }}
                    >
                        <TouchableOpacity onPress={() => setShowInfo(false)}>
                            <Feather
                                name="arrow-left"
                                color={COLOR1}
                                size={32}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={{ ...styles.container, flex: 0.5 }}>
                        <Image
                            source={{ uri: club.logo }}
                            style={{
                                width: 150,
                                height: 150,
                                borderRadius: 150,
                                marginBottom: 12
                            }}
                            resizeMode="contain"
                        />
                        <Text style={{ ...styles.heading, fontSize: 32 }}>
                            {club.Name}
                        </Text>
                    </View>
                    <View
                        style={{
                            ...styles.container,
                            flex: 0.4,
                            justifyContent: "flex-start"
                        }}
                    >
                        <Text style={{ ...styles.heading }}>
                            Support Email: {club.email}
                        </Text>
                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-around",
                                marginTop: 18
                            }}
                        >
                            {Object.keys(club).map(social => {
                                if (
                                    social == "email" ||
                                    social == "logo" ||
                                    social == "Name"
                                )
                                    return null;
                                return (
                                    <TouchableOpacity
                                        onPress={() =>
                                            Linking.openURL(club[social])
                                        }
                                        style={{ ...styles.socialButtons }}
                                    >
                                        <Feather
                                            name={social}
                                            color={COLOR1}
                                            size={42}
                                        />
                                    </TouchableOpacity>
                                );
                            })}
                        </View>
                    </View>
                </View>
            </View>
        );
    };
    return (
        <View style={{ ...styles.container }}>
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "flex-end",
                    width: width * 0.85
                }}
            >
                <TouchableOpacity
                    onPress={() => {
                        setOpenFilter(true);
                        console.log("Filter Mode");
                    }}
                >
                    <Feather name="filter" color={COLOR1} size={24} />
                </TouchableOpacity>
            </View>
            <FlatList
                keyExtractor={(item, index) => `id-${item}`}
                showsVerticalScrollIndicator={false}
                data={Object.keys(data).sort((a, b) => Number(a) < Number(b))}
                renderItem={({ item, index }) => {
                    if (
                        data[item].groupName
                            .toLowerCase()
                            .search(filter.toLowerCase()) === -1
                    )
                        return null;
                    return (
                        <LinearGradient
                            colors={[GRAD1, GRAD2]}
                            useAngle={true}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            style={[styles.faceStyle]}
                        >
                            <View
                                style={{
                                    flexDirection: "row",
                                    marginBottom: 12,
                                    flex: 0.2
                                }}
                            >
                                <Image
                                    source={{
                                        uri: data[item].logoSmall
                                    }}
                                    style={{ ...styles.logo }}
                                />
                                <View style={{ marginLeft: 12 }}>
                                    <Text style={{ ...styles.heading }}>
                                        {data[item].postName}
                                    </Text>
                                    <Text style={{ ...styles.subHeading }}>
                                        {data[item].postSubName}
                                    </Text>
                                    <View style={{ ...styles.divider }} />
                                </View>
                            </View>
                            <View
                                style={{
                                    flex: 0.1,
                                    justifyContent: "center"
                                }}
                            >
                                <Text style={{ ...styles.heading }}>
                                    {data[item].groupName}
                                </Text>
                            </View>
                            <View
                                style={{
                                    ...styles.postContainer,
                                    flex: 0.6
                                }}
                            >
                                <Text style={{ ...styles.content }}>
                                    {data[item].postContent.slice(0, 250)}
                                    ...
                                </Text>
                            </View>
                            <View
                                style={{
                                    flex: 0.1,
                                    flexDirection: "row",
                                    justifyContent: "space-between"
                                }}
                            >
                                <Text style={{ ...styles.caption }}>
                                    {data[item].timeStamp}
                                </Text>
                                <TouchableOpacity
                                    onPress={() => {
                                        setVisible(true);
                                        setId(item);
                                    }}
                                >
                                    <Entypo
                                        name="forward"
                                        color={COLOR1}
                                        size={16}
                                    />
                                </TouchableOpacity>
                            </View>
                        </LinearGradient>
                    );
                }}
            />
            {visible && renderPost(data[id])}
            {showMedia && renderImages(media)}
            {openFilter && renderFilter()}
            {showInfo && renderInfo(info)}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width,
        justifyContent: "center",
        alignItems: "center",
        paddingTop: 42,
        backgroundColor: BGCOLOR
    },
    logo: {
        width: 50,
        height: 50,
        borderRadius: 100,
        marginTop: 3,
        marginLeft: 6
    },
    heading: {
        fontWeight: "bold",
        fontSize: 18,
        color: COLOR1
    },
    subHeading: {
        fontStyle: "italic",
        color: COLOR3,
        fontSize: 12,
        color: COLOR1
    },
    divider: {
        width: width * 0.55,
        height: StyleSheet.hairlineWidth,
        backgroundColor: COLOR4,
        marginTop: 6,
        marginLeft: 3
    },
    postContainer: {
        paddingHorizontal: 12
    },
    caption: {
        color: COLOR4,
        fontSize: 10,
        marginTop: 2
    },
    faceStyle: {
        borderRadius: 12,
        padding: 12,
        marginTop: 12,
        marginBottom: 12,
        width: width * 0.85,
        elevation: 3
    },
    content: {
        fontStyle: "italic",
        color: COLOR1
    },
    modal: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: BGCOLOR
    },
    author: {
        textAlign: "center",
        textDecorationLine: "underline",
        color: COLOR1,
        fontStyle: "italic",
        fontSize: 12
    },
    button: {
        width: width * 0.85,
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 6,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: COLOR1
    },
    socialButtons: {
        width: 50,
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 12,
        borderRadius: 50
    }
});
