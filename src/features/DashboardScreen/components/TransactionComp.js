import React, { useEffect, useState } from "react";
import { DataTable, Searchbar, ActivityIndicator } from "react-native-paper";
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  Modal,
  View,
  Button,
} from "react-native";
import FormButton from "../../../shared/components/FormButton";
import { useTheme } from "@react-navigation/native";
import theme from "../../../shared/constants/theme";
import FromTransaction from "./FormTransaction";
import { StockList } from "../../../config/UserLogin";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ServeTransaction = (props) => (
  <DataTable.Row>
    <DataTable.Cell>{props.product}</DataTable.Cell>
    <DataTable.Cell numeric>
      <Text>{props.price}</Text>
    </DataTable.Cell>
    <DataTable.Cell numeric>
      <Text>{props.supplier}</Text>
    </DataTable.Cell>
    <DataTable.Cell numeric>
      <Text>{props.qty}</Text>
    </DataTable.Cell>
  </DataTable.Row>
);

const TransactionScreen = ({ navigation }) => {
  const theme = useTheme();
  const styles = styling(theme);
  const [page, setPage] = React.useState(0);
  const [stocks, setStock] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredStock, setFilteredStock] = useState([]);
  const [stockList, setStockList] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    fetchStockList();
  }, []);

  useEffect(() => {
    const filteredData = stocks.filter(
      (item) =>
        item.product &&
        item.product.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setFilteredStock(filteredData);
  }, [searchQuery, stocks]);

  const fetchStockList = async () => {
    try {
      setIsFetching(true);

      const jwtToken = await AsyncStorage.getItem("AccessToken");
      const response = await axios.get(
        "http://10.10.100.105:8080/api/trx/stock-in",
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );

      const stockList = response.data.data.map((item) => ({
        product: item.priceProduct.product.nameProduct,
        price: item.priceProduct.price,
        supplier: item.supplier.nameSupplier,
        qty: item.qty,
        dateStock: new Date(item.dateStock),
      }));
      stockList.sort((a, b) => a.dateStock - b.dateStock);
      setStock(stockList.reverse());
      setFilteredStock(stockList);
    } catch (error) {
      console.log(error);
    } finally {
      setIsFetching(false);
    }
  };

  const itemsPerPage = 8;
  const startIndex = page * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const transactionsToDisplay = filteredStock.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredStock.length / itemsPerPage);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const [modalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const handleAddStock = (newStock) => {
    setStock([...stocks, newStock]);
    setFilteredStock([...stocks, newStock]);
    fetchStockList();
  };

  return (
    <>
      <TouchableOpacity style={styles.button} onPress={toggleModal}>
        <Text style={styles.buttonText}>Add Stock</Text>
      </TouchableOpacity>
      <Searchbar
        placeholder="Search product..."
        onChangeText={(query) => setSearchQuery(query)}
        value={searchQuery}
        style={{ backgroundColor: "lightgrey", borderRadius: 0, height: 60 }}
      />
      <DataTable>
        <DataTable.Header style={styles.headerTable}>
          <DataTable.Title>
            <Text style={styles.textHeader}>Product</Text>
          </DataTable.Title>
          <DataTable.Title numeric>
            <Text style={styles.textHeader}>Price(Rp)</Text>
          </DataTable.Title>
          <DataTable.Title numeric>
            <Text style={styles.textHeader}>Supplier</Text>
          </DataTable.Title>
          <DataTable.Title numeric>
            <Text style={styles.textHeader}>Qty</Text>
          </DataTable.Title>
        </DataTable.Header>

        {isFetching ? (
          <ActivityIndicator />
        ) : (
          transactionsToDisplay.map((prop, index) => (
            <ServeTransaction key={index} {...prop} />
          ))
        )}

        <Modal animationType="slide" visible={modalVisible}>
          <View style={styles.modalContainer}>
            <FromTransaction
              onAddStock={handleAddStock}
              stockList={stockList}
            />
          </View>

          <View style={styles.buttonContainer}>
            <Button title="Close" onPress={toggleModal} />
          </View>
        </Modal>

        <DataTable.Pagination
          page={page}
          numberOfPages={totalPages}
          onPageChange={handlePageChange}
          label={`${startIndex + 1}-${Math.min(
            endIndex,
            filteredStock.length
          )} of ${filteredStock.length}`}
          showFastPagination
        />
      </DataTable>
    </>
  );
};

const styling = () =>
  StyleSheet.create({
    tableCell: {
      paddingVertical: 10,
      paddingHorizontal: 12,
      borderBottomWidth: 1,
      borderColor: "gray",
    },
    headerTable: {
      backgroundColor: "#0080F6",
      color: "white",
    },
    textHeader: {
      color: "white",
      fontFamily: "Montserrat-Medium",
    },
    textTable: {
      color: "black",
      fontFamily: "Montserrat-Medium",
    },
    button: {
      alignItems: "center",
      backgroundColor: "#0080F6",
      borderRadius: theme.radius.m,
      margin: theme.spacing.l,
      padding: theme.spacing.s,
      width: 130,
      justifyContent: "flex-end",
    },
    buttonText: {
      color: "white",
      fontFamily: "Montserrat-Regular",
      fontSize: 13,
    },
    modalContainer: {
      display: "flex",
      justifyContent: "center",
    },
    modalTitle: {
      fontFamily: "Montserrat-Medium",
      color: theme.color.primary,
      fontSize: 20,
      textAlign: "center",
    },
    btnAddTransaction: {
      width: 50,
    },
    buttonContainer: {
      width: 315,
      marginLeft: 39,
      marginTop: -30,
    },
  });

export default TransactionScreen;
