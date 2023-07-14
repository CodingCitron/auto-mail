### 데이터베이스
- postgres  
<br/>

### 백엔드 
- express + sequelize
- node schedule  
<br/>

### 프론트
- react + zustand

<br/>
<hr/><br/>

### 컨테이너 생성
```
docker-compose up --build --no-cache
```
- build: 
- no-cache: 캐시 
<br/><br/>


### 컨테이너 정지
```
docker-compose down -v
```
- v: Compose 정의 파일의 데이터 볼륨을 삭제 
- 수정 시 패키지의 변동이 일어났으면 -v 옵션을 사용하세요.
<br/><br/>

### 이름없는 이미지 제거
- docker rmi $(docker images -f "dangling=true" -q)
<br/><br/>

### 날짜를 선택하는 메뉴
- 드랍다운 메뉴로 선택, 셀렉트 박스는 스타일이 자유롭지 않음
<br/><br/>
### 도커 캐시 삭제 명령어
- docker system prune -a
<br/><br/>