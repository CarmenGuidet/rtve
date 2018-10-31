/*
*API DE RTVE HECHA EN JAVESCRIPT
*AUTOR:ANGLEL J. GUIDET GOMEZ
*ULTIMA MODIFICACION:31/10/2018
*/

$(document).ready(Start())

function Start() {
  $(document).ajaxStart(() => {
    $( "#loading" ).show();
  });

  $(document).ajaxStop(() => {
    $( "#loading" ).hide();
  });

}
$( "#showMore" ).on( "click", () => {
  getMoreNews(4,8)
});
var numberOfNews = 4
var news = []
var topNews = []

$.get( "http://www.rtve.es/api/noticias.json", (data) => {
  let news = data.page.items
  news.forEach(n => {
    if (n.image !== null) {
      this.news.push(n)
    }
    if (n.popularity > 10.000) {
      console.log('Popularity > 10K =>', n.popularity)
      this.topNews.push(n)
    }
  });
});

function getAllNews(min,max) {
  this.news.forEach((n,index) => {
    console.log(n)
    if (min < max) {
      min++
      console.log(min, n, max)
      $('#info').append('<div class="row"></div>')
      $('#info .row')
      .append("<div class='new col-12 col-sm-6'></div>")
      $('#info .row .new').eq(index).append(`<h3>${n.title}</h3>`)
      .append(`<span>${n.mainCategoryLang.split('/')[0]}</span>`)
      .append(`<a href="${n.htmlShortUrl}"><img width='100px' src="${n.image}"></a>`)
      .append(`${n.summary}`)
      .append(`<small style="display:block">Fecha de publicación: ${n.publicationDate}</small>`)
    }
  })
}
var btn = $('#showMore').on('click', getMoreNews(4,8) )
function getMoreNews(min, max) {
  this.news.forEach((n,index) => {
    console.log('Minimoi',min)
    console.log('Max',max)
    index += index+4
    if (min < max) {
      min++
      $('#info .row:last-child')
      .append("<div class='new col-12 col-sm-6'></div>")
      $('#info .row .new').append(`<h3>${n.title}</h3>`)
      .append(`<span>${n.mainCategoryLang.split('/')[0]}</span>`)
      .append(`<a href="${n.htmlShortUrl}"><img width='100px' src="${n.image}"></a>`)
      .append(`${n.summary}`)
      .append(`<small style="display:block">Fecha de publicación: ${n.publicationDate}</small>`)
    }
  })
}
setTimeout(() => {
  this.getAllNews(0, 4)
  this.topNews.sort(function(a,b) {return b.popularity-a.popularity})
  this.topNews.forEach((n, index) => {
    if (index < 5) {
    $('aside div.container-fluid').append(`<h3 >${n.title.slice(0,40)}...</h3>`)
    .append(`<a href="${n.htmlShortUrl}"><img width='100%' src="${n.image}"></a>`)
    .append(`<small>Visitas: ${n.popularity} #${index+1}</small>`)
    }
  })
},400)
