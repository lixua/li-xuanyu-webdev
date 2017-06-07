/**
 * Created by xuanyuli on 5/26/17.
 */
(function () {
    angular
        .module('WebAppMaker')
        .controller('widgetChooseController', widgetChooseController);

    function widgetChooseController($routeParams,
                                    $location,
                                    widgetService) {

            var model = this;
            model.userId = $routeParams['uid'];
            model.websiteId = $routeParams['wid'];
            model.pageId = $routeParams['pid'];
            model.createWidget = createWidget;
            model.widgetId =(new Date()).getTime() + "";

        function createWidget(awidget) {
            awidget.pageId = model.pageId;
            awidget._id = model.widgetId;
            widgetService.createWidget(model.pageId, awidget);
            $location.url('/user/' + model.userId + '/website/' + model.websiteId + '/page/' + model.pageId + '/widget');

        }
    }
})();