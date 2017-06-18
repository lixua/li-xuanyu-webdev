/**
 * Created by xuanyuli on 5/26/17.
 */
(function () {
    angular
        .module('WebAppMaker')
        .controller('widgetEditController', widgetEditController);

    function widgetEditController($routeParams,
                                  $location,
                                  widgetService,currentUser) {
        var model = this;
        model.userId =currentUser._id;
        model.websiteId = $routeParams['wid'];
        model.pageId = $routeParams['pid'];
        model.widgetId = $routeParams['wgid'];
        model.updateWidget = updateWidget;
        model.deleteWidget = deleteWidget;

        function init() {

            model.widget = widgetService
                .findWidgetById(model.widgetId)
                .then(renderWidget);
            function renderWidget(found) {
                model.widget = found;
            }


        }

        init();

        function deleteWidget() {
            widgetService.deleteWidget(model.widgetId);
            $location.url('/website/' + model.websiteId + '/page/' + model.pageId + '/widget');

        }

        function updateWidget(awidget) {

            widgetService.updateWidget(model.widgetId, awidget);
            $location.url('/website/' + model.websiteId + '/page/' + model.pageId + '/widget');

        }


    }
})();