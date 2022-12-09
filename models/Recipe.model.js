const { Schema, model } = require("mongoose");


const RecipeSchema = new Schema(
    {
        name: String,
        region: String,
        type: String,
        image: String,
        time: Number,
        service: Number,
        ingredients: String,
        instructions: String,
        tips: String,
        reviews: String,
        // [{ owner: User_id }, { title: String }, { description: String }],
        owner: String,
    },
    {
        timestamps: true,
    }
);

const Recipe = model("Recipe", RecipeSchema);

module.exports = Recipe;