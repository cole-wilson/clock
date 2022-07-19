var h, m, lastm;
var colors = [
	"255, 0, 0",
	"0, 255, 0",
	"0, 0, 255",
	"255, 255, 255",
	"255, 255, 0",
	"0, 255, 255",
	"255, 0, 255"
], colorindex = localStorage.getItem("color")||0;

function getfactors(n) {
	var out = [];
	for (var i=0;i<n;i++)
		if (n%i==0)
			out.push(i);
	return out;
}
function equation(n) {
	var out;
	switch (["+", "-", "*"][Math.floor(Math.random()*3)]) {
		case "+":
			a = Math.floor(Math.random()*n);
			b = n - a;
			out = a+"+"+b;
			break;
		case "-":
			a = Math.floor(Math.random()*(99-n)) + n; 
			b = a - n;
			out = a+"-"+b;
			break;
		case "*":
			let factors = getfactors(n);
			a = factors[Math.floor(Math.random()*factors.length)];
			b = n/a;
			out = a+"*"+b;
			break;
	}
	return out;
}

function update() {
	var a, b;
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
	setInterval(update, 800);
	document.documentElement.style.setProperty('--color', colors[colorindex])
}
window.onclick = () => {
	colorindex++;
	if (colorindex >= colors.length)
		colorindex = 0;
	document.documentElement.style.setProperty('--color', colors[colorindex]);
	localStorage.setItem("color", colorindex);
}
window.oncontextmenu = () => {
	window.onclick();
	return false;
}