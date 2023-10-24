const LOG_LEVELS = {
    quiet: 0,
    debug: 1,
    log: 2,
    warn: 4,
    error: 8,
    all: 15
}

var _name = '';
var _logLevel = LOG_LEVELS.quiet;

// If logger is not registered, no logs are printed
const register = (config) => {
    _name = '[' + (config.serviceName ?? '???') + ']';
    _logLevel = config.logLevel | LOG_LEVELS.all;
};

const debug = (...msg) => {
    if (_logLevel < LOG_LEVELS.debug)
        return;
    console.debug(_name, "DEBUG  :", ...msg);
};

const log = (...msg) => {
    if (_logLevel < LOG_LEVELS.log)
        return;
    console.log(_name, "INFO   :", ...msg);
};

const logSuccess = (...msg) => {
    if (_logLevel < LOG_LEVELS.log)
        return;
    console.log(_name, "SUCCESS:", ...msg);
};

const logFailure = (...msg) => {
    if (_logLevel < LOG_LEVELS.log)
        return;
    console.log(_name, "FAILURE:", ...msg);
};

const warn = (...msg) => {
    if (_logLevel < LOG_LEVELS.warn)
        return;
    console.warn(_name, "WARNING:", ...msg);
};

const error = (...msg) => {
    if (_logLevel < LOG_LEVELS.error)
        return;
    console.error(_name, "ERROR  :", ...msg);
};

module.exports = {
    LOG_LEVELS,
    register,
    debug, 
    log, logSuccess, logFailure,
    warn, error
};