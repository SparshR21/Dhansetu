import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput, ActivityIndicator } from "react-native";
import { Picker } from "@react-native-picker/picker";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";

const InvestmentScreen = () => {
  const navigation = useNavigation();

  const [age, setAge] = useState("");
  const [occupation, setOccupation] = useState("");
  const [financialGoal, setFinancialGoal] = useState("");
  const [investmentAmount, setInvestmentAmount] = useState("");
  const [riskTolerance, setRiskTolerance] = useState("");
  const [investmentDuration, setInvestmentDuration] = useState("");
  const [liquidityNeeds, setLiquidityNeeds] = useState("");
  const [annualIncome, setAnnualIncome] = useState("");
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    const payload = {
      Age: parseInt(age),
      Occupation: occupation,
      Risk_Tolerance: riskTolerance,
      Investment_Duration: investmentDuration,
      Financial_Goals: financialGoal,
      Investment_Amount: parseFloat(investmentAmount),
      Liquidity_Needs: liquidityNeeds,
      Annual_Income: parseFloat(annualIncome),
    };

    try {
      const response = await fetch('http://10.0.2.2:8000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error fetching prediction:', errorData);
        setPrediction("Error fetching prediction.");
        return;
      }

      const data = await response.json();
      console.log('API Response:', data);
      setPrediction(data.prediction); 

      setPrediction(data.investment_recommendation);
    } catch (error) {
      console.error('Network error:', error);
      setPrediction("Network error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContainer}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Personalized Investment Recommendation System</Text>
        <Icon name="bell" size={24} color="#000" />
      </View>

      {/* Form Section */}
      <View style={styles.form}>
        {/* Age Input */}
        <Text style={styles.label}>Age</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your age"
          keyboardType="numeric"
          value={age}
          onChangeText={(text) => setAge(text)}
        />

        {/* Occupation */}
        <Text style={styles.label}>Occupation</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your occupation"
          value={occupation}
          onChangeText={(text) => setOccupation(text)}
          autoCapitalize="words" // Capitalizes the first letter of each word
        />


        {/* Financial Goal Input */}
        <Text style={styles.label}>Financial Goal</Text>
        <TextInput
          style={styles.input}
          placeholder="E.g., Buying a house, Retirement, Education"
          value={financialGoal}
          onChangeText={(text) => setFinancialGoal(text)}
        />

        {/* Investment Amount Input */}
        <Text style={styles.label}>Investment Amount</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter amount (in USD)"
          keyboardType="numeric"
          value={investmentAmount}
          onChangeText={(text) => setInvestmentAmount(text)}
        />

        {/* Annual Income Input */}
        <Text style={styles.label}>Annual Income</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your annual income"
          keyboardType="numeric"
          value={annualIncome}
          onChangeText={(text) => setAnnualIncome(text)}
        />

        {/* Risk Tolerance */}
        <Text style={styles.label}>Risk Tolerance</Text>
        <Picker
          selectedValue={riskTolerance}
          onValueChange={(itemValue) => setRiskTolerance(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Select Risk Tolerance" value="" />
          <Picker.Item label="Low" value="Low" />
          <Picker.Item label="Medium" value="Medium" />
          <Picker.Item label="High" value="High" />
        </Picker>

        {/* Investment Duration */}
        <Text style={styles.label}>Investment Duration</Text>
        <Picker
          selectedValue={investmentDuration}
          onValueChange={(itemValue) => setInvestmentDuration(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Select Duration" value="" />
          <Picker.Item label="Short-Term" value="Short-Term" />
          <Picker.Item label="Mid-Term" value="Mid-Term" />
          <Picker.Item label="Long-Term" value="Long-Term" />
        </Picker>

        {/* Liquidity Needs */}
        <Text style={styles.label}>Liquidity Needs</Text>
        <Picker
          selectedValue={liquidityNeeds}
          onValueChange={(itemValue) => setLiquidityNeeds(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Select Liquidity Needs" value="" />
          <Picker.Item label="High" value="High" />
          <Picker.Item label="Medium" value="Medium" />
          <Picker.Item label="Low" value="Low" />
        </Picker>
      </View>

      {/* Generate Button */}
      <TouchableOpacity style={styles.generateBtn} onPress={handleGenerate}>
        <Text style={styles.generateText}>Generate</Text>
      </TouchableOpacity>

      {/* Loading Indicator */}
      {loading && <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 20 }} />}

      {/* Prediction Result */}
      {prediction && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultLabel}>Investment Recommendation:</Text>
          <Text style={styles.resultText}>{prediction}</Text>
        </View>
      )}

      {/* Comparison Matrix */}
      <Text style={styles.comparisonText}>COMPARISON MATRIX</Text>

      <View style={styles.options}>
        <TouchableOpacity style={styles.optionBtn}>
          <Text>Option 1</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionBtn}>
          <Text>Option 2</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.compareBtn}>
        <Text style={styles.compareText}>COMPARE</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#DFF8E5" },
  scrollContainer: { padding: 20, paddingBottom: 50 },
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 20 },
  headerText: { fontSize: 18, fontWeight: "bold", flex: 1, textAlign: "center" },
  form: { marginBottom: 20 },
  label: { fontWeight: "bold", marginTop: 10 },
  input: {
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  picker: { backgroundColor: "#fff", borderRadius: 5, marginVertical: 5 },
  generateBtn: { backgroundColor: "green", padding: 10, borderRadius: 5, alignItems: "center", marginTop: 20 },
  generateText: { color: "#fff", fontWeight: "bold" },
  resultContainer: { marginTop: 20, padding: 15, backgroundColor: "#fff", borderRadius: 5, height: 150 },
  resultLabel: { fontWeight: "bold", marginBottom: 5 },
  resultText: { fontSize: 16 },
  comparisonText: { textAlign: "center", fontWeight: "bold", color: "red", marginVertical: 10 },
  options: { flexDirection: "row", justifyContent: "space-evenly", marginBottom: 20 },
  optionBtn: { backgroundColor: "#fff", padding: 10, borderRadius: 5, borderWidth: 1 },
  compareBtn: { backgroundColor: "orange", padding: 10, borderRadius: 5, alignItems: "center", marginBottom: 20 },
  compareText: { color: "#fff", fontWeight: "bold" },
});

export default InvestmentScreen;
