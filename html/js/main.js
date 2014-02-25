(function () { "use strict";
var $estr = function() { return js.Boot.__string_rec(this,''); };
var WaveType = { __ename__ : true, __constructs__ : ["SINE","SQUARE","SAWTOOTH","TRIANGLE","CUSTOM"] }
WaveType.SINE = ["SINE",0];
WaveType.SINE.toString = $estr;
WaveType.SINE.__enum__ = WaveType;
WaveType.SQUARE = ["SQUARE",1];
WaveType.SQUARE.toString = $estr;
WaveType.SQUARE.__enum__ = WaveType;
WaveType.SAWTOOTH = ["SAWTOOTH",2];
WaveType.SAWTOOTH.toString = $estr;
WaveType.SAWTOOTH.__enum__ = WaveType;
WaveType.TRIANGLE = ["TRIANGLE",3];
WaveType.TRIANGLE.toString = $estr;
WaveType.TRIANGLE.__enum__ = WaveType;
WaveType.CUSTOM = ["CUSTOM",4];
WaveType.CUSTOM.toString = $estr;
WaveType.CUSTOM.__enum__ = WaveType;
var AudioTone = function() {
	this.audioctx = null;
	this.osc = null;
	this.initAudio();
};
AudioTone.__name__ = true;
AudioTone.prototype = {
	setGain: function(level) {
		if(this.gain != null) this.gain.gain.value = level;
	}
	,setFrequency: function(freq) {
		if(this.osc != null) this.osc.frequency.value = freq;
	}
	,setWaveType: function(type) {
		if(this.osc != null) this.osc.type = type[1];
	}
	,stopAudio: function() {
		if(this.osc != null && this.osc.playbackState == 2) this.osc.stop(0);
	}
	,playAudio: function() {
		if(this.osc != null && this.osc.playbackState == 0) this.osc.start(0);
	}
	,garbageOscillator: function() {
		if(this.osc != null) {
			this.osc.disconnect(0);
			this.osc = null;
		}
	}
	,createOscillator: function() {
		if(this.osc == null) {
			this.osc = this.audioctx.createOscillator();
			this.osc.connect(this.gain,null,null);
		}
	}
	,initAudio: function() {
		this.audioctx = typeof(webkitAudioContext) != "undefined"?new webkitAudioContext():new AudioContext();
		this.gain = this.audioctx.createGain();
		this.gain.connect(this.audioctx.destination,null,null);
	}
}
var Main = function() { }
Main.__name__ = true;
Main.main = function() {
	new js.JQuery("document").ready(function(e) {
		Main.pageObj = new PageSetup();
	});
}
var PageSetup = function() {
	this.audio = new AudioTone();
	this.initializeControls();
};
PageSetup.__name__ = true;
PageSetup.prototype = {
	toggelControlButton: function() {
		if(this.playButton.attr("disabled") == "disabled") this.playButton.removeAttr("disabled"); else this.playButton.attr("disabled","disabled");
		if(this.stopButton.attr("disabled") == "disabled") this.stopButton.removeAttr("disabled"); else this.stopButton.attr("disabled","disabled");
	}
	,stopAudio: function() {
		this.audio.stopAudio();
		this.audio.garbageOscillator();
	}
	,playAudio: function() {
		this.audio.createOscillator();
		this.setParams();
		this.audio.playAudio();
	}
	,setParams: function() {
		this.audio.setWaveType(Type.createEnum(WaveType,this.typeRadio.filter(":checked").val()));
		this.audio.setFrequency(Std.parseFloat(this.freqInput.val()));
		this.audio.setGain(Std.parseFloat(this.gainInput.val()));
		this.showValues();
	}
	,showValues: function() {
		this.freqShowValue.text(this.freqInput.val());
		this.gainShowValue.text(this.gainInput.val());
	}
	,initializeControls: function() {
		var _g = this;
		this.typeRadio = new js.JQuery("input[name='waveType']");
		this.freqInput = new js.JQuery("#audioFrequency");
		this.gainInput = new js.JQuery("#audioGain");
		this.playButton = new js.JQuery("#playAudio");
		this.stopButton = new js.JQuery("#stopAudio");
		this.freqShowValue = new js.JQuery("#frequencyValue");
		this.gainShowValue = new js.JQuery("#gainValue");
		this.typeRadio.on("change",function(e) {
			_g.setParams();
		});
		this.freqInput.on("change",function(e) {
			_g.setParams();
		});
		this.gainInput.on("change",function(e) {
			_g.setParams();
		});
		this.playButton.on("click",function(e) {
			_g.playAudio();
			_g.toggelControlButton();
		});
		this.stopButton.on("click",function(e) {
			_g.stopAudio();
			_g.toggelControlButton();
		});
		this.showValues();
	}
}
var Reflect = function() { }
Reflect.__name__ = true;
Reflect.field = function(o,field) {
	var v = null;
	try {
		v = o[field];
	} catch( e ) {
	}
	return v;
}
Reflect.isFunction = function(f) {
	return typeof(f) == "function" && !(f.__name__ || f.__ename__);
}
var Std = function() { }
Std.__name__ = true;
Std.parseFloat = function(x) {
	return parseFloat(x);
}
var Type = function() { }
Type.__name__ = true;
Type.createEnum = function(e,constr,params) {
	var f = Reflect.field(e,constr);
	if(f == null) throw "No such constructor " + constr;
	if(Reflect.isFunction(f)) {
		if(params == null) throw "Constructor " + constr + " need parameters";
		return f.apply(e,params);
	}
	if(params != null && params.length != 0) throw "Constructor " + constr + " does not need parameters";
	return f;
}
var js = {}
String.__name__ = true;
Array.__name__ = true;
var q = window.jQuery;
js.JQuery = q;
Main.main();
})();

//@ sourceMappingURL=main.js.map