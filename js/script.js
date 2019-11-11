$(document).ready(function () {
    var searchText = 'hi';
    var countClick = 0;

    getGifs(searchText);

    $('.pure_button').click(function() {
        searchText = $('.pure-input-rounded').val();

        getGifs(searchText);

        countClick = 0;
    });

    $('.reset').click(function() {
        $('.pure-input-rounded').val('');
        $(".container").last().after().remove();
        searchText = 'hi';
        getGifs(searchText);
        countClick = 0;
    });


    $("#load-more").click (function () {
        $(".container").last().after('<div class="container"></div>');
        countClick++;
        getGifs(searchText, countClick)
    });



});

function getGifs(searchText, offset = 0) {
    var url = "https://api.giphy.com/v1/gifs/search?q=" + searchText + "&offset=" + offset * 25 + "&api_key=wJ37oC0Q3CHHUgSOkhZinC2n64Z8hSLs";

    $.get({
        url: url,
        success: function(result) {
            var data = result.data;
            var output = "";
            for (var index in data){
                var gifObject = data[index];
                var gifURL = gifObject.images.original.url;
                output += "<div class='gif-box'><img src='"+gifURL+"'/></div>";
            }

            if (offset) {
                $('.container:eq(' + offset + ')').html(output)
            } else {
                $(".container").html(output);
            }
        },
        error: function(error) {
            console.log(error);
        }
    });
}