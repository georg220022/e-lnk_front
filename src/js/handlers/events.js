import burgerMenuEvent from './burgerMenuEvent.js';
import dropdownEvent from './dropdownEvent.js';
import { openModalsEvent, closeModalsEvent }  from './modalsEvent.js';
import accordionEvent from './accordionEvent.js';
import tabsEvent from './tabsEvent.js';
import copyToClipboardEvent from './copyToClipboardEvent.js';
import clearInputEvent from './clearInputEvent.js';
import selectLinkEvent from './selectLinkEvent.js';
import resetPasswordFormEvent from './resetPasswordFormEvent.js';
import logoutEvent from './logoutEvent.js';

document.addEventListener('click', (event) => {

	burgerMenuEvent(event);

	dropdownEvent(event);

	openModalsEvent(event);

	accordionEvent(event);

	tabsEvent(event);

	copyToClipboardEvent(event);
	
	clearInputEvent(event);

	selectLinkEvent(event);

	resetPasswordFormEvent(event);

	logoutEvent(event);

});

document.addEventListener('mousedown', (event) => {
	closeModalsEvent(event);
});