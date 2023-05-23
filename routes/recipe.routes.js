const router = require("express").Router();
const { findByIdAndUpdate } = require("../models/Recipe.model");
const Recipe = require("../models/Recipe.model");
const fileUploader = require("../config/cloudinary.config.back")
// const { uploader, cloudinary } = require("../config/cloudinary")



router.get('/pages/CRUD/read', (req, res) => {
    Recipe.find()
        .then(Recipe => res.json('recipe', { Recipe, user: req.session.user }))
        .catch(err => console.log(err))
    res.json('/pages/CRUD/recipesHome', { user: req.session.user })
});


router.post('/pages/CRUD/create', (req, res) => {

    const { name, region, type, image, time, service, ingredients, instructions, tips, reviews, owner } = req.body
    console.log("Kjk", req.body)
    console.log(ingredients)
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


router.get('/pages/CRUD/details', (req, res) => {
    Recipe.find()
        .then(recipes => res.json(recipes))
        .catch(err => console.log(err))
});


router.put('/pages/CRUD/:id/likes', (req, res, next) => {
    const [ ...likes]  = req.body
    Recipe.findByIdAndUpdate(req.params.id, {
    likes
    })
      .then(data => {
        res.json(data)
      })
      .catch(err => next(err))
  });




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
// router.get("/pages/CRUD/:id/edit", async (req, res) => {
//     const id = req.params.id
//     Recipe.findById(id)
//     try {
//         const recipe = await Recipe.findById(id)
//         // console.log(recipe)
//         res.json("pages/CRUD/edit", { user: req.session.user, recipe })
//     } catch (err) {
//         console.log(err)
//     }
// })
// // findByIdAndUpdate



//edit post recipe
// router.post("/pages/CRUD/:id",/*  uploader.single("Image"), */(req, res, next) => {
//     const id = req.params.id
//     const { name, region, type, image, time, service, ingredients, instructions, tips, reviews /* owner */ } = req.body
//     /*   const imgName = req.file.originalname
//       const imgPath = req.file.path
//       const publicId = req.file.filename   */
//     // console.log(req.body)
//     const recipe = {
//         name,
//         region,
//         type,
//         image,
//         time,
//         service,
//         ingredients,
//         instructions,
//         tips,
//         reviews,
//     }
//     Recipe.findById(id)
//         .then(data => {
//             if (data.owner._id.toString() !== req.session.user._id) {
//                 console.log(err)
//                 // res.json("recipe/rest", { user: req.session.user, recipe, message: "Oops! you can not Edit." })
//             } else {
//                 Recipe.findByIdAndUpdate(id, recipe, { new: true })

//                     .then(createdRecipe => {
//                         console.log(createdRecipe)

//                         res.redirect("/ProfilePage/ProfilePage")
//                     })
//             }
//         })
//         .catch(err => {
//             next(err)
//         })
// })




router.post('/pages/CRUD/:id/delete', (req, res) => {
    const id = req.params.id
    Recipe.findByIdAndRemove(id)
        .then(deletedRecipe => {
            if (deletedRecipe.imgPath) {
                // delete the image on cloudinary

                cloudinary.uploader.destroy(deletedRecipe.publicId)
            }
            res.json(deletedRecipe)
        })
        .catch(err => console.log(err))
});





router.post("/upload", fileUploader.single("imageUrl"), (req, res, next) => {
    // console.log("file is: ", req.file)
   
    if (!req.file) {
      next(new Error("No file uploaded!"));
      return;
    }  res.json({ secure_url: req.file.path });
  });




module.exports = router;