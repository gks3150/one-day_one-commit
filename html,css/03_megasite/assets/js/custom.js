(function($){
		//Banner image slider
        var mySwiper = new Swiper('.swiper-container', {
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            pagination: {
                el: '.swiper-pagination',
                type: 'bullets',
            },
            autoplay: {
                delay: 5000,
            },
        });
		
		//movie chart img slider
		var mySwiper = new Swiper('.swiper-container2', {
			slidesPerView: 4,
			spaceBetween: 24,
		//	mousewheel: {
		//		invert: true,
		//	},
			keyboard: {
				enabled: true,
				onlyInViewport: false,
			},
			autoplay: {
                delay: 4000,
            },
			breakpoints: {
                600: {
                    slidesPerView: 1.4,
                    spaceBetween: 24
                },
                768: {
                    slidesPerView: 2,
                    spaceBetween: 24
                },
                960: {
                    slidesPerView: 3,
                    spaceBetween: 24
                }
            }
		});
		//movie chart tap menu
		var movBtn = $(".movie_title > ul > li");
		var movCont = $(".movie_chart > div");
		
		movCont.hide().eq(0).show();
		movBtn.click(function(e){
			e.preventDefault();
			var target = $(this);
			var index = target.index();
			movBtn.removeClass("active");
			target.addClass("active");
			movCont.css("display","none");
			movCont.eq(index).css("display","block");
		});

		//notice tap menu
		var tapMenu = $(".notice");
		
		//contents hiding
		tapMenu.find("ul > li > ul").hide();
		tapMenu.find("li.active > ul").show();
		
		function tabList(e){
			e.preventDefault(); //#의 기능 차단
			var target = $(this);
			target.next().show().parent("li").addClass("active").siblings("li").removeClass("active").find("ul").hide();
			//버튼을 클릭하면 형제의 ul을 보여주고 부모의 li 태그에 클래스를 추가하고 형제 li 태그의 클래스를 제거하고 제거한 자식의 ul 태그 숨기기
		}
		tapMenu.find("ul > li > a").click(tabList).focusin(tabList);
})(jQuery);   