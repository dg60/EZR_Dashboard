var mongoose = require('mongoose');


//Data from heatarea
var _heatarea = {
        HEATAREA_NAME: String,
        T_ACTUAL: String,
        T_TARGET: String,
        ACTOR: String
};

var _heatarea0 = Object.create(_heatarea);
var _heatarea1 = Object.create(_heatarea);
var _heatarea2 = Object.create(_heatarea);
var _heatarea3 = Object.create(_heatarea);
var _heatarea4 = Object.create(_heatarea);
var _heatarea5 = Object.create(_heatarea);
var _heatarea6 = Object.create(_heatarea);
var _heatarea7 = Object.create(_heatarea);


module.exports = mongoose.model('Temperature', {
        id: String,
        DATETIME: Date,
        created: Date,
        offset: Number,
        heatarea: [_heatarea0, _heatarea1, _heatarea2, _heatarea3, _heatarea4, _heatarea5, _heatarea6, _heatarea7]
}, 'Temperatures');