$(document).ready(() => {
  $("#search-btn").click(() => {
    let searchTerm = $("#search-query").val();
    let url =
      "https://en.wikipedia.org/w/api.php?action=opensearch=" +
      searchTerm +
      "&format=json&callback=?";

    $.ajax({
      type: "GET",
      url: url,
      async: false,
      dataType: "json",
      success: (data) => {
        console.log(data);
      },
      error: () => {
        alert("Not Supported");
      }
    });
  });
});
