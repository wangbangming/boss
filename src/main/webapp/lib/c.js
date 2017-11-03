(function(){
    var logDisabled = typeof consoleLogDisabled != 'undefined' && consoleLogDisabled;
    var NO_OP = function(){};
    var c = window.c = typeof console != 'undefined' && console;
    c = c || { log:NO_OP }; if(logDisabled) { c.log = NO_OP; }
    if ( typeof define === "function" && define.amd ) {
        define( "c", [], function() {
            return c;
        });
    }
})();
