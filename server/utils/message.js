var genarateMessage = (from, text) => {
    return {
        from,
         text, 
         createdAt: new Date().getTime()};
};

var genarateLocationsMessage = (from, latitude, longitude) => {
    return {
        from,
         ulr: `https://www.google.com/maps?q=${latitude},${longitude}`,
          createdAt: new Date().getTime()};
};

module.exports = {
    genarateMessage,genarateLocationsMessage
};
