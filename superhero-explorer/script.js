document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const resultContainer = document.getElementById('resultContainer');
    let heroesData = [];

    // Fetch data from local JSON file
    fetch('data.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            heroesData = data;
            renderEmptyState();
        })
        .catch(error => {
            console.error('Error fetching superhero data:', error);
            resultContainer.innerHTML = `
                <div class="not-found">
                    <h2>Error</h2>
                    <p>Failed to load superhero data. Please try again later.</p>
                </div>
            `;
        });

    // Search input event listener
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.trim().toLowerCase();
        
        if (query === '') {
            renderEmptyState();
            return;
        }

        const filteredHeroes = heroesData.filter(hero => 
            hero.name.toLowerCase().includes(query)
        );

        if (filteredHeroes.length > 0) {
            renderHeroCards(filteredHeroes);
        } else {
            renderNotFound();
        }
    });

    function renderEmptyState() {
        resultContainer.innerHTML = `
            <div class="empty-state">
                <p>Type a superhero name to discover their details...</p>
            </div>
        `;
    }

    function renderNotFound() {
        resultContainer.innerHTML = `
            <div class="not-found">
                <h2>Hero Not Found</h2>
                <p>No superhero or villain matches your search. Try another name!</p>
            </div>
        `;
    }

    function renderHeroCards(heroes) {
        resultContainer.innerHTML = heroes.map(hero => {
            const universeClass = hero.universe.toLowerCase() === 'marvel' ? 'marvel' : 'dc';
            const powersHtml = hero.powers.map(power => `<li class="power-tag">${power}</li>`).join('');

            return `
                <article class="hero-card ${universeClass}">
                    <div class="hero-image-container">
                        <span class="universe-badge ${universeClass}">${hero.universe}</span>
                        <img src="${hero.image}" alt="${hero.name}" class="hero-image" loading="lazy">
                    </div>
                    <div class="hero-info">
                        <h2 class="hero-name">${hero.name}</h2>
                        
                        <h3 class="section-title">Powers & Abilities</h3>
                        <ul class="powers-list">
                            ${powersHtml}
                        </ul>
                        
                        <h3 class="section-title">Biography</h3>
                        <p class="hero-bio">${hero.bio}</p>
                    </div>
                </article>
            `;
        }).join('');
    }
});
