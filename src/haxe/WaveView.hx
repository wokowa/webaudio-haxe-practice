import js.d3.*;
import js.d3.selection.*;
import js.d3.svg.*;

class WaveView
{
	var d3Obj : D3;
	var waveView : Selection;
	var svgView : Selection;

	var polyLine : Selection;

	public function new() {
		initializeWaveView();
	}

	function initializeWaveView() {
		waveView = D3.select("#waveView");

		// Initial SVG area
		waveView.append("svg")
			.attr("class", "wave")
			.attr("width", 512)
			.attr("height", 256);

		// Initial Line
		polyLine = waveView.select("svg")
								.append("path")
								.attr("stroke", "blue")
								.attr("stroke-width", 2)
								.attr("fill", "none");
	}

	public function setData(dataSet: Dynamic) {
		var svgObj = D3.svg.line()
		.x(function(d: Dynamic, i: Int): Dynamic {
			return i;
		})
		.y(function(d: Dynamic, i: Int): Dynamic {
			return d+1;
		})
		.interpolate("linear");

		waveView.select("svg").selectAll("path")
			.data([dataSet]);

		polyLine
			.transition()
			.duration(0)
			.attr("d", svgObj);

	}
}