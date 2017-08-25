onerror = old_onerror;

function removeEvt(obj, type) {
	obj.removeEventListener(type, enableDefault, true);
}

function apply(events, node) {
	let length = events.length;
	for (let i = 0; i < length; i++) {
		removeEvt(node, events[i]);
	}
}

function mouseRestrict(events) {
	apply(events, window);
	apply(events, document);
}

mouseRestrict(['contextmenu', 'selectstart', 'select', 'copy', 'beforecopy', 'cut', 'beforecut', 'paste', 'beforepaste', 'dragstart', 'dragend', 'drag', 'mousedown', 'mouseup', 'mousemove']);
