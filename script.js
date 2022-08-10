var h, m, lastm;
var colors = [
	// "0, 0, 0",
	"255, 0, 0",
	"0, 255, 0",
	"0, 0, 255",
	"255, 255, 255",
	"255, 255, 0",
	"0, 255, 255",
	"255, 0, 255",
];

var settings = JSON.parse(localStorage.getItem("settings")) || {
	hour_color: 0,
	minute_color: 0,
	bg_color: 0,
	addition: true,
	subtraction: true,
	multiplication: true,
	custom: false,
	equations: "",
};

function equation(n, type) {
	function getfactors(n) {
		if (n == 0) return [0];
		var out = [];
		for (var i=0;i<=n;i++)
			if (n%i==0)
				out.push(i);
		return out;
	}
	var a, b, c, out, types = [];

	if (settings.addition) types.push("+");
	if (settings.subtraction) types.push("-");
	if (settings.multiplication) types.push("*");
	if (settings.custom && settings.equations) types.push("custom")



	switch (type||types[Math.floor(Math.random()*types.length)]) {
		case "+":
			a = Math.floor(Math.random()*n);
			b = n - a;
			if ((""+a+b).length == 2 && Math.random() > 0.4) {
				c = (-a) + Math.floor(Math.random()*10);
				a = a+c;
				if (c<0) c = "+"+Math.abs(c);
				else c = "-"+Math.abs(c);
				if (Math.random()>=0.5)
					out = a+"+"+b+c;
				else
					out = a+c+"+"+b;
			}
			else {
				out = a+"+"+b;
			}
			break;
		case "-":
			a = Math.floor(Math.random()*(99-n)) + n;
			b = a - n;
			if ((""+a+b).length == 2 && Math.random() > 0.4) {
				c = (-a) + Math.floor(Math.random()*10);
				a = a+c;
				if (c<0) c = "+"+Math.abs(c);
				else c = "-"+Math.abs(c);
				if (Math.random()>=0.5)
					out = a+"-"+b+c;
				else
					out = a+c+"-"+b;
			}
			else {
				out = a+"-"+b;
			}
			break;
		case "*":
			let factors = getfactors(n);
			a = factors[Math.floor(Math.random()*factors.length)];
			b = n/a;
			if (a == 0) b = 0;
			out = a+"*"+b;
			break;
		case "custom":
			let equations = settings.equations.split("\n");
			for (var i=0;i<equations.length;i++) {
				let parts = equations[i].split(" = ");
				if (parts[0] == n) {
					out = parts[1]
					break
				}
			}
			break;
		default:
			out = ""+n;
	}
	return out;
}

function update() {
	document.documentElement.style.setProperty('--bgcolor', colors[settings.bg_color])
	document.documentElement.style.setProperty('--mincolor', colors[settings.minute_color])
	document.documentElement.style.setProperty('--hourcolor', colors[settings.hour_color])

	let now = new Date();
	if (now.getMinutes() == lastm)
		return;
	lastm = now.getMinutes();

	var hour = now.getHours() % 12;
	if (hour==0) hour = 12;
	h.innerText = (equation(hour).padStart(5, "!"));
	var minute = now.getMinutes();

	m.innerText = (equation(minute)).padStart(5, "!");
}
window.onload = () => {
	h = document.getElementById("hours");
	m = document.getElementById("minutes");
	update();

	document.querySelector("#closewelcome").onclick = function() {
		document.querySelector("#welcome").remove();
	}

	let settingEls = document.querySelectorAll(".setting");
	for (var i=0;i<settingEls.length;i++) {
		let el = settingEls[i];
		console.log(el)
		if (el.checked !== undefined)
			el.checked = settings[el.name]
		else
			el.value = settings[el.name]
		if (el.name == "equations")
			el.hidden = !settings.custom
		el.oninput = (e) => {
			if (e.target.checked !== undefined) {
				settings[e.target.name] = e.target.checked;
				if (e.target.name == "custom") document.querySelector("[name=equations]").hidden = !e.target.checked
			}
			else
				settings[e.target.name] = e.target.value
			localStorage.setItem("settings", JSON.stringify(settings))
		}
	}

	setInterval(update, 900);
}

// document.querySelector("body").onclick = (e) => {
// 	e.stopPropagation();
// 	settings.bg_color = (settings.bg_color+1)%colors.length;
// 	localStorage.setItem("settings", JSON.stringify(settings))
// 	update();
// }
document.querySelector("#hours").onclick = ()=> {
	settings.hour_color = (settings.hour_color+1)%colors.length;
	localStorage.setItem("settings", JSON.stringify(settings))
	update();
}
document.querySelector("#minutes").onclick = () => {
	settings.minute_color=(settings.minute_color+1)%colors.length;
	localStorage.setItem("settings", JSON.stringify(settings))
	update();
}


window.onkeypress = (e) => {
	if (e.target.closest("#welcome") != null)
		return;
	lastm=0;
	update();
}
window.ondblclick = (e) => {
	if (e.target.closest("#welcome") != null)
		return
	let el = document.documentElement;
	el.requestFullscreen()||el.webkitRequestFullScreen()||el.msRequestFullscreen()
}
window.onclick = (e) => {
	if (e.target.closest("#welcome") != null)
		return;
	document.querySelector("#welcome").style.display = "none";
}
