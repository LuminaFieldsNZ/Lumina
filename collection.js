
var voyagerBlob = document.getElementById('voyagerBlob');
voyagerBlob.onload = function() {
    voyagerBlob.contentWindow.postMessage({ color: 0x2ebedb, speed: 35, spikes: 0.7, processing: 0.9 }, '*');
};

var captainBlob = document.getElementById('captainBlob');
captainBlob.onload = function() {
    captainBlob.contentWindow.postMessage({ color: 0x42eba1, speed: 50, spikes: 0.2, processing: 0.2 }, '*');
};

var merchantBlob = document.getElementById('merchantBlob');
merchantBlob.onload = function() {
    merchantBlob.contentWindow.postMessage({ color: 0xbdba5e, speed: 50, spikes: 1.2, processing: 0.5 }, '*');
};

var shipwrightBlob = document.getElementById('shipwrightBlob');
shipwrightBlob.onload = function() {
    shipwrightBlob.contentWindow.postMessage({ color: 0x694e2f, speed: 20, spikes: 1.5, processing: 0.7 }, '*');
};

var fishermanBlob = document.getElementById('fishermanBlob');
fishermanBlob.onload = function() {
    fishermanBlob.contentWindow.postMessage({ color: 0x524e4a, speed: 27, spikes: 0.7, processing: 0.6 }, '*');
};

var smugglerBlob = document.getElementById('smugglerBlob');
smugglerBlob.onload = function() {
    smugglerBlob.contentWindow.postMessage({ color: 0x31ebc6, speed: 60, spikes: 1.4, processing: 1.7 }, '*');
};

var arbiterBlob = document.getElementById('arbiterBlob');
arbiterBlob.onload = function() {
    arbiterBlob.contentWindow.postMessage({ color: 0xe8d899, speed: 20, spikes: 0.5, processing: 1 }, '*');
};

var sailorBlob = document.getElementById('sailorBlob');
sailorBlob.onload = function() {
    sailorBlob.contentWindow.postMessage({ color: 0xdbd7c8, speed: 70, spikes: 0.5, processing: 1.2 }, '*');
};

var explorerBlob = document.getElementById('explorerBlob');
explorerBlob.onload = function() {
    explorerBlob.contentWindow.postMessage({ color: 0xe87c66, speed: 50, spikes: 2, processing: 0.8 }, '*');
};
