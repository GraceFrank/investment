/* eslint-disable no-undef */
import request from "supertest";
import server from "../src/server";
import connectDB from "../src/Db";
import UserModel from "../src/models/UserModel";

const REGISTER_API_PATH = "/api/v1/auth/register";
 
beforeAll(async()=>{
  await connectDB();
})

afterEach (ast)

describe("POST  /auth/register", () => {
 
  test("That User can not register with already registered email", async () => {
     try {
    const userDetails = {
      email: "john@test.com",
      phone: "08137038977",
      password: "someRandomPassword$",
      first_name: "John",
      last_name: "test",
    };
    const existingUser = await UserModel.create(userDetails);
   
      const resp = await request(server).post(REGISTER_API_PATH).send({ email: "user" });

      expect(resp.status).toBe(400);
    } catch (err) {
      console.log("ERRORRRRRRR", err);
    }
  });
  // test that validation middleware is called with signup schema
  //test that if email has been used  a 400 is returned
  //test that if phone has been used a 400 is returned
  //test that user is not created
  //test that user is created
  //test that send on successful registration email is sent with token

 
});
