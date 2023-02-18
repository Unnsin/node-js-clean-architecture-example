# CLean Architecture Example On Node.js

### Get Start

```
git clone https://github.com/Unnsin/node-js-clean-architecture-example
cd node-js-clean-architecture-example
npm install || yarn install
npm run start:dev || yarn start:dev

Go to http://localhost:3000/api
```

### Folder structure

- Every feature located in his own folder
- Every Feature folder contain 3 folder split by layer: Domain, Infrastructure, Presentation

#### Domain Folder contain:

- entity file
- service for work with entity

#### Infrastructure Folder contain:

- repository
- db schema
- mapper

#### Presentation Folder contain:

- controller
- dto for user

### Dependencies

- Domain Layer are depend from nothing.
- Infrastructure Layer depend from Domain Layer.
- Presentation Layer depend from Domain Layer and Infrastructure Layer
