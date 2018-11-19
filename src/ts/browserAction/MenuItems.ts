import { MenuItem } from "./MenuItemType";
import * as OptionManager from "../options/OptionsManager";

const manifest = browser.runtime.getManifest();
let tabsAside:MenuItem, showSessions:MenuItem;

let menuItems:MenuItem[] = [
	tabsAside = {
		id: "tabs-aside",
		icon: "aside.png",
		wideIcon: true,
		shortcut: manifest.commands["tabs-aside"].suggested_key.default,
		onclick: () => {}
	},
	{
		id: "create-session",
		icon: "add.svg",
		tooltip: true,
		onclick: () => {}
	},
	showSessions = {
		id: "show-sessions",
		icon: "sessions.png",
		shortcut: manifest.commands["_execute_sidebar_action"].suggested_key.default,
		onclick: () => browser.sidebarAction.open()
	},
	{
		id: "tab-selector",
		optional: true,
		href: browser.runtime.getURL("html/menu/tab-selector.html")
	},
	{
		id: "options",
		icon: "options-16.svg",
		optional: true,
		onclick: () => browser.runtime.openOptionsPage()
	}
];

(async () => {
	tabsAside.shortcut = await OptionManager.getValue<string>("aside-command");
	showSessions.shortcut = await OptionManager.getValue<string>("sidebar-command");
})();

export default menuItems;