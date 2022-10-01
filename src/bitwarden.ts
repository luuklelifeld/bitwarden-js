import { spawn, spawnSync } from "child_process"
import { debuffer } from "./helpers/casting"

interface BitwardenOptions {
    useLocalBitwarden?: boolean,
    sessionToken?: string
}
export class Bitwarden {
    useLocalBitwarden: boolean
    sessionToken: string

    constructor(options: BitwardenOptions = {}) {
        if (options.useLocalBitwarden && !options.sessionToken) {
            throw new Error("Please provide a sessionToken when using a local bitwarden installation")
        }
        this.useLocalBitwarden = options.useLocalBitwarden
        this.sessionToken = options.sessionToken
    }

    logout(): void {
        spawnSync('npx', ['bw', 'logout'])
        this.sessionToken = undefined
    }

    async login(email: string, password: string, clientSecret: string) {
        if (this.useLocalBitwarden) {
            throw new Error("Unable to login, using local bitwarden installation")
        }
        this.logout()

        const login = spawn('npx', ["bw", "login", "--raw", email, password])
        let sessionToken: string
    
        login.stdout.on('data', (data) => { 
            sessionToken = debuffer(data)
        })
    
        setTimeout(function() {
            login.stdin.write(`${clientSecret}\n`);
        }, 1000);
    
        login.stderr.on('data', (data) => {
            data = debuffer(data)
        })
    
        await new Promise((resolve) => {
            login.on('close', resolve)
        })
    
        if (sessionToken?.length < 3 || !sessionToken) {
            throw new Error("Bitwarden login failed")
        }

        this.sessionToken = sessionToken
    }
}