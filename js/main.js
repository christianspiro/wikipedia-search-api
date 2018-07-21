//Using jQuery To Operate the AJAX call
const colors = chroma.scale(['#fafa6e','#2A4858'])
        .mode('lch').colors(10);
let searchTerm = $("#search-query").val();
  $('#search-btn').click(() => {
    let backValue = Math.floor((Math.random() * 10) + 1);
    $("#search-btn").css("background-color",backValue);
    let api =
      "https://en.wikipedia.org/w/api.php?action=opensearch&search="+
      searchTerm +
      "&format=json&callback=?";

    $.ajax({
      type: "GET",
      url: api,
      async: false,
      dataType: "json",
      success: (data) => {
        for (i=0; i < data[1].length;i++) {
          $('.output').prepend(
          `
<li class="search-result"></li><div class="row">
    <div class="col s12 m12">
      <div class="card">
        <div id='image${i}' class="card-image">
         
          <span class="card-title">${data[1][i]}</span>
        </div>
        <div class="card-content">
          <p>${data[2][i]}</p>
        </div>
        <div class="card-action">
          <a href="${data[3][i]}">Read More on Wikipedia</a>
        </div>
      </div>
    </div>
  </div></li>`);
          $('#search-query').val('');

        }
      },
      error: () => {
        alert('Not Supported');
      }

    });

  });

$.ajax({
    url: `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=pageimages%7Cpageterms&generator=prefixsearch&redirects=1&formatversion=2&piprop=thumbnail&pithumbsize=250&pilimit=20&wbptterms=description&gpssearch=${searchTerm}&gpslimit=20`,
    method: "GET",
    dataType: "json",
    success: (newData) => {
        console.log('newData');
        for (let i = 0; i < 20; i++) {
            if (newData.query.pages[i].hasOwnProperty("thumbnail") === true) {
                $("#image" + (newData.query.pages[i].index - 1)).html(`<img src='${newData.query.pages[i].thumbnail.source}' class='responsive-img valign'>`);
            } else {
                $("#image" + (newData.query.pages[i].index - 1)).html("<img src='https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Article_icon_cropped.svg/512px-Article_icon_cropped.svg.png' class='responsive-img valign articleIcon'>");
            }
        }
    },
    error: function() {
        console.log("second call unsuccessful");
    }
});


//Function to enable enter on search
    document.querySelector("#search-query").addEventListener("keyup", event => {
        if(event.key !== "Enter") return;
        document.querySelector("#search-btn").click();
        event.preventDefault();
    });

