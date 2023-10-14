import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button, Linking } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";

const Scanner = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = async ({ type, data }) => {
    setScanned(true);
    try {
      await Linking.openURL(data);
      alert(`Opened URL: ${data}`);
    } catch (error) {
      alert(`Failed to open URL: ${data}`);
    }
  };

  if (hasPermission === null) {
    return <Text>Requesting for Camera Permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No Access to Camera</Text>;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && (
        <View style={styles.buttonContainer}>
          <Button
            title="Tap to Scan Again"
            onPress={() => setScanned(false)}
            style={{ zIndex: 1 }}
          />
        </View>
      )}
      <View style={styles.overlay}>
        <View style={styles.rectangle} />
      </View>
    </View>
  );
};

const overlayColor = "rgba(0, 0, 0, 0.7)";
const borderColor = "#fff";
const borderWidth = 2;
const rectangleWidth = 200;
const rectangleHeight = 200;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000", // Arka plan rengini değiştirin
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: overlayColor,
    justifyContent: "center",
    alignItems: "center",
  },
  rectangle: {
    width: rectangleWidth,
    height: rectangleHeight,
    borderWidth: borderWidth,
    borderColor: borderColor,
    position: "absolute",
  },
  buttonContainer: {
    zIndex: 1,
    position: "absolute",
    justifyContent: "center",
  },
});

export default Scanner;
