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
	if (n == 0) return [0];
	var out = [];
	for (var i=0;i<=n;i++)
		if (n%i==0)
			out.push(i);
	return out;
}
function equation(n, type) {
	var a, b, c, out;
	switch (type||["+", "-", "*"][Math.floor(Math.random()*3)]) {
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
			// if (out.length == 3 && Math.random() > 0.4 && type != "*") {
			// 	c = Math.floor(Math.random()*19)-9;
			// 	c = Math.max(1-n, c);
			// 	let need = n + c;
			// 	let count = 0;
			// 	if (c<0) c = "+"+Math.abs(c);
			// 	else c*= -1;
			// 	while ((out = equation(need, "*")+c).length != 5 && count < 50) {count++}
			// }
			break;
	}
	console.log(out, "=>", n);
	if (eval(out) != n)
		throw new Error(out + " did not equal " + n + "!!!");
	return out;
}

function update() {
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
	document.querySelector("button").onclick = function() {
		this.remove();
		let elem = document.querySelector("body");
		if (elem.requestFullscreen) {
	    elem.requestFullscreen();
		} else if (elem.webkitRequestFullscreen) { /* Safari */
			elem.webkitRequestFullscreen();
		} else if (elem.msRequestFullscreen) { /* IE11 */
			elem.msRequestFullscreen();
		}
	}
	h = document.getElementById("hours");
	m = document.getElementById("minutes");
	setInterval(update, 900);
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
window.onkeypress = () => {
	lastm = 0;
	update();
}