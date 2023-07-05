### Docker Copy
```
FROM node:alpine
WORKDIR /usr/src/app
COPY package.json ./
RUN npm install
COPY ./ ./
CMD ["npm", "run", "dev"]

```

- 빌드: docker build -f Dockerfile.dev ./ -t sangmin/auto-mail-front 
- 실행: docker run -it -p 5173:4000 --rm sangmin/auto-mail-front

### Docker Volume
```
FROM node:alpine
WORKDIR /usr/src/app
COPY package.json ./
RUN npm install
COPY ./ ./
CMD ["npm", "run", "dev"]

```