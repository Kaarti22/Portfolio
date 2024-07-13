<h1>ViewPoint - An admin managable Portfolio application</h1>
<h3>Skills used: </h3>
<ul>
  <li>React.JS</li>
  <li>Node.JS</li>
  <li>Express.JS</li>
  <li>MongoDB</li>
  <li>Redux Toolkit</li>
  <li>Tailwind CSS</li>
  <li>ShadCN UI</li>
</ul>
<h3>Key features of this project: </h3>
<ul>
  <li>Two distinct frontends for the portfolio and admin dashboard</li>
  <li>Add/update/delete projects, skills, applications, personal details</li>
  <li>Manage messages - from other users</li>
  <li>Edit your portfolio styles through admin</li>
</ul>
<h3>Steps to run this project: </h3>
<p>Create an empty repository and run the following commands in the terminal: </p>

```bash
  git clone https://github.com/Kaarti22/Portfolio.git
  cd Portfolio
  npm i
```
<p>Also, create a config folder in the backend folder of this project. <br/> Now, create a file named config.env in it and add your environment variables. <br/> The following variables must be added: </p>

```bash
  PORT = 4000
  
  MONGO_URI= 
  
  PORTFOLIO_URL = http://localhost:5174
  
  DASHBOARD_URL = http://localhost:5173
  
  CLOUDINARY_API_KEY = 
  
  CLOUDINARY_CLOUD_NAME = 
  
  CLOUDINARY_API_SECRET = 
  
  JWT_SECRET_KEY = 
  
  JWT_EXPIRES = 10d
  
  COOKIE_EXPIRES = 10


```

<p>Finally to run this project, enter the following command in both frontend and the dashboard: </p>

```bash
  npm run dev
```

