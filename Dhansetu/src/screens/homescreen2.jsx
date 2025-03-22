import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, Animated } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HomeScreen2 = ({ navigation, route }) => {
  const [userName, setUserName] = useState("Guest");
  const [menuVisible, setMenuVisible] = useState(false);
  const slideAnim = React.useRef(new Animated.Value(-250)).current; // Menu starts off-screen

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const storedName = await AsyncStorage.getItem("userName");
        if (storedName) {
          setUserName(storedName);
        }
      } catch (error) {
        console.error("Error fetching userName:", error);
      }
    };

    fetchUserName();
  }, []);

  const toggleMenu = () => {
    if (menuVisible) {
      Animated.timing(slideAnim, {
        toValue: -250,
        duration: 300,
        useNativeDriver: false,
      }).start(() => setMenuVisible(false));
    } else {
      setMenuVisible(true);
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("userName"); // Clear stored username
      navigation.replace("Login"); // Navigate to Login screen
    } catch (error) {
      console.log("Error logging out:", error);
    }
  };
  

  

  return (
    <View style={styles.container}>
      {/* Navbar */}
      <View style={styles.navbar}>
        <Image source={require("../assets/logo.png")} style={styles.logo} />
        <Text style={styles.welcomeText}>WELCOME</Text>
        <TouchableOpacity onPress={toggleMenu}>
          <Icon name="menu" size={30} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Slide-in Menu */}
      {menuVisible && (
        <Animated.View style={[styles.menuContainer, { left: slideAnim }]}>
          <TouchableOpacity onPress={toggleMenu} style={styles.closeButton}>
            <Icon name="arrow-left" size={24} color="#000" />
          </TouchableOpacity>
          <Image source={require("../assets/profile.jpg")} style={styles.profilePic} />
          <Text style={styles.profileName}>Welcome, {userName}!</Text>
          <View style={styles.menuItems}>
            <TouchableOpacity><Text style={styles.menuText}>About</Text></TouchableOpacity>
            <TouchableOpacity><Text style={styles.menuText}>Terms & Conditions</Text></TouchableOpacity>
            <TouchableOpacity><Text style={styles.menuText}>Support</Text></TouchableOpacity>
            <TouchableOpacity><Text style={styles.menuText}>Contact</Text></TouchableOpacity>
            <TouchableOpacity><Text style={styles.menuText}>Legal</Text></TouchableOpacity>
            <TouchableOpacity onPress={handleLogout}><Text style={styles.menuText}>Logout</Text></TouchableOpacity>

          </View>
        </Animated.View>
      )}

      <ScrollView contentContainerStyle={styles.content}>
        {/* Hero Section */}
        <Image source={require("../assets/hero.png")} style={styles.heroImage} />
        <Text style={styles.heroTitle}>“From Dreams to Reality”</Text>
        <Text style={styles.heroText}>
          Faced with financial struggles, they found hope in the right investment. Whether it was supporting a
          marriage, funding education, or overcoming life’s challenges, that investment became the bridge to a
          better future.
        </Text>

        {/* Why Should Invest? */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>WHY SHOULD INVEST?</Text>
            <Icon name="finance" size={24} color="black" />
          </View>
          <Text style={styles.bullet}>✔ Overcome Financial Struggles</Text>
          <Text style={styles.bullet}>✔ Secure Education</Text>
          <Text style={styles.bullet}>✔ Create Financial Stability</Text>
          <Text style={styles.bullet}>✔ Ensure Future Growth</Text>
        </View>

        {/* Who Should Invest? */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>WHO SHOULD INVEST?</Text>
            <Icon name="account" size={24} color="black" />
          </View>
          <Text style={styles.bullet}>✔ Those Who Dream of a Better Life</Text>
          <Text style={styles.bullet}>✔ Those Who Believe Small Steps Can Lead to Big Changes</Text>
          <Text style={styles.bullet}>✔ People Who Want to Provide for Their Loved Ones</Text>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity>
          <Icon name="home" size={30} color="#00C2A8" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Schemes")}>
          <Icon name="database" size={30} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Inv")}>
          <Icon name="bank" size={30} color="#000" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#00C2A8" },
  navbar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 15,
    backgroundColor: "#008F7A",
  },
  logo: { width: 60, height: 50, resizeMode: "contain" },
  welcomeText: { fontSize: 20, fontWeight: "bold", color: "#fff" },
  content: { alignItems: "center", paddingBottom: 20 },
  heroImage: { width: "100%", height: 200, resizeMode: "cover" },
  heroTitle: { fontSize: 20, fontWeight: "bold", color: "#fff", marginTop: 10 },
  heroText: { fontSize: 14, color: "#fff", textAlign: "center", paddingHorizontal: 20, marginVertical: 10 },
  section: {
    width: "90%",
    backgroundColor: "#EAF8EE",
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
  },
  sectionHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  sectionTitle: { fontSize: 16, fontWeight: "bold", color: "#008F7A" },
  bullet: { fontSize: 14, color: "#000", marginVertical: 2 },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 15,
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  // Menu styles
  menuContainer: {
    position: "absolute",
    top: 0,
    bottom: 0,
    width: 250,
    backgroundColor: "#EAF8EE",
    paddingTop: 40,
    paddingHorizontal: 20,
    zIndex: 10,
  },
  closeButton: {
    position: "absolute",
    top: 20,
    left: 15,
  },
  profilePic: { width: 80, height: 80, borderRadius: 40, alignSelf: "center" },
  profileName: { fontSize: 18, fontWeight: "bold", textAlign: "center", marginVertical: 10 },
  menuItems: { marginTop: 20 },
  menuText: { fontSize: 16, color: "#008F7A", marginVertical: 10 },
});

export default HomeScreen2;