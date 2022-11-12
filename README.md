###Description:
- Login user with authorization using JWT token and redis cache instance
- CRUD
- maxAge session access token expiration in 60seconds
- maxAge session refresh token expiration in 1hours

###Installation

1. npm install 
2. docker-compose up -d //for running redis.
3. goto .env, change your IP address for redis local.
4. npm start

###running API

- Create User POST (Create)
http://localhost:3000/users

![alt text](https://github.com/vh4/btpn-betest/blob/btpn-test/image/createuser.jpg)

- Login User POST
http://localhost:3000/login

![alt text](https://github.com/vh4/btpn-betest/blob/btpn-test/image/loginuser.jpg)

- Get User GET (Read with Redis)
http://localhost:3000/users

![alt text](https://github.com/vh4/btpn-betest/blob/btpn-test/image/getuserbyredis.jpg)

- Get Refresh Token GET (Read with Redis)
http://localhost:3000/token

![alt text](https://github.com/vh4/btpn-betest/blob/btpn-test/image/refreshToken.jpg)

- update User PUT (Update) => /users/:id
http://localhost:3000/users/cRTfhFNQmvO94I8aNlgRF4JJ

![alt text](https://github.com/vh4/btpn-betest/blob/btpn-test/image/successupdate.jpg)


- delete User DELETE (delete) /users/:id
http://localhost:3000/users/cRTfhFNQmvO94I8aNlgRF4JJ

![alt text](https://github.com/vh4/btpn-betest/blob/btpn-test/image/delete.jpg)


- Redis cache

![alt text](https://github.com/vh4/btpn-betest/blob/btpn-test/image/redisCache.jpg)