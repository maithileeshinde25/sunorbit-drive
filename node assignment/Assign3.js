const fs = require('fs').promises;

async function findLongestWord() {
  try {
    // 1. Read data.txt asynchronously
    const data = await fs.readFile('data.txt', 'utf8');

    // 2. Clean text: remove punctuation, convert to lowercase, split into words
    const words = data
      .toLowerCase()
      .replace(/[^a-z\s]/g, '') // keep only letters and spaces
      .split(/\s+/)             // split by whitespace
      .filter(Boolean);         // remove empty strings

    if (words.length === 0) {
      throw new Error("No valid words found in the file.");
    }

    // 3. Find the longest word
    let longestWord = words[0];
    for (let word of words) {
      if (word.length > longestWord.length) {
        longestWord = word;
      }
    }

    // 4. Prepare output content
    const output = `Longest word: "${longestWord}" (${longestWord.length} characters)`;

    // 5. Write result to result.txt
    await fs.writeFile('result.txt', output, 'utf8');

    console.log("✅ Longest word written to result.txt");
  } catch (error) {
    console.error("❌ Error:", error.message);
  }
}

// Run the function
findLongestWord();
