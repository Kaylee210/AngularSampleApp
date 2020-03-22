const express = require('express')
const mongoose = require('mongoose');
const config = require('./config');
const FakeDb = require('./fake-db');
const bodyParser = require('body-parser')

const productRoutes = require('./routes/products');
const userRoutes = require('./routes/users');
const path = require("path");

mongoose.connect(config.DB_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(
    () => {
        if(process.env.NODE_ENV !== 'production'){
            const fakeDb = new FakeDb()
            //fakeDb.initDb();
        }
    }
)

const app = express()
app.use(bodyParser.json())

app.use('/api/v1/products', productRoutes);
app.use('/api/v1/users', userRoutes);

if(process.env.NODE_ENV === 'production'){
    const appPath = path.join(__dirname, '..', 'dist', 'angular-sample-app')
    app.use(express.static(appPath))
    app.get("*", function(req, res) {
        res.sendFile(path.resolve(appPath, 'index.html'))

    })
}
const PORT = process.env.PORT || '3001'

app.listen(PORT, function() {
    console.log('I am runnung');
})

// mongodb+srv://test:<password>@cluster0-tr9sv.mongodb.net/test?retryWrites=true&w=majority