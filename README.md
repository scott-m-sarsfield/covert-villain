# Covert \[Villain\]
Themeable mobile web implementation of the Secret Hitler board game.

---

### Contributing

#### Everyday Flow
There are three services that I usually run concurrently during development:

```
# * Server *
# packages/server
yarn run dev

# * CRA Frontend *
# packages/frontend
yarn run start

# * Storybook *
# packages/frontend
yarn run storybook
```

#### Testing
Tests are handled independently in each package with `jest`

```
# packages/server
yarn run jest
```

#### Storybook Updates
When making an update to storybook, you must run
```
yarn run build-storybook
```
and commit the `.zip` file in order for the storybook on production to get updated.

#### Environment Versions
```
node --version
v12.18.3

psql --version
psql (PostgreSQL) 12.5
```

#### Installing / Initializing Postgres

Install via `homebrew`

```
brew install postgresql@12
```

Make sure postgres is in your PATH

```sh
# .zshrc
export PATH="/usr/local/opt/postgresql@12/bin:$PATH"
```

Initialize the database

```
initdb -D /usr/local/var/postgres
```

Start the Postgres service

```
brew services start postgresql@12
```

Add the `postgres` user
```
createuser -s postgres
```

Install yarn packages

```
# in covert-villain
yarn
```

Create and reset database from `server` package

```
# covert-villain/packages/server
yarn run init
yarn run init-test-db
yarn run migrate:reset
```

And you're set.
