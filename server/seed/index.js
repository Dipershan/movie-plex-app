require("dotenv").config();

const data =  require("./fake.json");
const axios = require("axios");
const mongoose = require("mongoose");

const userController =  require("../modules/users/user.controller");
const movieController =  require("../modules/movies/movie.controller");

const setup = {
    intialize: async () =>{
        try {
            console.log("strat db seeding");
            console.log(data.length);
            await mongoose.connect(process.env.DB_URL);

            const {data: yts} =  await axios("https://yts.mx/api/v2/list_movies.json?limit=50");
            const {data: m} =  yts;
            const {movies} = m;
            console.log("Started adding user in database");
            const userA = {
                name:"Dipershan Admin",
                email:"dipsestha321@gmail.com",
                password: "abc",
                roles:["admin"],
                
            };
            const userB ={
                name:"Dipershan",
                email:"dipsesthauser321@gmail.com",
                password: "123", 
                              
            };
            const user1 =  await userController.create(userA);
            const user2 =  await userController.create(userB);
            console.log("User addded SUcessfully");

            console.log("Startd adding movies in database");
            for(let i=0; i<10;i++){
                const {slug ,  ...rest} = data [i];
                rest.rating  =  movies[i].rating;
                rest.poster =  movies[i].large_cover_image;
                rest.createdBy = user1?._id;
                await movieController.create(rest);
            }
            for(let i=10; i<20;i++){
                const {slug ,  ...rest} = data [i];
                rest.rating  =  movies[i].rating;
                rest.poster =  movies[i].large_cover_image;
                rest.createdBy = user2?._id;
                await movieController.create(rest);
            }
            console.log("Movies added sucessfully");
            
        } catch (e) {
            console.log({e});
        }
    },

};

setup.intialize();