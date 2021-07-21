import React, { Component } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { Search, Heart } from "react-native-feather";
import { connect } from 'react-redux';



class ListView extends Component {
    state = {
        data: [],
        count: []
    }
    arrayUnique = (arr, uniqueKey) => {
        const flagList = new Set()
        return arr.filter(function (item) {
            if (!flagList.has(item[uniqueKey])) {
                flagList.add(item[uniqueKey])
                return true
            }
        })
    }
    componentDidMount = () => {
        fetch('https://www.breakingbadapi.com/api/characters', {
            method: 'GET'
        })
            .then((response) => response.json())
            .then((responseJson) => {
                this.props.list(responseJson);
                this.setState({
                    data: responseJson,
                })
            })
            .catch((error) => {
                console.error(error);
            });

    }

    open = () => {

    }

    render() {
        const { data } = this.state;
        console.log("data")
        if (!data.length) {
            return (
                <View style={{
                    flex: 1, flexDirection: 'column',
                    justifyContent: "center"
                }}>
                    <ActivityIndicator animating={true}
                        color='#bc2b78'
                        size="large"
                        style={styles.activityIndicator} />
                    <Text style={{ color: '#000', textAlign: 'center' }}>Please Wait</Text>
                </View>
            )
        }
        const renderItem = ({ item }) => (
            <Item item={item} title={item.artistName} />
        );
        const Item = ({ item, title, }) => (
            <View onPress={() => this.props.navigation.navigate('PlayList', { item })}
                style={{ flex: 1, padding: 20, flexDirection: 'column' }}>
                <Image source={{ uri: item.img }} resizeMode="contain" style={{ flex: 1, width: 150, height: 200 }} />
                <View style={{ flex: 1, left: 4, paddingVertical: 10, flexDirection: 'row' }}>
                    <View style={{ flex: 1, flexDirection: 'column' }}>
                        <Text style={{ textAlign: 'left', color: '#fff', fontSize: 12 }}>{item.name}</Text>
                        <Text style={{ textAlign: 'left', color: '#fff', fontSize: 12 }}>{item.nickname}</Text>
                    </View>

                    {this.props.favouriteList.indexOf(item.char_id) !== -1 ?
                        <TouchableOpacity onPress={() => this.props.remove(item.char_id, data)} style={{ flex: 0.4, flexDirection: 'row-reverse' }}>
                            <Heart stroke="#18CA75" fill="#18CA75" width={33} height={25} />
                        </TouchableOpacity>
                        :
                        <TouchableOpacity onPress={() => this.props.add(item.char_id, data)} style={{ flex: 0.4, flexDirection: 'row-reverse' }}>
                            <Heart stroke="#18CA75" fill="#000" width={23} height={25} />
                        </TouchableOpacity>
                    }
                </View>
            </View>
        );
        return (
            <>
                <View style={{ flexDirection: 'row', paddingVertical: 5, backgroundColor: '#000', height: 60 }}>
                    <Text style={{ color: '#fff', fontSize: 16, top: 10, padding: 5 }}>The Breaking Bad</Text>
                    <View style={{ flex: 1, height: 60, flexDirection: 'row-reverse' }}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Favourites')} style={{ top: 5, padding: 5 }}>
                            <Heart stroke="#18CA75" fill="#18CA75" width={23} height={25} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('SearchBar')} style={{ top: 5, padding: 5 }}>
                            <Search stroke="#fff" fill="#000" width={23} height={25} />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{ flex: 1, backgroundColor: '#000' }}>
                    <FlatList
                        data={data}
                        renderItem={renderItem}
                        numColumns={2}

                        keyExtractor={item => item.char_id}
                    />
                </View>
            </>
        )
    }

}
const mapStateToProps = (state) => ({
    listData: state.favourite.listData,
    favouriteList: state.favourite.favouriteList
});

const mapDispatchToProps = (dispatch) => ({
    list: (data) => dispatch({ type: 'list', payload: { data } }),
    add: (char_id, data) => dispatch({ type: 'add', payload: { char_id, data } }),
    remove: (char_id, data) => dispatch({ type: 'remove', payload: { char_id, data } }),
});

export default connect(mapStateToProps, mapDispatchToProps)(ListView);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 70,
    },
    activityIndicator: {

        justifyContent: 'center',
        alignItems: 'center',

    }
})    