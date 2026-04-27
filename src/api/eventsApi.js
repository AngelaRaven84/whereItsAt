import axios from 'axios';

const API_URL = 'https://santosnr6.github.io/Data/events.json';

export async function getEvents() {
	const response = await axios.get(API_URL);
	return response.data.events;
}

export async function getEventsById(id) {
	const events = await getEvents();
	return events.find((event) => event.id === id);
}

// const response = await axios.get(API_URL);
// 	const events = response.data.events;
// 	return events.find((event) => event.id === id);
