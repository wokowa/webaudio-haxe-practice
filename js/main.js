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
	getAnalyseData: function() {
		var data = new Uint8Array(512);
		this.analyse.getByteTimeDomainData(data);
		return data;
	}
	,setGain: function(level) {
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
		this.analyse = this.audioctx.createAnalyser();
		this.gain = this.audioctx.createGain();
		this.gain.connect(this.audioctx.destination,null,null);
		this.gain.connect(this.analyse,null,null);
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
	this.waveView = new WaveView();
	this.initializeControls();
	this.showWaveForm();
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
	,showWaveForm: function() {
		var _g = this;
		if(!this.freezeButton.hasClass("toggleOn")) {
			var data = this.audio.getAnalyseData();
			this.waveView.setData(data);
		}
		haxe.Timer.delay(function() {
			_g.showWaveForm();
		},10);
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
		this.freezeButton = new js.JQuery("#waveFreeze");
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
		this.freezeButton.on("click",function(e) {
			_g.freezeButton.toggleClass("toggleOn");
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
var WaveView = function() {
	this.initializeWaveView();
};
WaveView.__name__ = true;
WaveView.prototype = {
	setData: function(dataSet) {
		var svgObj = d3.svg.line().x(function(d,i) {
			return i;
		}).y(function(d,i) {
			return d + 1;
		}).interpolate("linear");
		this.waveView.select("svg").selectAll("path").data([dataSet]);
		this.polyLine.transition().duration(0).attr("d",svgObj);
	}
	,initializeWaveView: function() {
		this.waveView = d3.select("#waveView");
		this.waveView.append("svg").attr("class","wave").attr("width",512).attr("height",256);
		this.polyLine = this.waveView.select("svg").append("path").attr("stroke","blue").attr("stroke-width",2).attr("fill","none");
	}
}
var haxe = {}
haxe.Timer = function(time_ms) {
	var me = this;
	this.id = setInterval(function() {
		me.run();
	},time_ms);
};
haxe.Timer.__name__ = true;
haxe.Timer.delay = function(f,time_ms) {
	var t = new haxe.Timer(time_ms);
	t.run = function() {
		t.stop();
		f();
	};
	return t;
}
haxe.Timer.prototype = {
	run: function() {
		console.log("run");
	}
	,stop: function() {
		if(this.id == null) return;
		clearInterval(this.id);
		this.id = null;
	}
}
var js = {}
js.d3 = {}
js.d3._D3 = {}
js.d3._D3.InitPriority = function() { }
js.d3._D3.InitPriority.__name__ = true;
String.__name__ = true;
Array.__name__ = true;
var q = window.jQuery;
js.JQuery = q;
js.d3._D3.InitPriority.important = "important";
Main.main();
})();

//@ sourceMappingURL=main.js.map