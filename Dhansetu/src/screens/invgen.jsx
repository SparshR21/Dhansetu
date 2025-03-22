// import React from "react";
// import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
// import Icon from "react-native-vector-icons/FontAwesome";

// const InvestmentScreen = () => {
//   return (
//     <View style={styles.container}>
//       {/* Header */}
//       <View style={styles.header}>
//         <TouchableOpacity>
//           <Icon name="arrow-left" size={24} color="#000" />
//         </TouchableOpacity>
//         <Text style={styles.headerText}>Personalized Investment Recommendation System</Text>
//         <Icon name="bell" size={24} color="#000" />
//       </View>

//       {/* Form Section */}
//       <View style={styles.form}>
//         <Text>Age</Text>
//         <TextInput placeholder="Enter your age..." style={styles.input} />
//         <Text>Occupation</Text>
//         <TextInput placeholder="Select occupation..." style={styles.input} />
//         <Text>Risk Tolerance</Text>
//         <TextInput placeholder="Select risk tolerance..." style={styles.input} />
//         <Text>Investment Duration</Text>
//         <TextInput placeholder="Select duration..." style={styles.input} />
//         <Text>Financial Goals</Text>
//         <TextInput placeholder="Select goals..." style={styles.input} />
//         <Text>Investment Amount</Text>
//         <TextInput placeholder="Select amount..." style={styles.input} />
//         <Text>Liquidity Needs</Text>
//         <TextInput placeholder="Select liquidity..." style={styles.input} />
//       </View>

//       {/* Buttons */}
//       <TouchableOpacity style={styles.generateBtn}>
//         <Text style={styles.generateText}>Generate</Text>
//       </TouchableOpacity>

//       <Text style={styles.comparisonText}>COMPARISON MATRIX</Text>

//       <View style={styles.options}>
//         <TouchableOpacity style={styles.optionBtn}>
//           <Text>Option 1</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.optionBtn}>
//           <Text>Option 2</Text>
//         </TouchableOpacity>
//       </View>

//       <TouchableOpacity style={styles.compareBtn}>
//         <Text style={styles.compareText}>COMPARE</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: "#DFF8E5", padding: 20 },
//   header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 20 },
//   headerText: { fontSize: 18, fontWeight: "bold", flex: 1, textAlign: "center" },
//   form: { marginBottom: 20 },
//   input: { backgroundColor: "#fff", padding: 10, borderRadius: 5, marginVertical: 5 },
//   generateBtn: { backgroundColor: "green", padding: 10, borderRadius: 5, alignItems: "center" },
//   generateText: { color: "#fff", fontWeight: "bold" },
//   comparisonText: { textAlign: "center", fontWeight: "bold", color: "red", marginVertical: 10 },
//   options: { flexDirection: "row", justifyContent: "space-evenly", marginBottom: 20 },
//   optionBtn: { backgroundColor: "#fff", padding: 10, borderRadius: 5, borderWidth: 1 },
//   compareBtn: { backgroundColor: "orange", padding: 10, borderRadius: 5, alignItems: "center" },
//   compareText: { color: "#fff", fontWeight: "bold" },
// });

// export default InvestmentScreen;

import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput } from "react-native";
import { Picker } from "@react-native-picker/picker";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native"; // Import navigation

const InvestmentScreen = () => {
  const navigation = useNavigation(); // Initialize navigation

  const [age, setAge] = useState("");
  const [occupation, setOccupation] = useState("");
  const [financialGoal, setFinancialGoal] = useState("");
  const [investmentAmount, setInvestmentAmount] = useState("");
  const [riskTolerance, setRiskTolerance] = useState("");
  const [investmentDuration, setInvestmentDuration] = useState("");
  const [liquidityNeeds, setLiquidityNeeds] = useState("");

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
        <Picker
          selectedValue={occupation}
          onValueChange={(itemValue) => setOccupation(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Select Occupation" value="" />
          <Picker.Item label="Salaried" value="Salaried" />
          <Picker.Item label="Self-Employed" value="Self-Employed" />
          <Picker.Item label="Business Owner" value="Business Owner" />
          <Picker.Item label="Student" value="Student" />
          <Picker.Item label="Retired" value="Retired" />
        </Picker>

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

        {/* Risk Tolerance */}
        <Text style={styles.label}>Risk Tolerance</Text>
        <Picker
          selectedValue={riskTolerance}
          onValueChange={(itemValue) => setRiskTolerance(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Select Risk Tolerance" value="" />
          <Picker.Item label="Low" value="Low" />
          <Picker.Item label="Moderate" value="Moderate" />
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
          <Picker.Item label="Short-Term (0-3 years)" value="Short-Term" />
          <Picker.Item label="Medium-Term (3-7 years)" value="Medium-Term" />
          <Picker.Item label="Long-Term (7+ years)" value="Long-Term" />
        </Picker>

        {/* Liquidity Needs */}
        <Text style={styles.label}>Liquidity Needs</Text>
        <Picker
          selectedValue={liquidityNeeds}
          onValueChange={(itemValue) => setLiquidityNeeds(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Select Liquidity Needs" value="" />
          <Picker.Item label="High (Frequent access required)" value="High" />
          <Picker.Item label="Moderate" value="Moderate" />
          <Picker.Item label="Low (Can stay invested longer)" value="Low" />
        </Picker>
      </View>

      {/* Buttons */}
      <TouchableOpacity style={styles.generateBtn}>
        <Text style={styles.generateText}>Generate</Text>
      </TouchableOpacity>

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
  comparisonText: { textAlign: "center", fontWeight: "bold", color: "red", marginVertical: 10 },
  options: { flexDirection: "row", justifyContent: "space-evenly", marginBottom: 20 },
  optionBtn: { backgroundColor: "#fff", padding: 10, borderRadius: 5, borderWidth: 1 },
  compareBtn: { backgroundColor: "orange", padding: 10, borderRadius: 5, alignItems: "center", marginBottom: 20 },
  compareText: { color: "#fff", fontWeight: "bold" },
});

export default InvestmentScreen;
