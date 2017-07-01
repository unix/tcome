/**
 * Connections
 * (sails.config.connections)
 *
 */

const pro = {
  adapter: 'sails-mongo',
  host: 'pro.mongo',
  port: 27017,
  user: process.env.MONGODB_USER,
  password: process.env.MONGODB_PASS,
  database: 'blog'
}
const dev = {
    adapter: 'sails-mongo',
    host: '127.0.0.1',
    port: 27017,
    user: 'user',
    password: 'abcd123456',
    database: 'blog'
}
module.exports.connections = {
  
  /***************************************************************************
   *                                                                          *
   * Local disk storage for DEVELOPMENT ONLY                                  *
   *                                                                          *
   * Installed by default.                                                    *
   *                                                                          *
   ***************************************************************************/
  localDiskDb: {
    adapter: 'sails-disk',
  },
  
  /***************************************************************************
   *                                                                          *
   * MySQL is the world's most popular relational database.                   *
   * http://en.wikipedia.org/wiki/MySQL                                       *
   *                                                                          *
   * Run: npm install sails-mysql                                             *
   *                                                                          *
   ***************************************************************************/
  // someMysqlServer: {
  //   adapter: 'sails-mysql',
  //   host: 'YOUR_MYSQL_SERVER_HOSTNAME_OR_IP_ADDRESS',
  //   user: 'YOUR_MYSQL_USER', //optional
  //   password: 'YOUR_MYSQL_PASSWORD', //optional
  //   database: 'YOUR_MYSQL_DB' //optional
  // },
  
  /***************************************************************************
   *                                                                          *
   * MongoDB is the leading NoSQL database.                                   *
   * http://en.wikipedia.org/wiki/MongoDB                                     *
   *                                                                          *
   * Run: npm install sails-mongo                                             *
   *                                                                          *
   ***************************************************************************/
  mongo: process.env.NODE_ENV === 'development' ? dev : pro,
  
  /***************************************************************************
   *                                                                          *
   * PostgreSQL is another officially supported relational database.          *
   * http://en.wikipedia.org/wiki/PostgreSQL                                  *
   *                                                                          *
   * Run: npm install sails-postgresql                                        *
   *                                                                          *
   *                                                                          *
   ***************************************************************************/
  // somePostgresqlServer: {
  //   adapter: 'sails-postgresql',
  //   host: 'YOUR_POSTGRES_SERVER_HOSTNAME_OR_IP_ADDRESS',
  //   user: 'YOUR_POSTGRES_USER', // optional
  //   password: 'YOUR_POSTGRES_PASSWORD', // optional
  //   database: 'YOUR_POSTGRES_DB' //optional
  // }
  
  
  /***************************************************************************
   *                                                                          *
   * More adapters: https://github.com/balderdashy/sails                      *
   *                                                                          *
   ***************************************************************************/
  
}
