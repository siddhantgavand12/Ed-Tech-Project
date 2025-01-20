const Tag = require("../models/tags");

//create Tag ka handler function

exports.createCategory = async (req,res) => {
    try{
        //fetch data
        const {name, description} = req.body;
        
        if(!name || !description){
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            });
        }

        //create entry in DB
        const tagDetails = await Tag.create({
            name: name,
            description: description,
        });
        console.log(tagDetails);

        return res.status(200).json({
            success:true,
            message:"Category created successfully"
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}

//get all tags

exports.showAllCategory = async(req, res)=>{
    try{
        //fetch data
        const allTags = await Tag.find({}, {name:true, description:true});
        res.status(200).json({
            success:true,
            message:"All Categories returned successfully",
            allTags,

        })

    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:error.message,
        })       
    }
}