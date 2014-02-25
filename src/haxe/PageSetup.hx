import js.Lib;
import js.JQuery;
import AudioTone;

class PageSetup
{
	var audio : AudioTone;

	var typeRadio : JQuery;
	var freqInput : JQuery;
	var gainInput : JQuery;
	var playButton : JQuery;
	var stopButton : JQuery;

	var freqShowValue : JQuery;
	var gainShowValue : JQuery;

	public function new() {
		audio = new AudioTone();

		initializeControls();
	}

	function initializeControls() {
		typeRadio = new JQuery("input[name='waveType']");
		freqInput = new JQuery("#audioFrequency");
		gainInput = new JQuery("#audioGain");
		playButton = new JQuery("#playAudio");
		stopButton = new JQuery("#stopAudio");

		freqShowValue = new JQuery("#frequencyValue");
		gainShowValue = new JQuery("#gainValue");

		typeRadio.on("change", function (e) {
			setParams();
		});

		freqInput.on("change", function (e) {
			setParams();
		});

		gainInput.on("change", function (e) {
			setParams();
		});

		playButton.on("click", function(e) {
			playAudio();

			toggelControlButton();
		});

		stopButton.on("click", function(e) {
			stopAudio();

			toggelControlButton();
		});

		showValues();
	}

	function showValues(): Void {
		freqShowValue.text(freqInput.val());
		gainShowValue.text(gainInput.val());
	}

	function setParams(): Void {
		audio.setWaveType(Type.createEnum(WaveType, typeRadio.filter(":checked").val()));
		audio.setFrequency(Std.parseFloat(freqInput.val()));
		audio.setGain(Std.parseFloat(gainInput.val()));

		showValues();
	}

	function playAudio(): Void {
		audio.createOscillator();

		setParams();
		
		audio.playAudio();
	}

	function stopAudio(): Void {
		audio.stopAudio();
		audio.garbageOscillator();
	}

	function toggelControlButton(): Void {
		if (playButton.attr("disabled") == "disabled") {
			playButton.removeAttr("disabled");
		} else {
			playButton.attr("disabled", "disabled");
		}

		if (stopButton.attr("disabled") == "disabled") {
			stopButton.removeAttr("disabled");
		} else {
			stopButton.attr("disabled", "disabled");
		}
	}
}