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
							<svg class="theme-list__remove-icon" role="img" aria-hidden="true">
			          <use xlink:href="_assets/sprite.svg#remove"/>
		          </svg>
						</button>
			</div>
    </article>
  </li>
`;
};

const createStarIcon = isFilled => {
	return `
    <svg class="${
			isFilled ? 'theme-list__rating-star--fill' : 'theme-list__rating-star'
		}" role="img" aria-label="Star">
		<use xlink:href="_assets/sprite.svg#star"/>
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
