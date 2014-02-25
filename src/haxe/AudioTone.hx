import js.html.audio.*;

// Wave Type
enum WaveType {
	SINE;
	SQUARE;
	SAWTOOTH;
	TRIANGLE;
	CUSTOM;
}

// Wrapper class
class AudioTone {
	// Audio Context
	var audioctx : AudioContext;
	// Oscillator
	var osc : OscillatorNode;
	// Gain
	var gain : GainNode;

	// Constructor
	public function new() {
		audioctx = null;
		osc = null;

		initAudio();
	}

	// Audio Context Initialize
	function initAudio(): Void {
		audioctx = if (untyped __js__("typeof(webkitAudioContext)") != "undefined") {
			untyped __js__("new webkitAudioContext()");
		} else {
			new js.html.audio.AudioContext();
		}

		// GainNode Initialize
		gain = audioctx.createGain();
		this.gain.connect(audioctx.destination, null, null);
	}

	// Create Oscillator
	public function createOscillator() {
		if (this.osc == null) {
			this.osc = audioctx.createOscillator();
			this.osc.connect(gain, null, null);
		}
	}

	// Garbage Oscillator
	public function garbageOscillator() {
		if (this.osc != null) {
			this.osc.disconnect(0);
			this.osc = null;
		}
	}

	// Play
	public function playAudio(): Void {
		if (this.osc != null
			&& this.osc.playbackState == OscillatorNode.UNSCHEDULED_STATE) {
			this.osc.start(0);
		}
	}

	// Stop
	public function stopAudio(): Void {
		if (this.osc != null
			&& this.osc.playbackState == OscillatorNode.PLAYING_STATE) {
			this.osc.stop(0);
		}
	}

	// Set Wave Type
	public function setWaveType(type: WaveType): Void {
		if (this.osc != null) {
			this.osc.type = type.getIndex();
		}
	}

	// Set Frequency
	public function setFrequency(freq: Float): Void {
		if (this.osc != null) {
			this.osc.frequency.value = freq;
		}
	}

	// Set Gain
	public function setGain(level: Float): Void {
		if (this.gain != null) {
			this.gain.gain.value = level;
		}
	}
}
