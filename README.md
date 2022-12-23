The express portfolio is the subsystem of the personal portfolio publishing & management system. 
It provide rest API for the display subsystem and management subsystem. It is based on Node js with 
1. express framework, it provides the routing feartures
2. cors lib, it support the cross domain access feature for the API
3. jsonwebtoken lib, it provide the JWT 
4. mongoose lib, help to build schema mapping for mongoDb
5. dotenv lib, help to define the system parameter in the .evn file
6. multer lib, help to saved the uploaded files from the browser
7. nodemailer lib, help to send the mail
8. validator lib, help to do the data validation
9. express-async-errors lib, help to process the errors globally
10.mongoDB

Install guide:
1. clone the project.
2. npm install
3. in index.js ,change the mongoDB url to connect yours
4. add .evn file to the project root folder and give the password of your mongoDB
   MONGODB_PWD = ${your password}
