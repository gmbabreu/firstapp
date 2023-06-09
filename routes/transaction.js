/*
  transactions.js -- Router for the transactions
*/
const express = require('express');
const router = express.Router();
const Item = require('../models/Item')

/*
this is a very simple server which maintains a key/value
store using an object where the keys and values are lists of strings

*/

isLoggedIn = (req,res,next) => {
  if (res.locals.loggedIn) {
    next()
  } else {
    res.redirect('/login')
  }
}

// get the value associated to the key
router.get('/transaction/',
  isLoggedIn,
  async (req, res, next) => {
      const sortBy = req.query.sortBy
      if (sortBy=="category"){
        res.locals.items = await Item.find({userId:req.user._id}).sort({category:1})
        res.render('List')
      }
      if (sortBy=="amount"){
        res.locals.items = await Item.find({userId:req.user._id}).sort({amount:-1})
        res.render('List')
      }
      if (sortBy=="description"){
        res.locals.items = await Item.find({userId:req.user._id}).sort({description:-1})
        res.render('List')
      }
      if (sortBy=="date"){
        res.locals.items = await Item.find({userId:req.user._id}).sort({date:-1})
        res.render('List')
      }
      else{
        res.locals.items = await Item.find({userId:req.user._id})
        res.render('List');
      }    
});



/* add the value in the body to the list associated to the key */
router.post('/transaction',
  isLoggedIn,
  async (req, res, next) => {
      const transaction = new Item(
        {amount:req.body.amount,
          category:req.body.category,
          date:req.body.date,
          description:req.body.description,
          userId:req.user._id
        })
      await transaction.save();
      res.redirect('/transaction')
});

router.get('/transaction/remove/:item',
  isLoggedIn,
  async (req, res, next) => { 
      console.log("inside /transaction/remove/:item")
      await Item.deleteOne({_id:req.params.item});
      res.redirect('/transaction')
});

router.get('/transaction/edit/:item',
  isLoggedIn,
  async (req, res, next) => {
      const item = await Item.findById(req.params.item);
      res.locals.item = item
      res.render('edit')
});

router.post('/transactions/updateItem',
  isLoggedIn,
  async (req, res, next) => {
      const {item,decription,amount,category, date} = req.body;
      await Item.findOneAndUpdate(
        {_id:item},
        {$set: {decription,amount,category, date}} );
      res.redirect('/transaction')
});


// get the value associated to the key
router.get('/transaction/byCategory',
  isLoggedIn,
  async (req, res, next) => {
      trans = await Item.find({userId:req.user._id}).sort({category:1})
      res.render('category',{trans});
});


module.exports = router;
