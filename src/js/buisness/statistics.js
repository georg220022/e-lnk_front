import {
  Chart,
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  DoughnutController,
  LineController,
  PieController,
  CategoryScale,
  LinearScale,
  Legend,
  Tooltip,
} from 'chart.js';

Chart.register(
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  DoughnutController,
  LineController,
  PieController,
  CategoryScale,
  LinearScale,
  Legend,
  Tooltip,
);

import renameKeyInObj from '../utils/renameKeyInObj.js';
import getWindowWidth from '../utils/getWindowWidth.js';

function enableStatistics(data, linkId, charts = 'all') {
	if (charts === 'all') {
		let deviceChart = CreateChart({
			name: 'device',
			type: 'doughnut',
			nonZeroLabels: ['Телефон', 'ПК', 'Другое'],
			zeroLabel: 'Устройства',
			data : {...data.device},
			linkId,
		});

		let osChart = CreateChart({
			name: 'os',
			type: 'doughnut',
			nonZeroLabels: ['Android', 'Windows', 'Iphone', 'Ipad', 'Linux', 'Macbook', 'Другое'],
			zeroLabel: 'Операционные системы',
			data : {...data.os},
			linkId,
		});

		let countryChart = CreateChart({
			name: 'country',
			type: 'pie',
			zeroLabel: 'Страны',
			data : {...data.country},
			linkId,
		});

		let hoursChart = CreateChart({
			name: 'hours',
			type: 'line',
			labels: ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00', '24:00'],
			legend: false,
			data : {...data.hours},
			linkId,
			radius: 5,
		});

		let daysChart = CreateChart({
			name: 'days',
			type: 'bar',
			labels: ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС'],
			legend: false,
			data : {...data.days},
			linkId,
		});

		return [deviceChart, osChart, countryChart, hoursChart, daysChart];
	} else {
		switch (charts) {
			case 0:
				return CreateChart({
					name: 'device',
					type: 'doughnut',
					nonZeroLabels: ['Телефон', 'ПК', 'Другое'],
					zeroLabel: 'Устройства',
					data : {...data.device},
					linkId,
				});
			case 1:
				return CreateChart({
					name: 'os',
					type: 'doughnut',
					nonZeroLabels: ['Android', 'Windows', 'Iphone', 'Ipad', 'Linux', 'Macbook', 'Другое'],
					zeroLabel: 'Операционные системы',
					data : {...data.os},
					linkId,
				});
			case 2:
				return CreateChart({
					name: 'country',
					type: 'pie',
					zeroLabel: 'Страны',
					data : {...data.country},
					linkId,
				});
			case 3:
				return CreateChart({
					name: 'hours',
					type: 'line',
					labels: ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00', '24:00'],
					legend: false,
					data : {...data.hours},
					linkId,
					radius: 5,
				});
			case 4:
				return CreateChart({
					name: 'days',
					type: 'bar',
					labels: ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС'],
					legend: false,
					data : {...data.days},
					linkId,
				});
		}
	}
}

function CreateChart(options) {
	// show zero values when all values are zero or show only filled values
	if (options.type === 'doughnut' || options.type === 'pie') {
		const allValuesAreZero = Object.values(options.data).every(value => value === 0);
		if (allValuesAreZero) {
			options.data = { [options.zeroLabel]: 0.0001 };
		} else {
			if (options.name === 'device' || options.name === 'os') {
				for (let key in options.data) {
					if (options.data[key] === 0) delete options.data[key];
				}

				for (let i = 0; i < options.nonZeroLabels.length; i++) {
					const oldKey = i + 1;
					const newKey = options.nonZeroLabels[i];
					if (Object.keys(options.data).includes(oldKey.toString())) {
						renameKeyInObj(options.data, oldKey, newKey);
					}
				}
			}
		}
	}

	const config = {
		type: options.type,
		data: {
			labels: options.labels ? options.labels : Object.keys(options.data),
			datasets: [{
				data: Object.values(options.data),
				backgroundColor: options.type === 'line' || options.type === 'bar' ? 'rgba(61, 150, 229, 0.6)' : [
					'rgba(61, 150, 229, 0.6)',
					'rgba(12, 188, 139, 0.6)',
					'rgba(159,138,201, 0.6)',
					'rgba(60, 163, 181, 0.6)',
					'rgba(242, 217, 90, 0.6)',
					'rgba(22, 108, 85, 0.6)',
					'rgba(255, 130, 20, 0.6)',
					'rgba(129, 211, 255, 0.6)',
					'rgba(208, 75, 213, 0.5)',
					'rgba(124, 124, 124, 0.6)',
				],
				borderColor: options.type === 'line' || options.type === 'bar' ? 'rgb(61, 150, 229)' : [
					'rgb(61, 150, 229)',
					'rgb(12, 188, 139)',
					'rgb(159,138,201)',
					'rgb(60, 163, 181)',
					'rgb(242, 217, 90)',
					'rgb(22, 108, 85)',
					'rgb(255, 130, 20)',
					'rgb(129, 211, 255)',
					'rgb(208, 75, 213)',
					'rgba(124, 124, 124)',
				],
				borderWidth: 1,
				tension: 0.4,
				minBarLength: 5,
			}]
		},
		options: {
			normalized: true,
			responsive: true,
			radius: options.radius ? options.radius : undefined,
			hitRadius: 30,
			hoverRadius: 8,
			hoverBorderColor: 'rgb(61, 150, 229)',
			animation: {
				duration: 800,
			},
			scales: {
				y: {
					display: options.type === 'line' || options.type === 'bar',
					min: 0,
					ticks: {
						stepSize: 1,
					},
				},
			},
			plugins: {
				tooltip: {
					backgroundColor: 'rgb(255, 255, 255)',
					bodyColor: 'rgb(53, 54, 66)',
					titleColor: 'rgb(53, 54, 66)',
					footerColor: 'rgb(53, 54, 66)',
					padding: 10,
					borderColor: 'rgb(61, 150, 229)',
					titleAlign: 'center',
					bodyAlign: 'center',
					boxPadding: 3,
					borderWidth: 1,
					titleMarginBottom: 2,
					titleFont: {
						family: 'Roboto',
						size: 12,
						weight: 'normal',
					}
				},
				legend: {
					display: options.legend,
					labels: {
						font: {
							family: 'Roboto',
							size: 16,
						}
					}
				}
			}
		}
	};

	if (getWindowWidth() < '1160') config.options.plugins.legend.labels.font.size = 12;

	return new Chart(document.getElementById(`${options.name}-chart-${options.linkId}`).getContext('2d'), config);
}

export default enableStatistics;