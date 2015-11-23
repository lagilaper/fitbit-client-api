var config = require('./config')
var assign = require('object-assign');

module.exports = {

    buildTimeSeriesUrl: function (options) {
        var url = config.FITBIT_BASE_API_URL + '/1/user/(userId)/(resourcePath)/date/(baseDate)/(period).json';

        options = assign({
            userId: '-',
            resourcePath: 'activities/steps',
            baseDate: 'today',
            period: '7d'
        }, options);

        url = url.replace('(userId)', options.userId)
        .replace('(resourcePath)', options.resourcePath)
        .replace('(baseDate)', options.baseDate)
        .replace('(period)', options.endDate ? options.endDate : options.period) ;

        return url;
    }

}
