function setupStickySidebar(){var a=$(".header-section").outerHeight()+$(".arrow-menu").outerHeight(),b=$(window).outerHeight();$(window).on("scroll",function(){var c=$(this).scrollTop();c>=a?$(".order-summary").addClass("order-summary--fixed").css({top:0,maxHeight:b}):(removeStickySidebar(),lastScrollTop=0),c+$(".order-summary").outerHeight()>$(".checkout-foot").offset().top&&($(".order-summary").removeClass("order-summary--fixed").css({top:"auto",bottom:0}),c<=lastScrollTop?(c+a<$(".order-summary").offset().top&&$(".order-summary").css({top:0,bottom:"auto"}),lastScrollTop=c+1):lastScrollTop=c-1)})}function removeStickySidebar(){$(".order-summary").removeClass("order-summary--fixed").css({top:"auto",bottom:"auto",maxHeight:"auto"})}function handleFormSubmit(a){var b=validate(a,constraints,{fullMessages:!1});showErrors(a,b||{}),b||showSuccess(a)}function showErrors(a,b){$(a).each(function(a,c){$(c).find("input[name], select[name]").each(function(a,c){var d=closestParent(c.parentNode,"input-group");resetFormGroup(d),showErrorsForInput(c,b&&b[c.name])})})}function showErrorsForInput(a,b){var c=closestParent(a.parentNode,"input-group");resetFormGroup(c),$(c).append('<div class="messages"></div>');var d=c.querySelector(".messages");b?(c.classList.add("has-error"),$(b).each(function(a,b){addError(d,b)})):(c.classList.add("has-success"),$(c).each(function(a,b){$(b).find(".messages").append("<p>Este campo es correcto :)</p>")}))}function closestParent(a,b){return a&&a!=document?a.classList.contains(b)?a:closestParent(a.parentNode,b):null}function resetFormGroup(a){a.classList.remove("has-error"),a.classList.remove("has-success"),$(a).find(".messages").remove()}function addError(a,b){var c=document.createElement("p");c.classList.add("help-block"),c.classList.add("error"),c.innerText=b,a.appendChild(c)}function showSuccess(){}var Tvm=Tvm||{};Tvm.vars={path:".tvm-create-ad",page:0,previousPage:0,sections:"section"},Tvm.bike={},Tvm.Init=function(){function a(){console.log("Initializing Tvm API"),b(),Tvm.Events(),Tvm.Navigation["goto"](0)}function b(){$(Tvm.vars.path+" "+Tvm.vars.sections).each(function(a){$(this).hide(),$(this).attr("data-navigation",a)})}var c={};return a(),c};var Tvm=Tvm||{},tabHeight,tabSelected,tabContentOpen;Tvm.Tabs=function(){function a(a,b,c){c?(tabHeight=0,a.find(".tab-content").each(function(a,b){tabHeight=$(b).outerHeight()>tabHeight?$(b).outerHeight():tabHeight})):tabHeight=b.outerHeight(),a.find(".tabs__container").animate({height:tabHeight},400)}var b={};return b.setupTabs=function(b,c,d,e,f){tabSelected=$(".tab",b).eq(c),tabSelected.addClass("active"),b.find(".tab-content").hide().removeClass("open"),tabContentOpen=$(".tab-content",b).eq(c),tabContentOpen.addClass("open"),tabContentOpen.fadeIn(0,function(){a(b,tabContentOpen,f)}),b.find(".tab "+d).off(e).on(e,function(c){c&&c.preventDefault(),b.find(".tab").removeClass("active"),tabSelected=$(this).parents(".tab").attr("data-js-target"),$(this).parents(".tab").addClass("active"),b.find(".tab-content").hide().removeClass("open"),tabContentOpen=$(".tab-content",b).eq(tabSelected),b.find(tabContentOpen).stop().fadeIn(300).addClass("open"),a(b,tabContentOpen,f)})},b.removeTabs=function(a){a.find(".tab-content").removeClass("open").hide(),a.find(".tab").removeClass("active")},b}();var isDesktop=$(window).width()>767,Tvm=Tvm||{},container;Tvm.Overlay=function(){function a(){$(".overlay-close").on("click",function(a){"#"===$(this).attr("href")&&(a.preventDefault(),b.removeOverlay())}),$(".overlay").on("click",function(){b.removeOverlay()}),$(".overlay-content").on("click",function(a){a.stopPropagation()})}var b={};return b.setOverlay=function(b,c,d){$(".overlay").remove();var e=c?$(".overlay-wrapper#"+c).html():"";b.append($('<div class="overlay">').html(e)),$(".overlay").fadeIn(400,function(){a(),d&&d()});var f=isDesktop?"50%":0;$(".overlay-content").css({top:"60%",visibility:"visible"}).animate({top:f})},b.removeOverlay=function(){$(".overlay").fadeOut(function(){$(".overlay").remove()})},b}();var Tvm=Tvm||{};Tvm.Bicicle=function(){function a(){d.bicicle=new b(Tvm.bike)}function b(a){this.user_id=a.user_id,this.tipo=a.tipo,this.modelo=a.modelo,this.marca=a.marca,this.fecha=a.fecha,this.talla=a.talla,this.cuadro=a.cuadro,this.suspension=a.suspension,this.recorrido_susp_delantera=a.recorrido_susp_delantera,this.recorrido_susp_trasera=a.recorrido_susp_trasera,this.grupo_cambio=a.grupo_cambio,this.pais=a.pais,this.velocidades=a.velocidades,this.platos=a.platos,this.medida_ruedas=a.medida_ruedas,this.extra=a.extra,this.extras=a.extras,this.fotos=a.fotos,this.descripcion=a.descripcion,this.estado=a.estado,this.coste_inicial=a.coste_inicial,this.precio_esperado=a.precio_esperado}function c(a,b){$("[data-bicicle="+a+"]").text(b)}var d={};return d.setProp=function(a,b){d.bicicle[a]=b,c(a,b)},a(),d}();var Tvm=Tvm||{};Tvm.Navigation=function(){var a,b={};return b["goto"]=function(b,c){a=Tvm.vars.page,a!==b&&$("[data-navigation="+a+"]").hide(),$("body").scrollTop(0),$("[data-navigation="+b+"]").fadeIn("slow",c),Tvm.vars.page=b},b.next=function(){b["goto"](Tvm.vars.page+1)},b.prev=function(){b["goto"](Tvm.vars.page-1)},b.back=function(){b["goto"](a)},b.goToSection=function(a){var c=parseInt($("."+a).parent("section").attr("data-navigation"));b["goto"](c)},b}();var Tvm=Tvm||{},isDesktop=$(window).width()>767;Tvm.Checkout=function(){function a(){b(),c(),d(),isDesktop&&setupStickySidebar()}function b(){$(".order-summary__discount-link").on("click",function(a){a&&a.preventDefault(),$(this).slideUp(300,function(){$(this).parents(".order-summary__discount").find("form").slideDown(300)})})}function c(){$(".checkout-step").on("click",".payment-method--link",function(a){a.preventDefault(),$(this).hasClass("open")?$(this).removeClass("open").next(".payment-method--dropdown").slideUp():($(".payment-method--link").removeClass("open"),$(".payment-method--dropdown").slideUp(),$(this).addClass("open").next(".payment-method--dropdown").slideDown())})}function d(){$(".checkout-step-1").length&&($(".checkout-arrow-menu li:first").addClass("activated"),isDesktop||$(".order-summary").show()),$(".checkout-step-2").length&&($(".checkout-arrow-menu li:first i").addClass("checked"),$(".checkout-arrow-menu li:nth-child(2)").addClass("activated")),$(".checkout-step-3").length&&($(".checkout-arrow-menu li:nth-child(1) i").addClass("checked"),$(".checkout-arrow-menu li:nth-child(2) i").addClass("checked"),$(".checkout-arrow-menu li:nth-child(3)").addClass("activated"))}var e={};return e.setupCheckoutTabs=function(){isDesktop||Tvm.Tabs.setupTabs($(".overlay .tabs.overlay-checkout"),1,"a","click",!0)},a(),e}();var Tvm=Tvm||{};Tvm.Events=function(){function a(){b(),c(),d(),e()}function b(){$(Tvm.vars.path).on("click","[data-goto]",function(a){if(a.preventDefault(),"number"==typeof $(this).attr("data-goto"))Tvm.Navigation["goto"]($(this).attr("data-goto"));else switch($(this).attr("data-goto")){case"next":Tvm.Navigation.next();break;case"prev":Tvm.Navigation.prev();break;default:Tvm.Navigation.goToSection($(this).attr("data-goto")+"-section")}})}function c(){$(Tvm.vars.path+" .choose-unique").on("click",".btn-multiple",function(a){a.preventDefault(),$(this).siblings().removeClass("selected"),$(this).addClass("selected"),$(this).parents(".choose-unique").attr("data-validate",!0),"true"==$(this).attr("value")?$(this).parents(".input-group").next(".bisel").children(".input-group").removeClass("disabled"):"false"==$(this).attr("value")&&($(this).parents(".input-group").next(".bisel").children(".input-group").addClass("disabled"),$(this).parents(".input-group").next(".bisel").children(".input-group").children(".choose-multiple").attr("data-validate",!0)),$(this).parents(".input-group").next(".input-group").removeClass("disabled");var b=$(this).parents(".choose-unique").attr("data-save");Tvm.Bicicle.setProp(b,$(this).attr("value")),f()})}function d(){$(Tvm.vars.path+" .choose-multiple").on("click",".btn-multiple",function(a){a.preventDefault(),$(this).hasClass("selected")?($(this).removeClass("selected"),$(this).parents(".choose-multiple").children(".selected").length||$(this).parents(".choose-multiple").attr("data-validate",!1)):($(this).addClass("selected"),$(this).parents(".choose-multiple").attr("data-validate",!0)),$(this).parents(".input-group").next(".bisel").children(".input-group").removeClass("disabled"),$(this).parents(".input-group").next(".input-group").removeClass("disabled"),f()})}function e(){$(Tvm.vars.path).on("change","[data-image]",function(a){var b=$(this);a.preventDefault();var c=new FileReader;c.onload=function(a){b.siblings("[data-show]").css({background:"url("+a.target.result+") no-repeat center center/cover",opacity:1,"pointer-events":"all"}),b.parents("[data-validate]").attr("data-validate",!0),f()},c.readAsDataURL(a.target.files[0])}),$(Tvm.vars.path).on("click","[data-delete]",function(){elem=$(this).parents(".file-container").children("[data-image=show]"),elem.wrap("<form>").closest("form").get(0).reset(),elem.unwrap(),elem.siblings("[data-show]").css({background:"none",opacity:0,"pointer-events":"none"}),$(this).parents("[data-validate]").attr("data-validate",!1),f()})}function f(){var a=!0;$("[data-navigation="+Tvm.vars.page+"] [data-validate]").each(function(){return"true"!=$(this).attr("data-validate")?(a=!0,!1):void(a=!1)}),a?$("[data-navigation="+Tvm.vars.page+"] [data-continue]").addClass("btn-disabled"):$("[data-navigation="+Tvm.vars.page+"] [data-continue]").removeClass("btn-disabled")}var g={};return a(),g};var Tvm=Tvm||{},constraints={"user-email":{presence:{message:"Este campo es obligatorio"},email:{message:"El formato no es correcto"}},nombre:{presence:{message:"Este campo es obligatorio"},format:{pattern:"[a-z]+",flags:"i",message:"El nombre solo puede llevar caracteres alfabéticos"}},apellidos:{presence:{message:"Este campo es obligatorio"},format:{pattern:"[a-z]+",flags:"i",message:"El apellido solo puede llevar caracteres alfabéticos"}},telefono:{presence:{message:"Este campo es obligatorio"},format:{pattern:"^[0-9-+]{9,15}$",message:"El formato no es correcto"}},dni:{presence:{message:"Este campo es obligatorio"},format:{pattern:"^[0-9]{8,8}[A-Za-z]$",message:"El formato no es correcto"}},"user-address":{presence:{message:"Este campo es obligatorio"}},"user-city":{presence:{message:"Este campo es obligatorio"}},"user-province":{presence:{message:"Este campo es obligatorio"}},"user-cp":{presence:{message:"Este campo es obligatorio"},format:{pattern:"\\d{5}",message:"El formato del código postal no es correcto"}}};Tvm.Form=function(){function a(){var a=document.querySelector(".form-wrapper button[type=submit]");a.addEventListener("click",function(a){a.preventDefault(),$(this).parent(".form-wrapper").each(function(a,b){handleFormSubmit(b)})});for(var b=document.querySelectorAll("input, textarea, select"),c=0;c<b.length;++c)b.item(c).addEventListener("blur",function(){var a=$(this).parents("form"),b=validate(a,constraints,{fullMessages:!1})||{};showErrorsForInput(this,b[this.name])})}var b={};return a(),b}(),jQuery(document).ready(function(a){function b(){Tvm.Init()}a(window).width()>767;b()});