function externalASMRequest(command, argument = null) {
	return new Promise((resolve, reject) => {
		let listener = function (response) {
			// expecting just 1 response:
			browser.runtime.onMessage.removeListener(listener);
			console.log(response);

			if (response.result !== undefined) {
				resolve(response.result);
			} else {
				reject(response);
			}
		}

		browser.runtime.onMessage.addListener(listener);

		setTimeout(() => {
			if (browser.runtime.onMessage.hasListener(listener)) {
				reject("ASM Request Timeout");
			}
		}, 500);

		browser.runtime.sendMessage({
			command: "ASM",
			asmcmd: command,
			arg: argument
		}).catch(e => reject(e));
	});
}