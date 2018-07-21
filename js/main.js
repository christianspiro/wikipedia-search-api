//Using jQuery To Operate the AJAX call

//Function to enable enter on search
document.querySelector("#search-query").addEventListener("keyup", event => {
    if(event.key !== "Enter") return;
    document.querySelector("#search-btn").click();
    event.preventDefault();
});

$('#search-btn').click(() => {
    $("#output").html("");
    let searchTerm = $("#search-query").val();
    let api =
        `https://en.wikipedia.org/w/api.php?action=opensearch&search=
        ${searchTerm} 
        &format=json&callback=?`;
    let imageApi = `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=pageimages%7Cpageterms&generator=prefixsearch&redirects=1&formatversion=2&piprop=thumbnail&pithumbsize=250&pilimit=20&wbptterms=description&gpssearch=${searchTerm}&gpslimit=20&callback=?`;

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
<div class="horizontal card">
<div class="row">

<div id='image${i}' class="card-image col s3 valign-wrapper "></div>

    <div class="col s9 ">
        <div class="card-title"><a href="${data[3][i]}">${data[1][i]}</a></div>
        <div class="card-content">
          <p>${data[2][i]}</p>
        </div>
        
      </div>
    </div>
  </div></div></li>`);
                $('#search-query').val('');

            }
        },
        error: () => {
            alert('Not Supported');
        }


    });
    $.ajax({
        url: imageApi,
        method: "GET",
        dataType: "json",
        success: (newData) => {
            for (let i = 0; i < 20; i++) {
                if (newData.query.pages[i].hasOwnProperty("thumbnail") === true) {
                    $("#image" + (newData.query.pages[i].index - 1)).html(`<img src='${newData.query.pages[i].thumbnail.source}' class="responsive-img" >`);
                } else {
                    $("#image" + (newData.query.pages[i].index - 1)).html("<img src='https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Article_icon_cropped.svg/512px-Article_icon_cropped.svg.png' class='responsive-img valign artIcon'>");
                }
            }
        },
        error: function () {
            console.log("second call unsuccessful");
        }

    })
});

















