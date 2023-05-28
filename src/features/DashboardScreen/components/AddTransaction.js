// import React, { useState } from "react";
// import { DataTable, Provider } from "react-native-paper";
// import { StyleSheet, TouchableOpacity, Text, View } from "react-native";
// import { Modal, Portal, Button, PaperProvider } from "react-native-paper";
// import FormButton from "../../../shared/components/FormButton";
// import { useTheme } from "@react-navigation/native";
// import theme from "../../../shared/constants/theme";

// const TRANSACTION_PROPS = [
//   {
//     product: "Frozen Food",
//     qty: "3",
//     unit: "Pcs",
//     price: "25.000",
//   },
//   {
//     product: "Ice Cream",
//     qty: "10",
//     unit: "Pcs",
//     price: "55.000",
//   },
//   {
//     product: "Minyak",
//     qty: "20",
//     unit: "Dus",
//     price: "220.000",
//   },
//   {
//     product: "Minyak",
//     qty: "20",
//     unit: "Dus",
//     price: "220.000",
//   },
//   {
//     product: "Minyak",
//     qty: "20",
//     unit: "Dus",
//     price: "220.000",
//   },
//   {
//     product: "Minyak",
//     qty: "20",
//     unit: "Dus",
//     price: "220.000",
//   },
//   {
//     product: "Minyak",
//     qty: "20",
//     unit: "Dus",
//     price: "220.000",
//   },
//   {
//     product: "Minyak",
//     qty: "20",
//     unit: "Dus",
//     price: "220.000",
//   },
//   {
//     product: "Minyak",
//     qty: "20",
//     unit: "Dus",
//     price: "220.000",
//   },
//   {
//     product: "Minyak",
//     qty: "20",
//     unit: "Dus",
//     price: "220.000",
//   },
//   {
//     product: "Minyak",
//     qty: "20",
//     unit: "Dus",
//     price: "220.000",
//   },
//   {
//     product: "Minyak",
//     qty: "20",
//     unit: "Dus",
//     price: "220.000",
//   },
//   {
//     product: "Minyak",
//     qty: "20",
//     unit: "Dus",
//     price: "220.000",
//   },
// ];

// const ServeTransaction = (props) => (
//   <DataTable.Row>
//     <DataTable.Cell>{props.product}</DataTable.Cell>
//     <DataTable.Cell numeric>
//       <Text>{props.qty}</Text>
//     </DataTable.Cell>
//     <DataTable.Cell numeric>
//       <Text>{props.unit}</Text>
//     </DataTable.Cell>
//     <DataTable.Cell numeric>
//       <Text>{props.price}</Text>
//     </DataTable.Cell>
//   </DataTable.Row>
// );

// const TransactionScreen = () => {
//   const theme = useTheme();
//   const styles = styling(theme);
//   const [page, setPage] = React.useState(0);
//   const itemsPerPage = 9;

//   const startIndex = page * itemsPerPage;
//   const endIndex = startIndex + itemsPerPage;
//   const transactionsToDisplay = TRANSACTION_PROPS.slice(startIndex, endIndex);

//   const totalPages = Math.ceil(TRANSACTION_PROPS.length / itemsPerPage);

//   const handlePageChange = (newPage) => {
//     setPage(newPage);
//   };

//   const [visible, setVisible] = useState(false);

//   const showModal = () => setVisible(true);
//   const hideModal = () => setVisible(false);
//   const containerStyle = { backgroundColor: "white", padding: 20 };

//   const handleAddTransaction = () => {
//     // Tambahkan logika untuk menangani penambahan transaksi di sini
//     // ...
//   };

//   return (
//     <>
//       <TouchableOpacity style={styles.button} onPress={showModal}>
//         <Text style={styles.buttonText}>Add Transaction</Text>
//       </TouchableOpacity>
//       <DataTable>
//         <DataTable.Header style={styles.headerTable}>
//           <DataTable.Title>
//             <Text style={styles.textHeader}>Product Name</Text>
//           </DataTable.Title>
//           <DataTable.Title numeric>
//             <Text style={styles.textHeader}>Qty</Text>
//           </DataTable.Title>
//           <DataTable.Title numeric>
//             <Text style={styles.textHeader}>Unit</Text>
//           </DataTable.Title>
//           <DataTable.Title numeric>
//             <Text style={styles.textHeader}>Price(Rp)</Text>
//           </DataTable.Title>
//         </DataTable.Header>

//         <PaperProvider>
//           <Portal>
//             <Modal
//               visible={visible}
//               onDismiss={hideModal}
//               contentContainerStyle={containerStyle}
//             >
//               <Text style={styles.modalTitle}>Add Transaction</Text>
//               {/* ... add transaction form or content */}
//               <Button>Add</Button>
//             </Modal>
//           </Portal>
//         </PaperProvider>

//         {transactionsToDisplay.map((prop, index) => (
//           <ServeTransaction key={index} {...prop} />
//         ))}

//         <DataTable.Pagination
//           page={page}
//           numberOfPages={totalPages}
//           onPageChange={handlePageChange}
//           label={`${startIndex + 1}-${Math.min(
//             endIndex,
//             TRANSACTION_PROPS.length
//           )} of ${TRANSACTION_PROPS.length}`}
//           showFastPagination
//         />
//       </DataTable>
//     </>
//   );
// };

// const styling = () =>
//   StyleSheet.create({
//     tableCell: {
//       paddingVertical: 10,
//       paddingHorizontal: 12,
//       borderBottomWidth: 1,
//       borderColor: "gray",
//     },
//     headerTable: {
//       backgroundColor: "#0080F6",
//       color: "white",
//     },
//     textHeader: {
//       color: "white",
//       fontFamily: "Montserrat-Medium",
//     },
//     textTable: {
//       color: "black",
//       fontFamily: "Montserrat-Medium",
//     },
//     button: {
//       alignItems: "center",
//       backgroundColor: "#0080F6",
//       borderRadius: theme.radius.m,
//       margin: theme.spacing.l,
//       padding: theme.spacing.s,
//       width: 130,
//       justifyContent: "flex-end",
//     },
//     buttonText: {
//       color: "white",
//       fontFamily: "Montserrat-Regular",
//       fontSize: 13,
//     },
//     modalContainer: {
//       justifyContent: "center",
//     },
//     modalTitle: {
//       fontFamily: "Montserrat-Medium",
//       color: theme.color.primary,
//       fontSize: 20,
//       textAlign: "center",
//     },
//     btnAddTransaction: {
//       width: 10,
//     },
//   });

// export default TransactionScreen;
