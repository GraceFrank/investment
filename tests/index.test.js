import request from "supertest"
import server from "../src/server"

describe("GET /", ()=>{
    test("Endpoint returns a message", async ()=>{
        const response = await request(server).get("/");
        expect(response.body.message).toBeTruthy()
        expect(response.status).toBe(200)
    })
})