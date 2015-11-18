var config = require('./config')

module.exports = {

    buildTimeSeriesUrl: function (options) {
        var url = config.FITBIT_BASE_API_URL + '/1/user/{userId}/{resourcePath}/date/{baseDate}/{duration}.json';

        options = assign({
            userId: '-',
            resourcePath: 'activities/steps',
            baseDate: 'today',
            duration: '7d'
        }, options);

        url = url.replace('(userId)', options.userId)
        .replace('(resourcePath)', options.resourcePath)
        .replace('(baseDate)', options.baseDate)
        .replace('(duration)', options.endDate ? options.endDate : options.duration) ;

        return url;
    }

}
