const express = require("express");
const spawn = require("spawn-please");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Endpoint to compile and run code
app.post("/compile-and-run", async (req, res) => {
  console.log("Received request to compile and run code");

  const { text } = req.body;
  if (!text) {
    console.error("Text is not provided in the request");
    return res.status(400).json({ error: "Text is not provided" });
  }

  // Create a temporary directory to store files
  const tmpDir = path.join(__dirname, "tmp");
  if (!fs.existsSync(tmpDir)) {
    fs.mkdirSync(tmpDir);
  }
  const tmpFileName = `Python_Code_${Math.random().toString(36).substring(2)}`;
  const tmpFilePath = path.join(tmpDir, `${tmpFileName}.py`);
  
  // Write text to the temporary file
  fs.writeFileSync(tmpFilePath, text);
  console.log(`python code written to file:`, tmpFilePath);
  try {
    // Run the code
    console.log(`Running python program...`);
    const runCmd = `python3 ${tmpFilePath}`.split(" ");
    const result = await spawn(String(runCmd[0]), runCmd.slice(1));
    console.log(`python program executed successfully`);
    // Clean up temporary files
    fs.unlinkSync(tmpFilePath);
    console.log("Temporary files cleaned up");
    res.status(200).json({ output: result.stdout.toString() });
  } catch (error) {
    console.error(
      `Error during compilation or execution of python code:`,
      error.message
    );
    // Clean up temporary files
    fs.unlinkSync(tmpFilePath);
    console.log("Temporary files cleaned up");
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
