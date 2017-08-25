function avoiderr() {
	return true;
}
let old_onerror = onerror;
onerror = avoiderr;

function enableDefault(evt) {
	evt.stopPropagation();
}

function addEvt(obj, type) {
	obj.addEventListener(type, enableDefault, true);
}

function apply(events, node) {
	let length = events.length;
	for (let i = 0; i < length; i++) {
		addEvt(node, events[i]);
	}
}

function noMouseRestrict(events) {
	apply(events, window);
	apply(events, document);
}

noMouseRestrict(['contextmenu', 'selectstart', 'select', 'copy', 'beforecopy', 'cut', 'beforecut', 'paste', 'beforepaste', 'dragstart', 'dragend', 'drag', 'mousedown', 'mouseup', 'mousemove']);
