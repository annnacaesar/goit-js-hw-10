import './css/styles.css';
import debounce from 'lodash.debounce';
import fetchCountry from './js/fetchCountries'
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import countriesList from './templates/countries-list.hbs'
import countriesInfo from './templates/countries-info.hbs'

const DEBOUNCE_DELAY = 300;

const inputRef = document.querySelector('#search-box');
const listRef = document.querySelector('.country-list');
const containerRef = document.querySelector('.country-info');

inputRef.addEventListener('input', debounce(onFetchCountry, DEBOUNCE_DELAY));

function onFetchCountry (event) {
	event.preventDefault();

	const valueInput = event.target.value.trim();
	listRef.innerHTML = '';
	containerRef.innerHTML = '';


	fetchCountry(valueInput)
	.then(response => {
		console.log(response.length)
		console.log(response);
	if(response.length > 10){
		Notify.info("Too many matches found. Please enter a more specific name.")
	} else if(response.length >= 2 && response.length <= 10) {
		renderCountryList(response);
	} else if( response.length === 1){
		renderCountryInfo(response);
	}
	})
	.catch(error => Notify.failure('Oops, there is no country with that name'));
};

function renderCountryList (country) {
	listRef.innerHTML = countriesList(country)
}

function renderCountryInfo (country) {
	listRef.innerHTML = countriesList(country);
	containerRef.innerHTML = countriesInfo(country);
}

