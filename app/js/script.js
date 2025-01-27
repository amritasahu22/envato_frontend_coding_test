/* API endpoint*/
const API_URL = 'https://envato.github.io/front-end-coding-test/test.json';

document.addEventListener('DOMContentLoaded', async () => {
	const itemList = document.getElementById('theme-list');
	const loadingIndicator = document.getElementById('theme-loading');
	const errorMessage = document.getElementById('error-message');

	//Fetch data from API
	try {
		const response = await fetch(API_URL);

		if (!response.ok) {
			throw new Error('Network response failure:', response.status);
		}

		const data = await response.json();
		console.log('Fetched data success:', data.items);

		//Render items
		renderItems(data.items, itemList);
	} catch (error) {
		console.error('Error fetching items:', error);
		errorMessage.style.display = 'block';
	} finally {
		loadingIndicator.style.display = 'none';
	}
});

const renderItems = (items, container) => {
	container.innerHTML = items.map(createItemHTML).join('');
};

const createItemHTML = item => {
	//Create responsive image sources
	const coverImageSources = item.cover_image
		.map(
			image =>
				`<source srcset="${image.url}" media="(min-width: ${image.width}px)">`
		)
		.reverse()
		.join('');

	return `
  <li class="theme-list__item" aria-label="${item.title}">
    <article class="theme-list__details">
      <picture>
        ${coverImageSources}
        <img src="${item.cover_image[0].url}" 
          width="${item.cover_image[0].width}"
          class="theme-list__image" 
          alt="${item.title} cover image" />
      </picture>
      <h2 class="theme-list__title">${item.title}</h2>
      <p class="theme-list__author">
        <span class="theme-list__author-by">by</span> ${item.author}
      </p>
    </article>
  </li>
`;
};
