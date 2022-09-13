import { spawn } from "child_process"

export class Bitwarden {
    sessionToken: string

    async loginEmail(email: string, password: string, clientSecret: string) {
        const login = spawn('npx', ['bw', 'login', '--raw'], {
            env: process.env
        })
        
        setTimeout(() => {
            login.stdin.write(email)
        }, 1000)

        setTimeout(() => {
            login.stdin.write(password)
        }, 2000)

        setTimeout(() => {
            login.stdin.write(clientSecret)
        }, 3000)

        login.stdout.on('data', (data) => {
            this.sessionToken = data
        })

        await new Promise((resolve) => {
            login.on('exit', resolve);
        });
    }

    async loginAPI(clientId: string, clientSecret: string) {
        const login = spawn('npx', ['bw', 'login', '--apikey', '--raw'])

        // await new Promise(resolve => setTimeout(resolve, 1000));
        // login.send(clientId)
        // await new Promise(resolve => setTimeout(resolve, 1000));
        // login.send(clientSecret)

        const exitCode = await new Promise((resolve) => {
            login.on('close', resolve);
        });
        
    }
}