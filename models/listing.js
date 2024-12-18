const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title: String,
    description: String,
    image: {
        type: String,
        set: (v) => {
            if (typeof v === 'object' && v !== null) {
                return v.url || "https://unsplash.com/photos/a-group-of-palm-trees-sitting-in-the-middle-of-a-body-of-water-ur0JU-NBblk";
            }
            return v === "" 
                ? "https://unsplash.com/photos/a-group-of-palm-trees-sitting-in-the-middle-of-a-body-of-water-ur0JU-NBblk" 
                : v;
        }
    },
    price: Number,
    location: String,
    country: String,
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
