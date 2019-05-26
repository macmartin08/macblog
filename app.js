const express = require('express');

const app = express();

app.get(`/`,(request,response)=>{
	response.send(`welcome to our very plane site`);
});

app.get(`/about`,(request,response)=>{
	response.send(`its a cold dark rainy day in pizzaville`);
});

app.listen(4000,()=> console.log('Listening on port 4000'));