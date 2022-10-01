import assert = require("assert")
import { Bitwarden } from "../../src"

describe('Bitwarden class', () => {
    describe('Use local installation', () => {
        it('Should set class values', () => {
            let bitwarden = new Bitwarden({useLocalBitwarden: true, sessionToken: "foobar"})
            assert.equal(bitwarden.useLocalBitwarden, true)
            assert.equal(bitwarden.sessionToken, "foobar")
        })

        it('Should throw an error when not providing a session token', () => {
            assert.throws(() => {
                new Bitwarden({useLocalBitwarden: true})                
            }, Error("Please provide a sessionToken when using a local bitwarden installation"))
        })
    })
})