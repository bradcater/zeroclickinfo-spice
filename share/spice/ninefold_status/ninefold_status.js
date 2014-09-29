(function (env) {
    "use strict";
    env.ddg_spice_ninefold_status = function(api_result) {
        console.log(api_result);
        
        if (!api_result) {
            return Spice.failed('ninefold_status');
        }

        Spice.add({
            id: "ninefold_status",
            name: "Status",
            data: api_result,
            meta: {
                sourceName: "ninefold",
                sourceUrl: "https://status.ninefold.com/",
            },
            templates: {
                group: 'base',
                options:{
                    content: Spice.ninefold_status.content,
                    moreAt: true
                }
            }
        });
    }

    Spice.registerHelper("NinefoldStatus_ifCond", function(string1, string2, options) {
        return ((string1 === string2) ? options.fn(this) : options.inverse(this));
    });
}(this));
