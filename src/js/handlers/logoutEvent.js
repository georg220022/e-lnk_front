import user from '../buisness/user.js'

function logoutEvent(event) {
	if (event.target.closest('.logout-link')) user.logout();
}

export default logoutEvent;