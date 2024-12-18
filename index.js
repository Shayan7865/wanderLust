const express = require("express");
const app=express();
const mongoose=require("mongoose");
const Listing = require("./models/listing.js");
const path=require("path");
const ejsMate=require("ejs-mate"); 
const methodOverride=require("method-override");


app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine("ejs",ejsMate);
app.use(express.static(path.join(__dirname,"/public")));


app.get("/",(req,res)=>{
     res.send("hi,i am root");
})
 
 app.listen(8080,()=>{
  console.log("server is listening to port 8080");
  });

  const MONGO_URL="mongodb://127.0.0.1:27017/wanderlust";

 async function main(){
     await mongoose.connect(MONGO_URL);
 }
 main()
  .then(()=>{
     console.log("connected to db");
   })
 .catch((err)=>{
     console.log(err);
 });
          //    index route

 app.get("/listings",async(req,res)=>{
     const allListings=await Listing.find({});
     res.render("listings/index.ejs",{allListings})
 })

 //    new route
 app.get("/listings/new",(req,res)=>{
    res.render("listings/new.ejs");
  });

//   Show route
   app.get("/listing/:id",async (req,res)=>{
   let{id}=req.params;
   const listing = await Listing.findById(id);
   res.render("listings/show.ejs",{listing});
   });

//    create route
    app.post("/listings",async(req,res,nxt)=>{
      try{
        const newListing =   new Listing(req.body.listing);
        await newListing.save();
        res.redirect("/listings");
      }catch(err){
        nxt(err);
      }
    
    //   let listing=req.body.listing;
    //    console.log(listing);
    });

     // edit rout
   app.get("/listings/:id/edit",async(req,res)=>{
    let{id}=req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs",{listing});
   });

  //  update route
      app.post("/listings/:id",async(req,res)=>{
      let{id}=req.params;
        await Listing.findByIdAndUpdate(id,{...req.body.listing});
      res.redirect("/listings");
     });

    //  delete route
       app.delete("/listings/:id",async(req,res)=>{
          let{id}=req.params;
           let deletedListing=await Listing.findByIdAndDelete(id);
           console.log(deletedListing);
           res.redirect("/listings");
       });

      //  error handling

        app.use((err,req,res,nxt)=>{
          res.send("something went wrong");
        });





