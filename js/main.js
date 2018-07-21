//Using jQuery To Operate the AJAX call
const colors = chroma.scale(['#fafa6e','#2A4858'])
    .mode('lch').colors(10);

$('#search-btn').click(() => {
    let searchTerm = $("#search-query").val();
    let api =
        `https://en.wikipedia.org/w/api.php?action=opensearch&search=
        ${searchTerm} 
        &format=json&callback=?`;

    $.ajax({
        type: "GET",
        url: api,
        async: false,
        dataType: "json",
        success: (data) => {
            console.log(data);
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



//Function to enable enter on search
document.querySelector("#search-query").addEventListener("keyup", event => {
    if(event.key !== "Enter") return;
    document.querySelector("#search-btn").click();
    event.preventDefault();
});













