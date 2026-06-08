//Import the Model
const visitor = require('../models/visitormodel')

//CREATE A VISITOR 
exports.createVisitor = async(req,res) => {
    const {name, email, phone, photo, company, purpose} = req.body;
        if(!name || !email || !phone || !photo || !company || !purpose){
        return res.status(400).json({
          success: false,
          error: 'Please fill all the fields'
        })
        }
        try {
        const Visitor = await visitor.create(req.body)
        res.status(200).json({
               success: true,
               data: Visitor
            })
        }
        catch(error){
            res.status(400).json({
                error: error.message
            })
        }
}

//GET ALL VISITORS 
exports.getAllVisitors = async(req,res) => {
try{
const Visitor = await visitor.find()
     res.status(200).json({
           success: true,
           data: Visitor
        })
   }
   catch(error){
    res.status(400).json({
    error: error.message
    })
   }
}

//GET A VISITOR DETAILS BY THEIR ID
exports.getVisitorById = async(req,res) => {
try {
const {id} = req.params
const Visitor = await visitor.findById(id)
    res.status(200).json({
           success: true,
           data: Visitor
        })
}
catch (error) {
 res.status(400).json({
    error: error.message
})
}
}

//UPDATE A VISITOR BY THEIR ID 
exports.updateVisitorById = async(req,res) => {
try{
const {id} = req.params,
{data} = req.body
const Visitor = await visitor.findByIdAndUpdate(id, data, {returnDocument: 'after'})
    res.status(200).json({
           success: true,
           data: Visitor
        })
    }
catch(error) {
    res.status(400).json({
    error: error.message
})
}
}

//DELETE A VISITOR BY THEIR ID
exports.deleteVisitorById = async(req,res) => {
try{
const {id} = req.params
const Visitor = await visitor.findByIdAndDelete(id)
    res.status(200).json({
           success: true,
           data: Visitor
        })
}
catch(error){
res.status(400).json({
error: error.message
})
}
}