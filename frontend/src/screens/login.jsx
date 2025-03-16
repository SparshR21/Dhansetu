import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const LoginScreen = ({ navigation }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome</Text>
      
      <View style={styles.formContainer}>
        <Text style={styles.label}>Username Or Email</Text>
        <TextInput style={styles.input} placeholder="example@example.com" placeholderTextColor="#9DB5A8" />

        <Text style={styles.label}>Password</Text>
        <View style={styles.passwordContainer}>
          <TextInput 
            style={styles.passwordInput} 
            placeholder="••••••••" 
            placeholderTextColor="#9DB5A8" 
            secureTextEntry={!passwordVisible} 
          />
          <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
            <Icon name={passwordVisible ? "eye-off" : "eye"} size={24} color="gray" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.loginButton}>
          <Text style={styles.loginText}>Log In</Text>
        </TouchableOpacity>
        
        <Text style={styles.forgotPassword}>Forgot Password?</Text>
        
        <TouchableOpacity style={styles.signupButton}>
          <Text style={styles.signupText}>Sign Up</Text>
        </TouchableOpacity>

        <Text style={styles.fingerprintText}>
          Use <Text style={styles.fingerprintBold}>Fingerprint</Text> To Access
        </Text>

        <View style={styles.socialContainer}>
          <TouchableOpacity>
            <Icon name="facebook" size={32} color="#4267B2" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon name="google" size={32} color="#DB4437" />
          </TouchableOpacity>
        </View>

        <Text style={styles.signupPrompt}>
          Don't have an account? <Text style={styles.signupLink} onPress={() => navigation.navigate('Signup')}>Sign Up</Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00C2A8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 20,
  },
  formContainer: {
    width: '90%',
    backgroundColor: '#EAF8EE',
    padding: 20,
    borderRadius: 20,
    alignItems: 'center',
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
    alignSelf: 'flex-start',
    marginBottom: 5,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#DFF1E7',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#DFF1E7',
    borderRadius: 10,
    width: '100%',
    height: 50,
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  passwordInput: {
    flex: 1,
  },
  loginButton: {
    backgroundColor: '#00C2A8',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    width: '100%',
  },
  loginText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  forgotPassword: {
    marginTop: 10,
    fontSize: 14,
    color: '#000',
  },
  signupButton: {
    backgroundColor: '#DFF1E7',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    width: '100%',
    marginTop: 10,
  },
  signupText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },
  fingerprintText: {
    fontSize: 14,
    marginTop: 20,
    color: '#000',
  },
  fingerprintBold: {
    fontWeight: 'bold',
    color: '#007AFF',
  },
  socialContainer: {
    flexDirection: 'row',
    marginTop: 20,
    gap: 20,
  },
  signupPrompt: {
    marginTop: 20,
    fontSize: 14,
    color: '#000',
  },
  signupLink: {
    color: '#007AFF',
    fontWeight: 'bold',
  },
});

export default LoginScreen;
