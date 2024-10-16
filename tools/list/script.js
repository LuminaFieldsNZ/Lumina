"use strict";
document.addEventListener('DOMContentLoaded', () => {
    const gallery = document.getElementById('gallery');
    
    // Gallery data
    let galleryData = [


// Kings

{
  tags: ["King", "Leader", "GrassRoots"],
  href: "https://www.tiktok.com/@luminafields",
  name: "@luminafields",
  uniqueId: "luminafields"
},
{
  tags: ["King", "Leader", "Cookout"],
  href: "https://www.tiktok.com/@infinite.vibrations",
  name: "@infinite.vibrations",
  uniqueId: "infinite.vibrations"
},
{
  tags: ["King", "Support", "GrassRoots"],
  href: "https://www.tiktok.com/@jprospering",
  name: "@jprospering",
  uniqueId: "jprospering"
},
{
  tags: ["King", "Leader", "Sponsor"],
  href: "https://www.tiktok.com/@chaskestevens3",
  name: "@chaskestevens3",
  uniqueId: "chaskestevens3"
},

// Queens

{
  tags: ["Queen", "Music", "GrassRoots"],
  href: "https://www.tiktok.com/@wisdom.202",
  name: "@wisdom.202",
  uniqueId: "wisdom.202"
},

{
  tags: ["Queen", "Gaming", "Mixed"],
  href: "https://www.tiktok.com/@cinnabrit",
  name: "@cinnabrit",
  uniqueId: "cinnabrit"
},

{
  tags: ["Queen", "Support", "Cookout"],
  href: "https://www.tiktok.com/@twshbackup",
  name: "@twshbackup",
  uniqueId: "twshbackup"
},

// The Bad


      {
        tags: ["Misandry", "Echo Chamber", "Sponsoring"],
        href: "https://www.tiktok.com/@thedatingcoach.podcast",
        name: "@thedatingcoach.podcast",
        uniqueId: "thedatingcoach.podcast"
      },
      {
        tags: ["Misandry", "Echo Chamber", "Sponsoring"],
        href: "https://www.tiktok.com/@nurseash_travels",
        name: "@nurseash_travels",
        uniqueId: "nurseash_travels"
      },
      {
        tags: ["Misandry", "Echo Chamber", "Sponsoring"],
        href: "https://www.tiktok.com/@cormqertheworld",
        name: "@cormqertheworld",
        uniqueId: "cormqertheworld"
      },
      {
        tags: ["Misandry", "Echo Chamber", "Sponsoring"],
        href: "https://www.tiktok.com/@navitheauthorrobins",
        name: "@navitheauthorrobins",
        uniqueId: "navitheauthorrobins"
      },
      {
        tags: ["Misandry", "Echo Chamber", "Sponsoring"],
        href: "https://www.tiktok.com/@journeyandegg",
        name: "@journeyandegg",
        uniqueId: "journeyandegg"
      },
      {
        tags: ["Misandry", "Echo Chamber", "Sponsoring"],
        href: "https://www.tiktok.com/@emilydeschane",
        name: "@emilydeschane",
        uniqueId: "emilydeschane"
      },
      {
        tags: ["Misandry", "Echo Chamber", "Sponsoring"],
        href: "https://www.tiktok.com/@ali_diff3r3nt",
        name: "@ali_diff3r3nt",
        uniqueId: "ali_diff3r3nt"
      },


      {
        tags: ["Misogyny", "Echo Chamber", "Sponsoring"],
        href: "https://www.tiktok.com/@coleandersonj",
        name: "@coleandersonj",
        uniqueId: "coleandersonj"
      },
      {
        tags: ["Misogyny", "Echo Chamber", "Sponsoring"],
        href: "https://www.tiktok.com/@lowiqpod",
        name: "@lowiqpod",
        uniqueId: "lowiqpod"
      },
      {
        tags: ["Misogyny", "Echo Chamber", "Sponsoring"],
        href: "https://www.tiktok.com/@jackjos3ph",
        name: "@jackjos3ph",
        uniqueId: "jackjos3ph"
      }
    ];

    function createGalleryItem(data) {
      const figure = document.createElement('figure');
      figure.dataset.tags = data.tags.join(", ");
      
      const blockquote = document.createElement('blockquote');
      blockquote.className = 'tiktok-embed';
      blockquote.cite = data.href;
      blockquote.dataset.uniqueId = data.uniqueId;
      blockquote.dataset.embedType = 'creator';
      blockquote.style.maxWidth = '780px';
      blockquote.style.minWidth = '288px';
      blockquote.innerHTML = `<section> <a target="_blank" href="${data.href}?refer=creator_embed">${data.name}</a> </section>`;

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

    function filterGallery(filterText) {
      gallery.innerHTML = ''; // Clear existing items
      const filteredData = galleryData.filter(item => item.tags.includes(filterText));
      filteredData.forEach(createGalleryItem);
      loadTikTokScript(); // Ensure TikTok embeds are reloaded
    }

    // Event listener for filter buttons
    document.querySelectorAll('.open-modal').forEach(button => {
      button.addEventListener('click', () => {
        const filterText = button.getAttribute('data-filter');
        filterGallery(filterText);
      });
    });
});
