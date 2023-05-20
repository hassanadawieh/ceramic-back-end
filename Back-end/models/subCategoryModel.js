import mongoose from "mongoose";
 
const { Schema , model} = mongoose;

const subCategorySchema = new Schema (
    {
     name: {
            type : String,
            required: true,
        },
        
     category: {
            type : Schema.Types.ObjectId,
            ref : "category",
         },
        
    },
    {
        collection : "subCategories",
    }
);
subCategorySchema.pre(["find" , "findOne"] , function() {
    this.populate("category");
});

const subCategoryModel = model("subCategory" , subCategorySchema);
export default subCategoryModel;
