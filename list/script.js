

"use strict";
(function () {
	window.onload = () => {
		const obj = document.querySelector("#gallery");
		const time = 10000;
		function animStart() {
			if (obj.classList.contains("active") == false) {
				obj.classList.add("active");
				setTimeout(() => {
					animEnd();
				}, time);
			}
		}
		function animEnd() {
			obj.classList.remove("active");
			obj.offsetWidth;
		}
		document.addEventListener("scroll", function () {
			// scroll or scrollend
			animStart();
		});
		window.addEventListener("resize", animStart);
		animStart();
	};
})();



document.addEventListener('DOMContentLoaded', () => {
    const gallery = document.getElementById('gallery');
    const searchInput = document.getElementById('search');
    
    // Function to filter gallery items based on tags
    function filterGallery(filterText) {
        const figures = gallery.querySelectorAll('figure');
        figures.forEach(figure => {
            const tags = figure.getAttribute('data-tags').toLowerCase();
            if (tags.includes(filterText.toLowerCase()) || filterText === '') {
                figure.style.display = 'block';
            } else {
                figure.style.display = 'none';
            }
        });
    }

    // Event listener for search input
    searchInput.addEventListener('input', (event) => {
        filterGallery(event.target.value);
    });

    // Event listener for filter buttons
    gallery.addEventListener('click', (event) => {
        if (event.target.classList.contains('open-modal')) {
            const filterText = event.target.getAttribute('data-filter');
            searchInput.value = filterText; // Set search input to the selected filter
            filterGallery(filterText);
        }
    });
});


document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search');
    const quickSearchButtons = document.querySelectorAll('.open-modal');
    
    // Function to filter gallery based on search text
    function filterGallery(searchText) {
        const figures = document.querySelectorAll('#gallery figure');
        figures.forEach(figure => {
            const tags = figure.getAttribute('data-tags').toLowerCase();
            if (tags.includes(searchText.toLowerCase()) || searchText === '') {
                figure.style.display = 'block';
            } else {
                figure.style.display = 'none';
            }
        });
    }

    // Event listener for search input
    searchInput.addEventListener('input', (event) => {
        filterGallery(event.target.value);
    });

    // Event listeners for quick search buttons
    quickSearchButtons.forEach(button => {
        button.addEventListener('click', () => {
            const searchText = button.getAttribute('data-search');
            searchInput.value = searchText; // Set search input to the selected filter
            filterGallery(searchText);
        });
    });
});
