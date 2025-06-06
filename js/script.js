
(function () { 

    "use strict";
  /*O modo estrito ("use strict") é ativado para ajudar a detectar erros e comportamentos problemáticos no código. */

  /**
   * Função de seleção
   */
  
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function 
   * Função de Adição de Eventos (on)
   * Função espera que um evento ocorra e depois responde a ele  */
  
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  // Ativar Botao Menu no modo Mobile
  
  on('click','.mobile-nav-toggle', function() {
     select('body').classList.toggle('mobile-nav-active')
     this.classList.toggle('bi-list')
     this.classList.toggle('bi-x')

    })
    //efeito de digitação
 const typed = select(".typed");
    if (typed) {

      let typed_strings = typed.getAttribute('data-typed-items')
      typed_strings = typed_strings.split(',')

      new Typed('.typed', {
        strings: typed_strings,
        loop:true,
        typeSpeed: 100, //velocidade digitação
        backSpeed: 50, //velocidade em apagar
        backDelay: 2000,  //tempo de espera
      });

  }

  new PureCounter();

  /* Função Waypoints */
  // JS para Skills = Habilidades ou Vendas

  let skilsContent = select('.skills-content');
  if (skilsContent) { //verifica se o elemento existe
     new Waypoint({ //cria uma instancia
         element: skilsContent,
         offset: '80%', //janela de visualização
         handler: function(direction) {
             let progress = select('.progress .progress-bar', true);
             progress.forEach((el) => {
              el.style.width = el.getAttribute('aria-valuenow') + '%'
             });

         }
     })
  }

  //Isotope - Biblioteca para Filtro
  window.addEventListener('load', () => {
    let portfolioContainer = select(".portfolio-container");
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemsSelector: '.portfolio-item'
      });

      // Selecionar todas as listas (li) do html
      let portfolioFilters = select('#portfolio-filters li', true);

      on('click', '#portfolio-filters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });

      }, true);
    }
  });

  const portfolioLightbox = Glightbox({
    selector: '.portfolio-lightbox'
  })

})()