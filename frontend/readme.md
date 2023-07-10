### DockerFile
```
FROM node:18.12.1

RUN cd home \
    && mkdir /usr/src/app
RUN chmod -R 777 /usr/src/app

WORKDIR /usr/src/app
COPY package.json ./
RUN npm install
COPY ./ ./
CMD ["npm", "run", "dev"]
```

- 빌드: docker build -f Dockerfile.dev ./ -t sangmin/auto-mail-front 
- 실행: docker run -it -p 5173:4000 --rm sangmin/auto-mail-front
- volume 사용: docker run -it -p 3000:4000 -v /app/node_modules -v $(pwd):/app sangmin/auto-mail-front

volume 에러
Error: EACCES: permission denied, mkdir '/usr/src/app/node_modules/.vite/deps_temp_10323547'

### 컨텍스트 API 리렌더링 이슈
- https://jungpaeng.tistory.com/58