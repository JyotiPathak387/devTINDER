const express = require("express");

const app = express();

//made the route dynamic dynamic
// app.get("/user/:userId/:name/:password", (req, res ) => {
//     console.log(req.params)
//     res.send({firstname : "Jyoti", lastname : "Pathak"})
//    })


// app.get("/user", (req, res ) => {
//     console.log(req.query)
//     res.send({firstname : "Jyoti", lastname : "Pathak"})
//    })

 app.get("/user/*fly$", (req, res ) => {
        res.send({firstname : "Jyoti", lastname : "Pathak"})
       })

// app.post("/user", (req, res ) => {
//     res.send("hello from post method");
//    })

// app.delete("/user", (req, res 
// ) => {
//     res.send("hello from delete method");
//    })


app.listen(7777, () => {
    console.log("listen port 7777");
})