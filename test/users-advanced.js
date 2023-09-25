import request from "./config/common";

import { expect } from "chai";

const TOKEN =
  "9e160e35970f238e588930dfbddf1e32ef91cb90b59f164b6e98de6c3d03dc9d";
const randomNum = Math.floor(Math.random() * 9999);

describe("Users", () => {
  let userId;
  describe("POST tests", () => {
    it("/users/", () => {
      const data = {
        name: `Bayram${randomNum}`,
        email: `bayram-${randomNum}@auer.test`,
        gender: "male",
        status: "active",
      };
      return request
        .post("users")
        .set("Authorization", `Bearer ${TOKEN}`)
        .send(data)
        .then((res) => {
          console.log(res.body);
          expect(res.body.data).to.deep.include(data);
          // to.deep.include(data) will verify everything inside the data
          userId = res.body.data.id;
          console.log("userId: " + userId);
        });
    });
  });

  describe("GET tests", () => {
    it("/users", () => {
      return request.get(`/users?access-token=${TOKEN}`).then((res) => {
        expect(res.body.data).to.not.be.empty;
      });
    });

    it("/users/:id", () => {
      return request
        .get(`/users/${userId}?access-token=${TOKEN}`)
        .then((res) => {
          expect(res.body.data.id).to.be.eq(userId);
        });
    });
    //page=2&&gender=male&&status=active
    it("/users with query params", () => {
      const url = `/users?access-token=${TOKEN}&&page=5&&gender=female&&status=active`;
      return request.get(url).then((res) => {
        expect(res.body.data).to.not.be.empty;
        res.body.data.forEach((data) => {
          expect(data.gender).to.eq("female");
          expect(data.status).to.eq("active");
        });
      });
    });
  });

  describe("PUT tests", () => {
    it("/users/:id", () => {
      const data = {
        name: `BayramPUT-${randomNum}`,
        status: "active",
      };
      return request
        .put(`users/${userId}`)
        .set("Authorization", `Bearer ${TOKEN}`)
        .send(data)
        .then((res) => {
          console.log(res.body);
          expect(res.body.data).to.deep.include(data);
          // to.deep.include(data) will verify everything inside the data
        });
    });
  });

  describe("DELETE tests", () => {
    it("/users/:id", () => {
      return request
        .delete(`users/${userId}`)
        .set("Authorization", `Bearer ${TOKEN}`)
        .then((res) => {
          expect(res.body.data).to.be.eq(null);
        });
    });
  });
});
