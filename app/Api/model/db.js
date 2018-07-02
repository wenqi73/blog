// mongodb每次要启动数据库，很麻烦，改为mongoose
// mongoose表名默认是复数，为简便，表名和model名一致，且皆为复数，controller前面单数加“c_”
var mongoose = require('mongoose');
// mongoose.Promise = global.Promise;  
mongoose.connect('mongodb://localhost/blog');
module.exports = mongoose;