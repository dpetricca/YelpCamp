const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Database Connected')
});

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 350; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const camp = new Campground({
            author: '6070ed2071caac47a4a4b7e0',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude, 
                    cities[random1000].latitude
                ]
            },
            title: `${descriptors[Math.floor(Math.random() * descriptors.length)]} ${places[Math.floor(Math.random() * places.length)]}`,
            images: [
                {
                    url: 'https://res.cloudinary.com/drunknypj/image/upload/v1618145368/YelpCamp/byzdva8alx8akokelipw.jpg',
                    filename: 'YelpCamp/byzdva8alx8akokelipw'
                },
                {
                    url: 'https://res.cloudinary.com/drunknypj/image/upload/v1618145368/YelpCamp/jfc2x66lwlyoikqsy9ak.jpg',
                    filename: 'YelpCamp/jfc2x66lwlyoikqsy9ak'
                },
                {
                    url: 'https://res.cloudinary.com/drunknypj/image/upload/v1618145369/YelpCamp/a9fgmpoouiokk2dlndby.jpg',
                    filename: 'YelpCamp/a9fgmpoouiokk2dlndby'
                },
                {
                    url: 'https://res.cloudinary.com/drunknypj/image/upload/v1618145370/YelpCamp/kzslvzk5qrrqa57kcicy.jpg',
                    filename: 'YelpCamp/kzslvzk5qrrqa57kcicy'
                },
                {
                    url: 'https://res.cloudinary.com/drunknypj/image/upload/v1618145371/YelpCamp/bfplz5uh520n57pvv5xt.jpg',
                    filename: 'YelpCamp/bfplz5uh520n57pvv5xt'
                },
                {
                    url: 'https://res.cloudinary.com/drunknypj/image/upload/v1618145371/YelpCamp/wse1sibl0n5227myprtd.jpg',
                    filename: 'YelpCamp/wse1sibl0n5227myprtd'
                }
            ],
            price: (Math.round(Math.random() * 10000) / 100),
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Esse ullam voluptates dolorum cumque dolorem atque adipisci quidem sint doloribus ad nulla, veritatis officia quas sed iure nobis aliquam magnam mollitia?'
        })
        await camp.save()
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})
