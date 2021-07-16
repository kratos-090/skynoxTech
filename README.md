# skynoxTech
Postaman Collection link:https://1drv.ms/u/s!ApnOW45peitvhds56yoS7VMyzIYuxg?e=4NsXCY<br>
-Add the following envirnment variable for testing :
<ul>
<li>url:https://github.com/kratos-090/skynoxTech
<li>authToken // don't added the value script has been used for storing this
</ul>
-You have to be authenticated to use the requests just login with credentials or just create a new user<br>
-Just create user then it will be signed automatically and you can send all other request, as the<br> authentication web token will be stored the in the collection in authToken environment variable and you don't need add the token again and again<br>

<h1>Libries used</h1><br>
-jwt webtokens for authentication<br>
-bcrypt for hashing the password<br>
-validatore for validating the email<br>

<h1>Middleware</h1>
-Auth middleware for the authentication<br>
-login method in user model<br>
-overided the .toJSON() method in user model<br>
-generateAuthentcationToken() in user model<br>