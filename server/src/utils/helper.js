import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const generateRandomSecretKey = () => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijkl";
  let randomKey = "";
  for (let i = 0; i < 32; i++) {
    randomKey += characters.charAt(
      Math.floor(Math.random() * characters.length)
    );
  }
  console.log(randomKey);
};

export const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

export const comparePassword = async (password, dataObject) => {
  const compare = await bcrypt.compare(password, dataObject || "");
  return compare;
};

export const generateToken = (data) => {
  const token = jwt.sign({ data }, process.env.JWT_SECRET, {
    expiresIn: "15d",
  });
  return token;
};
//compare two string sentences
export const compareSentences = (sentenceOne, sentenceTwo) => {
  if (sentenceOne.toLowerCase() === sentenceTwo.toLowerCase()) {
    return true;
  } else {
    return false;
  }
};
