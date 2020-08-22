// TODO: add an extension page to disable and enable automatic redirects on the fly
// TODO FIREFOX SPECIFIC: Instead of making it redirect to about:blank first, turn off the listener after the first pass (wont freak out as bad)


var superbuyURL = "https://www.superbuy.com/en/page/buy?nTag=Home-search&from=search-input&url=";
var taobaoRegex = "/*\:\/\/item.taobao.*\/*/";

browser.tabs.onUpdated.addListener(function() { // runs whenever a tab gets updated
        browser.tabs.query({currentWindow: true, active: true}).then((tabs) => {
            let tab = tabs[0];
            var tabURL = tab.url
            if (tabURL.match(taobaoRegex)) {
                console.log(tabURL + ' matches redirection criteria');
                tabURL = tabURL.replaceAll(':','%3A').replaceAll('/', '%2F').replaceAll('?', '%3F').replaceAll('=', '%3D').replaceAll('&', '%26') // god this is ugly, fix me
                console.log(tabURL + ' Fixed URL')
                var redirectURL = superbuyURL + tabURL
                browser.tabs.update(null, {url:'about:blank'}); // firefox spazzes out if you dont redirect to about:blank first
                browser.tabs.update(null, {url:redirectURL});
            }
        }, console.error);
    }
);

// Superbuy: https%3A%2F%2Fitem.taobao.com%2Fitem.htm%3Fspm%3Da1z09.2.0.0.54082e8dIygLBv%26id%3D592202871150%26_u%3Dd36avgqs33f8
// Taobao: https://item.taobao.com/item.htm?spm=a1z09.2.0.0.54082e8dIygLBv&id=592202871150&_u=d36avgqs33f8
