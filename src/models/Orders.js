import dbConnection from "../config/databaseConfig.js";

export class Orders {
  // Create a new order
  static async createOrder(
    status,
    totalAmount,
    totalDiscount,
    totalVatSale,
    totalVatAmount,
    totalVatExempt,
    transactionType,
    paymentType,
    userId,
    locationId,
    customerId,
    accountName,
    accountNumber,
    digitalPaymentAmount,
    invoiceNo,
    referenceNo
  ) {
    const [result] = await dbConnection.query(
      `INSERT INTO Orders (Status, TotalAmount, TotalDiscount, TotalVatSale, TotalVatAmount, TotalVatExempt, 
        TransactionType, PaymentType, UserId, LocationId, CustomerId, AccountName, AccountNumber, 
        DigitalPaymentAmount, InvoiceNo, ReferenceNo) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        status,
        totalAmount,
        totalDiscount,
        totalVatSale,
        totalVatAmount,
        totalVatExempt,
        transactionType,
        paymentType,
        userId,
        locationId,
        customerId,
        accountName,
        accountNumber,
        digitalPaymentAmount,
        invoiceNo,
        referenceNo,
      ]
    );
    return this.findById(result.insertId);
  }

  // Get order by ID
  static async findById(orderId) {
    const [result] = await dbConnection.query(
      "SELECT * FROM Orders WHERE OrderId = ?",
      [orderId]
    );
    return result.length > 0 ? result[0] : null;
  }
}
