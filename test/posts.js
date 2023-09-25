require("dotenv").config();

const faker = require("faker");

import request from "./config/common";
import {
  createRandomUser,
  createRandomUserWithFaker,
} from "./helper/user-helper";

import { expect } from "chai";
import { before } from "mocha";

const TOKEN = process.env.USER_TOKEN;

const randomNum = Math.floor(Math.random() * 999);

describe("User Posts", () => {
  let postId, userId;

  before(async () => {
    // userId = await createRandomUser();
    userId = await createRandomUserWithFaker();
  });

  it.only("/posts", async () => {
    const data = {
      user_id: userId,
      title: faker.lorem.sentence(),
      body: faker.lorem.paragraph(),
    };
    const postRes = await request
      .post("posts")
      .set("Authorization", `Bearer ${TOKEN}`)
      .send(data);
    expect(postRes.body.data).to.deep.include(data);
    postId = postRes.body.data.id;
  });

  it("GET /posts/:id", async () => {
    const res = await request
      .get(`/posts/${postId}`)
      .set("Authorization", `Bearer ${TOKEN}`);
    expect(res.status).eq(200);
  });

  describe("Negative Tests", () => {
    it("401 Authentication Failed test", async () => {
      const data = {
        user_id: userId,
        title: `title-${randomNum}`,
        body: `body-${randomNum}`,
      };
      //below I am not setting the Authorization to see 401
      const postResponse = await request.post("posts").send(data);
      console.log(postResponse);
      expect(postResponse.body.code).eq(401);
      expect(postResponse.body.data.message).eq("Authentication failed");
    });

    it("422 Validation Failed test", async () => {
      const data = {
        user_id: userId,
        title: `title-${randomNum}`,
        // body: `body-${randomNum}`,
      };
      //below I am not sending the body data to see 422
      const postResponse = await request
        .post("posts")
        .set("Authorization", `Bearer ${TOKEN}`)
        .send(data);
      console.log(postResponse.body);
      expect(postResponse.body.code).eq(422);
      expect(postResponse.body.data[0].field).eq("body");
      expect(postResponse.body.data[0].message).eq("can't be blank");
    });

    it("404 Resource not found message for invalid user id", async () => {
      const getResponse = await request.get("users/76666");
      expect(getResponse.body.code).eq(404);
      expect(getResponse.body.data.message).eq("Resource not found");
    });
  });
});
