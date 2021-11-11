const mongoose = require('../config/config.db')

const productSchema=new mongoose({
   productName:{
    type: String,
    required: true
   },
   productType:{
       type:String,
       required:true
   },
   size:{
       type:String,
       required:true
   },
   Quantity:{
       type:Number,
       required:true
   },
   productColor:{
       type:String,
       required:true
   },
   productImage:{
       type:String,
       required:false
   }
})

module.exports = mongoose.model('product',productSchema)

