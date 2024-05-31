const express = require("express");
const axios = require("axios");
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
// - JAVAS_PORT=5000
// - CS_PORT=5001
// - PYS_PORT=5002
const JAVAS_PORT = process.env.JAVAS_PORT || 5000;
const PYS_PORT = process.env.PYS_PORT || 5002;
const CS_PORT = process.env.CS_PORT || 5001;
const PHP_PORT = process.env.PHP_PORT || 5003;
const RUBY_PORT = process.env.RUBY_PORT || 5004;

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint to compile and run code
app.post("/compile-and-run", async (req, res) => {
  console.log("Received request to compile and run code");

  const { text, language } = req.body;
  if (!text || !language) {
    console.error("Text or language not provided in the request");
    return res.status(400).json({ error: "Text or language not provided" });
  }

  const decodedText = Buffer.from(text, "base64").toString("utf-8");

  try {
    let response;
    switch (language) {
      case "java":
        response = await axios.post(`http://java-service:${JAVAS_PORT}/compile-and-run`, {
          text: decodedText,
        });
        break;
      case "python":
        response = await axios.post(`http://python-service:${PYS_PORT}/compile-and-run`, {
          text: decodedText,
        });
        break;
      case "c":
        response = await axios.post(`http://c-service:${CS_PORT}/compile-and-run`, {
          text: decodedText,
        });
        break;
        case "php":
          response = await axios.post(`http://php-service:${PHP_PORT}/compile-and-run`, {
            text: decodedText,
          });
          break;
        case "ruby":
          response = await axios.post(`http://ruby-service:${RUBY_PORT}/compile-and-run`, {
            text: decodedText,
          });
          break;
      default:
        return res.status(400).json({ error: "Unsupported language" });
    }
    res.status(200).json({ output: response.data.output });
  } catch (error) {
    console.error(
      `Error during compilation or execution of ${language} code:`,
      error.message
    );
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
