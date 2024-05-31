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

  const tmpFileName = extractJavaClassName(text);
  const tmpFilePath = path.join(tmpDir, `${tmpFileName}.java`);

  // Write text to the temporary file
  fs.writeFileSync(tmpFilePath, text);
  console.log(`java code written to file:`, tmpFilePath);

  try {
    // Compile the code (if needed)
    console.log(`Compiling java code...`);
    const compileCmd = `javac ${tmpFilePath}`.split(" ");
    await spawn(String(compileCmd[0]), compileCmd.slice(1));
    console.log(`java code compiled successfully`);
    // Run the code
    console.log(`Running java program...`);
    const runCmd = `java -cp ${tmpDir} ${tmpFileName}`.split(" ");
    const result = await spawn(String(runCmd[0]), runCmd.slice(1));
    console.log(`java program executed successfully`);
    // Clean up temporary files
    fs.unlinkSync(tmpFilePath);
    console.log("Temporary files cleaned up");
    res.status(200).json({ output: result.stdout.toString() });
  } catch (error) {
    console.error(
      `Error during compilation or execution of java code:`,
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

// Function to extract class name from Java source file
function extractJavaClassName(text) {
  const classNameMatch = text.match(/public\s+class\s+([^\s{]+)/);
  if (classNameMatch) {
    return classNameMatch[1];
  } else {
    throw new Error("Unable to extract class name from Java source code");
  }
}
