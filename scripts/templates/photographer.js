// The PhotographerCard class represents the profile of an individual photographer.
/* exported PhotographerCard */
class PhotographerCard {

    // The constructor initializes the properties of the photographer.
    constructor(data) {
        this.city = data.city;
        this.country = data.country;
        this.id = data.id;
        this.name = data.name;
        this.portrait = data.portrait;
        this.price = data.price;
        this.tagline = data.tagline;
    }

    // Creates and returns the DOM structure for the photographer's card.
    getUserCardDOM() {
        const portraitPath = `assets/photographers/profile/${this.portrait}`;

        const container = document.querySelector('.photographer_section');

        // Create the link for the photographer's profile.
        const link = document.createElement('a');
        link.href = `./photographer.html?id=${this.id}`;
        //link.setAttribute('tabindex', '1');
        link.setAttribute('aria-label', `Profil de ${this.name}`);

        const article = document.createElement('article');
        article.setAttribute('tabindex', '1');
        article.setAttribute('aria-label', 'Informations sur le photographe');

        const h2 = document.createElement('h2');
        h2.textContent = this.name;
        


        const img = document.createElement('img');
        img.src = portraitPath;
        img.alt = `Photo of ${this.name}`;
        

        article.appendChild(img);

        article.setAttribute('tabindex', '1');
        article.setAttribute('aria-label', 'infos');

        article.appendChild(h2);

        const location = document.createElement('p');
        location.textContent = `${this.city}, ${this.country}`;

        const tagline = document.createElement('p');
        tagline.textContent = this.tagline;

        const price = document.createElement('p');
        price.textContent = `${this.price}€`;

        // Add the location, tagline, and price to the div container.
        article.appendChild(location);
        article.appendChild(tagline);
        article.appendChild(price);

        // Add the div container to the main card.
        link.appendChild(article);
        container.appendChild(link);

        return link;
    }
}
