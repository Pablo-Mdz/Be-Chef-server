const { Schema, model } = require("mongoose");


const RecipeSchema = new Schema(
    {
        name: String,
        region: String,
        type: String,
        image: String,
        time: String,
        service: String,
        ingredients: [],
        instructions: [],
        tips: String,
        reviews: [],
        // [{ owner: User_id }, { title: String }, { description: String }],
        owner: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
    },
    {
        timestamps: true,
    }
);

const Recipe = model("Recipe", RecipeSchema);

module.exports = Recipe;