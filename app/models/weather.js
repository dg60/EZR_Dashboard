var mongoose = require('mongoose');


module.exports = mongoose.model('Weather', {
        id: String,
        created: Date,
        offset: Number,
        temp: Number,
        pressure: Number,
        humidity: Number,
        wind_speed: Number,
        wind_deg: Number,
        weather_main : String,
        weather_description: String
}, 'WeatherData');