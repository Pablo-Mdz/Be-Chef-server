const { Schema, model } = require("mongoose");


const RecipeSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required."],
            unique: true
        },
        type: {
            type: String,
            required: [true, "Type is required."],
        },
        ingredients: [{
            quantity: Number,
            measure: String,
            singleIngredient: String,
        }],
        region: String,
        image: String,
        time: String,
        service: String,
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