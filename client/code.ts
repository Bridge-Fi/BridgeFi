import * as bcrypt from "bcryptjs";

async function makeHash() {
  const plain = "flori1234"; // ← e.g. "FloriSecret123!"
  const hash = await bcrypt.hash(plain, 10);
  console.log(hash); // ← will print a real $2a$10$... string
}
makeHash();
