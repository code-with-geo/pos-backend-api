import dbConnection from "../config/databaseConfig.js";

export class Customers {
  // Create a new customer
  static async createCustomer(
    firstName,
    lastName,
    contactNo,
    email,
    cardNumber,
    points,
    status
  ) {
    const [result] = await dbConnection.query(
      `INSERT INTO Customers (FirstName, LastName, ContactNo, Email, TransactionCount, CardNumber, Points, Status) 
       VALUES (?, ?, ?, ?, 0, ?, ?, ?)`,
      [firstName, lastName, contactNo, email, cardNumber, points, status]
    );
    return this.findById(result.insertId);
  }

  // Find customer by ID
  static async findById(customerId) {
    const [result] = await dbConnection.query(
      "SELECT * FROM Customers WHERE CustomerId = ?",
      [customerId]
    );
    return result.length > 0 ? result[0] : null;
  }

  // Update customer details
  static async updateCustomer(
    customerId,
    firstName,
    lastName,
    contactNo,
    email,
    cardNumber,
    points,
    status
  ) {
    const [result] = await dbConnection.query(
      `UPDATE Customers SET FirstName = ?, LastName = ?, ContactNo = ?, Email = ?, 
        CardNumber = ?, Points = ?, Status = ? WHERE CustomerId = ?`,
      [
        firstName,
        lastName,
        contactNo,
        email,
        cardNumber,
        points,
        status,
        customerId,
      ]
    );
    return result.affectedRows > 0 ? this.findById(customerId) : null;
  }

  // Delete customer by ID
  static async deleteCustomer(customerId) {
    const [result] = await dbConnection.query(
      "DELETE FROM Customers WHERE CustomerId = ?",
      [customerId]
    );
    return result.affectedRows > 0;
  }

  // Get all customers
  static async getAllCustomers() {
    const [result] = await dbConnection.query("SELECT * FROM Customers");
    return result;
  }
}
