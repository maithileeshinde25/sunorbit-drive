function reverseEachWord(sentence) {
  return sentence
    .split(" ")
    .map(word => word.split("").reverse().join(""))
    .join(" ");
}


const input = "Hello World From Wisdom Sprouts IT Training Hub";
console.log(reverseEachWord(input));
