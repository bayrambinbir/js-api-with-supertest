import supertest from "supertest";
import qa from "./config/qa";
const request = supertest(qa.baseUrl);

import { expect } from "chai";

const TOKEN =
  "9e160e35970f238e588930dfbddf1e32ef91cb90b59f164b6e98de6c3d03dc9d";
  const randomNum = Math.floor(Math.random() * 9999);

describe.skip("Users", () => {
  // it("GET /users", (done) => {
  //   request.get(`/users?access-token=${TOKEN}`).end((err, res) => {
  //     expect(res.body.data).to.not.be.empty;
  //     done();
  //   });
  // });
  it("GET /users", async () => {
    const res = await request.get(`/users?access-token=${TOKEN}`);
    expect(res.body.data).to.not.be.empty;
  });

  it("GET /users/:id", () => {
    return request.get(`/users/5193088?access-token=${TOKEN}`).then((res) => {
      expect(res.body.data.id).to.be.eq(5193088);
    });
  });
  //page=2&&gender=male&&status=active
  it("GET /users with query params", () => {
    const url = `/users?access-token=${TOKEN}&&page=5&&gender=female&&status=active`;
    return request.get(url).then((res) => {
      expect(res.body.data).to.not.be.empty;
      res.body.data.forEach((data) => {
        expect(data.gender).to.eq("female");
        expect(data.status).to.eq("active");
      });
    });
  });

  it("POST /users/", () => {
    const randomNum = Math.floor(Math.random() * 9999);
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
      });
  });

  it("PUT /users/:id", () => {
    const data = {
      name: `BayramPUT-${randomNum}`,
      status: "active",
    };
    return request
      .put("users/5194298")
      .set("Authorization", `Bearer ${TOKEN}`)
      .send(data)
      .then((res) => {
        console.log(res.body);
        expect(res.body.data).to.deep.include(data);
        // to.deep.include(data) will verify everything inside the data
      });
  });

  it("DELETE /users/:id", () => {
    return request
      .delete("users/5194293")
      .set("Authorization", `Bearer ${TOKEN}`)
      .then((res) => {
        expect(res.body.data).to.be.eq(null)
      });
  });
});
