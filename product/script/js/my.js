
$( document ).ready(function() {
	kolichestvo_tovarov();
	delete_product();
    get_result_price();

	//Открытие при клике
	$( ".jq_click" ).on("click" , function() {

		$(this).children(".jq_open").slideToggle(0);

	});
	//Открытие при клике
	$( ".jq_click2" ).on("click" , function() {

		$(".urna.jq_click2 ~ .korzina_vybor.jq_open").slideToggle(0);

	});
	//Открытие при клике
	$( ".jq_click3" ).on("click" , function() {

		$(".kategoria.jq_click3 ~ .menu_vybora.jq_open").slideToggle(0);

	});
	//Открытие при клике
	$( ".shmal" ).on("click" , function() {
		var N = 5000;

		if ($(".hitler").hasClass("full")) {

			$(".hitler").removeClass("full");
			$(".hitler").height(400);
		} else {
            $(".hitler").height("auto");
            $(".hitler").addClass("full");
		}

	});
	//Открытие категории
	$( ".menu_vybora > li" ).hover(function(event) {
	 	event.preventDefault();

	 	if($(this).children(".jq_navedenie").hasClass("dnone")){
	 		$(this).children(".jq_navedenie").removeClass("dnone");
	 		$(this).children(".jq_navedenie").addClass("dblock");
	 	} else {
	 		$(this).children(".jq_navedenie").removeClass("dblock");
	 		$(this).children(".jq_navedenie").addClass("dnone");
	 	}
	 });
	//Результат поиска
	$( ".pokazat_resultat" ).click(function() {
	    event.preventDefault();
		
		var znachennie_poiska;
		
		znachennie_poiska = $("[name='poisk']").val();

		if (znachennie_poiska == "") {
			
			znachennie_poiska = "Введите в поле поиска искомое слово!";

		}
		
		alert( znachennie_poiska );
	});
	 //Счетчик товаров
	 $( ".astan button" ).click(function(){ 

		let curren_btn, current_count, new_count;
		
		curren_btn = $(this).attr('data-direction');
		current_count = $(".astan .counter_val").val();

		
			

			if(curren_btn == "plus"){


				new_count = +current_count+1;

			} else {

				if (current_count > 1 ) {
					new_count = +current_count-1;
				} else {
					new_count = 1;
				}
			}
         
         get_result_price();

		
		
		$(".astan .counter_val").val(new_count);

	});

	// Добавление товара в корзину
	$( "button.kamil" ).click(function(){

		var nazvanie_tovara, img_src, kolichestvo, cena_za_odin, add_content, itog;

		nazvanie_tovara		= $(".nazvanie_tovara").text();
		img_src				= $("ul#lightgallery > li:first-child > img").attr("src");
		kolichestvo 		= $('input[name="askhat"]').val();
		cena_za_odin 		= $(".aziret .cena_za_odin").text();
		itog 				= cena_za_odin * kolichestvo;

		add_content = '\
						<div class="dannye_tovarov">\
							<a href="">\
								<div class="kartinka_tovara">\
									<img src="'+img_src+'">\
								</div>\
								<div class="opisanie_tovara">\
									<p>'+nazvanie_tovara+'</p>\
								</div>\
							</a>\
							<div class="count_product">\
								<button class="js_minus"  data-direction="minus">-</button>\
								<input type="input" name="count" value="'+kolichestvo+'" class="counter_val">\
								<button class="js_plus"  data-direction="plus">+</button>\
							</div>\
							<span class="originalnaya_cena">\
								<span class="cena_za_odin">'+itog+'</span>\
								<span class="synbol">сом</span>\
							</span>\
							<div class="udalit_zakaz">\
								<a href="#" class="cart_remove">\
									<i class="fas fa-trash"></i>\
								</a>\
							</div>\
						</div>';

			
		$(add_content).appendTo(".osnova_korziny");
		alert("Спасибо большое! Ваш товар добавлен в корзину ^_^");

		delete_product();
		get_result_price();
		kolichestvo_tovarov();

	});


	// Удаление товара в корзине
	function delete_product(){
		$( ".dannye_tovarov" ).on("click", ".udalit_zakaz", function(event) {
	    	$(this).parent(".dannye_tovarov").remove();
			
			get_result_price()
		});	
	}
	//Счетчик товаров
	function kolichestvo_tovarov(){
         
		$( ".count_product button" ).click(function(){

			let curren_btn, kolichestvo, new_count, current_price, price_copy, check_copy_price;
			
			curren_btn 				= $(this).attr('data-direction');
			kolichestvo     		= $(this).parent(".count_product").children(".counter_val").val();
			current_price   		= $(this).parent(".count_product").parent(".dannye_tovarov").children(".originalnaya_cena").children(".cena_za_odin").text();
			check_copy_price		= $(this).parent(".count_product").parent(".dannye_tovarov").find(".cena_za_odin_origin").text();

			if (check_copy_price == "") {
				$('<span class="cena_za_odin_origin">'+current_price+'</span>').appendTo($(this).parent(".count_product").parent(".dannye_tovarov").children(".originalnaya_cena"));
				check_copy_price = current_price;
			}
			


			if(curren_btn == "plus"){


				new_count	  = +kolichestvo+1;


			} else {

				if (kolichestvo > 1 ) {
					
					new_count 		= +kolichestvo-1;


				} else {
					new_count = 1;
				}
			}
			price_copy     = check_copy_price * new_count

			$(this).parent(".count_product").children(".counter_val").val(new_count);
			$(this).parent(".count_product").parent(".dannye_tovarov").children(".originalnaya_cena").children(".cena_za_odin").text(price_copy);

			  get_result_price();

	    });
	};	    

	// Цикл для получения каждой цены товара внутри корзины
	function get_result_price(){
	
		var resultat = 0;
		var cout_pro = new Array();

		$(".osnova_korziny .dannye_tovarov .originalnaya_cena .cena_za_odin").each(function( index ) {
			resultat = resultat + parseFloat($(this).parent(".originalnaya_cena").children(".cena_za_odin").text());
			cout_pro = parseFloat($(this).parent(".originalnaya_cena").parent(".dannye_tovarov").children(".count_product").children(".counter_val").val());
		});

		if (resultat == 0) {
			$('span.summa_v_korzine').html("0");
			$('span.kol_tovarov').html("0");
			$('span.summa_v_korzine_1').html("0");
			$('span.kol_tovarov_1').html("0");

		} else {
			$('span.summa_v_korzine').html(resultat);
			$('span.kol_tovarov').html(cout_pro);
			$('span.summa_v_korzine_1').html(resultat);
			$('span.kol_tovarov_1').html(cout_pro);
		}

	}

});