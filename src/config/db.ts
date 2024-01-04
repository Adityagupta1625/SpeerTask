import mongoose from 'mongoose'

export const ConnectToMongo = (): void => {
  mongoose.set('strictQuery',true)
  
  mongoose
    .connect(process.env.MONGO_URI ?? '', {
      dbName: 'speer'
    })
    .then(() => {
      console.log('connected Succesfully!!')
    })
    .catch((err) => {
      console.log('Error in connecting', err)
    })
}
