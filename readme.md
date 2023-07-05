### docker-compose.yml
```
version: 3
services:
  react:
    build:
      context: ./frontend
      dockerfile: dockerfile.dev
    ports:
      - "3000:4000"
    volumes:
      - /usr/src/app/node_modules // 참조 X
      - ./:usr/src/app
    stdin_open: true
```

- version: 도커 컴포즈의 버전
- services: 이곳에 실행하려는 컨테이너들을 정의
    - react: 컨테이너 이름
    - build: 현 디렉토리에 있는 Dockerfile 사용
        - context: 도커 이미지를 구성하기 위한 파일과 폴더들이 있는 위치
        - dockerfile: 도커 파일 어떤 것으로 지정
    - ports: 포트 맵핑 [로컬 포트] : [컨테이너 포트]
    - volumes: 로컬 머신에 있는 파일들 맵핑
    - stdin_open: 리액트 앱을 종료할때 필요  