// MOdify array prototype
Array.prototype.peek = function () {
	if (this.length === 0) {
		return null;
	}
	return this[this.length - 1];
};
// disable backspace
document.addEventListener("keydown", function (e) {
	if (e.keyCode === 8 && e.target === document.body) {
		e.preventDefault();
	}
});
// add css class
var style = document.createElement("style");
style.type = "text/css";
style.innerHTML = ".typed { text-shadow: 0 0 0.2em #8F7; white-space: pre-wrap; }";
document.head.appendChild(style);
// Typing function encapsulation	
(function (article) {
	// create visual elements
	var i, typed = [], cursor = document.createElement('span');
	cursor.id = "cursor";
	// advance cursor javascript
	function advanceCursor(textNode) {
		cursor.innerHTML = textNode.nodeValue.slice(0, 1);
		textNode.nodeValue = textNode.nodeValue.slice(1);
	}
	// visual alert of misstyped letters
	function alertCursor(e) {
		cursor.style.color = "red";
		setTimeout(function () {
			cursor.style.color = "";
		}, 600);
	}
	// Blink Cursor in Javascript
	function blinkCursor() {
		cursor.style.textDecoration = "underline";
		setTimeout(function () {
			cursor.style.textDecoration = "";
			setTimeout(blinkCursor, 500);
		}, 500);
	}
	blinkCursor();
	// Itterate through DOM nodes typing
	function typeNodes(node) {
		//console.log(node);
		if (node === null) {
			if (typed.length === 1) {
				return;
			}
			// 
			var parent = typed.pop().parentElement;
			typed.peek().appendChild(parent);
			typed.peek().parentElement.insertBefore(cursor, typed.peek().nextSibling);
			typeNodes(cursor.nextSibling);
			return;
		}
		switch (node.nodeType) {
		case 1: // Element Node
			// insert typed element
			i = typed.push(document.createElement("span")) - 1;
			typed[i].className = "typed";
			node.insertBefore(cursor, node.firstChild);
			node.insertBefore(typed[i], cursor);
			// Itterate Child Nodes
			typeNodes(cursor.nextSibling);
			break;
		case 3: // Text Node
			if (node.nodeValue.length === 0 || node.nodeValue.trim().length === 0) {
				typeNodes(node.nextSibling);
				break;
			}
			advanceCursor(node);
			function keyPressHandler(key) {
				// Prevent Default space===pagedown
				if (key.keyCode === 32) {
					key.preventDefault();
				}
				if (key.which === cursor.innerHTML.charCodeAt(0)) { // correct char
					typed.peek().innerHTML += String.fromCharCode(key.which);
					cursor.innerHTML = "";
					advanceCursor(node);
				} else if (key.which >= " ".charCodeAt(0) && key.which <= "~".charCodeAt(0)) { // valid char
					// alert user that incorrect char was typed
					alertCursor(key.which);
				} else { // invalid char
					return;
				}
				// Check exit condition
				if (node.nodeValue === "" && cursor.innerText === "") {
					document.removeEventListener("keypress", keyPressHandler);
					// continue itteration of dom tree
					typeNodes(node.nextSibling);
				}
			}
			document.addEventListener("keypress", keyPressHandler);
			return;
		default:
			typeNodes(node.nextSibling);
		}
	}
	typeNodes(article);
}(document.getElementsByTagName("article").item()));
/*// debug elements
art = document.getElementsByTagName("article").item();
cursor = document.getElementById("cursor");
p = art.firstElementChild; //*/