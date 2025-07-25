function wordFrequencyCounter(text) {
  const lowerText = text.toLowerCase();
  const cleanedText = lowerText.replace(/[^a-z\s]/g, '');
  const words = cleanedText.split(/\s+/).filter(word => word.length > 0);
  const frequencyMap = {};

  words.forEach(word => {
    frequencyMap[word] = (frequencyMap[word] || 0) + 1;
  });

  console.log(frequencyMap)
}


wordFrequencyCounter("Hello, world! Hello... HELLO? test, world.")
