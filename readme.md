### 아래처럼 하려고 했으나 일단은 하나의 date로 할 생각이라 여기서 분기
- 데이터를 화면에 그리는 것에서 일단 문제가 생김

### 테스트 데이터 형식 변경 필요
- 일정을 검색하는 것도 일치 검색이 아닌 범위 검색으로 변경 해야함
```javascript
// 기존
{
    id: 0,
    name: '테스트 일정',
    date: new Date(), 
}
// 신규
{
    id: 0,
    title: '테스트 일정'
    content: '테스트 일정 상세'
    start_date: '일정 시작일'
    end_date: '일정 종료일'
    created_at: '일정 생성일'
}
```
<br/>

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