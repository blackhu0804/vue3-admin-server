import seq from './seq'
import './models/index.ts'

const testConnect = async () => {
  try {
    await seq.authenticate();
    console.log('Connection has been established successfully');
  } catch (error) {
    console.log('Unable to connect to the database:', error);
  }
}

const updateModel = async () => {
  await seq.sync({alter: true});
  console.log('sync ok');
}

testConnect();
updateModel();