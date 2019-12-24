const express = require('express');
const app = express();
const mongoDBConnect = require('./config/db');

// let mongoose = require('mongoose')
mongoDBConnect();
// mongoose.connect('mongodb+srv://prabutonline:ZyRhd1v7ZOwkov8N@mydevconnector-wngif.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true,useUnifiedTopology: true})
//     .then(()=>console.log("DB server connect"))
//     .catch(e => console.log("DB error", e));

//Init Middleware
app.use(express.json({ extended: false }))

app.get('/', (req, res) => res.send('Api running!'));

//define routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/posts', require('./routes/api/posts'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
