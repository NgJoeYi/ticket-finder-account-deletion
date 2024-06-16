module.exports = {
    user: "mad_ticketFinder", // Replace with your SQL Server login username
    password: "madticketfinder123", // Replace with your SQL Server login password
    server: "localhost",
    database: "mad_db",
    trustServerCertificate: true,
    options: {
      port: 1433, // Default SQL Server port
      connectionTimeout: 60000, // Connection timeout in milliseconds
    },
  };
