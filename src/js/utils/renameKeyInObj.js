function renameKeyInObj(obj, oldKey, newKey) {
	if(!obj[oldKey]) return;
	if (oldKey !== newKey) {
		delete Object.assign(obj, {[newKey]: obj[oldKey] })[oldKey];
	};
};

export default renameKeyInObj;