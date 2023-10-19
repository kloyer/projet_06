// Function to retrieve photographer data from a JSON file.
async function getPhotographers() {
    try {
        // Attempt to fetch data from the JSON file.
        const response = await fetch("./data/photographers.json");
        
        // If the request isn't successful, throw an error.
        if (!response.ok) {
            throw new Error(`HTTP Error! Status: ${response.status}`);
        }

        // Return the data from the JSON file.
        return await response.json();
    } catch (error) {
        console.error("Error while fetching photographers:", error);
        // Return an empty object in case of an error to prevent further issues.
        return { photographers: [] };
    }
}

// Function to display photographers on the page.
async function displayData(photographers) {
    try {
        // Select the section where photographer cards will be appended.
        const sectionPhotographers = document.querySelector(".photographer_section");

        // If the section doesn't exist, throw an error.
        if (!sectionPhotographers) {
            throw new Error("Unable to find the .photographer_section element in the document.");
        }

        // Create a document to batch append photographer cards.
        const batchAppend = document.createDocumentFragment();

        // For each photographer, create a card and add it to the fragment.
        photographers.forEach((photographer) => {
            const photographerCard = new PhotographerCard(photographer);
            const cardDOM = photographerCard.getUserCardDOM();
            batchAppend.appendChild(cardDOM);
        });

        // Append the entire fragment to the section.
        sectionPhotographers.appendChild(batchAppend);
    } catch (error) {
        console.error("Error while displaying the data:", error);
    }
}

// Initialization function to fetch and display the data.
async function init() {
    try {
        const { photographers } = await getPhotographers();
        // Check if photographers exist before trying to display them.
        if (photographers && photographers.length) {
            displayData(photographers);
        } else {
            console.warn("No photographers found for display.");
        }
    } catch (error) {
        console.error("Error during initialization:", error);
    }
}

// When the DOM content is loaded, execute the initialization function.
document.addEventListener("DOMContentLoaded", init);
