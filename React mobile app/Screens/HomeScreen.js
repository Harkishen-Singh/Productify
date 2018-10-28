import React ,{Component} from 'react';
import {View, Text, KeyboardAvoidingView, TouchableOpacity, TextInput, StyleSheet, ListView, ScrollView} from 'react-native';

export default class HomeScreen extends Component {
    constructor(props) {
        super(props);
        const ds= new ListView.DataSource({rowHasChanged:(r1, r2) => r1 !== r2});
        this.state = {
            datasource : ds.cloneWithRows(['url', 'message','time']),
        }
    }
    componentWillMount() {
        fetch('http://127.0.0.1:5000/getArticles', {
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            method:'GET'
        })
        .then(resp => resp.json())
        .then(res => {

        })
    }
    render() {
        return (
            <KeyboardAvoidingView behavior='padding' style={styles.container}>
            <View style={styles.container}>
                <View >
                    <Text style={{marginBottom:10}}> Articles </Text>
                </View>
                <TouchableOpacity style={styles.articles} activeOpacity={0.55}>
                    <View style={{flex:1}}>
                        <Text>Date : 17/10/18</Text>
                    </View>
                    <View style={{flex:4}}>
                        <Text style={styles.heading}>Rail runs over 61 in Amritsar Admist Dusshera celebrations.</Text>
                        <Text style={styles.url}>www.timesofindia.com/railway/india</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.articles} activeOpacity={0.55}>
                    <View style={{flex:1}}>
                        <Text>Date : 17/10/18</Text>
                    </View>
                    <View style={{flex:4}}>
                        <Text style={styles.heading}>Rail runs over 61 in Amritsar Admist Dusshera celebrations.</Text>
                        <Text style={styles.url}>www.timesofindia.com/railway/india</Text>
                    </View>
                </TouchableOpacity>

                <ListView
                    dataSource={this.state.datasource}
                    renderRow={ data => 
                        <View style={{flexDirection:'column'}} >
                            <TouchableOpacity style={styles.articles} activeOpacity={0.55}>
                                <View style={{flex:1}}>
                                    <Text>Date : {data.date}</Text>
                                </View>
                                <View style={{flex:4}}>
                                    <Text style={styles.heading}>{data.message}</Text>
                                    <Text style={styles.url}>{data.url}</Text>
                                </View>
                            </TouchableOpacity>
                            
                            <Text>{'\n'} </Text>
                        </View>
                    }
                    />

            </View>
            </KeyboardAvoidingView>

        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        backgroundColor:'#fff',
        marginTop:15
    },
    ttext:{
        color:'black',
        fontSize:20,
    },
    textDefaultInput: {
        borderRadius:4,
        color:'black',
        fontWeight:'bold',
        backgroundColor:'#FCE4EC',
        width:200,
        textAlign:'center',
        marginRight:50
    },
    articles:{
        marginTop:4,
        flexDirection:'row', 
        backgroundColor:'#F9FBE7',
        marginLeft:10,
        borderColor:'green',
        borderWidth:1,
        padding:3,
        borderRadius:5
    },
    heading:{
        fontWeight:'bold',
        fontSize:13
    },
    url:{
        fontStyle:'italic',
        fontSize:11
    }
});