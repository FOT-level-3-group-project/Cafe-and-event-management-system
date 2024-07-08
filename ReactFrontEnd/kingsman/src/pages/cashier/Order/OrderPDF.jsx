import React from 'react';
import {  useSelector } from 'react-redux'
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import logoImage from './logo/cafe-logo.png';

const styles = StyleSheet.create({
    page: {
        padding: 20,
        fontSize: 10,
    },
    topTitle:{
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 5,
        textAlign:"center",
        textDecoration: 'underline',
    },
    topComponent: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    header: {
        fontSize: 10,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    subheader: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 5,
        textDecoration: 'underline',
    },
    text: {
        paddingTop:1,
        paddingHorizontal:10,
        marginBottom: 5,
    },
    detailsContainer: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 20,
    },
    detailsSection: {
        flex: 1,
        padding: 10,
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
        marginTop: 5,
    },
    tableRow: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        paddingVertical: 1,
    },
    tableCell: {
        padding: 5,
        width: '20%',
        textAlign:"center",
    },
    tableCellForID: {
        padding: 5,
        minWidth: '5%',
    },
    tableCellForName: {
        padding: 5,
        minWidth: '40%',
    },
    tableHeader: {
        backgroundColor: '#f0f0f0',
        fontWeight: 'bold',
    },
    totalPrice: {
        fontWeight: 'bold',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    tableCellTotal: {
        textAlign:"center",
        padding: 5,
        width: '20%',
        fontWeight:"extrabold"
    },
    tableRowSection: {
        flexDirection: 'row',
        alignItems: 'center',
        borderTop:1.5,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        paddingVertical: 1,
    },
    BottomComponent:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: "flex-end",
        marginTop:25,
        marginBottom:5,
    },
    EndText:{
        fontSize: 9,
        marginBottom: 5,
        marginTop:20,
        textAlign:"center",
    },
    WarningText: {
        color: "red",
        fontWeight: "bold", 
        marginBottom: 15,
        marginTop:5,
    },
    billData:{
        marginTop:5,
    },
});

