document.addEventListener('DOMContentLoaded', () => {
    const galleryGrid = document.getElementById('gallery-grid');
    const picsFolder = 'pics/'; // Path to your images folder
  
    // Function to fetch images from the folder
    async function fetchImages() {
      try {
        const response = await fetch(picsFolder);
        const text = await response.text();
        const parser = new DOMParser();
        const htmlDocument = parser.parseFromString(text, 'text/html');
        const links = htmlDocument.querySelectorAll('a');
  
        const imageFiles = Array.from(links)
          .map(link => link.href)
          .filter(href => /\.(jpg|jpeg|png|gif)$/i.test(href));
  
        return imageFiles;
      } catch (error) {
        console.error('Error fetching images:', error);
        return [];
      }
    }
  
    // Function to create image elements and append them to the gallery
    async function loadGallery() {
      const images = await fetchImages();
      images.forEach((src, index) => {
        const imgContainer = document.createElement('div');
        imgContainer.classList.add('img-container');
  
        const img = document.createElement('img');
        img.src = src;
        img.alt = `Image ${index + 1}`;
  
        const imgContentHover = document.createElement('div');
        imgContentHover.classList.add('img-content-hover');
        imgContentHover.innerHTML = `
          <div class="title">Image ${index + 1}</div>
          <div class="category">Category</div>
        `;
  
        imgContainer.appendChild(img);
        imgContainer.appendChild(imgContentHover);
        galleryGrid.appendChild(imgContainer);
      });
    }
  
    loadGallery();
  });