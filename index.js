const express = require('express');
const app = express();
const controller = require("./controller");
const cors = require('cors');


app.use(express.json());

app.use(cors());

let PORT = 8001;

app.get("/test",(req,res)=>{
    res.status(200).send({
        message: "Test Succcess"
    })
})


app.post("/subscriptions",controller.subscription)
app.put("/subscriptions/:subscription_id",controller.subscriptionupdate)
app.delete("/subscriptions/:subscription_id",controller.deletesubscription)
app.get("/subscriptions/:customer_id",controller.getsubscription)

app.post("/form",controller.newform)
app.get("/form/:formid",controller.getform)


app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});


