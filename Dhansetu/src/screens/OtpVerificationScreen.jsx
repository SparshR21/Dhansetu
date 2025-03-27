import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const OtpVerificationScreen = ({ route, navigation }) => {
  const { email, mobileNumber } = route.params;
  const [otp, setOtp] = useState('');

  const handleVerifyOtp = async () => {
    if (!otp) {
      Alert.alert("Error", "Please enter OTP.");
      return;
    }

    try {
      const response = await fetch("http://10.0.2.2:5000/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, mobileNumber, otp }),
      });

      const data = await response.json();
      console.log("📩 OTP Response:", data);

      if (response.ok) {
        Alert.alert("Success", "OTP Verified! You can now log in.");
        navigation.navigate("Login");
      } else {
        Alert.alert("Error", data.message || "Invalid OTP.");
      }
    } catch (error) {
      console.error("❌ OTP Fetch Error:", error);
      Alert.alert("Error", "Failed to verify OTP.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verify OTP</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter OTP"
        keyboardType="numeric"
        value={otp}
        onChangeText={setOtp}
      />
      <TouchableOpacity style={styles.verifyButton} onPress={handleVerifyOtp}>
        <Text style={styles.verifyText}>Verify</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#E7FAF1' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: '#004D40' },
  input: { width: '80%', height: 50, backgroundColor: '#D2F5E3', borderRadius: 10, paddingHorizontal: 15, textAlign: 'center', marginBottom: 20 },
  verifyButton: { backgroundColor: '#00BFA5', paddingVertical: 15, borderRadius: 10, width: '60%', alignItems: 'center' },
  verifyText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});

export default OtpVerificationScreen;
