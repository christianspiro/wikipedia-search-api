$(document).ready(() => {
  $('#search-btn').click(() => {
    let searchTerm = $("#search-query").val();
    let api =
      "https://en.wikipedia.org/w/api.php?action=opensearch&search=" +
      searchTerm +
      "&format=json&callback=?";

    $.ajax({
      type: "GET",
      url: api,
      async: false,
      dataType: "json",
      success: (data) => {
        for (i=0; i < data[1].length;i++) {
          $('.output').prepend('<li><a href= '+data[3][i]+'>'+data[1][i] +'</a><p>'+data[2][i]+ '</p></li>');
          $('#search-query').val('');
        }
      },
      error: () => {
        alert('Not Supported');
      }
    });
  });
});