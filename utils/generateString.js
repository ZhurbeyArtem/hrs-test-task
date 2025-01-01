export const generateString = (pattern = null) => {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  //generate rand string
  if (!pattern) {
    let result = "";
    for (let i = 0; i < 10; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }
  //generate pattern string
  const regexParts = {
    "\\[a-z\\]": () => String.fromCharCode(97 + Math.floor(Math.random() * 26)), // a-z
    "\\[A-Z\\]": () => String.fromCharCode(65 + Math.floor(Math.random() * 26)), // A-Z
    "\\[0-9\\]": () => String.fromCharCode(48 + Math.floor(Math.random() * 10)), // 0-9
    "\\[0-9a-zA-Z\\]": () => {
      return chars.charAt(Math.floor(Math.random() * chars.length));
    },
    "\\\\/": () => "/", // change display slash
    "\\\\.": () => ".", // change display dot
  };

  let result = "";
  let i = 0;

  while (i < pattern.length) {
    let matched = false;

    if (i + 1 < pattern.length && pattern[i + 1] === "+") {
      const repeatPattern = pattern[i];
      const generator = Object.entries(regexParts).find(([key]) =>
        new RegExp(`^${key}`).test(repeatPattern)
      );
      if (generator) {
        let repeatResult = "";
        const repeatCount = generateInteger(0, 5) + 1;
        for (let j = 0; j < repeatCount; j++) {
          repeatResult += generator[1]();
        }
        result += repeatResult;
        i += 2; // skip current symbol and +
        continue;
      }
    }

    // find coincidence in regexParts
    for (const [key, generator] of Object.entries(regexParts)) {
      const match = pattern.slice(i).match(new RegExp(`^${key}`));
      if (match) {
        result += generator();
        i += match[0].length;
        matched = true;
        break;
      }
    }

    if (!matched) {
      // If the symbol is not recognized as part of the pattern, add it directly
      if (pattern[i] !== "+") {
        result += pattern[i];
      }
      i++;
    }
  }

  return result;
};
