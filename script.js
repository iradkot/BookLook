var fetch = function($input, option) {
    $.ajax({
        method: "GET",
        url: 'https://www.googleapis.com/books/v1/volumes?q=' + option + $input,
        success: function(data) {
            // console.log(data);
            // var title = data.items[0].volumeInfo.title;
            // var author = data.items[0].volumeInfo.authors[0];
            // var description = data.items[0].volumeInfo.description;
            // var image = data.items[0].volumeInfo.imageLinks.smallThumbnail;
            // console.log("title: " + title + "\nauthor: " + author + "\ndescription: " + description + "\nimage: " + image);

            var source = $('#menu-template').html();
            var template = Handlebars.compile(source);
            var resault_length = data.items.length;
            var book_object = {};
            var newHTML;
            for (var i = 0; i < resault_length; i++) {
                book_object = {
                    title: data.items[i].volumeInfo.title,
                    author: data.items[i].volumeInfo.authors==undefined? "Author wasn't found": data.items[i].volumeInfo.authors[0] ,
                    description: data.items[i].volumeInfo.description==undefined? "description wasn't found": data.items[i].volumeInfo.description,
                    image: data.items[i].volumeInfo.imageLinks.smallThumbnail==undefined? 'https://cdn.browshot.com/static/images/not-found.png:': data.items[i].volumeInfo.imageLinks.smallThumbnail

                };
                newHTML = template(book_object);
                $('.results').append(newHTML);
            }

        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(textStatus);
        }
    });
};

$('button').click(function() {
    var $input = $('#isbn-search').val();
    var option = $('.search_by').val();
    var search_by;
    $('#isbn-search').val('');
    $('.search_by').val('');
    $('.results').empty();
    switch (option) {
        case "isbn":
            search_by = "isbn:"
            break;
        case "author":
            search_by = "inauthor:"
            break;
        case "title":
            search_by = "intitle:"
            break;
    }
    fetch($input, search_by);
});

// var source = $('#menu-template').html();
// var template = Handlebars.compile(source);
// var newHTML = template(posts);
// $('.posts').append(newHTML);

// // variable for storing our posts div
// // var $posts = $('.posts');

// // build a single post object and push it to array
// var createPost = function(text) {
//         posts.push({ text: text, comments: [] });
//         $('.posts').empty();
//         newHTML = template(posts);
//         $('.posts').append(newHTML);
//         $('#post-name').val('');
