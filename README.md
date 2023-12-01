# React + TypeScript + Electron + SQLite3


## Getting started

This repo is intended to help build desktop apps with React + Typescript using Electron as builder and SQLite3 as local database.

## Setup Database

In order to connect a database to the application, we'll need to take a few things into consideration:

- The default path for the database is `\Users\{currentUser}\react-typescript-electron-sqlite3\`. If that path is not available, you may need to create a new folder with that name.
- The database name by default is `database.db`.
- Both path and database can be updated on `\src\forge\index.ts ln:67` where the `AppDataSource` instance is created.

```
src/forge/index.ts

66 - const dir = app.getPath('home')
67 - const AppDataSource = AppDataSourceFn(path.join(dir, 'react-typescript-electron-sqlite3', 'database.db'))
68 - AppDataSource.initialize()
```

## Structure

The project already has a fully-functional example displaying all records from `db_entity` table inside `database.db` located on the base folder of the repo. The structure of the `src` folder is the following: 

- src
    - components
        - common
        - DBEntities
        - Home
        - Layout
        - Quit
    - constants (global variables used across the application)
    - entities
    - forge
    - queries
    - routes
    - types (contains the global definitions for window object)
    - utils (simple set of date formatting)

### Components

We can find here all functional components that will be the core part of our application, from entire pages to common components. This repo provides five different folders that are:

- common (shared functionality across application)
- DBEntities (list, add and update of the DBEntities page)
- Home (simple home page with a title)
- Layout (simple layout with sidebar)
- Quit (quit app component wit modal)

### Entities

We're using [typeorm](https://typeorm.io/) to build the entities used across the application. We have one sample entity named `DBEntity` to help build as many entities as needed.

### Forge

It contains all Electron-Forge code-related. We can use this to publish APIs and connect the database. More info here: [Electron-Forge](https://www.electronforge.io/).

### Queries

Simple set of needed queries for selecting, updating or even removing data from the database. You can add as many as you please and see some examples already working on the app.

### Routes

It uses HashRouter and contains all possible paths on the application with it's corresponding components. It also has an exported `Paths` object that contains the different paths used on the sidebar.

## Scripts

- `npm run start` for development purposes.
- `npm run package` packages application for different OS. In order to package the application for Windows on Mac or viceversa, you need different tools. The easiest way is to build the app in a Mac if you need an app for arm64 or Windows for executables. You can find the resulting app in the `out` folder. E.g. `/out/DesktopAp-darwin-arm64.app` for mac.