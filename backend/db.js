const mongoose = require('mongoose');

const mongoURI = 'mongodb+srv://Kalyani12db:mern123@cluster0.u9xdtc7.mongodb.net/gofoodmern?retryWrites=true&w=majority&appName=Cluster0'; 

mongoose.connect(mongoURI)
  .then(async () => {
    console.log('Connected to MongoDB');
    try {
        const fetchedData = await mongoose.connection.db.collection("food_items").find({}).toArray();
        const foodCategory = await mongoose.connection.db.collection("foodCategory").find({}).toArray();
        global.food_items = fetchedData;
        global.foodCategory = foodCategory;
      } catch (err) {
        console.error("Error fetching data:", err); 
      }
  })
  .catch(err => console.error('Error connecting to MongoDB:', err));

module.exports = mongoose;