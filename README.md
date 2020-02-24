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
As we seperate user tables, It can easily block the malformed request access like when clowder user request the API to clowdee API and vice versa 
And also It can make managing user easily.

> 1. User Sign Up
> 2. User Sign In / Out
> 3. Manage User DB between clowder & clowdee

## User Authentication
Basically we use Google Oauth2.0 API.
Our system has multi-server which is GO server and Express server. We make GO server for 
fast file processing by maximize the parellism. Therefore GO server's authentication should be 
fast either.  
For this, in the GO server, we didn't check the token's user payload. Just check whether this token is valid or not
It speed up the every request's authentication by not access to database server. But It can be dangerous.  
We overcome this problem by limit the token's expiry time very short. and refresh it many times, and check the user's valid when 
refresh the token in the API server, not GO server.

> 1. Use Google Oauth2.0
> 2. Check the user's validity in the API server
> 3. Don't check the user's valid when access to GO server

## Token management
Our server is using Google Oauth2.0 API and token authentication. We get user Information from the 
Google and make accessToken and refreshToken. As we mentioned, It limit the access token's expiry time very short and It force to user should refresh the token many time.
> 1. Provide accessToken and refreshToken when sign in
> 2. Refreshing the token when accessToken is expired.

