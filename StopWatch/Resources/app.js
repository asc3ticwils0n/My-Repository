//Peter Wilson
//stopWatch program
 Titanium.UI.setBackgroundColor('#000');
var win = Titanium.UI.createWindow({
    title:"",
    backgroundColor:"#000",
    exitOnClose: true 
});
 
var view01 = Titanium.UI.createView({
    backgroundColor:"#fff"
});
 
//Center this code properly. 
var timerlabel = Titanium.UI.createLabel({
    text: "00:00:00.0",
    top: 0,
    textAlign:"center", 
    font: {
        fontSize: 45,
        fontWeight: 'normal'
    }, 
    width: 350,
 
});
 
// var hourlabel = Titanium.UI.createLabel({
    // text: 'Hours',
    // top: 55,
    // left: 60,
// });
//  
// var minlabel = Titanium.UI.createLabel({
    // text: 'Mins',
    // top: 55,
    // left: 125,
// });
//  
// var seclabel = Titanium.UI.createLabel({
    // text: 'Secs',
    // top: 55,
    // right: 105,
// });
 
var button01 = Titanium.UI.createButton({
   title: 'START',
   top: 90,
   left: 10,
   width: 100,
   height: 50 
});
 
var button02 = Titanium.UI.createButton({
    title:'RESET',
    top: 90,
    right: 10,
    width: 100,
    height: 50
});
 
var button03 = Titanium.UI.createButton({
    title:'STOP',
    top: 150,
    left: 10,
    width: 100,
    height: 50
});
 
// var button04 = Titanium.UI.createButton({
    // title:'LAP',
    // top: 150,
    // right: 10,
    // width: 100,
    // height: 50
// });

var stopWatch = function() {
	timerlabel.value = '00:00:00.0';
	
var startTimer = Date ();

var countTime = function countTime() {
	var HOUR = 60 * 60 * 1000;
	var MINUTE = 60 * 1000;
	var SECOND = 1000;
	var now = new Date();
	var diff = now.getTime() - startTimer.getTime();
	var hr = Math.floor(diff / HOUR);
	var min = Math.floor((diff - hr * HOUR) / MINUTE);
	var sec = Math.floor((diff - hr * HOUR - min * MINUTE) / SECOND);
	var msec = Math.floor(diff % SECOND);
	timerlabel.text = ('0' + hr).slice(-2) + ':' + ('0' + min).slice(-2) + ':' + ('0' + sec).slice(-2) + '.' + ('00' + msec).slice(-1);
};

intervalid = setInterval(countTime, 3);
button03.title = 'STOP';
};

var stopWatch = function() {
	clearInterval(intervalid);
};

var started = false;
var intervalid = null;

button01.addEventListener('click', function(e){
	if (!started) {
		stopWatch();
		started = true;
	}
});

button02.addEventListener('click', function(e){
	if (started) {
		stopWatch();
		started = false;
	}
		timerlabel.value = '00:00:00.0';
});

button03.addEventListener('click', function(e){
	if (started){
		stopWatch();
		started = false;
	}
});

win.add(view01);
win.add(button01);
win.add(button02);
win.add(button03);
// win.add(button04);
win.add(timerlabel);

win.open();
