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

  //User registration for auth
  static async register(name, username, password, isRole, status, locationId) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await dbConnection.query(
      "INSERT INTO Users (Username, Password, Name, IsRole, Status, LocationId) VALUES (?, ?, ?, ?, ?, ?)",
      [username, hashedPassword, name, isRole, status, locationId]
    );
    return this.findById(result.insertId);
  }

  static async findById(Id) {
    const [result] = await dbConnection.query(
      "SELECT * FROM Users WHERE Id = ?",
      [Id]
    );
    return result.length > 0 ? result[0] : null; // Return first result or null if not found
  }

  //Get user by username
  static async findByUsername(username) {
    const [rows] = await dbConnection.query(
      "SELECT * FROM Users WHERE Username = ?",
      [username]
    );
    if (rows.length > 0) {
      const { Id, Username, Password, Name, IsRole, Status, LocationId } =
        rows[0];
      return new User(Id, Username, Password, Name, IsRole, Status, LocationId);
    }
    return null;
  }

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

  static async updateUser(
    id,
    name,
    username,
    password,
    isRole,
    status,
    locationId
  ) {
    let hashedPassword = password ? await bcrypt.hash(password, 10) : null;

    const [result] = await dbConnection.query(
      `UPDATE Users 
         SET Name = ?, Username = ?, ${
           password ? "Password = ?, " : ""
         } IsRole = ?, Status = ?, LocationId = ?
         WHERE Id = ?`,
      password
        ? [name, username, hashedPassword, isRole, status, locationId, id]
        : [name, username, isRole, status, locationId, id]
    );

    return result.affectedRows > 0 ? this.findById(id) : null;
  }

  static async deleteUser(id) {
    const [result] = await dbConnection.query(
      "DELETE FROM Users WHERE Id = ?",
      [id]
    );
    return result.affectedRows > 0;
  }
}
