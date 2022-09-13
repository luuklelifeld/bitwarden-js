import assert = require("assert")
import { Bitwarden } from "../src"

describe('Login', () => {
    describe("using email", () => {
        it('should set session token when logging in', async () => {
            const bitwarden = new Bitwarden()
            await bitwarden.loginEmail(process.env.BW_EMAIL || '', process.env.BW_PASSWORD || '', process.env.BW_CLIENT_SECRET || '')
            
            console.log(bitwarden.sessionToken)
            assert.ok(bitwarden.sessionToken)
        })
    })

    describe("using API key", () => {
        it('should set session token when logging in', async () => {
            const bitwarden = new Bitwarden()
            await bitwarden.loginAPI(process.env.BW_CLIENT_ID || '', process.env.BW_CLIENT_SECRET || '')
            
            console.log(bitwarden.sessionToken)
            assert.ok(bitwarden.sessionToken)
        })
    })
})