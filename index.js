const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((self) => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  .then(() =>
    Recipe.create({
      title: "Nutella Mug Cake",
      level: "Easy Peasy",
      ingredients: [
        "4 tablespoons self-rising flour",
        "4 tablespoons sugar",
        "1 egg",
        "3 tablespoons cocoa powder",
        "3 tablespoons Nutella",
        "3 tablespoons milk",
        "2 tablespoong vegetable oil",
      ],
      cuisine: "International",
      dishType: "dessert",
      duration: 5,
      creator: "Camila Fassarella",
      created: Date.now(),
    })
  )

  .then((recipe) => console.log(`Created Recipe Title: ${recipe.title}.`))
  .then(() => Recipe.create(data))

  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
