import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const SignupScreen = ({ navigation }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [dob, setDob] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const handleSignup = async () => {
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match!");
      return;
    }

    const userData = { fullName, email, mobileNumber, dob, password };

    try {
      const response = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert("Success", "Account created successfully!");
        navigation.navigate("Login");
      } else {
        Alert.alert("Error", data.message || "Something went wrong!");
      }
    } catch (error) {
      Alert.alert("Error", "Failed to connect to server.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Create Account</Text>

      <View style={styles.formContainer}>
        <Text style={styles.label}>Full Name</Text>
        <TextInput style={styles.input} placeholder="John Doe" placeholderTextColor="#9DB5A8" value={fullName} onChangeText={setFullName} />

        <Text style={styles.label}>Email</Text>
        <TextInput style={styles.input} placeholder="example@example.com" placeholderTextColor="#9DB5A8" keyboardType="email-address" value={email} onChangeText={setEmail} />

        <Text style={styles.label}>Mobile Number</Text>
        <TextInput style={styles.input} placeholder="+ 123 456 789" placeholderTextColor="#9DB5A8" keyboardType="phone-pad" value={mobileNumber} onChangeText={setMobileNumber} />

        <Text style={styles.label}>Date Of Birth</Text>
        <TextInput style={styles.input} placeholder="DD / MM / YYYY" placeholderTextColor="#9DB5A8" value={dob} onChangeText={setDob} />

        <Text style={styles.label}>Password</Text>
        <View style={styles.passwordContainer}>
          <TextInput style={styles.passwordInput} placeholder="••••••••" placeholderTextColor="#9DB5A8" secureTextEntry={!passwordVisible} value={password} onChangeText={setPassword} />
          <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
            <Icon name={passwordVisible ? "eye-off" : "eye"} size={24} color="gray" />
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>Confirm Password</Text>
        <View style={styles.passwordContainer}>
          <TextInput style={styles.passwordInput} placeholder="••••••••" placeholderTextColor="#9DB5A8" secureTextEntry={!confirmPasswordVisible} value={confirmPassword} onChangeText={setConfirmPassword} />
          <TouchableOpacity onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)}>
            <Icon name={confirmPasswordVisible ? "eye-off" : "eye"} size={24} color="gray" />
          </TouchableOpacity>
        </View>

        <Text style={styles.termsText}>
          By continuing, you agree to <Text style={styles.boldText}>Terms of Use and Privacy Policy.</Text>
        </Text>

        <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
          <Text style={styles.signupText}>Sign Up</Text>
        </TouchableOpacity>

        <Text style={styles.loginText}>
          Already have an account? <Text style={styles.loginLink} onPress={() => navigation.navigate('Login')}>Log In</Text>
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flexGrow: 1, backgroundColor: '#E7FAF1', alignItems: 'center', paddingTop: 40, paddingBottom: 20 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#004D40', marginBottom: 20 },
  formContainer: { width: '90%', backgroundColor: '#D2F5E3', padding: 20, borderRadius: 20 },
  label: { fontSize: 16, fontWeight: '500', color: '#004D40', marginBottom: 5 },
  input: { height: 50, backgroundColor: '#E7FAF1', borderRadius: 10, paddingHorizontal: 15, marginBottom: 15 },
  passwordContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#E7FAF1', borderRadius: 10, paddingHorizontal: 15, height: 50, marginBottom: 15 },
  passwordInput: { flex: 1 },
  termsText: { fontSize: 12, color: '#555', textAlign: 'center', marginBottom: 10 },
  boldText: { fontWeight: 'bold' },
  signupButton: { backgroundColor: '#00BFA5', borderRadius: 10, paddingVertical: 15, alignItems: 'center', marginTop: 10 },
  signupText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  loginText: { textAlign: 'center', marginTop: 10, fontSize: 14 },
  loginLink: { color: '#00BFA5', fontWeight: 'bold' },
});

export default SignupScreen;
