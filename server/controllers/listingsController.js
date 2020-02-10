/* Dependencies */
import mongoose from 'mongoose';
import Listing from '../models/ListingModel.js';
import coordinates from './coordinatesController.js';
//import { reduce } from 'async';

/*
  In this file, you should use Mongoose queries in order to retrieve/add/remove/update listings.
  On an error you should send a 404 status code, as well as the error message. 
  On success (aka no error), you should send the listing(s) as JSON in the response.

  HINT: if you are struggling with implementing these functions refer back to this tutorial 
  https://www.callicoder.com/node-js-express-mongodb-restful-crud-api-tutorial/
  or
  https://medium.com/@dinyangetoh/how-to-build-simple-restful-api-with-nodejs-expressjs-and-mongodb-99348012925d
  

  If you are looking for more understanding of exports and export modules - 
  https://developer.mozilla.org/en-US/docs/web/javascript/reference/statements/export
  or
  https://medium.com/@etherealm/named-export-vs-default-export-in-es6-affb483a0910
 */


/* Create a listing */
export const create = async (req, res) => {
    /* Instantiate a Listing */

    if(!req.body.code && req.body.name){

        return res.status(404).send({error: 'failed validation'});
    }

   // console.log(req.results.lat);
   const listingData = new Listing({
    /* save the coordinates from the coordinatesController (located in req.results if there is an address property) */
       
        name: req.body.name,
        code: req.body.code,
        coordinates: {latitude : req.results.lat, longitude: req.results.lng},
        address: req.body.address

    });

    /* Then save the listing to the database */
    listingData.save(function(err,doc){
        if(err) throw err;
        //console.log('error saving listing'); 
        res.status(200).send(doc);
    });
    
  

};

/* Show the current listing */
export const read = (req, res) => {
    /* send back the listing as json from the request */
    /* If the listing could _not_ be found, be sure to send back a response in the following format: {error: 'Some message that indicates an error'} */
    //console.log(req.params.listingId);
    Listing.findById(req.params.listingId, function(err, doc){
        if(err){ res.status(404).send({error: 'Cannot find listing to show'});
        }else{
                //console.log('read success');
                res.status(200).send(doc);
           
        }
    });

};

/* Update a listing - note the order in which this function is called by the router*/
export const update = (req, res) => {
    const listing = req.listing;

   /* Replace the listings's properties with the new properties found in req.body */
   /*save the coordinates (located in req.results if there is an address property) */

   if(!req.body.code && req.body.name){

    return res.status(404).send({error: 'failed validation'});
}
    Listing.findOneAndUpdate({name: req.body.name}, req.body,{new: true},(err, doc) => 
    {
        if(err) throw err;
        res.json(doc); 
            
  
      }); 
  

};

/* Delete a listing */
export const remove = (req, res) => {
    /* Add your code to remove the listins */
    /* If the listing could _not_ be found, be sure to send back a response in the following format: {error: 'Some message that indicates an error'} */
    Listing.findByIdAndRemove(req.params.listingId, function(err, doc){
        if(err){
            return res.status(404).send({error: 'Cannot find listing to remove'});
    }else{

        res.status(200).json(doc); 
    }

    }); 

};

/* Retreive all the directory listings, sorted alphabetically by listing code */
export const list = (req, res) => {
    /* Add your code. Make sure to send the documents as a JSON response.*/
    Listing.find({}, null, {sort: {code:1}}, function(err, doc){
        if(err){
                throw err;
        }else{
            res.json(doc); 

        }

    });

};

/* 
  Middleware: find a listing by its ID, then pass it to the next request handler. 

  HINT: Find the listing using a mongoose query, 
        bind it to the request object as the property 'listing', 
        then finally call next
 */
    export const listingByID = (req, res, next, id) => {
        Listing.findById(id, function(err, doc){
            if(err){
                console.log('error listing by ID')
                throw err;
            }
            else {
                req.listing = doc;
                res.json(doc);
               next();
            }
        });

};
