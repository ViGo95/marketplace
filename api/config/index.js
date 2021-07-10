module.exports = {
  api: {
    port: process.env.API_PORT || 3000,
    host: 'http://localhost:',
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'Wqsdkpq3245/',
  },
  db: {
    host: process.env.DB_HOST || 'remotemysql.com',
    user: process.env.DB_USER || '2Jdk86CE81',
    password: process.env.DB_PASSWORD || 'fVED2bEmPx',
    database: process.env.DB_DATABASE || '2Jdk86CE81',
    port: process.env.DB_PORT || 3306
  },
  mongoDB: {
    USER: process.env.DBUSER,
    PASSWORD: process.env.DBPASSWORD,
    NAME: process.env.DBNAME,
    URL: `mongodb+srv://${process.env.DBUSER}:${process.env.DBPASSWORD}@cluster0.29vqj.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`
  }
}