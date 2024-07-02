import axios from "axios";

async function test() {
  const list = await axios.get("http://localhost:3001/places");
  return list;
}

test();
