import React from 'react'
import { StyleSheet, Text, TextInput, View, Button } from "react-native";
import firebase from 'firebase'
import { db } from '../../Firebase'

export default class SignUp extends React.Component {
    state= { name: '', email: '', password: '', errorMessage: null}

    handleSignup = () => {
        var self = this
        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then((response) => {
            console.log(response.user.uid)
            db.collection("users").doc(response.user.uid).set({
                name: self.state.name,
                id: response.user.uid,
                profile_picture: 'https://us.123rf.com/450wm/pikepicture/pikepicture1612/pikepicture161200524/68824656-male-default-placeholder-avatar-profile-gray-picture-isolated-on-white-background-for-your-design-ve.jpg?ver=6'
            })
            .then(function() {
                console.log("Document successfully written!");
            })
            .catch(function(error) {
                console.error("Error writing document: ", error);
            });
            this.props.navigation.navigate('Main')
        })
        .catch(error => this.setState({errorMessage: error.message}))
    }

    render () {
        return (
            <View style={style.container}>
                <Text>Sign Up</Text>
                {this.state.errorMessage && 
                <Text style={{color: 'red'}}>
                    {this.state.errorMessage}
                </Text>}
                <TextInput
                    placeholder="Name"
                    autoCapitalize="none"
                    style={style.textInput}
                    onChangeText={name => this.setState({name})}
                    value={this.state.name}
                />
                <TextInput
                    placeholder="Email"
                    autoCapitalize="none"
                    style={style.textInput}
                    onChangeText={email => this.setState({email})}
                    value={this.state.email}
                />
                <TextInput
                    secureTextEntry
                    placeholder="Password"
                    autoCapitalize="none"
                    style={style.textInput}
                    onChangeText={password => this.setState({password})}
                    value={this.state.password}
                />
                <Button title="Sign Up" onPress={this.handleSignup} />
                <Button 
                    title="Already have an account? Login"
                    onPress={()=> this.props.navigation.navigate('Login')}
                />
            </View>
        )
    }
}

const style = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    textInput: {
      height: 40,
      width: '90%',
      borderColor: 'gray',
      borderWidth: 1,
      marginTop: 8
    }
  })