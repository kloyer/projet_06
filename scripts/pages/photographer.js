const searchParams = new URLSearchParams(location.search)
const photographerId = searchParams.get('id')
let photographer
let medias

;(async () => {
    try {
        const response = await fetch("./data/photographers.json");
        if (!response.ok) {
            throw new Error(`HTTP Error! Status: ${response.status}`);
        }
        const data = await response.json()
		photographer = data.photographers.find((p) => p.id == photographerId);
		medias = data.media.filter((media) => media.photographerId == photographerId);

		fillHeader(photographer);
		orderMedias(photographer);
		displayLikeAndPricePopup(medias, photographer.price);
		addEventListener('keydown', (event) => {
			/*global media_modal*/
			if (media_modal.style.display && media_modal.style.display !== 'none') {
				if (event.code === 'ArrowLeft') {
					return changeMedia('left')
				}
				if (event.code === 'ArrowRight') {
					return changeMedia('right')
				}
				if (event.code === 'Escape') {
					return closeMediaModal()
				}
			}
			/*global contact_modal*/
			if (contact_modal.style.display && contact_modal.style.display !== 'none') {
				if (event.code === 'Escape') {
					contact_modal.style.display = 'none'
				}
			}
		})
		/*global orderSelect*/
		orderSelect.onchange = ({ target: { value } }) => orderMedias(photographer, value)

		const contactTitle = document.querySelector('#contact_modal h2')
		contactTitle.textContent += ' ' + photographer.name
    } catch (error) {
        console.error("Error while fetching photographers:", error);
        return { photographers: [] };
    }
})()

// Fill the header with photographer informations
function fillHeader(photographer) {
	const { name, city, country, tagline, portrait } = photographer
	const nameElement = document.querySelector('.photograph_infos > h1')
	const locationElement = document.querySelector('.photograph_infos > p:nth-child(2)')
	const taglineElement = document.querySelector('.photograph_infos > p:last-child')

	nameElement.textContent = name
	locationElement.textContent = city + ', ' + country
	taglineElement.textContent = tagline

	const header = document.querySelector('.photograph-header')
	const image = document.createElement('img')

	image.src = `assets/photographers/profile/${portrait}`
	image.alt = photographer.name

	header.appendChild(image)
}

function displayLikeAndPricePopup(medias, price) {
    const element = document.querySelector('.photograph_like-price_popup');

    const totalLikes = element.querySelector('.likes');
    const dayPrice = element.querySelector('.price');

    totalLikes.innerHTML = medias.reduce((sum, media) => sum + media.likes, 0) + ' <i class="give-like fa-solid fa-heart"></i>';
    dayPrice.textContent = price + '€ / jour';
}


// Display all medias of the photographer
function displayMedias(photographer, medias) {
	const mediasSection = document.getElementById('photograph_medias')
	mediasSection.innerHTML = ''

	for (const media of medias) {
		/* global MediaFactory */
		const { link } = MediaFactory.createMedia(media, photographer.id);
		mediasSection.appendChild(link)
	}
}

function orderMedias(photographer, option = 'pop') {
	switch (option) {
		case 'pop': {
			medias.sort((a, b) => b.likes - a.likes)
			break
		}
		case 'date': {
			medias.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
			break
		}
		case 'title': {
			medias.sort((a, b) => a.title.localeCompare(b.title))
			break
		}
	}
	displayMedias(photographer, medias);
}

function changeMedia(direction) {
	const media = media_modal.children[media_modal.children.length - 1].children[0]
	media_modal.children[media_modal.children.length - 1].children[1].remove()
	const mediaSrc = media.src.split('/').pop()
	const mediaIndex = medias.indexOf(medias.find((el) => (el.video ?? el.image) === mediaSrc))
	media.remove()
	let newIndex = direction === 'left' ? mediaIndex - 1 : mediaIndex + 1

	if (newIndex < 0) {
		newIndex = medias.length - 1
	} else if (newIndex >= medias.length) {
		newIndex = 0
	}

	const mediaElement = medias[newIndex].video ? document.createElement('video') : document.createElement('img')
	const spanName = document.createElement('span')

	mediaElement.src = `./assets/photographers/medias/${photographer.id}/${medias[newIndex].video ?? medias[newIndex].image}`
	mediaElement.alt = medias[newIndex].title
	spanName.textContent = medias[newIndex].title

	media_modal.children[media_modal.children.length - 1].appendChild(mediaElement)
	media_modal.children[media_modal.children.length - 1].appendChild(spanName)
}

function closeMediaModal() {
	media_modal.children[media_modal.children.length - 1].innerHTML = ''
	media_modal.style.display = 'none'
	document.body.style.overflow = 'auto'
}