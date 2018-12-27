const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime
}

function getLocation(callback) {
  wx.getLocation({
    success: res => {
      callback(true, res.latitude, res.longitude);
    },
    fail: error => {
      callback(false);
    }
  })
}

function getWeatherByLocation(latitude, longitude, callback) {
  var apiKey = "你自己的Key";
  var apiURL = "https://api.darksky.net/forecast/" + apiKey + "/" + latitude + "," + longitude + "?lang=zh&units=ca";
  wx.request({
    url: apiURL,
    success: res => {
      var weatherData = parseWeatherData(res.data);
      getCityName(latitude, longitude, function (city) {
        weatherData.city = city;
        callback(weatherData);
      });
    }
  });

}

//http://swiftcafe.io/2016/10/03/wx-weather-app/