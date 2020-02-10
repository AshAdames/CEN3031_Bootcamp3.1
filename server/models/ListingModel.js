/* Import mongoose and define any variables needed to create the schema */
import mongoose from 'mongoose';

/* Create your schema for the data in the listings.json file that will define how data is saved in your database
     See https://mongoosejs.com/docs/guide.html for examples for creating schemas
     See also https://scotch.io/tutorials/using-mongoosejs-in-node-js-and-mongodb-applications
  */



/*TEST
  saves properly when code and name provided'
  saves properly when all three properties provided
  throws an error when name not provided
  throws an error when code not provided

*/

const listingSchema = new mongoose.Schema({
  /* Your code for a schema here */
  code:{type: String, required:true},
  name: {type: String, required:true},
  coordinates: {latitude: mongoose.Number, longitude: mongoose.Number},
  address: {type: String}
  //Check out - https://mongoosejs.com/docs/guide.html
});

var Listing = mongoose.model('listings', listingSchema);

/* Use your schema to instantiate a Mongoose model
Export the model to make it avaiable to other parts of your Node application */
//Check out - https://mongoosejs.com/docs/guide.html#models
export default mongoose.model('listings', listingSchema);
