// const bcrypt = require('bcrypt');
import bcrypt from 'bcrypt'

export async function hashIt(password: string) {
  const salt = await bcrypt.genSalt(6);
  const hashed = await bcrypt.hash(password, salt);
  return hashed;
}
// compare the password user entered with hashed pass.
// export async function compareIt(password: string){
//   const validPassword = await bcrypt.compare(password, hashedPassword);
// }