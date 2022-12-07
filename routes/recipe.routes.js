const router = require("express").Router();
const Recipe = require("../models/Recipe.model");
// const { uploader, cloudinary } = require("../config/cloudinary")


//create Recipe
router.get('/recipe/create', (req, res) => {
    res.render('recipe/new', { user: req.session.user })
});


// read Recipe
router.get('/recipe/read', (req, res) => {
    Recipe.find()
        .then(Recipe => res.render('recipe', { Recipe, user: req.session.user }))
        .catch(err => console.log(err))
    res.render('recipe/details', { user: req.session.user })
});


//create post
router.post('/recipe/create', uploader.single("Image"), (req, res) => {
    const userId = req.session.user._id
    const { name, region, type, time, service, ingredients, instructions, tips, reviews /* owner */ } = req.body
    const imgName = req.file.originalname
    const imgPath = req.file.path
    const publicId = req.file.filename
    Recipe.create({
        name,
        region,
        type,
        imgName,
        imgPath,
        publicId,
        time,
        service,
        ingredients,
        instructions,
        tips,
        reviews,
        owner: userId,
    })
        .then(createdRecipe => res.redirect('/profile'))
        .catch(err => res.render("recipe/new", { user: req.session.user }))
});


//get all recipe
router.get('/recipe/recepies', (req, res) => {
    Recipe.find()
        .then(recipe => res.render('Recipes/recepies', { recipe, user: req.session.user }))
        .catch(err => console.log(err))
});



// search 
router.get('/recipe/results', (req, res) => {
    const query = req.query.q
    console.log(query)
    const recipeFound = []
    Recipe.find({})
        .then(recipeFromDB => {
            if (recipeFromDB === null) {
                res.render("recipe/results", { user: req.session.user, message: 'Sorry, no results found'/* , isLoggedIn */ })
                return
            }
            else {
                for (let recipe of recipeFromDB) {
                    console.log(recipe)
                    if (recipe.name.toLowerCase().includes(query.toLowerCase())) {
                        recipeFound.push(recipe)
                    }
                    else if (recipe.speciality.includes(query)) {
                        recipeFound.push(recipe)
                    }
                }
                res.render("recipes/results", { recipeFound: recipeFound, user: req.session.user/* , isLoggedIn */ })
            }
        })
})



//get details
router.get("/recipe/:id", (req, res) => {
    const id = req.params.id
    console.log(id)
    Recipe.findById(id)
        // .populate("User")
        .then(recipe => {
            console.log(recipe)
            res.render("recipe/details", { recipe, user: req.session.user })
        }
        )
        .catch(err => console.log(err))
})


//edit recipe get

router.get("/recipe/:id/edit", async (req, res) => {
    const id = req.params.id
    Recipe.findById(id)
    try {
        const recipe = await Recipe.findById(id)
        // console.log(recipe)
        res.render("recipe/edit", { user: req.session.user, recipe })
    } catch (err) {
        console.log(err)
    }
})




//edit post
router.post("/recipe/:id",/*  uploader.single("Image"), */(req, res, next) => {
    const id = req.params.id
    const { name, region, type, time, service, ingredients, instructions, tips, reviews /* owner */ } = req.body
    /*   const imgName = req.file.originalname
      const imgPath = req.file.path
      const publicId = req.file.filename   */
    // console.log(req.body)
    const recipe = {
        name,
        region,
        type,
        imgName,
        imgPath,
        publicId,
        time,
        service,
        ingredients,
        instructions,
        tips,
        reviews,
        /*  imgName, 
         imgPath, 
         publicId, */
    }
    Recipe.findById(id)
        .then(data => {
            if (data.owner._id.toString() !== req.session.user._id) {
                console.log(err)
                // res.render("recipe/rest", { user: req.session.user, recipe, message: "Oops! you can not Edit." })
            } else {
                Recipe.findByIdAndUpdate(id, recipe, { new: true })

                    .then(createdRecipe => {
                        console.log(createdRecipe)

                        res.redirect("/profile")
                    })
            }
        })
        .catch(err => {
            next(err)
        })
})



//delete recipe
router.post('/recipe/:id/delete', (req, res) => {
    const id = req.params.id

    Recipe.findById(id)
        .then(data => {
            if (data.owner._id.toString() !== req.session.user._id) {
                res.render("/", { user: req.session.user, message: "Oops! you can not delete." })
            } else {
                Recipe.findByIdAndRemove(id)
                    .then(deletedRecipe => {
                        if (deletedRecipe.imgPath) {
                            // delete the image on cloudinary
                            cloudinary.uploader.destroy(deletedRecipe.publicId)
                        }
                        res.redirect('/profile')
                    })
            }
        })
        .catch(err => console.log(err))
});

module.exports = router;