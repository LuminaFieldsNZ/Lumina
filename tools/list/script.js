"use strict";
document.addEventListener('DOMContentLoaded', () => {
    const gallery = document.getElementById('gallery');
    const bookmarkButtonsContainer = document.getElementById('bookmark-buttons');

    // Luminafields favorites data
    let galleryData = [
        {
            tags: ["GrassRoots", "Leader"],
            href: "https://www.tiktok.com/@luminafields",
            name: "@luminafields - GrassRoots Leader"
        },
        {
            tags: ["Cookout", "Leader"],
            href: "https://www.tiktok.com/@luminafields",
            name: "@luminafields - Cookout Leader"
        },
        {
            tags: ["Support", "GrassRoots"],
            href: "https://www.tiktok.com/@luminafields",
            name: "@jprospering - GrassRoots Support"
        },
        // Add more items here if needed...
    ];

    function createGalleryItem(data) {
        const figure = document.createElement('figure');
        figure.dataset.tags = data.tags.join(", ");
        
        const blockquote = document.createElement('blockquote');
        blockquote.className = 'tiktok-embed';
        blockquote.cite = data.href;
        blockquote.innerHTML = `<section><a target="_blank" href="${data.href}?refer=creator_embed">${data.name}</a></section>`;
        
        figure.appendChild(blockquote);
        gallery.appendChild(figure);
    }

    function loadTikTokScript() {
        const existingScript = document.querySelector('script[src="https://www.tiktok.com/embed.js"]');
        if (existingScript) {
            existingScript.remove();
        }
        const script = document.createElement('script');
        script.src = 'https://www.tiktok.com/embed.js';
        script.async = true;
        document.body.appendChild(script);
    }

    // Create buttons for each favorite
    galleryData.forEach(item => {
        const button = document.createElement('button');
        button.className = 'open-modal';
        button.textContent = item.name;
        
        button.addEventListener('click', () => {
            gallery.innerHTML = ''; // Clear existing items
            createGalleryItem(item); // Add the clicked item
            loadTikTokScript(); // Reload TikTok embeds
        });
        
        bookmarkButtonsContainer.appendChild(button);
    });

    // Load the gallery with all items initially
    galleryData.forEach(createGalleryItem);
    loadTikTokScript();
});
