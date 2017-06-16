$(function () {
    $("#launch").click(function (event) {
    	var url = $("#protocol").attr("value") +"://"+"myapp.net";
    	if($.browser.mozilla){
            launchMozilla(url);
        }else if($.browser.chrome){
            launchChrome(url);
        }else if($.browser.msie){
            launchIE(url);
        }
    });
});

var launchChrome = function(url) {
    	window.location.href = url;
        window.protocolCheck(url, downloadFileChrome);
        event.preventDefault ? event.preventDefault() : event.returnValue = false;
};

var launchIE = function(url) {
	var aLink = $('#hiddenLink')[0];

    isSupported = false;
    aLink.href = url;

    if(navigator.appName=="Microsoft Internet Explorer"
            && aLink.protocolLong=="Unknown Protocol"){
        downloadFile();
        return;
    }

    var myWindow = window.open('','','width=0,height=0');
    myWindow.document.write("<iframe src='"+ url + "' style='display:none;'></iframe>");
    setTimeout(function(){
        try{
            myWindow.location.href;
            isSupported = true;
        }catch(e){
          isSupported = false;
        }

        if(isSupported){
            myWindow.setTimeout('window.close()', 100);
        }else{
        	downloadFile();
            myWindow.close();
        }
    }, 100);
};

function launchMozilla(url){

    var iFrame = $('#hiddenIframe')[0];

    try{
        iFrame.contentWindow.location.href = url;
    }catch(e){
        if (e.name == "NS_ERROR_UNKNOWN_PROTOCOL"){
            downloadFile();
        }
    }
};

var downloadFileChrome = function() {
	console.log("protocol not recognized");
    window.location = "https://drive.google.com/uc?export=download&id=0B-qqgX3VcoceXzlFSVNMV3R4WTg";
};

var downloadFile = function() {
	console.log("protocol not recognized");
	fileUrl = "https://drive.google.com/uc?export=download&id=0B-qqgX3VcoceXzlFSVNMV3R4WTg";
	 var a = document.createElement('a');
	 a.setAttribute('href', fileUrl);
	 a.setAttribute('target', '_blank');
	 a.style.display = 'none';
	 document.body.appendChild(a);
	 a.click();
	 document.body.removeChild(a);
};