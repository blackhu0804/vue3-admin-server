import { Sequelize } from 'sequelize'
const sequelize = new Sequelize('vue3-admin', 'root', '123456', {
  host: 'localhost',
  dialect: 'mysql',
  timezone: '+08:00',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
})

export default sequelize