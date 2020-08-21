// TODO: add an extension page to disable and enable automatic redirects on the fly

var superbuyURL = "https://www.superbuy.com/en/page/buy?nTag=Home-search&from=search-input&url=";
var taobaoRegex = "/*\:\/\/item.taobao.*\/*/";

chrome.tabs.onUpdated.addListener( // runs whenever a tab gets updated
    function() {
        chrome.tabs.getSelected(null,function(tab) {
            var tabURL = tab.url
            if (tabURL.match(taobaoRegex)) {
                chrome.tabs.executeScript(null, {code: "window.stop()", allFrames: true, runAt: "document_start"}); // stop taobao page from loading, makes it so that it doesn't flash the real taobao page        
                console.log(tabURL + ' matches redirection criteria');
                tabURL = tabURL.replaceAll(':','%3A').replaceAll('/', '%2F').replaceAll('?', '%3F').replaceAll('=', '%3D').replaceAll('&', '%26') // god this is ugly, fix me
                console.log(tabURL + ' Fixed URL')
                redirectURL = superbuyURL + tabURL
                chrome.tabs.update(null, {url:redirectURL});
            }
        });
    }
);


// Superbuy: https%3A%2F%2Fitem.taobao.com%2Fitem.htm%3Fspm%3Da1z09.2.0.0.54082e8dIygLBv%26id%3D592202871150%26_u%3Dd36avgqs33f8
// Taobao: https://item.taobao.com/item.htm?spm=a1z09.2.0.0.54082e8dIygLBv&id=592202871150&_u=d36avgqs33f8