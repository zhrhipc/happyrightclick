onerror = old_onerror;

function removeEvt(obj, type) {
	obj.removeEventListener(type, enableDefault, true);
}

// function apply(events, node) {
	// let length = events.length;
	// for (let i = 0; i < length; i++) {
		// removeEvt(node, events[i]);
	// }
// }

function mouseRestrict(events) {
	apply(removeEvt, events, window);
	apply(removeEvt, events, document);
}

mouseRestrict(targetEvents);
