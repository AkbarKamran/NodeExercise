import * as bcrypt from "bcrypt";

let convertHash = async (password: string) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);
    return hashed;
  } catch (error) {
    throw error;
  }
};
let verifyHash = async (password: string, dbPassword: string) => {
  try {
    const verified = bcrypt.compareSync(password, dbPassword);

    return verified;
  } catch (error) {
    throw error;
  }
};
export { convertHash, verifyHash };
