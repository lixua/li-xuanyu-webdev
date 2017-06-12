/**
 * Created by xuanyuli on 6/5/17.
 */
(function () {

    angular
        .module('WebAppMaker')
        .controller('FlickrImageSearchController', FlickrImageSearchController);

    function FlickrImageSearchController($routeParams, FlickrService, widgetService, $location) {
        var model = this;

        model.userId = $routeParams['uid'];
        model.websiteId = $routeParams['wid'];
        model.pageId = $routeParams['pid'];
        model.selectPhoto = selectPhoto;
        model.widgetId = $routeParams['wgid'];
        console.log($routeParams['wgid']);
        function init() {

            model.searchPhotos = function (searchTerm) {

                FlickrService
                    .searchPhotos(searchTerm)
                    .then(function (response) {
                        data = response.data.replace("jsonFlickrApi(", "");
                        data = data.substring(0, data.length - 1);
                        data = JSON.parse(data);
                        model.photos = data.photos;


                    });
            };

        }

        init();
        function selectPhoto(photo) {
            var url = "https://farm" + photo.farm + ".staticflickr.com/" + photo.server;
            url += "/" + photo.id + "_" + photo.secret + "_b.jpg";
            var widget = {
                "widgetType": "IMAGE", "_page": model.pageId, "width": "100%",
                "url": url
            };
            if(typeof model.widgetId === 'undefined'){
                widgetService.createWidget(model.pageId, widget)
                    .then(function(widget){
                        $location.url('/user/' + model.userId + "/website/" + model.websiteId + "/page/" + model.pageId + "/widget/" + widget._id);

                    })

            } else {
                console.log(model.widgetId);
                widgetService.updateWidget(model.widgetId,widget)
                    .then(function(widget){
                        console.log(widget);
                        $location.url('/user/' + model.userId + "/website/" + model.websiteId + "/page/" + model.pageId + "/widget/" + model.widgetId);


            })}

        }


    }
})();