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

function apply(func, events, node) {
	let length = events.length;
	for (let i = 0; i < length; i++) {
		func(node, events[i]);
	}
}

function noMouseRestrict(events) {
	apply(addEvt, events, window);
	apply(addEvt, events, document);
}

let targetEvents = ['contextmenu', 'selectstart', 'select', 'copy', 'beforecopy', 'cut', 'beforecut', 'paste', 'beforepaste', 'dragstart', 'dragend', 'drag', 'mousedown', 'mouseup', 'mousemove'];
noMouseRestrict(targetEvents);
