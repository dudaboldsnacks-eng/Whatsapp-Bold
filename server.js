import express from "express";

const app = express();

app.use(express.json());

app.post("/notify", async (req, res) => {

  const { phone, message } = req.body;

  console.log(phone, message);

  res.json({
    success: true
  });

});

app.get("/", (req, res) => {
  res.send("API online");
});

app.listen(process.env.PORT || 3000);
