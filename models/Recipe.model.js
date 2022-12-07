const { Schema, model } = require("mongoose");


const RecipeSchema = new Schema(
    {
        name: String,
        region: String,
        type: String,
        photo: String,
        time: Number,
        service: Number,
        ingredients: String,
        instructions: String,
        tips: String,
        reviews: String,
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