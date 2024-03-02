window.p = [];
window.display = function(){}
window.hydraInput = function(name, min=0, max=10, step=1, value=1) {
	let controls;
	let controlsExisting = document.querySelectorAll("#hydra-controls");
	if (!controlsExisting.length) {
		controls = document.createElement("div");
		controls.id = "hydra-controls";
		controls.style = "position: absolute; z-index:9999; right: 10px; font-size: 1.2em;";
		document.querySelectorAll("atom-workspace")[0].prepend(controls);
	} else {
		controls = controlsExisting[0];
	}
	let label = document.createElement("label");
	label.for = name;
	label.innerHTML = name;
	label.style = "color: white;"
	let range = document.createElement("input");
	range.style = "display: inline-block; width: auto; vertical-align: text-bottom; margin-left: 10px;"
	range.type = "range";
	range.id = name;
	range.min = min;
	range.max = max;
	range.step = step;
	range.value = value;
	range.oninput = function () {
      p[this.id] = parseFloat(this.value);
      window.display();
  };
	let div = document.createElement("div");
	div.className = "hydra-input";
	div.id = "input-"+name;
	div.appendChild(label)
	div.appendChild(range)
	let existing = document.querySelectorAll("#input-"+name);
	if (existing.length) {
		existing[0].remove()
	}
	controls.appendChild(div)
}
window.removeControls = function(){
	let controlsExisting = document.querySelectorAll("#hydra-controls");
	if (controlsExisting.length) {
		controlsExisting[0].remove()
	}
}
window.initInputs = function(inputs){
	window.removeControls();
	for (var i in inputs) {
		let value;
		if (i in p) {
			value = p[i];
		}
		else {
			value = inputs[i]['default'];
			p[i] = value;
		}
		hydraInput(i, inputs[i]['min'], inputs[i]['max'], inputs[i]['step'], value)
	}
}
window.show = function(code){
	window.display = code;
	window.display();
}

window.b = { // button pressed
  a: false,
  b: false,
  x: false,
  y: false,
  l: false,
  r: false
};
window.bb = { // button toggle
  ...window.b
};
window.bc = { // button counter
  a: 0,
  b: 0,
  x: 0,
  y: 0,
  l: 0,
  r: 0
};
window.ax = { // axis pressed
  0: 0,
  1: 0
};
window.aax = { // cumulative axis pressed
  0: 0,
  1: 0
};

window.buttonPressed = function(b) {
  if (typeof b === "object") {
    return b.pressed;
  }
  return b === 1.0;
}
window.gameLoop = function() {
  const gamepads = navigator.getGamepads();
  if (!gamepads) {
    requestAnimationFrame(window.gameLoop);
  }
  const gp = gamepads[0];
  if (gp) {
    var newb = {
      b: window.buttonPressed(gp.buttons[0]),
      a: window.buttonPressed(gp.buttons[1]),
      y: window.buttonPressed(gp.buttons[2]),
      x: window.buttonPressed(gp.buttons[3]),
      l: window.buttonPressed(gp.buttons[4]),
      r: window.buttonPressed(gp.buttons[5]),
    }
    for (const button of ['b','a','y','x','l','r'])
    {
      if (newb[button] && !b[button]) {
        bb[button] = !bb[button];
				bc[button]++;
				const event = new CustomEvent("button", {
					bubbles: false,
					detail: button
				});
				window.dispatchEvent(event);
      }
    }
    b = newb;
    // MANAGE AXIS
    ax[0] = Math.round(gp.axes[0])
    ax[1] = Math.round(-gp.axes[1])
    aax[0] = aax[0] + ax[0]/10;
    aax[1] = aax[1] + ax[1]/10;
  }
  requestAnimationFrame(window.gameLoop);
};
window.onButton = function(e){}
window.addEventListener("button", (e) => window.onButton(e), false);
