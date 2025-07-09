import dbConnection from "../config/databaseConfig.js";
import bcrypt from "bcryptjs";

export class User {
  constructor(id, username, password, name, isRole, status, locationId) {
    this.id = id;
    this.name = name;
    this.username = username;
    this.password = password;
    this.isRole = isRole;
    this.status = status;
    this.locationId = locationId;
  }

  // User registration
  static async register(name, username, password, isRole, status, locationId) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await dbConnection.query(
      "INSERT INTO Users (Username, Password, Name, IsRole, Status, LocationId) VALUES (?, ?, ?, ?, ?, ?)",
      [username, hashedPassword, name, isRole, status, locationId]
    );
    return this.findById(result.insertId);
  }

  // Get all users
  static async getAllUsers() {
    const [result] = await dbConnection.query("SELECT * FROM Users");
    return result;
  }

  // Get all users by Location Id
  static async getAllUsersByLocationId(locationId) {
    const [result] = await dbConnection.query(
      "SELECT * FROM Users WHERE LocationId = ?",
      [locationId]
    );
    return result;
  }

  // Find user by Id (returns plain DB row)
  static async findById(Id) {
    const [result] = await dbConnection.query(
      "SELECT * FROM Users WHERE Id = ?",
      [Id]
    );
    return result.length > 0 ? result[0] : null;
  }

  // Get user by username - returns plain object for login etc.
  static async findByUsername(username) {
    const [rows] = await dbConnection.query(
      "SELECT * FROM Users WHERE Username = ?",
      [username]
    );

    if (rows.length > 0) {
      const user = rows[0];
      // Return plain object with consistent field names
      return {
        id: user.Id,
        username: user.username,
        password: user.password,
        name: user.name,
        isRole: user.isRole,
        status: user.status,
        locationId: user.locationId,
      };
    }

    return null;
  }

  // Create a new user
  static async createUser(
    name,
    username,
    password,
    isRole,
    status,
    locationId
  ) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await dbConnection.query(
      "INSERT INTO Users (Username, Password, Name, IsRole, Status, LocationId) VALUES (?, ?, ?, ?, ?, ?)",
      [username, hashedPassword, name, isRole, status, locationId]
    );
    return this.findById(result.insertId);
  }

  // Update user details
  static async updateUser(
    id,
    name,
    username,
    password,
    isRole,
    status,
    locationId
  ) {
    let sql = `
      UPDATE Users SET 
        Name = ?, 
        Username = ?, 
        IsRole = ?, 
        Status = ?, 
        LocationId = ?
    `;
    let values = [name, username, isRole, status, locationId];

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      sql = `
        UPDATE Users SET 
          Name = ?, 
          Username = ?, 
          Password = ?, 
          IsRole = ?, 
          Status = ?, 
          LocationId = ?
      `;
      values = [name, username, hashedPassword, isRole, status, locationId];
    }

    sql += " WHERE Id = ?";
    values.push(id);

    const [result] = await dbConnection.query(sql, values);

    return result.affectedRows > 0 ? this.findById(id) : null;
  }

  // Delete user by id
  static async deleteUser(id) {
    const [result] = await dbConnection.query(
      "DELETE FROM Users WHERE Id = ?",
      [id]
    );
    return result.affectedRows > 0;
  }
}
