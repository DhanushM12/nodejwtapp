const express = require('express');
const jwt = require('jsonwebtoken');
const port= 8000;
const app = express();

app.get('/api', (req, res) => {
    res.json({
        message: "Welcome Everyone!"
    })
})

// sign up a user
app.post('/api/login', (req, res) => {
    const user = {
        id: 1,
        username: 'junebatch',
        email: 'junebatch@cn.com'
    }

    jwt.sign({user}, 'secretkey', {expiresIn: '60s'}, (err, token) => {
        res.json({
            token
        })
    })
})

// verify the user
app.post('/api/verify', takeToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (err, data) => {
        if(err){
            res.sendStatus(403);
        }
        else{
            res.json({
                message: 'User access granted',
                data
            })
        }
    })
})


// format of token 
// Authorization: Bearer Token
function takeToken(req, res, next){
    const bearerHeader = req.headers['authorization'];
    if(typeof bearerHeader !== undefined){
        const bearer = bearerHeader.split(' ');
        const bearearToken = bearer[1];
        req.token = bearearToken;
        next();
    }
    else{
        res.sendStatus(403);
    }
}


app.listen(port, function(err){
    if(err){
        console.log(`Error in running the server : ${err}`);
    }
    console.log(`Server is running on port : ${port}`)
})