const OrderPDF = ({ order }) => {

    const { currentUser } = useSelector((state) => state.user);


    // Function to format date and time
    const formatDateTime = (dateTimeString) => {
        const dateTime = new Date(dateTimeString);
        const year = dateTime.getFullYear();
        const month = (dateTime.getMonth() + 1).toString().padStart(2, '0'); 
        const day = dateTime.getDate().toString().padStart(2, '0'); 
        let hours = dateTime.getHours();
        const minutes = dateTime.getMinutes().toString().padStart(2, '0');
        const amOrPm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12 || 12; // Convert hours to 12-hour format
        const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes} ${amOrPm}`;
        return formattedDateTime;
    }; 

    const currentDateTime = formatDateTime(new Date());

    return (
        <PDFDownloadLink
            document={
                <Document>
                    <Page size="A4" style={styles.page}>

                        <View style={[styles.topComponent, { marginBottom: 20 }]}>
                            <Image src={logoImage} style={{ width: 200, height: 100 }} />
                            <View>
                               <Text style={{ fontWeight:900 }}>Kingsman Cafe & Events</Text>
                                <Text>Polwathumodara,Mirissa</Text>
                                <Text>contact@kingsman.lk</Text>
                                <Text>+94 777998768, +94 772888452</Text>

                                <View style={styles.billData}>
                                    <Text>Printed By : {currentUser.first_name} {currentUser.last_name}</Text>
                                    <Text>Date and Time : {currentDateTime}</Text>
                                </View>
                            </View>
                        </View>

                        <View>
                            <Text style={styles.topTitle} >Order Receipt</Text>
                        </View>
                    

                        <View style={styles.topComponent}>
                            {/* Order Details Section */}
                            <View style={styles.detailsSection}>
                                <Text style={[styles.header, { fontWeight: 'bold' }]}>Order Details</Text>
                                <View style={styles.text}>
                                    <Text>ID : {order.orderId}</Text>
                                    <Text>Status: {order.orderStatus}</Text>
                                    <Text>Date & Time : {formatDateTime(order.orderDateTime)}</Text>
                                    <Text>{order.tableNumber ? `Table : ${order.tableNumber}` : 'No table assigned'}</Text>
                                </View>
                            </View>

                            {/* Customer Details Section */}
                            {order.customer && (
                                <View style={styles.detailsSection}>
                                    <Text style={styles.header}>Customer Details</Text>
                                    <View style={styles.text}>
                                        <Text>Name : {order.customer.cusName}</Text>
                                        <Text>Mobile : {order.customer.cusMobile}</Text>
                                        <Text>Email : {order.customer.cusEmail}</Text>
                                    </View>
                                </View>
                            )}
                        </View>

                        {order.orderStatus != "Completed"  && (
                            <Text style={styles.WarningText}> This order is not finalized yet, and the data may change.</Text>
                        )}

                        {/* Order Items Section */}
                        <View>
                            <Text style={styles.header}>Order Items</Text>
                            <View style={styles.table}>
                                <View style={[styles.tableRow, styles.tableHeader]}>
                                    <Text style={styles.tableCellForID}>#</Text>
                                    <Text style={styles.tableCellForName}>Item</Text>
                                    <Text style={styles.tableCell}>Price (Rs)</Text>
                                    <Text style={styles.tableCell}>Quantity</Text>
                                    <Text style={styles.tableCell}>Total (Rs) </Text>
                                </View>

                                {order.orderItems.map((item, index) => (
                                    <View key={index} style={styles.tableRow}>
                                        <Text style={styles.tableCellForID}>{index + 1}</Text>
                                        <Text style={styles.tableCellForName}>{item.foodItemName}</Text>
                                        <Text style={styles.tableCell}>{item.foodPrice.toFixed(2)}</Text>
                                        <Text style={styles.tableCell}>{item.quantity}</Text>
                                        <Text style={styles.tableCell}>{(item.quantity * item.foodPrice).toFixed(2)}</Text>
                                    </View>
                                ))}

                                {/*Sub Total Price */}
                                <View style={[styles.tableRowSection, styles.totalPrice]}>
                                    <Text style={styles.tableCellTotal}>Subtotal</Text>
                                    <Text style={styles.tableCellTotal}>
                                        {order.subTotal.toFixed(2)}
                                    </Text>
                                </View>

                                 {/*Discount*/}
                                 <View style={[styles.tableRow, styles.totalPrice]}>
                                    <Text style={styles.tableCellTotal}>Discount - {order.discountPercentage}% </Text>
                                    <Text style={styles.tableCellTotal}>
                                        {order.discountValue.toFixed(2)}
                                    </Text>
                                </View>

                                {/* Total Price */}
                                <View style={[styles.tableRow, styles.totalPrice]}>
                                    <Text style={styles.tableCellTotal}>Total</Text>
                                    <Text style={styles.tableCellTotal}>
                                        {order.totalAfterDiscount.toFixed(2)}
                                    </Text>
                                </View>

                            </View>
                        </View>

                        <View style={[styles.BottomComponent, { marginBottom: 20 }]}>
                            <View>
                               <Text style={{ fontWeight: 'bold' }}>Payment Method : {order.paymentMethod}</Text>
                            </View>
                        </View>

                        <View>
                            <Text style={styles.EndText}>Thank You and Come Again.</Text>
                        </View>
                        <View>
                            <Text style={styles.EndText}>****</Text>
                        </View>
                        
                    </Page>
                </Document>
            }
            fileName={`order-${order.orderId}.pdf`}
        >
            {({ loading }) => (loading ? 
                'Loading document...' : 
                <button  className='w-full px-3 py-2 bg-green-500 text-white font-semibold rounded hover:bg-green-600'><i className="ri-arrow-down-fill"></i> Download PDF </button>
                )}
        </PDFDownloadLink>
    );
};

export default OrderPDF;
