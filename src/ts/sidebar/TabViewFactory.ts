import TabView from "./TabViews/TabView.js";
import * as OptionsManager from "../options/OptionsManager.js";

import SimpleList from "./TabViews/SimpleList.js";
import SessionView from "./SessionView.js";

let tabLayout:string = "simple-list";

export async function init() {
	tabLayout = await OptionsManager.getValue<string>("sidebarTabLayout");

	// load tab layout css

	let css:HTMLLinkElement = document.createElement("link");
	css.rel = "stylesheet";
	css.type = "text/css";
	css.href = "../css/tab-view-" + tabLayout + ".css";

	document.head.appendChild(css);
}

export function createTabView(sessionView:SessionView):TabView {
	if(tabLayout === "simple-list") {
		return new SimpleList(sessionView);
	}

	return null;
}
