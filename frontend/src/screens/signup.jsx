import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


const SignupScreen = ({ navigation }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Create Account</Text>

      <View style={styles.formContainer}>
        <Text style={styles.label}>Full Name</Text>
        <TextInput style={styles.input} placeholder="example@example.com" placeholderTextColor="#9DB5A8" />

        <Text style={styles.label}>Email</Text>
        <TextInput style={styles.input} placeholder="example@example.com" placeholderTextColor="#9DB5A8" keyboardType="email-address" />

        <Text style={styles.label}>Mobile Number</Text>
        <TextInput style={styles.input} placeholder="+ 123 456 789" placeholderTextColor="#9DB5A8" keyboardType="phone-pad" />

        <Text style={styles.label}>Date Of Birth</Text>
        <TextInput style={styles.input} placeholder="DD / MM / YYYY" placeholderTextColor="#9DB5A8" />

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

        <Text style={styles.label}>Confirm Password</Text>
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


        <Text style={styles.termsText}>
          By continuing, you agree to {' '}
          <Text style={styles.boldText}>Terms of Use and Privacy Policy.</Text>
        </Text>

        <TouchableOpacity style={styles.signupButton}>
          <Text style={styles.signupText}>Sign Up</Text>
        </TouchableOpacity>

        <Text style={styles.loginText}>
          Already have an account?{' '}
          <Text style={styles.loginLink} onPress={() => navigation.navigate('Login')}>Log In</Text>
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#E7FAF1',
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#004D40',
    marginBottom: 20,
  },
  formContainer: {
    width: '90%',
    backgroundColor: '#D2F5E3',
    padding: 20,
    borderRadius: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#004D40',
    marginBottom: 5,
  },
  input: {
    height: 50,
    backgroundColor: '#E7FAF1',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E7FAF1',
    borderRadius: 10,
    paddingHorizontal: 15,
    height: 50,
    marginBottom: 15,
  },
  passwordInput: {
    flex: 1,
  },
  termsText: {
    fontSize: 12,
    color: '#555',
    textAlign: 'center',
    marginBottom: 10,
  },
  boldText: {
    fontWeight: 'bold',
  },
  signupButton: {
    backgroundColor: '#00BFA5',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  signupText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loginText: {
    textAlign: 'center',
    marginTop: 10,
    fontSize: 14,
  },
  loginLink: {
    color: '#00BFA5',
    fontWeight: 'bold',
  },
});

export default SignupScreen;
