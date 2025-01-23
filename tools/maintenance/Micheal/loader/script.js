var titleWrap = document.getElementsByClassName('header__initials');
			document.body.addEventListener('mousemove', cursorPositionHandler);

			function cursorPositionHandler(e) {
				var decimalX = e.clientX / window.innerWidth - 0.5;
				var decimalY = e.clientY / window.innerHeight - 0.5;
				TweenMax.to(titleWrap, 0.5, { rotationY: 10 * decimalX, rotationX: 10 * decimalY, ease: Quad.easeOut, transformPerspective: 700, transformOrigin: "center" });
			}