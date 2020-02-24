[CLOWD-API](https://reactjs.org/) 
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/facebook/react/blob/master/LICENSE) 
[![npm version](https://img.shields.io/npm/v/react.svg?style=flat)](https://www.npmjs.com/package/react)
==========
Developed with NodeJS Express Framework
--------------
#Function & Roll
1. Basic API
2. 






access는 짧고, refresh는 길게
refresh는 db 확인해서
go 서버에서는 access 토큰의 유효성만 확인해서 부하를 줄이고(DB access X)
node 서버에서는 refresh 토큰의 유효성 뿐만 아니라 유저의 valid까지 check

1. 실제 존재 유저인가
2. User DB - Clowder / Clowdee DB 
		clowdee가 clowder api요청 불가, 역도 불가 malformed request 차단