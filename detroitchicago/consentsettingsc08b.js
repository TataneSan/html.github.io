var ezConsentCategories = {
    preferences : false,
    statistics : false,
    marketing : false
};

var __ezconsent = (function() {
    ezConsentSettings = function(consentCategories) {
        preferences = consentCategories.preferences === true ? 1 : 0;
        statistics = consentCategories.statistics === true ? 1 : 0;
        marketing = consentCategories.marketing === true ? 1 : 0;

        var queryParams = "-1=" + 0;
        queryParams += "|1=" + 1;
        queryParams += "|2=" + preferences;
        queryParams += "|3=" + statistics;
        queryParams += "|4=" + marketing;

        var host = typeof ezoScriptHost !== 'undefined' ? '//' +  ezoScriptHost : "";
        var url = host + "/cmp/storeconsent?data=" + encodeURIComponent(queryParams);
        var img = new Image();
        img.onload = function () { fireEvt(document.body, 'ezCMPComplete'); };
        img.src = url;
      
        document.cookie = "ezCMPCookieConsent=" + queryParams + ";max-age=33696000;SameSite=Lax;";
    };

    function fireEvt(el, type) {
        var e;
        if ('createEvent' in document) {
            e = document.createEvent('HTMLEvents');
            e.initEvent(type, false, true);
            el.dispatchEvent(e);
        } else {
            e = document.createEventObject();
            e.eventType = type;
            el.fireEvent('on' + e.eventType, e);
        }
    }

    return {
        setEzoicConsentSettings: ezConsentSettings
    };
})();
