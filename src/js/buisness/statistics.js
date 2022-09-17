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
		renameKeyInObj(data.device, '1', 'Телефон');	
		renameKeyInObj(data.device, '2', 'ПК');	
		renameKeyInObj(data.device, '3', 'Другое');	
		for (let key in data.device) { if (data.device[key] === 0) delete data.device[key] }
		let deviceChart = CreateChart({
			name: 'device',
			type: 'doughnut',
			labels: Object.keys(data.device),
			data,
			linkId,
		});
		
		renameKeyInObj(data.os, '1', 'Android');
		renameKeyInObj(data.os, '2', 'Windows');
		renameKeyInObj(data.os, '3', 'Iphone');
		renameKeyInObj(data.os, '4', 'Ipad');
		renameKeyInObj(data.os, '5', 'Linux');
		renameKeyInObj(data.os, '6', 'Macbook');
		renameKeyInObj(data.os, '7', 'Другое');
		for (let key in data.os) { if (data.os[key] === 0) delete data.os[key] }
		let osChart = CreateChart({
			name: 'os',
			type: 'doughnut',
			labels: Object.keys(data.os),
			data,
			linkId,
		});

		let countryChart = CreateChart({
			name: 'country',
			type: 'pie',
			labels: Object.keys(data.country),
			data,
			linkId,
		});

		let hoursChart = CreateChart({
			name: 'hours',
			type: 'line',
			labels: ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00', '24:00'],
			legend: false,
			data,
			linkId,
			radius: 5,
		});

		let daysChart = CreateChart({
			name: 'days',
			type: 'bar',
			labels: ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС'],
			legend: false,
			data,
			linkId,
		});

		return [deviceChart, osChart, countryChart, hoursChart, daysChart];

	} else {
		switch (charts) {
			case 0:
				renameKeyInObj(data.device, '1', 'Телефон');
				renameKeyInObj(data.device, '2', 'ПК');
				renameKeyInObj(data.device, '3', 'Другое');
				for (let key in data.device) { if (data.device[key] === 0) delete data.device[key] }
				return CreateChart({
					name: 'device',
					type: 'doughnut',
					labels: Object.keys(data.device),
					data,
					linkId,
				});
				break;
			case 1:
				renameKeyInObj(data.os, '1', 'Android');
				renameKeyInObj(data.os, '2', 'Windows');
				renameKeyInObj(data.os, '3', 'Iphone');
				renameKeyInObj(data.os, '4', 'Ipad');
				renameKeyInObj(data.os, '5', 'Linux');
				renameKeyInObj(data.os, '6', 'Macbook');
				renameKeyInObj(data.os, '7', 'Другое');
				for (let key in data.os) { if (data.os[key] === 0) delete data.os[key] }
				return CreateChart({
					name: 'os',
					type: 'doughnut',
					labels: Object.keys(data.os),
					data,
					linkId,
				});
				break;
			case 2:
				return CreateChart({
					name: 'country',
					type: 'pie',
					labels: Object.keys(data.country),
					data,
					linkId,
				});
				break;
			case 3:
				return CreateChart({
					name: 'hours',
					type: 'line',
					labels: ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00', '24:00'],
					legend: false,
					data,
					linkId,
					radius: 5,
				});
				break;
			case 4:
				return CreateChart({
					name: 'days',
					type: 'bar',
					labels: ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС'],
					legend: false,
					data,
					linkId,
				});
				break;
		}
	}
}

function CreateChart(options) {
	const config = {
		type: options.type,
		data: {
			labels: options.labels,
			datasets: [{
				data: Object.values(options.data[options.name]),
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
				duration: 0,
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