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

		//Sort by rating (highest to lowest)
		const sortedItems = data.items.sort((a, b) => b.rating - a.rating);

		//Render items
		renderItems(sortedItems, itemList);
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

	const starIcons = Array(5)
		.fill(null)
		.map((_, index) => createStarIcon(index < Math.floor(item.rating)))
		.join('');

	const removeIcon = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 101.6 101.6" class="theme-list__remove-icon" role="img" aria-hidden="true">
	 	  <path d="M10.5 0c5.3-.1 7.4 2.2 9.9 4.8 1.2 1.2 2.5 2.4 3.7 3.6 6.4 6.3 12.7 12.6 19.1 18.8C45 29 50 34.6 51 34.9l5.1-5.1 11.4-11.4c2.6-2.5 5.1-5 7.7-7.6 1.5-1.5 2.9-3.2 4.6-4.5.3-.4.7-.8 1-1.1 1-1 2.1-2.1 3.3-3l.9-.9c.7-.5 1.6-.5 2.5-.8 5.7-1.8 10.3 1.6 12.6 4.9.6.8.7 1.7 1 2.8 2 6.7-2.3 10.3-5.5 13.5-6.8 6.9-13.7 13.8-20.5 20.7-2 2-8.1 7.6-8.4 8.5l7.7 7.7 8.1 8.1c1.4 1.4 2.9 2.7 4.1 4.2 1.2 1.2 2.4 2.3 3.6 3.5 2.2 2.2 4.3 4.5 6.5 6.7 1.2 1.2 2.6 2.3 3.5 3.7.5.7.5 1.6.8 2.5 1.8 5.7-1.6 10.3-4.9 12.6-.7.5-1.9.9-2.8 1.1-6.8 2-10.4-2.7-13.5-5.7C73 88.6 66.1 81.8 59.3 75c-2-2-7.6-8.1-8.5-8.4l-7.6 7.6-7.9 7.9c-1.4 1.4-2.6 2.9-4.1 4-.9.9-1.7 1.8-2.6 2.7-1.3 1.2-2.6 2.5-3.8 3.7-1 1-1.8 2-2.9 2.8-1 .8-1.7 1.9-2.8 2.7-.8.6-1.4 1.6-2.3 2.2-.7.5-1.6.5-2.5.8-5.7 1.8-10.3-1.6-12.6-4.9-.5-.7-.9-1.9-1.1-2.8-2-6.8 2.7-10.4 5.7-13.5C13.1 73 19.8 66 26.6 59.1c2-2 8.1-7.6 8.4-8.5l-9.1-9.1C19.3 35 12.8 28.3 6.2 21.7c-2.5-2.5-7.4-6.5-6-12.2 1-4.1 3.2-7.2 6.7-8.7C7.8.6 8.6.3 9.5.1c.4-.1.8 0 1-.1z"/>
	  </svg>`;

	return `
  <li class="theme-list__item" aria-label="${item.title}">
    <article class="theme-list__details">
      ${
				Math.floor(item.rating) === 5
					? '<div class="theme-list__top-rated">TOP RATED!</div>'
					: ''
			}
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

      <div class="theme-list__rating">
						<span>${starIcons}</span>
						<button class="theme-list__btn-remove" aria-label="Remove">
							<span>REMOVE</span>
							${removeIcon}
						</button>
			</div>
    </article>
  </li>
`;
};

const createStarIcon = isFilled => {
	return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 47.5" class="${
			isFilled ? 'theme-list__rating-star--fill' : 'theme-list__rating-star'
		}" role="img" aria-label="Star">
      <path d="M34.5 29.4l5.9 18.1L25 36.3 9.6 47.5l5.9-18.1L0 18.1h19.1L25 0l5.9 18.1H50z"/>
    </svg>`;
};

//Event delegation for remove button
document.getElementById('theme-list').addEventListener('click', event => {
	const element = event.target.closest('.theme-list__btn-remove');
	if (element) {
		removeItem(element);
	}
});

const removeItem = element => {
	const item = element.closest('.theme-list__item');
	console.log('Removing item:', item);
	item.remove();
	checkNoItemToRemove();
};

const checkNoItemToRemove = () => {
	const itemList = document.getElementById('theme-list');
	const noItemsMessage = document.getElementById('no-items-message');
	if (itemList.children.length === 0) {
		noItemsMessage.style.display = 'block';
	} else {
		noItemsMessage.style.display = 'none';
	}
};
