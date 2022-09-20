import PageSection from '../utils/PageSection.js';
import user from '../buisness/user.js';
import { GET_LINKS_API , CHANGE_LINKS_API, DELETE_LINKS_API } from "./api.js";
import enableStatistics from './statistics.js';
import ISOStringToRuDateString from '../utils/ISOStringToRuDateString.js';
import validateShortenerFilledInput from '../utils/validateShortenerFilledInput.js';
import createObjectFromInputs from '../utils/createObjectFromInputs.js';
import deepCopy from '../utils/deepCopy.js';

import panelComponent from '../components/panelComponent.js';
import linkComponent from '../components/linkComponent.js';
import { paginationComponent, paginationLinkComponent } from '../components/paginationComponent.js';
import noLinksComponent from '../components/noLinksComponent.js';

let panel = {
	linksOnPageAmount: 10,
	currentPage: 1,
	mainSection: new PageSection('main-section'),
	page: {},
	charts: {},
	links: [],

	getLinks: async function() {
		let { response, json } = await user.sendRequest('GET', GET_LINKS_API);

		if (response.ok) {
			this.links = json;

			for (const link of this.links) {
				link.linkCreatedDate = ISOStringToRuDateString(link.linkCreatedDate);
				link.linkStartDate = ISOStringToRuDateString(link.linkStartDate);
				if (link.linkEndDate !== '-1') link.linkEndDate = ISOStringToRuDateString(link.linkEndDate);
			}

			if (this.updateLinksTimeout) clearTimeout(this.updateLinksTimeout);

			if (this.links.length !== 0) {
				this.updateLinksTimeout = setTimeout(async () => {
					this.oldLinks = deepCopy(this.page[this.currentPage].linksData);
					await this.getLinks();
					this.createPages();

					// get only that links which stats changed
					let changedLinks =
						this.page[this.currentPage].linksData.filter(({ statistics: newStatistics }) =>
							!this.oldLinks.some(({ statistics: oldStatistics }) =>
								JSON.stringify(oldStatistics) === JSON.stringify(newStatistics)));

					this.updateStatistics(changedLinks);
				}, this.links[0].ttl * 1000);

				window.addEventListener('hashchange', () => {
					clearTimeout(this.updateLinksTimeout);
				}, { once: true });
			}

		} else alert('Не получилось получить ссылки :( \nПожалуйста, попробуйте позже');
  },

  createPages: function() {
		this.pagesAmount = Math.ceil(this.links.length / this.linksOnPageAmount);

		for (let i = 0; i < this.pagesAmount; i++) {
			let start = i * this.linksOnPageAmount;
			let end = start + this.linksOnPageAmount;
			let pageNum = i + 1;

			this.page[pageNum] = {
				template: '',
				linksData: this.links.slice(start, end),
			};

			for (const link of this.page[pageNum].linksData) {
				this.page[pageNum].template += linkComponent(link, link.linkId);
			}
		}
	},

	render: function() {
		if (this.links.length === 0) {
			this.mainSection.renderComponent(noLinksComponent());
			return;
		}

		this.mainSection.renderComponent(panelComponent());
		this.linksSection = new PageSection('links-section');

		this.renderLinks();

		this.sortLinksBtn?.removeEventListener('click', () => this.sortByDate());
		this.sortLinksBtn = document.querySelector('.sort__button');
		this.sortLinksBtn?.addEventListener('click', () => this.sortByDate());

		this.deleteLinksBtn?.removeEventListener('click', () => this.deleteLinks());
		this.deleteLinksBtn = document.querySelector('.controls__button--delete');
		this.deleteLinksBtn.addEventListener('click', () => this.deleteLinks());

		if (this.pagesAmount > 1) {
			let paginationLinksTemplate = '';
			for (let i = 0; i < this.pagesAmount; i++) {
				let pageNum = i + 1;
				paginationLinksTemplate += paginationLinkComponent(pageNum);
			}

			this.paginationSection = new PageSection('pagination-section');
			this.paginationSection.renderComponent(paginationComponent(paginationLinksTemplate));
			this.paginationLinks?.forEach(paginationLink => paginationLink.removeEventListener('click', e => this.paginationLinkEvent(e)));
			this.paginationLinks = document.querySelectorAll('.pagination__link');
			this.paginationLinks?.forEach(paginationLink => paginationLink.addEventListener('click', e => this.paginationLinkEvent(e)));
			document.querySelector(`[data-page-link="${this.currentPage}"]`)?.classList.add('pagination__link--active', 'disabled');
		}
	},

	renderLinks: function() {
		let enableStatsTimeout = setTimeout(() => {
			this.enableStatistics();
			clearTimeout(enableStatsTimeout);
		});

		this.linksSection.renderComponent(this.page[this.currentPage].template);

		this.inputs?.forEach(input => {
			input.removeEventListener('blur', () => validateShortenerFilledInput(input));
			input.removeEventListener('input', () => validateShortenerFilledInput(input));
		});
		this.forms?.forEach(form => form.removeEventListener('submit', this.changeLink));

		this.inputs = document.querySelectorAll('.form__input');
		this.forms = document.querySelectorAll('.link-settings-form');

		this.inputs?.forEach(input => {
			input.addEventListener('blur', () => validateShortenerFilledInput(input));
			input.addEventListener('input', () => validateShortenerFilledInput(input));
		});
		this.forms.forEach(form => form.addEventListener('submit', this.changeLink));
	},

	enableStatistics: function() {
		for(let key in this.charts) this.charts[key]?.forEach(chart => chart.destroy());

		const linksOnCurrentPage = this.page[this.currentPage].linksData;
		for (let i = 0; i < linksOnCurrentPage.length; i++) {
			this.charts[linksOnCurrentPage[i].linkId] = enableStatistics(linksOnCurrentPage[i].statistics, linksOnCurrentPage[i].linkId);
		}
	},

	updateStatistics: function(updatedLinks) {
		if (updatedLinks.length === 0 ) return;

		updatedLinks.forEach(link => {
			let oldLink = this.oldLinks.find(oldLink => oldLink.linkId === link.linkId);

			const isChanged = chart => JSON.stringify(link.statistics[chart]) !== JSON.stringify(oldLink.statistics[chart]);
			let changedCharts = [];
			if (isChanged('device')) changedCharts.push(0);
			if (isChanged('os')) changedCharts.push(1);
			if (isChanged('country')) changedCharts.push(2);
			if (isChanged('hours')) changedCharts.push(3);
			if (isChanged('days')) changedCharts.push(4);

			changedCharts.forEach(index => {
				this.charts[link.linkId][index].destroy();
				this.charts[link.linkId][index] = enableStatistics(link.statistics, link.linkId, index);
			});

			let linkDOM = document.querySelector(`[data-link-id="${link.linkId}"]`);
			let totalClicked = linkDOM.querySelector('.link__clicked span');
			let repeatedTotalClicked = linkDOM.querySelector('.link__repeated-clicked span');
			let clickedToday = linkDOM.querySelector('.link__clicked-today span');
			let repeatedClickedToday = linkDOM.querySelector('.link__repeated-clicked-today span');

			totalClicked.innerText = link.clicked;
			repeatedTotalClicked.innerText = link.repeatedClicked;
			clickedToday.innerText = link.statistics.clickedToday;
			repeatedClickedToday.innerText = link.statistics.reClickedToday;
		});
	},

	paginationLinkEvent: function(event) {
		event.preventDefault();
		const clickedLink = event.target.dataset.pageLink;
		if (clickedLink === 'prev') { this.currentPage = this.currentPage - 1 }
		else if (clickedLink === 'next') { this.currentPage = this.currentPage + 1 }
		else this.currentPage = +clickedLink;

		this.paginationLinks.forEach(paginationLink => paginationLink.classList.remove('pagination__link--active', 'disabled'));
		if (this.currentPage === 1 ) this.paginationLinks[0].classList.add('disabled');
		if (this.currentPage === this.pagesAmount) this.paginationLinks[this.paginationLinks.length - 1].classList.add('disabled');
		document.querySelector(`[data-page-link="${this.currentPage}"]`)?.classList.add('pagination__link--active', 'disabled');
		this.renderLinks();
	},

	deleteLinks: async function() {
		this.deleteLinksBtn.classList.add('loader');
		this.deleteLinksBtn.innerText = '';

		let linksForDeleteArr = [];
		let activeWrapperArr = Array.from(document.querySelectorAll('.link--active'));
		activeWrapperArr.forEach(wrapper => linksForDeleteArr.push(wrapper.querySelector('.short-link').value));
		let linksForDeleteObj = { shortLinks: linksForDeleteArr };
		let jsonForReq = JSON.stringify(linksForDeleteObj);

		let { response } = await user.sendRequest('DELETE', DELETE_LINKS_API, jsonForReq);

		if (response.ok) {
			await this.getLinks();
			this.createPages();
			this.render();
		} else alert('Не получилось удалить ссылки :( \nПожалуйста, попробуйте позже');

		this.deleteLinksBtn.classList.remove('loader');
		this.deleteLinksBtn.innerText = 'Удалить отмеченные';
	},

	changeLink: async function(event) {
		event.preventDefault();

		let thisForm = event.target.closest('.form');
		let thisFormInputs = Array.from(thisForm.querySelectorAll('input'));
		let thisSubmitBtn = thisForm.querySelector('.link-settings-form-submit-btn');
		let thisShortLink = event.target.closest('.link').querySelector('.short-link').value;
		let thisLinkData = panel.page[panel.currentPage].linksData.find(link => link.shortLink === thisShortLink)

		let isValid = false;
		let validatedInputs = thisFormInputs.map(input => {
			return validateShortenerFilledInput(input);
		});
		isValid = validatedInputs.every(input => input === true);

		if (isValid) {
			thisSubmitBtn.classList.add('loader');
			thisSubmitBtn.innerText = '';
			thisFormInputs.forEach(input => input.setAttribute('disabled', 'disabled'));

			let objFromInputs = createObjectFromInputs(thisFormInputs);
			if (objFromInputs.linkName === thisLinkData.linkName) delete objFromInputs.linkName;
			if (objFromInputs.linkPassword === thisLinkData.linkPassword) delete objFromInputs.linkPassword;
			if (Object.keys(objFromInputs).length !== 0) {
				objFromInputs.shortLink = thisShortLink;
				let jsonForReq = JSON.stringify(objFromInputs);

				let { response } = await user.sendRequest('PATCH', CHANGE_LINKS_API, jsonForReq);

				if (response.ok) {
					await panel.getLinks();
					panel.createPages();
					panel.render();
				} else alert('Не получилось изменить данные ссылки :( \nПожалуйста, попробуйте позже');

			} else alert('Данные не изменились');

			thisSubmitBtn.classList.remove('loader');
			thisSubmitBtn.innerText = 'Сохранить';
			thisFormInputs.forEach(input => input.removeAttribute('disabled'));
		}
	},

	sortByDate: function() {
		let renderLinksTimeout = setTimeout(() => {
			this.renderLinks();
			this.sortLinksBtn.removeAttribute('disabled');
			clearTimeout(renderLinksTimeout);
		}, 200);
		this.sortLinksBtn.setAttribute('disabled', 'disabled');
		this.sortLinksBtn.classList.toggle('sort__button--down');
		this.links.reverse();
		this.createPages();
	},
};
 
async function enablePanel() {
	panel.mainSection.renderComponent('<div class="panel flex"><div class="loader"></div></div>');
	await panel.getLinks();
	if (panel.links) {
		panel.createPages();
		panel.render();
	}
}

export default enablePanel;
