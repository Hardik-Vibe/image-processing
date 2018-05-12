// Add your javascript here
// Don't forget to add it into respective layouts where this js file is needed

var xmlhttp = function () {

    this.httpRequest = function () {
        var httpRequest;
        if (window.XMLHttpRequest) {
            httpRequest = new XMLHttpRequest();
        } else {
            httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
        }
        return httpRequest;
    },

    this.getRequest = function (api) {
        var rq = this.httpRequest();
        rq.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                var response = JSON.parse(rq.response);
                var searchContainer = document.getElementById('searchContainer');
                searchContainer.innerHTML = "";
                if (response.data && response.data.length && response.success) {
                    response.data.forEach(function (rec) {
                        if (rec.name) {
                            var img = '<div class="mdl-cell mdl-card mdl-shadow--4dp portfolio-card"><div class="mdl-card__media"><a href="' + rec.name + '" download><img style="height:200px!important" class="article-image" src="' + rec.url + '" border="0" alt=""></a></div></div>';
                        } else {
                            var img = '<div class="mdl-cell mdl-card mdl-shadow--4dp portfolio-card"><div class="mdl-card__media"><a href="javascript:alert(\'Oops!! Failed to download image.\')"><img style="height:200px!important" class="article-image" src="' + rec.url + '" border="0" alt=""></a></div></div>';
                        }
                        searchContainer.innerHTML = searchContainer.innerHTML + img;
                    });
                }
            } else if (this.readyState == 4 && this.status == 400) {
                var response = JSON.parse(rq.response);
                alert(response.msg);
            }
        };
        rq.open("GET", api, true);
        rq.send();
    }
};

function searchImage(e) {
    e.preventDefault();
    var q = document.getElementById('q').value;
    var xmlhttpObject = new xmlhttp();
    xmlhttpObject.getRequest('/search?q=' + q);
}