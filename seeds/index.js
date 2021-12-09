
const mongoose = require('mongoose');
const cities = require('./cities');
const {places, descriptors} = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random()*array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for(let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random()*1000);
        const price = Math.floor(Math.random()*20) + 10;
        const camp = new Campground({
            author: '61aa3ef3f2a5d527284a3240',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            price: price,
            geometry: { 
                type: 'Point', 
                coordinates: [cities[random1000].longitude, cities[random1000].latitude] 
            },
            images: [
                {
                  url: 'https://res.cloudinary.com/tanyaaa/image/upload/v1638809896/YelpCamp/mrzut6wdnor2ywbbnkia.jpg',
                  filename: 'YelpCamp/rvhorctgxahehdlsfqx1',
                },
                {
                  url: 'https://res.cloudinary.com/tanyaaa/image/upload/v1638851750/YelpCamp/i35zff66znbwqsvirkrw.jpg',
                  filename: 'YelpCamp/x1swg5l0kt9hm1uayoob',
                }
              ]
        }) 
        await camp.save();
    }

}

seedDB().then(() => {
    mongoose.connection.close();
});