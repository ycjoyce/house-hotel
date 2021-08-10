export default {
	bind(el, binding, vnode) {
		const elClone = el;
		let method = null;
		const expressionFunc = vnode.context[binding.expression];
		const valueFunc = binding.value;
		if (typeof expressionFunc === 'function') {
			method = expressionFunc;
		} else if (typeof valueFunc === 'function') {
			method = valueFunc;
		}

		const handler = (e) => {
			const { target } = e;
			if (el.contains(target) || !method) {
				return;
			}
			method();
		};

		elClone.eventHandler = {
			arg: binding.arg || 'click',
			method,
			handler,
		};

		document.addEventListener(
			el.eventHandler.arg,
			handler,
		);
	},
	update(el, binding) {
		const elClone = el;
		elClone.eventHandler.arg = binding.arg;
	},
	unbind(el) {
		document.removeEventListener(
			el.eventHandler.arg,
			el.eventHandler.handler,
		);
	},
};
