[CLOWD-API](https://team836.github.io/) 
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/facebook/react/blob/master/LICENSE) 
==============

Developed with TypeScript & Express Framework
--------------
This server's main role is managing the user data and user authenticate.  
We use JWT authentication for secured API and MySQL Database for user DB
 
## Functions
>1. Basic API
>2. User management
>3. Token management
>4. User Authentication

## Basic API
Providing user Information to Front-End side
> 1. Offer user Information to Front-End

## User management
User Database has 3 tables (User table, Clowder table, Clowdee table)
Clowder table and Clowdee table have dependency to User table and always handled User table with clowder table or clowdee table together.  
이렇게 DB를 갈라놓음으로써 Clowder -> Clowdee request불가, 역도 불가 malformed한 요청 차단
또한 유저 관리 용이

> 1. User Sign Up
> 2. User Sign In / Out
> 3. Manage User DB between clowder & clowdee

## User Authentication자
Our system has multi-server which is GO server and Express server. We make GO server for 
fast file processing by maximize the parellism. Therefore GO server's authentication should be 
fast either.  
For this, 고 서버에선 유저 유효성 검사 하지 X 즉, DB검사를 하지 않음으로써 부하를 줄임 -> 빠름 but 위험하므로 
accesstoken 의 expire time을 매우 짧게 하여 Refresh token을 자주 하게 만들고, token을 refresh할 때마다 
user의 유효성을 검사
또한 Clowder는 Clowdee로 

> 1. 내일 마무리하자

## Token management
Our server is using Google Oauth2.0 API and token authentication. We get user Information from the 
Google and make accessToken and refreshToken.
> 1. Provide accessToken and refreshToken when sign in
> 2. Refreshing the token when accessToken is expired.
> 3. 

