/**
 * Created by xuanyuli on 5/26/17.
 */
(function () {
    angular
        .module('WebAppMaker')
        .factory('widgetService', widgetService);

    function widgetService($http) {

        var api = {
            createWidget: createWidget,
            findWidgetsByPageId: findWidgetsByPageId,
            findWidgetById: findWidgetById,
            updateWidget: updateWidget,
            deleteWidget: deleteWidget,
            sortWidget: sortWidget
        };
        return api;
        function sortWidget(pageId, initial, final){
            var url = "/page/"+ pageId + "/widget?initial="+initial + "&final=" + final;
            return $http.put(url)
        }
        function createWidget(pageId, widget) {
            var url = "/api/assignment/page/" + pageId + "/widget";
            return $http.post(url, widget)
                .then(function (response){
                    if(response){
                        return response.data;
                    } else {
                        return null;
                    }
                });
        }

        function findWidgetsByPageId(pageId) {
            var url = "api/assignment/page/"+pageId+"/widget";
            return $http.get(url)
                .then(function (response) {
                    if(response){
                        return response.data;
                    } else {
                        return null;
                    }
                });
        }

        function findWidgetById(widgetId) {
            var url = "api/assignment/widget/" + widgetId;
            return $http.get(url)
                .then(function (response) {
                    if(response){
                        return response.data;
                    } else {
                        return null;
                    }
                });
        }


        function updateWidget(widgetId, widget) {
            var url = "/api/assignment/widget/" + widgetId;
            widget._id = widgetId;
            return $http.put(url, widget)
                .then(function (response) {
                    if(response){
                        return response.data;
                    } else {
                        return null;
                    }
                });
        }

        function deleteWidget(widgetId) {
            var url = "/api/assignment/widget/"+widgetId;
            return $http.delete(url)
                .then(function (response) {
                    if(response){
                        return response.data;
                    } else {
                        return null;
                    }
                });
        }


    }
})();