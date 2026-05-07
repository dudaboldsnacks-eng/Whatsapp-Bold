import express from "express";

const app = express();

app.use(express.json());

app.post("/notify", async (req, res) => {

  try {

    const { phone, message } = req.body;

    const response = await fetch(
      `https://graph.facebook.com/v22.0/${process.env.PHONE_NUMBER_ID}/messages`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.TOKEN}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          messaging_product: "whatsapp",
          to: phone,
          type: "text",
          text: {
            body: message
          }
        })
      }
    );

    const data = await response.json();

    res.json(data);

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }

});

app.get("/", (req, res) => {
  res.send("API online");
});

app.listen(process.env.PORT || 3000);
