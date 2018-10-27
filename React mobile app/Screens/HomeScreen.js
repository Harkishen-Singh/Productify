import React ,{Component} from 'react';
import {View, Text, KeyboardAvoidingView, TouchableOpacity, TextInput, StyleSheet, ListView} from 'react-native';

export default class HomeScreen extends Component {
    constructor(props) {
        super(props);
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
                <TouchableOpacity style={styles.articles} activeOpacity={0.55}>
                    <View style={{flex:1}}>
                        <Text>Date : 17/10/18</Text>
                    </View>
                    <View style={{flex:4}}>
                        <Text style={styles.heading}>Rail runs over 61 in Amritsar Admist Dusshera celebrations.</Text>
                        <Text style={styles.url}>www.timesofindia.com/railway/india</Text>
                    </View>
                </TouchableOpacity>
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