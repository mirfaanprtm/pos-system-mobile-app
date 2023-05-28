import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, View, Text, TextInput, Button, Alert } from "react-native";
import { useTheme } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";
import theme from "../../../shared/constants/theme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import SearchBar from "react-native-paper"
import { StockContext } from "../../../shared/context/StockContext";

const FormTransaction = ({onAddStock}) => {
  const theme = useTheme();
  const styles = styling(theme);

  const [selectedProductPrice, setSelectedProductPrice] = useState("");
  const [selectedSupplier, setSelectedSupplier] = useState("");
  const [productPriceOptions, setProductPriceOptions] = useState([]);
  const [supplierOptions, setSupplierOptions] = useState([]);
  const [qty, setQty] = useState("");
  const [productSearchText, setProductSearchText] = useState("");
  const [supplierSearchText, setSupplierSearchText] = useState("");
  const [newStock, setNewStock] = useState({});
  const {updateStock} = useContext(StockContext);

  useEffect(() => {
    const fetchOptions = async () => {
      const jwtToken = await AsyncStorage.getItem("AccessToken");
      try {
        const response = await axios.get(
          "http://10.10.100.105:8080/api/product/price",
          {
            headers: {
              Authorization: `Bearer ${jwtToken}`,
            },
          }
        );

        const priceProducts = response.data.data;
        const options = priceProducts.map((priceProduct) => ({
          value: priceProduct,
          label: `${priceProduct.product.nameProduct} - ${priceProduct.price}`,
        }));
        setProductPriceOptions(options);
      } catch (error) {
        console.log(error);
      }

      try {
        const response = await axios.get(
          "http://10.10.100.105:8080/api/supplier",
          {
            headers: {
              Authorization: `Bearer ${jwtToken}`,
            },
          }
        );
        const suppliers = response.data.data;
        const options = suppliers.map((supplier) => ({
          value: supplier,
          label: supplier.nameSupplier,
        }));
        setSupplierOptions(options);
      } catch (error) {
        console.log(error);
      }
    };

    fetchOptions();
  }, []);

  const filterProductOptions = () => {
    if (productSearchText === "") {
      return productPriceOptions;
    } else {
      return productPriceOptions.filter((option) =>
        option.label.toLowerCase().includes(productSearchText.toLowerCase())
      );
    }
  };

  const filterSupplierOptions = () => {
    if (supplierSearchText === "") {
      return supplierOptions;
    } else {
      return supplierOptions.filter((option) =>
        option.label.toLowerCase().includes(supplierSearchText.toLowerCase())
      );
    }
  };

  const onSubmit = async () => {
    try {
      const jwtToken = await AsyncStorage.getItem("AccessToken");
      const response = await axios.post(
        "http://10.10.100.105:8080/api/trx/stock-in",
        {
          priceProduct: selectedProductPrice,
          supplier: selectedSupplier,
          qty: parseInt(qty),
        },
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );

      const newStock = {
        product: selectedProductPrice.product.nameProduct, // Retrieve the product name from the selected product price object
        price: selectedProductPrice.price,
        supplier: selectedSupplier.label, // Retrieve the supplier label
        qty: qty,
        dateStock: new Date(),
      };

      onAddStock(newStock);
      Alert.alert("Create Successfully");
    } catch (error) {
      console.error(error);
      if (error.response) {
        console.log("Error status:", error.response.status);
        console.log("Error data:", error.response.data);
      } else {
        console.log("Error:", error.message);
      }
    }
  };

  return (
    <View style={styles.containerU}>
      <Text style={styles.headerText}>Add Stock In</Text>
      <View style={styles.container}>
        <Text style={styles.textField}>Product Price</Text>
        <TextInput
          style={styles.filterSearch}
          placeholder="Search Product..."
          value={productSearchText}
          onChangeText={(text) => setProductSearchText(text)}
        />
        <Picker
          selectedValue={selectedProductPrice}
          onValueChange={(itemValue) => setSelectedProductPrice(itemValue)}
          style={styles.dropdown}
        >
          {filterProductOptions().map((option) => (
            <Picker.Item
              key={option.value}
              label={option.label}
              value={option.value}
            />
          ))}
        </Picker>
      </View>
      <View style={styles.container}>
        <Text style={styles.textField}>Supplier</Text>
        <TextInput
          style={styles.filterSearch}
          placeholder="Search Supplier..."
          value={supplierSearchText}
          onChangeText={(text) => setSupplierSearchText(text)}
        />
        <Picker
          selectedValue={selectedSupplier}
          onValueChange={(itemValue) => setSelectedSupplier(itemValue)}
          style={styles.dropdown}
        >
          {filterSupplierOptions().map((option) => (
            <Picker.Item
              key={option.value}
              label={option.label}
              value={option.value}
            />
          ))}
        </Picker>
      </View>
      <View style={styles.container}>
        <Text style={styles.textField}>Qty</Text>
        <TextInput
          style={styles.formInput}
          keyboardType="numeric"
          value={qty}
          placeholder="Input Qty"
          onChangeText={(text) => setQty(text)}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          style={styles.btnAddTransaction}
          title="Add"
          onPress={onSubmit}
          disabled={!selectedProductPrice || !selectedSupplier || !qty}
        />
      </View>
    </View>
  );
};

const styling = () =>
  StyleSheet.create({
    headerText: {
      textAlign: "center",
      fontSize: 28,
      fontFamily: "Montserrat-Regular",
      fontWeight: "bold",
    },
    container: {
      justifyContent: "flex-start",
      alignItems: "center",
      marginTop: 40,
    },
    textField: {
      alignItems: "flex-start",
      fontFamily: "Montserrat-Regular",
    },
    containerU: {
      marginTop: 60,
      marginBottom: 50,
    },
    dropdown: {
      width: "80%",
      marginTop: 10,
      backgroundColor: "#30A2FF",
      borderRadius: 10,
      borderColor: "grey",
      color: "white",
    },
    formInput: {
      height: 50,
      marginHorizontal: theme.spacing.m,
      marginTop: theme.spacing.s,
      borderRadius: 10,
      width: 315,
      borderColor: "#30A2FF",
      borderWidth: 1,
      padding: theme.spacing.sm,
      backgroundColor: "lightgrey",
      alignItems: "center",
      fontFamily: "Montserrat-Regular",
    },
    btnAddTransaction: {
      width: 50,
      marginTop: 30,
    },
    buttonContainer: {
      width: 315,
      marginLeft: 39,
      marginTop: 50,
    },
    filterSearch: {
      borderRadius: 10,
      height: 50,
      marginHorizontal: theme.spacing.m,
      marginTop: theme.spacing.s,
      width: 315,
      borderColor: "#30A2FF",
      borderWidth: 1,
      padding: theme.spacing.sm,
      backgroundColor: "lightgrey",
      alignItems: "center",
      fontFamily: "Montserrat-Regular",
    },
  });


export default FormTransaction;
