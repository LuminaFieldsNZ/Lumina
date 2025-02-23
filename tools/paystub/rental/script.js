document.addEventListener('DOMContentLoaded', () => {
    const galleryGrid = document.getElementById('gallery-grid');
  
    // Manually list the image files in the 'pics' folder
    const imageFiles = [
      'pics/2351941_2.jpg',
      'pics/2351941_1_2.jpg',
      'pics/2351941_2_2.jpg',
      'pics/2351941_3_2.jpg',
      'pics/2351941_4_2.jpg',
      'pics/2351941_5_2.jpg',
      
    ];
  
    // Function to create image elements and append them to the gallery
    function loadGallery() {
      imageFiles.forEach((src, index) => {
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