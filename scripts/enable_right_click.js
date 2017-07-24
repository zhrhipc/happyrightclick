function avoiderr() {
	return true;
}
onerror = avoiderr;

let noMouseRestrict = {
	enableDefault: function (evt) {
		evt.stopPropagation();
	},
	addEvt2: function (obj, type, func) {
		obj.addEventListener(type, this.enableDefault, true);
	},
	apply: function (events, node) {
		let length = events.length;
		for (let i = 0; i < length; i++) {
			this.addEvt2(node, events[i], this.enableDefault);
		}
	},
	init: function (events) {
		this.apply(events, window);
		this.apply(events, document);
	}
};

function addSelectStyle() {
	let elem = document.createElement('style');
	elem.textContent = '* {-webkit-user-drag: auto !important; -webkit-user-select: text !important;' + '-moz-user-drag: auto !important; -moz-user-select: text !important;' + '-khtml-user-drag: auto !important; -khtml-user-select: text !important;' + 'user-drag: auto !important; user-select: text !important;}';
	document.head.appendChild(elem);
}

noMouseRestrict.init(['contextmenu', 'selectstart', 'select', 'copy', 'beforecopy', 'cut', 'beforecut', 'paste', 'beforepaste', 'dragstart', 'dragend', 'drag', 'mousedown', 'mouseup', 'mousemove']);
addSelectStyle();