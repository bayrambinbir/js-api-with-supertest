const faker = require("faker");

import request from "../config/common.js";

const TOKEN =
  "9e160e35970f238e588930dfbddf1e32ef91cb90b59f164b6e98de6c3d03dc9d";

const randomNum = Math.floor(Math.random() * 999);

export const createRandomUserWithFaker = async () => {
  const userData = {
    name: faker.name.firstName(),
    email: faker.internet.email(),
    gender: "male",
    status: "active",
  };

  const res = await request
    .post("users")
    .set("Authorization", `Bearer ${TOKEN}`)
    .send(userData);
  return res.body.data.id;
};

export const createRandomUser = async () => {
  const userData = {
    name: `Bayram${randomNum}`,
    email: `bayram-${randomNum}@auer.test`,
    gender: "male",
    status: "active",
  };

  const res = await request
    .post("users")
    .set("Authorization", `Bearer ${TOKEN}`)
    .send(userData);
  return res.body.data.id;
};
