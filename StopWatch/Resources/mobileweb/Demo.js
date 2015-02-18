Titanium.UI.setBackgroundColor('#302226');
var win = Titanium.UI.createWindow({
    title:"",
    backgroundColor:"#302226",
    exitOnClose: true 
});
 
var view01 = Titanium.UI.createView({
    backgroundColor:"#575757"
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
 
var hourlabel = Titanium.UI.createLabel({
    text: 'Hours',
    top: 55,
    left: 60,
});
 
var minlabel = Titanium.UI.createLabel({
    text: 'Mins',
    top: 55,
    left: 125,
});
 
var seclabel = Titanium.UI.createLabel({
    text: 'Secs',
    top: 55,
    right: 105,
});
 
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
 
var button04 = Titanium.UI.createButton({
    title:'LAP',
    top: 150,
    right: 10,
    width: 100,
    height: 50
});
var _startStopwatch = function() {
    timerlabel.value = '00:00:00.0';
 
var startTime = new Date();
 
var _updateTimer = function updateTimer() {
    var UNIT_HOUR = 60 * 60 * 1000;
    var UNIT_MINUTE = 60 * 1000;
    var UNIT_SEC = 1000;
    var now = new Date();
    var diff = now.getTime() - startTime.getTime();
    var hour = Math.floor(diff / UNIT_HOUR);
    var minute = Math.floor((diff - hour * UNIT_HOUR) / UNIT_MINUTE);
    var sec = Math.floor((diff - hour * UNIT_HOUR - minute * UNIT_MINUTE) / UNIT_SEC);
    var msec = Math.floor(diff % UNIT_SEC);
    timerlabel.text = ('0' + hour).slice(-2) + ':' + ('0' + minute).slice(-2) + ':' + ('0' + sec).slice(-2) + '.' + ('00' + msec).slice(-1);
    };
 
    intervalid = setInterval(_updateTimer, 3);
    button03.title = 'STOP';
    };
 
    var _stopStopwatch = function() {
        clearInterval(intervalid);
    };
 
    var started = false;
    var intervalid = null;
 
button01.addEventListener("click", function(e){
    if (started) {
        _stopStopwatch();
        started = false;
      } else {
        _startStopwatch();
        started = true;
      } 
});
 
button02.addEventListener("click", function(e){
    if (started) {
        _stopStopwatch();
        started = true;
        timerlabel.value = '00:00:00.0';
       _startStopwatch();
        started = true;
      } else {
      }
});
 
button03.addEventListener("click", function(e){
    if (started){    
    _stopStopwatch();
    } else {
        _stopStopwatch();
        started = true;
    }
});
 
win.add(view01);
win.add(button01);
win.add(button02);
win.add(button03);
win.add(button04);
win.add(timerlabel);
win.add(hourlabel);
win.add(minlabel);
win.add(seclabel);
//win.add(table);
 
win.open();