var mongoose = require('mongoose');

module.exports = mongoose.model('loadavg', {
        id          : String,
        loadavgMin  : Number,
        loadavg15min: Number,
        loadavghour : Number,
        created     : Date,
        offset      : Number
}, 'loadavg');