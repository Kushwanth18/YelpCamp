const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campground");

mongoose.connect("mongodb://localhost:27017/yelp-camp");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection Error:"));
db.on("open", () => {
  console.log("Database Connected");
});

//getting a random sample element from the array
const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 50; i++) {
    //Adding 50 places to our DB
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      location: `${cities[random1000].city},${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      image:
        "https://imgs.search.brave.com/AJUOhRsPwrdsEyaFFIEhj0UQSGKOcT9dBDpZB2VyIBk/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMuYm9yZWRwYW5k/YS5jb20vYmxvZy93/cC1jb250ZW50L3Vw/bG9hZHMvMjAxNC8x/MC9mb3Jlc3QtcGhv/dG9ncmFwaHktM19f/ODgwLmpwZw",
      description:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Soluta facere nobis sunt qui amet id similique magnam recusandae quo accusantium? In, pariatur! Odio, voluptatum. Voluptate quas praesentium eius doloribus dolores.",
      price: price,
    });
    await camp.save();
  }
};

//cloosing the connection to our DB as we are done seeding our project
seedDB().then(() => {
  db.close();
});
