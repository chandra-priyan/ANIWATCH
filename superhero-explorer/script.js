document.addEventListener('DOMContentLoaded', () => {
    const chatInput = document.getElementById('chatInput');
    const sendBtn = document.getElementById('sendBtn');
    const chatHistory = document.getElementById('chatHistory');
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
        })
        .catch(error => {
            console.error('Error fetching superhero data:', error);
            addMessage("Oops! I couldn't load my superhero database. Try again later.", true);
        });

    function addMessage(content, isBot = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isBot ? 'bot-message' : 'user-message'}`;
        
        messageDiv.innerHTML = `
            <div class="message-content">
                ${content}
            </div>
        `;
        
        chatHistory.appendChild(messageDiv);
        
        // Scroll to the bottom
        chatHistory.scrollTop = chatHistory.scrollHeight;
    }

    function generateHeroCardHtml(hero) {
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
    }

    function handleUserInput() {
        const text = chatInput.value.trim();
        if (!text) return;

        // 1. Add user's message
        addMessage(text, false);
        chatInput.value = '';

        // 2. Process bot response (simulate slight delay)
        setTimeout(() => {
            const lowerText = text.toLowerCase();
            
            // Look for any superhero in the data
            const foundHeroes = heroesData.filter(hero => 
                lowerText.includes(hero.name.toLowerCase())
            );

            if (foundHeroes.length > 0) {
                let responseHtml = `<p>Here's what I found:</p>`;
                foundHeroes.forEach(hero => {
                    responseHtml += generateHeroCardHtml(hero);
                });
                addMessage(responseHtml, true);
            } else {
                addMessage("I'm not sure about that one. Try asking about popular heroes like Superman, Spider-Man, or Iron Man!", true);
            }
        }, 500);
    }

    // Event listeners
    sendBtn.addEventListener('click', handleUserInput);
    
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleUserInput();
        }
    });
});
