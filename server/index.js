const express = require('express');

const authRouter = require('./routers/auth');

const app = express();

//for parsing json data in requests
app.use(express.json())

app.use('/api/auth', authRouter)

// handle errors
app.use((error, _, res, next) => {
    console.error(error);
    res.status(error.status || 500).json({ message: error.message });
    next();
});

const port = process.env.PORT || 5000
app.listen(port)

console.log(`Auth example server listening on port:${port}`)

module.exports = app;
