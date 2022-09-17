import AirDatepicker from 'air-datepicker';
import localeRu from 'air-datepicker/locale/ru';

let dateVars = {}; 
let d = dateVars;

function enableDatepicker() {
	const dateOptions = {
		locale: localeRu,
		timepicker : true,
		position: 'top center',
		buttons: 'clear',
		isMobile: true,
		minDate: new Date,
		onShow () { document.querySelector('#body-section').classList.add('lock') },
		onHide () { document.querySelector('#body-section').classList.remove('lock') },
	};

	d.startDate?.destroy();
	d.endDate?.destroy();
	
	d.startDate = new AirDatepicker('#link-start', dateOptions);
	d.endDate = new AirDatepicker('#link-end', dateOptions);
};

export default enableDatepicker;