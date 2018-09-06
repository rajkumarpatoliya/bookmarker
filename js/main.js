// Listen for form submit
document.getElementById('myForm').addEventListener('submit', saveBookmark);

// save Bookmark
function saveBookmark(e) {
    // Get Form Values
    var siteName = document.getElementById('siteName').value;
    var siteUrl = document.getElementById('siteUrl').value;

    if(!validateForm(siteName, siteUrl)){
        return false;
    }

    var bookmark = {
        name: siteName,
        url: siteUrl
    }
    
    if(localStorage.getItem('bookmarks') === null) {
        // Init Array
        var bookmarks = [];
        // Add to Array
        bookmarks.push(bookmark);
        // Set to LocalStorage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    } 
    else {
        // Get Bookmarks from LocalStorage
        var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        // Add bookmark to array
        bookmarks.push(bookmark);
        //Re-set back to Local Storage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks)); 
    }
    //clear form after successful submit
    document.getElementById('myForm').reset();
    
    //Re-fetch bookmarks
    fetchBookmarks();

    // prevent form from subimitting
    e.preventDefault();
}
// Delete Bookmarks

function deleteBookmark(url) {
    // Get bookmarks from localstorage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    //Loop through Bookmarks
    for(var i = 0; i < bookmarks.length; i++) {
        if(bookmarks[i].url == url){
            bookmarks.splice(i, 1);
        }
    }    
    
    //Re-set back to Local Storage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks)); 

    //Re-fetch bookmarks
    fetchBookmarks();

}


// Fetch Bookmarks

function fetchBookmarks() {
    //Get Bookmarks from LocalStorage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    console.log(bookmarks);

    // Get output Id
    var bookmarksResults = document.getElementById('bookmarksResults');

    // Build Output
    bookmarksResults.innerHTML = '';

    for(var i = 0 ; i< bookmarks.length; i++) {
        var name = bookmarks[i].name;
        var url = bookmarks[i].url;

        bookmarksResults.innerHTML += '<div class="well">'+
                                      '<h3>'+name+
                                      ' <a class="btn btn-default" target="_blank" href="'+url+'">Visit</a>' +
                                      ' <a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" href="#">Delete</a>' +
                                      '</h3>'
                                      '</div>';
    }
}

// Validate Form 
function validateForm(siteName, siteUrl) {
    if(!siteName || !siteUrl) {
        alert('Site Name & URL both required');
        return false;
    }
    
    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);
    if(!siteUrl.match(regex)){
        alert('Please Enter valid URL');
        return false;
    }

    return true;
}
