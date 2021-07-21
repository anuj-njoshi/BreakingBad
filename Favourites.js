import React, { Component } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { Search, Heart,X } from "react-native-feather";
import { connect } from 'react-redux';



class Favourites extends Component {
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
      

    }

   

    render() {
        const { data,favouriteList } = this.props;
        let listFavourites =[];
        data.forEach((element )=> {
            if(Array.isArray(favouriteList) && favouriteList.length && favouriteList.indexOf(element.char_id)!==-1){
                listFavourites.push(element);
            }
            
        });
        
        const renderItem = ({ item }) => (
            <Item item={item} title={item.artistName} />
        );
        const Item = ({ item, title }) => (
            <View onPress={() => this.props.navigation.navigate('PlayList', { item })}
                style={{ flex: 1, padding: 20, flexDirection: 'column' }}>
                <Image source={{ uri: item.img }} resizeMode="contain" style={{ flex: 1, width: 150, height: 200 }} />
                <View style={{ flex: 1, left: 4, paddingVertical: 10, flexDirection: 'row' }}>
                    <View style={{ flex: 1,  flexDirection: 'column' }}>
                        <Text style={{ textAlign: 'left', color: '#fff', fontSize: 12 }}>{item.name}</Text>
                        <Text style={{ textAlign: 'left', color: '#fff', fontSize: 12 }}>{item.nickname}</Text>
                    </View>
                    <TouchableOpacity onPress={() => this.props.add(item.char_id,data)} style={{ flex: 0.4, flexDirection:'row' }}>
                        <Heart stroke="#18CA75" fill="#18CA75" width={23} height={25} />
                    </TouchableOpacity>
                </View>
            </View>
        );
        return (
            <>
                <View style={{ flexDirection: 'row', paddingVertical: 5, backgroundColor: '#000', height: 60 }}>
                <Text style={{ color: '#fff', fontSize: 16, top: 10, padding: 5 }}>Favourites</Text>
                    <View style={{ flex: 1, height: 60, flexDirection: 'row-reverse' }}>
                        
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('ListView')} style={{ top: 5, padding: 5 }}>
                            <X stroke="#fff" fill="#000" width={23} height={25} />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{ flex: 1, backgroundColor: '#000' }}>
                    <FlatList
                        data={listFavourites}
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
  
    data: state.favourite.listData,
    favouriteList: state.favourite.favouriteList
});

const mapDispatchToProps = (dispatch) => ({
   list: (data) => dispatch({type: 'list',payload:{data}}),
   add: (char_id,data) => dispatch({type: 'add',payload:{char_id,data}}),
   remove: () => dispatch({type: 'remove',ayload:{char_id}}),
});

export default connect(mapStateToProps, mapDispatchToProps)(Favourites);

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