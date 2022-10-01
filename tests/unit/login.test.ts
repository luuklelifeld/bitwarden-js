import assert = require("assert")
import { Bitwarden } from "../../src"

describe('Login', () => {
    describe("using email", () => {
        it('should set session token when logging in', async () => {
            const bitwarden = new Bitwarden()
            await bitwarden.login(process.env.BW_EMAIL, process.env.BW_PASSWORD, process.env.BW_CLIENT_SECRET)
            
            assert.ok(bitwarden.sessionToken)
        })

        it('should fail with invalid email', async () => {
            const bitwarden = new Bitwarden()
            let error: Error | undefined

            try {
                await bitwarden.login('foo@bar.com', process.env.BW_PASSWORD, process.env.BW_CLIENT_SECRET)
            } catch (e) {
                error = e
            }

            assert.equal(error?.message, "Bitwarden login failed")
        })

        it('should fail with invalid password', async () => {
            const bitwarden = new Bitwarden()
            let error: Error | undefined

            try {
                await bitwarden.login(process.env.BW_EMAIL, "foobar", process.env.BW_CLIENT_SECRET)
            } catch (e) {
                error = e
            }

            assert.equal(error?.message, "Bitwarden login failed")
        })

        it('should fail when using local installation', async () => {
            const bitwarden = new Bitwarden({useLocalBitwarden: true, sessionToken: "foobar"})
            let error: Error | undefined

            try {
                await bitwarden.login(process.env.BW_EMAIL, process.env.BW_PASSWORD, process.env.BW_CLIENT_SECRET)
            } catch (e) {
                error = e
            }

            assert.equal(error?.message, "Unable to login, using local bitwarden installation")
        })
    })
})