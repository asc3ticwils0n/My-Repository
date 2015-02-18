/**
 * @author Peter
 */
// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');

var Stopwatch = function(listener, resolution) {
this.startTime = 0;
this.stopTime = 0;
this.totalElapsed = 0; // * elapsed number of ms in total
this.started = false;
this.listener = (listener != undefined ? listener : null); // * function to receive onTick events
this.tickResolution = (resolution != undefined ? resolution : 500); // * how long between each tick in milliseconds
this.tickInterval = null;
// * pretty static vars
this.onehour = 1000 * 60 * 60;
this.onemin = 1000 * 60;
this.onesec = 1000;
};
Stopwatch.prototype.start = function() {
var delegate = function(that, method) { return function() { return
method.call(that); }; };
if (!this.started) {
 this.startTime = new Date().getTime();
 this.stopTime = 0;
 this.started = true;
 this.tickInterval = setInterval(delegate(this, this.onTick),
this.tickResolution);
}
};
Stopwatch.prototype.stop = function() {
if (this.started) {
 this.stopTime = new Date().getTime();
 this.started = false;
 var elapsed = this.stopTime - this.startTime;
 this.totalElapsed += elapsed;
 if (this.tickInterval != null)
 clearInterval(this.tickInterval);
}
return this.getElapsed();
};
Stopwatch.prototype.reset = function() {
this.totalElapsed = 0;
// * if watch is running, reset it to current time
this.startTime = new Date().getTime();
this.stopTime = this.startTime;
};
Stopwatch.prototype.restart = function() {
this.stop();
this.reset();
this.start();
};
Stopwatch.prototype.getElapsed = function() {
// * if watch is stopped, use that date, else use now
var elapsed = 0;
if (this.started)
 elapsed = new Date().getTime() - this.startTime;
elapsed += this.totalElapsed;
var hours = parseInt(elapsed / this.onehour);
elapsed %= this.onehour;
var mins = parseInt(elapsed / this.onemin);
elapsed %= this.onemin;
var secs = parseInt(elapsed / this.onesec);
var ms = elapsed % this.onesec;
return {
 hours: hours,
 minutes: mins,
 seconds: secs,
 milliseconds: ms
};
};
Stopwatch.prototype.setElapsed = function(hours, mins, secs) {
this.reset();
this.totalElapsed = 0;
this.totalElapsed += hours * this.onehour;
this.totalElapsed += mins * this.onemin;
this.totalElapsed += secs * this.onesec;
this.totalElapsed = Math.max(this.totalElapsed, 0); // * No negative numbers
};
Stopwatch.prototype.toString = function() {
var zpad = function(no, digits) {
 no = no.toString().slice(0, 2);
 while(no.length < digits)
 no = '0' + no;
 return no;
};
var e = this.getElapsed();
return zpad(e.hours,2) + ':' + zpad(e.minutes,2) + ':' + zpad(e.seconds,2) +
':' + zpad(e.milliseconds,2);
};
Stopwatch.prototype.setListener = function(listener) {
this.listener = listener;
};
// * triggered every <resolution> ms
Stopwatch.prototype.onTick = function() {
if (this.listener != null) {
 this.listener(this);
}
};
// module.exports = Stopwatch;

// create tab group
var tabGroup = Titanium.UI.createTabGroup();


//
// create base UI tab and root window
//
var win1 = Titanium.UI.createWindow({  
    title:'Stop Watch',
    backgroundColor:'#fff'
});
var tab1 = Titanium.UI.createTab({  
    icon:'KS_nav_views.png',
    title:'Tab 1',
    window:win1
});
var bStart = Titanium.UI.createButton({
		title:'Start',
		height:40,
		width:200,
		top:10
	});	
bStart.addEventListener('click', function()
{
	Stopwatch.prototype.start;
});
// var label1 = Titanium.UI.createLabel({
	// color:'#999',
	// text:'I am Window 1',
	// font:{fontSize:20,fontFamily:'Helvetica Neue'},
	// textAlign:'center',
	// width:'auto'
// });

// win1.add(label1);

//
//  add tabs
//
tabGroup.addTab(tab1);  

// open tab group
tabGroup.open();