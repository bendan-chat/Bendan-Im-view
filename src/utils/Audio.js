let start = 0;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
let SAMPLE_RATE = 44100;
String.prototype.toHHMMSS = function () {
	let sec_num = parseInt(this, 10); // don't forget the second param
	let hours = Math.floor(sec_num / 3600);
	let minutes = Math.floor((sec_num - hours * 3600) / 60);
	let seconds = sec_num - hours * 3600 - minutes * 60;

	if (hours < 10) {
		hours = "0" + hours;
	}
	if (minutes < 10) {
		minutes = "0" + minutes;
	}
	if (seconds < 10) {
		seconds = "0" + seconds;
	}
	return hours + ":" + minutes + ":" + seconds;
};

let startRecordingButton = document.getElementById("startRecordingButton");
let stopRecordingButton = document.getElementById("stopRecordingButton");
let playButton = document.getElementById("playButton");
let downloadButton = document.getElementById("downloadButton");

let leftchannel = [];
let rightchannel = [];
let recorder = null;
let recordingLength = 0;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
let volume = null;
let mediaStream = null;
let context = null;
let blob = null;

startRecordingButton.addEventListener("click", function () {
	start = new Date().getTime();
	// Initialize recorder
	navigator.getUserMedia =
		navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;

	navigator.getUserMedia(
		{
			// audio: true
			audio: {
				sampleRate: 44100,
				channelCount: 2 // canary 中此设置未生效，始终为 2
			}
		},
		function (e) {
			console.log("user consent");

			// creates the audio context
			window.AudioContext = window.AudioContext || window.webkitAudioContext;
			context = new AudioContext({ sampleRate: 44100 });

			// creates an audio node from the microphone incoming stream
			mediaStream = context.createMediaStreamSource(e);

			// https://developer.mozilla.org/en-US/docs/Web/API/AudioContext/createScriptProcessor
			// bufferSize: the onaudioprocess event is called when the buffer is full
			let bufferSize = 2048;
			let numberOfInputChannels = 2;
			let numberOfOutputChannels = 2;
			if (context.createScriptProcessor) {
				recorder = context.createScriptProcessor(bufferSize, numberOfInputChannels, numberOfOutputChannels);
			} else {
				recorder = context.createJavaScriptNode(bufferSize, numberOfInputChannels, numberOfOutputChannels);
			}

			recorder.onaudioprocess = function (e) {
				leftchannel.push(new Float32Array(e.inputBuffer.getChannelData(0)));
				rightchannel.push(new Float32Array(e.inputBuffer.getChannelData(1)));
				recordingLength += bufferSize;
			};

			// we connect the recorder
			mediaStream.connect(recorder);
			recorder.connect(context.destination);
		},
		function (e) {
			console.error(e);
		}
	);
});

stopRecordingButton.addEventListener("click", function () {
	// eslint-disable-next-line no-undef
	info.textContent = String((new Date().getTime() - start) / 1000).toHHMMSS();
	window.AudioContext = window.AudioContext || window.webkitAudioContext;

	// stop recording
	recorder.disconnect(context.destination);
	mediaStream.disconnect(recorder);

	// we flat the left and right channels down
	// Float32Array[] => Float32Array
	let leftBuffer = flattenArray(leftchannel, recordingLength);
	let rightBuffer = flattenArray(rightchannel, recordingLength);
	// we interleave both channels together
	// [left[0],right[0],left[1],right[1],...]
	let interleaved = interleave(leftBuffer, rightBuffer);

	// we create our wav file
	let buffer = new ArrayBuffer(44 + interleaved.length * 2);
	let view = new DataView(buffer);

	// RIFF chunk descriptor
	writeUTFBytes(view, 0, "RIFF");
	view.setUint32(4, 44 + interleaved.length * 2, true);
	writeUTFBytes(view, 8, "WAVE");
	// FMT sub-chunk
	writeUTFBytes(view, 12, "fmt ");
	view.setUint32(16, 16, true); // chunkSize
	view.setUint16(20, 1, true); // wFormatTag
	view.setUint16(22, 2, true); // wChannels: stereo (2 channels)
	view.setUint32(24, 44100, true); // dwSamplesPerSec
	view.setUint32(28, 44100 * 4, true); // dwAvgBytesPerSec
	view.setUint16(32, 4, true); // wBlockAlign
	view.setUint16(34, 16, true); // wBitsPerSample
	// data sub-chunk
	writeUTFBytes(view, 36, "data");
	view.setUint32(40, interleaved.length * 2, true);

	// write the PCM samples
	let index = 44;
	let volume = 1;
	for (let i = 0; i < interleaved.length; i++) {
		view.setInt16(index, interleaved[i] * (0x7fff * volume), true);
		index += 2;
	}

	// our final blob
	blob = new Blob([view], { type: "audio/wav" });
});

playButton.addEventListener("click", function () {
	if (blob == null) {
		return;
	}

	let url = window.URL.createObjectURL(blob);
	let audio = new Audio(url);
	audio.play();
});

downloadButton.addEventListener("click", function () {
	if (blob == null) {
		return;
	}

	let url = URL.createObjectURL(blob);

	let a = document.createElement("a");
	document.body.appendChild(a);
	a.style = "display: none";
	a.href = url;
	a.download = "sample.wav";
	a.click();
	window.URL.revokeObjectURL(url);
});

function flattenArray(channelBuffer, recordingLength) {
	let result = new Float32Array(recordingLength);
	let offset = 0;
	for (let i = 0; i < channelBuffer.length; i++) {
		let buffer = channelBuffer[i];
		result.set(buffer, offset);
		offset += buffer.length;
	}
	return result;
}

function interleave(leftChannel, rightChannel) {
	let length = leftChannel.length + rightChannel.length;
	let result = new Float32Array(length);

	let inputIndex = 0;

	for (let index = 0; index < length; ) {
		result[index++] = leftChannel[inputIndex];
		result[index++] = rightChannel[inputIndex];
		inputIndex++;
	}
	return result;
}

function writeUTFBytes(view, offset, string) {
	for (let i = 0; i < string.length; i++) {
		view.setUint8(offset + i, string.charCodeAt(i));
	}
}
