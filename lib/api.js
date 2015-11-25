var config = require('./config')
var assign = require('object-assign');

module.exports = {

    buildTimeSeriesUrl: function (options) {
        var url = '/(resourcePath)/date/(baseDate)/(period).json';

        options = assign({
            resourcePath: 'activities/steps',
            baseDate: 'today',
            period: '7d'
        }, options);

        url = url.replace('(resourcePath)', options.resourcePath)
        .replace('(baseDate)', options.baseDate)
        .replace('(period)', options.endDate ? options.endDate : options.period) ;

        return url;
    }

}
