import React, {Component} from 'react';
import {View, Text, KeyboardAvoidingView, TouchableOpacity, TextInput, StyleSheet} from 'react-native';

export default class LoginScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username:'',
            password:''
        };
        this.checkLogin = this.checkLogin.bind(this);
    }
    checkLogin() {
        alert('checking...')
        this.props.navigation.navigate('Home');
    }
    render() {
        return (
            <KeyboardAvoidingView behavior="padding" style={styles.container}>
                <View style={styles.container}>
                    <Text style={[styles.ttext, {marginBottom:20}]}>Productivity Plus</Text>
                    <Text style={styles.ttext}>User Login</Text>
                    <View style={{flexDirection:'row', marginLeft:70, marginTop:150}}>
                        <Text style={[styles.ttext, {fontSize:15, flex:2}]}>Username : </Text>
                        <TextInput 
                            placeholder="User Name"
                            underlineColorAndroid='transparent'
                            autoCapitalize={false}
                            autoCorrect={false}
                            secureTextEntry={false}
                            style={[styles.textDefaultInput,{flex:3}]}
                            onChangeText={username => this.setState({username})}
                        />
                    </View>
                    <View style={{flexDirection:'row', marginLeft:70, marginTop:10}}>
                        <Text style={[styles.ttext, {fontSize:15, flex:2}]}>Password : </Text>
                        <TextInput 
                            placeholder="Password"
                            underlineColorAndroid='transparent'
                            autoCapitalize={false}
                            autoCorrect={false}
                            secureTextEntry={true}
                            style={[styles.textDefaultInput,{flex:3}]}
                            onChangeText={password => this.setState({password})}
                        />
                    </View>
                    <TouchableOpacity onPress={this.checkLogin}
                        style={{paddingTop:10,paddingBottom:10,paddingLeft:40,paddingRight:40, borderRadius:5,
                            backgroundColor:'blue', marginTop:50}}
                         >
                        <Text style={{color:'#fff'}}> Login </Text>
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
        marginTop:30
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
})
