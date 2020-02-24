[CLOWD-API](https://team836.github.io/) 
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/facebook/react/blob/master/LICENSE) 
==============

Developed with TypeScript & Express Framework
--------------
This server's main role is managing user data and user authentication.
We are using JWT authentication for secured API and MySQL Database for the user DB.
 
## Functions
>1. Basic API
>2. User management
>3. Token management
>4. User Authentication

## Basic API
Providing user Information to Front-End side
> 1. Offer user Information to Front-End

## User management
The User Database has 3 tables (User table, Clowder table, Clowdee table)

Clowder table and Clowdee table have dependencies to User table. Because of this User table is always handled with either Clowder table or Clowdee table.  
As we seperated user tables, it can easily block the malformed request access like when Clowder user request the API to Clowdee API and vice versa.
This makes managing users easy.

> 1. User Sign Up
> 2. User Sign In / Out
> 3. Manage User DB between Clowder & Clowdee

## User Authentication
Basically we are using Google Oauth2.0 API.
Our system is multi-server using GO and Express servers. We made the GO server for 
fast file processing by maximizing the parellelism. Therefore GO server's authentication should also be fast.  
For this, in the GO server, we didn't check the token's user payload. We are just checking whether this token is valid or not.
Doing this speeds up every authentication request by not accessing the database server. But it can be dangerous.  
We overcame this problem by: limiting the token's expiry time to be very short, refreshing it many times, and checking the user is valid when refreshing the token in the API server, not the GO server.

> 1. Use Google Oauth2.0
> 2. Check the user's validity in the API server
> 3. Don't check the user's valididity when accessing the GO server

## Token management
Our server is using Google Oauth2.0 API and token authentication. We get user information from 
Google and make accessToken and refreshToken. As we mentioned, we limit the access token's expiry time to be very short. This forces the user to refresh the token many times.
> 1. Provide accessToken and refreshToken when sign in
> 2. Refreshing the token when accessToken is expired.

