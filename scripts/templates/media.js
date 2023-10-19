/* exported MediaFactory */
class MediaFactory {
    static createMedia(data, photographerId) {
        if (data.video) {
            return new VideoMedia(data, photographerId).createElement();
        } else if (data.image) {
            return new ImageMedia(data, photographerId).createElement();
        }
        throw new Error('Invalid media data');
    }
}

class VideoMedia {
    constructor(data, photographerId) {
        this.data = data;
        this.id = photographerId;
    }

    createElement() {
        const article = document.createElement('article');
        const link = document.createElement('a');
        const mediaElement = document.createElement('video');
        mediaElement.alt = `Vidéo intitulée ${this.data.title}`;
        mediaElement.setAttribute('aria-label', 'Contrôles de la vidéo');
        const divInfos = document.createElement('div');
        const spanName = document.createElement('span');
        spanName.classList.add('name');
        const spanLike = document.createElement('span');
        spanLike.classList.add('like');
        spanLike.setAttribute('tabindex', '0');
        spanLike.setAttribute('aria-label', 'Bouton pour aimer la vidéo');
        spanLike.setAttribute('liked', 'false');
        
        article.dataset.id = this.data.id;
        link.href = '#';
        mediaElement.src = `./assets/photographers/medias/${this.id}/${this.data.video}`;
        mediaElement.alt = this.data.title;
        mediaElement.controls = false;
        mediaElement.autoplay = false;
        
        spanName.textContent = this.data.title;
        spanLike.innerHTML = this.data.likes + ' <i class="give-like fa-solid fa-heart"></i>';
        
        divInfos.appendChild(spanName);
        divInfos.appendChild(spanLike);
        
        link.appendChild(article);
        article.appendChild(mediaElement);
        article.appendChild(divInfos);


        link.onclick = (event) => {
            event.preventDefault();
            if (event.target.classList.contains('like')) return;
            
            const mediaModal = document.querySelector('#media_modal');
            mediaModal.children[mediaModal.children.length - 1].appendChild(mediaElement.cloneNode());
            mediaModal.children[mediaModal.children.length - 1].children[0].controls = true;
            mediaModal.children[mediaModal.children.length - 1].appendChild(spanName.cloneNode(true));
            mediaModal.style.display = 'inherit';
            document.body.style.overflow = 'hidden';
        };

        spanLike.onclick = (event) => {
            if (event.target.getAttribute('liked') == "false") {
                this.data.likes += 1;
                event.target.setAttribute('liked', 'true');
                console.log('like ++');
            } else if (event.target.getAttribute('liked') == "true") {
                this.data.likes -= 1;
                event.target.setAttribute('liked', 'false');
                console.log('like --');
            }
            spanLike.innerHTML = this.data.likes + ' <i class="give-like fa-solid fa-heart"></i>';
            /*global displayLikeAndPricePopup, medias, photographer*/
            displayLikeAndPricePopup(medias, photographer.price);
        };

        return { link, mediaElement };
    }
}

class ImageMedia {
    constructor(data, photographerid) {
        this.data = data;
        this.id = photographerid;
    }

    createElement() {
        const article = document.createElement('article');
        const link = document.createElement('a');
        const mediaElement = document.createElement('img');
        mediaElement.alt = `Image intitulée ${this.data.title}`;
        mediaElement.setAttribute('aria-label', 'Image');
        const divInfos = document.createElement('div');
        const spanName = document.createElement('span');
        spanName.classList.add('name');
        const spanLike = document.createElement('span');
        spanLike.classList.add('like');
        spanLike.setAttribute('tabindex', '0');
        spanLike.setAttribute('aria-label', "Bouton pour aimer l'image");
        spanLike.setAttribute('liked', 'false');
        
        article.dataset.id = this.data.id;
        link.href = '#';
        mediaElement.src = `./assets/photographers/medias/${this.id}/${this.data.image}`;
        mediaElement.alt = this.data.title;
        
        spanName.textContent = this.data.title;
        spanLike.innerHTML = parseInt(this.data.likes) + ' <i class="give-like fa-solid fa-heart"></i>';
        
        divInfos.appendChild(spanName);
        divInfos.appendChild(spanLike);
        
        link.appendChild(article);
        article.appendChild(mediaElement);
        article.appendChild(divInfos);


        link.onclick = (event) => {
            event.preventDefault();
            if (event.target.classList.contains('like') || event.target.classList.contains('give-like')) return;
            
            const mediaModal = document.querySelector('#media_modal');
            mediaModal.children[mediaModal.children.length - 1].appendChild(mediaElement.cloneNode());
            mediaModal.children[mediaModal.children.length - 1].children[0].controls = true;
            mediaModal.children[mediaModal.children.length - 1].appendChild(spanName.cloneNode(true));
            mediaModal.style.display = 'inherit';
            document.body.style.overflow = 'hidden';
        };

        spanLike.onclick = (event) => {
            if (event.target.getAttribute('liked') == "false") {
                this.data.likes += 1;
                event.target.setAttribute('liked', 'true');
                console.log('like ++');
            } else if (event.target.getAttribute('liked') == "true") {
                this.data.likes -= 1;
                event.target.setAttribute('liked', 'false');
                console.log('like --');
            }
            spanLike.innerHTML = this.data.likes + ' <i class="give-like fa-solid fa-heart"></i>';
            /*global displayLikeAndPricePopup, medias, photographer*/
            displayLikeAndPricePopup(medias, photographer.price);
        };

        return { link, mediaElement };
    }
}
