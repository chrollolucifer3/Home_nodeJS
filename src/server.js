const express = require('express');
const app = express();
const port = 3000;
const route = require('./routes');

// Kết nối database
const db = require('./configs/index');
db.connect();

//xử lý dữ liệu gửi lên
app.use(express.urlencoded({ extended: false }));
app.use(express.json()); //đặt dữ liệu gửi lên vào body


const cookieParser = require('cookie-parser');
app.use(cookieParser());

//
const tokenParser = require('./middlewares/tokenParser');
app.use(tokenParser);

//sử dụng đọc các tệp tĩnh
const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'pug');
app.set('views', './src/views');

route(app);

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});