# Bitwarden JS

Used for interfacing with the Bitwarden CLI.

## How to use

Supports both logging in to an account (takes a few seconds) or using an already logged in account on the system by passing a session token.

```
import { Bitwarden } from "bitwarden-js"

const bitwarden = new Bitwarden(myEmailAddress)
await bitwarden.login(myPassword, myApiClientSecret)

...

const accounts = bitwarden.getMany({
    collectionId: myCollectionId
})
```

```
import { Bitwarden } from "bitwarden-js"

const bitwarden = new Bitwarden(null, {
    useLocal: true
})
await bitwarden.login(myPassword, myApiClientSecret)

...

const accounts = bitwarden.getMany({
    collectionId: myCollectionId
})
```