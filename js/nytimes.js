// The URL for the Article Search API at nytimes.com
const baseURL = 'https://api.nytimes.com/svc/search/v2/articlesearch.json';
// STEP 1: Get your own API key and paste it below…
const key = 'ajHuiZdBc3J89usJJyWocrCGnSFPDfPW';
let url;
// Grab references to all the DOM elements you'll need to manipulate
const searchTerm = document.querySelector('.search');
const startDate = document.querySelector('.start-date');
const endDate = document.querySelector('.end-date');
const searchForm = document.querySelector('form');
const submitBtn = document.querySelector('.submit');
const section = document.querySelector('section');
// STEP 2: Add a submit event listener for the search form, 
//referencing the fetchResults function as the callback
searchForm.addEventListener('submit', fetchResults);

// Functions
function fetchResults(event) {
    // Use preventDefault() to stop the form submitting
    event.preventDefault();
    // STEP 3: Assemble the full URL, according to the API documentation at the New York Times
    url = `${baseURL}?q=${searchTerm.value}&api-key=${key}`;

    if (startDate.value !== '') {
        url += `&begin_date=${startDate.value}`;
    }
    if (endDate.value !== '') {
        url += `&end_date=${endDate.value}`;
    }

    console.log(url);

    // STEP 4: Use fetch() to pass the URL that we built as a request to the API service, 
    //then pass the JSON to the displayResults() function
    fetch(url)
        .then(response => response.json())
        .then(json => displayResults(json))
        .catch(error => console.log('Error fetching data:', error));
}

function displayResults(json) {
    // STEP 5: Log to the console the results from the API
    console.log(json);

    // Clear out the old results…
    section.innerHTML = '';

    // STEP 6: Create the variable articles to capture the articles from the JSON object
    const articles = json.response.docs;

    if (articles.length === 0) {
        const para = document.createElement('p');
        para.textContent = 'No results returned.';
        section.appendChild(para);
    } else {
        articles.forEach(article => {
            const articleElement = document.createElement('article');
            const heading = document.createElement('h2');
            const link = document.createElement('a');
            const img = document.createElement('img');
            const para1 = document.createElement('p');

            link.href = article.web_url;
            link.textContent = article.headline.main;
            para1.textContent = article.snippet;

            if (article.multimedia.length > 0) {
                img.src = `https://www.nytimes.com/${article.multimedia[0].url}`;
                img.alt = article.headline.main;
            }

            // STEP 8: Put each article together as an ARTICLE element and append it as a child of the SECTION element in the HTML
            articleElement.appendChild(heading);
            heading.appendChild(link);
            articleElement.appendChild(img);
            articleElement.appendChild(para1);
            section.appendChild(articleElement);
        });
    }
}
