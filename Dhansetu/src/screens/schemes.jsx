import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator, StyleSheet, Linking } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const InvestmentOptions = () => {
  const [schemes, setSchemes] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Post Office Schemes");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getSchemes = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://10.0.2.2:5000/api/schemes?category=${encodeURIComponent(selectedCategory)}`);
        const data = await response.json();
        setSchemes(data);
      } catch (error) {
        console.error("Error fetching schemes:", error);
      } finally {
        setLoading(false);
      }
    };
    getSchemes();
  }, [selectedCategory]);

  const categories = [
    "Post Office Schemes",
    "Tax-Saving Schemes", 
    "FDs",
    "Government Schemes",
    "Mutual Funds",
    "Government Bonds",
    "Low-Risk Investments",
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Safe & Profitable Investment Options</Text>

       {/* Category Buttons - Now Wrapped Instead of Horizontal Scroll */}
       <View style={styles.categoryContainer}>
        {categories.map((category, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.categoryButton,
              selectedCategory === category && styles.selectedCategory,
            ]}
            onPress={() => setSelectedCategory(category)}
          >
            <Text style={[styles.categoryText, selectedCategory === category && styles.selectedText]}>
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Schemes Section */}
      <ScrollView style={styles.schemesContainer}>
        {loading ? (
          <ActivityIndicator size="large" color="#00A896" />
        ) : schemes.length > 0 ? (
          schemes.map((scheme, index) => (
            <View key={index} style={styles.schemeCard}>
              <Text style={styles.schemeTitle}>{index + 1}. {scheme.name}</Text>
              <Text style={styles.schemeDescription}>{scheme.description}</Text>
              <Text style={styles.schemeDetails}>Duration: {scheme.duration}</Text>
              <Text style={styles.schemeDetails}>Interest Rate: {scheme.interestRate}</Text>
              <Text style={styles.schemeDetails}>Eligibility: {scheme.eligibility}</Text>
              {/* Open Official Link */}
              {scheme.link ? (
                <TouchableOpacity onPress={() => Linking.openURL(scheme.link)}>
                  <Text style={styles.schemeLink}>More Info</Text>
                </TouchableOpacity>
              ) : null}
            </View>
          ))
        ) : (
          <Text style={styles.noDataText}>No schemes available for this category.</Text>
        )}
      </ScrollView>

      <View style={styles.bottomNav}>
      <TouchableOpacity>
    <Icon name="home" size={30} color="#000" />
  </TouchableOpacity>
              <TouchableOpacity>
                <Icon name="database" size={30} color="#00C2A8" />
              </TouchableOpacity>
              <TouchableOpacity>
                <Icon name="bank" size={30} color="#000" />
              </TouchableOpacity>
            </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#E8F7F2", padding: 15 },
  heading: { fontSize: 20, fontWeight: "bold", textAlign: "center", color: "#007F5F", marginBottom: 10 },
  categoryContainer: {
    flexDirection: "row",
    flexWrap: "wrap",  // Ensures categories wrap to a new line
    justifyContent: "center",  // Centers the wrapped buttons
    gap: 8,  // Adds space between buttons (React Native 0.71+ required, use `margin` if older)
    paddingHorizontal: 10,
  },
  categoryButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    backgroundColor: "#D1F0E1",
    minWidth: "30%", // Ensures buttons don't shrink too much
    alignItems: "center",
  },
  selectedCategory: { backgroundColor: "#00A896" },
  categoryText: { fontSize: 14, color: "#007F5F" },
  selectedText: { color: "#fff" },
  schemesContainer: { marginTop: 10 },
  schemeCard: { backgroundColor: "#fff", padding: 15, borderRadius: 10, marginBottom: 10, shadowColor: "#000", shadowOpacity: 0.1, shadowOffset: { width: 0, height: 2 }, shadowRadius: 4, elevation: 2 },
  schemeTitle: { fontSize: 16, fontWeight: "bold", color: "#007F5F", marginBottom: 5 },
  schemeDescription: { fontSize: 14, color: "#333", marginBottom: 5 },
  schemeDetails: { fontSize: 13, color: "#555" },
  schemeLink: { fontSize: 13, color: "#007BFF", marginTop: 5, textDecorationLine: "underline" },
  noDataText: { textAlign: "center", color: "#888", marginTop: 20 },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 15,
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  }
});

export default InvestmentOptions;
