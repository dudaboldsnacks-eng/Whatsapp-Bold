import express from "express";
import makeWASocket, {
  useMultiFileAuthState
} from "@whiskeysockets/baileys";

const app = express();

app.use(express.json());

let sock;

async function connectWhatsApp() {

  const { state, saveCreds } = await useMultiFileAuthState("auth");

  sock = makeWASocket({
    auth: state
  });

  sock.ev.on("creds.update", saveCreds);

  sock.ev.on("connection.update", ({ connection, qr }) => {

    if (qr) {
      console.log("COLE ESSE QR EM UM GERADOR:");
      console.log(qr);
    }

    if (connection === "open") {
      console.log("WhatsApp conectado");
    }

  });

}

connectWhatsApp();

app.post("/notify", async (req, res) => {

  try {

    const { phone, message } = req.body;

    await sock.sendMessage(
      `${phone}@s.whatsapp.net`,
      {
        text: message
      }
    );

    res.json({
      success: true
    });

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
