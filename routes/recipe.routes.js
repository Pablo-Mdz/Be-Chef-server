const router = require("express").Router();
const Recipe = require("../models/Recipe.model");
// const { uploader, cloudinary } = require("../config/cloudinary")


//create Recipe


// read Recipe
router.get('/pages/CRUD/read', (req, res) => {
    Recipe.find()
        .then(Recipe => res.json('recipe', { Recipe, user: req.session.user }))
        .catch(err => console.log(err))
    res.json('/pages/CRUD/details', { user: req.session.user })
});


//create post
router.post('/pages/CRUD/create', (req, res) => {

    console.log("hit!")

    const { name, region, type,
        time,
        service,
        ingredients,
        instructions,
        tips,
        reviews,
        owner, image } = req.body
    console.log(req.body)

    Recipe.create({
        name,
        region,
        type,
        image,
        time,
        service,
        ingredients,
        instructions,
        tips,
        reviews,
        owner,
    })
        .then(createdRecipe => res.json(createdRecipe))
        .catch(err => res.status)
});


//get all recipe in details
router.get('/pages/CRUD/details', (req, res) => {
    Recipe.find()
        .then(recipes => res.json(recipes))
        .catch(err => console.log(err))
});



//test 3



//get details
router.get("/pages/CRUD/:id", (req, res) => {
    const id = req.params.id
    console.log(id)
    Recipe.findById(id)
        // .populate("User")
        .then(recipe => {
            console.log(recipe)
            res.json(recipe)
        }
        )
        .catch(err => console.log(err))
})


//edit recipe get

router.get("/pages/CRUD/:id/edit", async (req, res) => {
    const id = req.params.id
    Recipe.findById(id)
    try {
        const recipe = await Recipe.findById(id)
        // console.log(recipe)
        res.json("pages/CRUD/edit", { user: req.session.user, recipe })
    } catch (err) {
        console.log(err)
    }
})




//edit post recipe
router.post("/pages/CRUD/:id",/*  uploader.single("Image"), */(req, res, next) => {
    const id = req.params.id
    const { name, region, type, image, time, service, ingredients, instructions, tips, reviews /* owner */ } = req.body
    /*   const imgName = req.file.originalname
      const imgPath = req.file.path
      const publicId = req.file.filename   */
    // console.log(req.body)
    const recipe = {
        name,
        region,
        type,
        image,
        time,
        service,
        ingredients,
        instructions,
        tips,
        reviews,
    }
    Recipe.findById(id)
        .then(data => {
            if (data.owner._id.toString() !== req.session.user._id) {
                console.log(err)
                // res.json("recipe/rest", { user: req.session.user, recipe, message: "Oops! you can not Edit." })
            } else {
                Recipe.findByIdAndUpdate(id, recipe, { new: true })

                    .then(createdRecipe => {
                        console.log(createdRecipe)

                        res.redirect("/ProfilePage/ProfilePage")
                    })
            }
        })
        .catch(err => {
            next(err)
        })
})



//delete recipe
router.post('/pages/CRUD/:id/delete', (req, res) => {
    const id = req.params.id
    Recipe.findByIdAndRemove(id)
        .then(deletedRecipe => {
            // if (deletedRecipe.imgPath) {
            //     // delete the image on cloudinary

            //     cloudinary.uploader.destroy(deletedRecipe.publicId)
            // }
            res.json(deletedRecipe)
        })
        .catch(err => console.log(err))
});

module.exports = router;