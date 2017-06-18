/**
 * Created by xuanyuli on 5/26/17.
 */
(function () {
    angular
        .module('WebAppMaker')
        .controller('widgetChooseController', widgetChooseController);

    function widgetChooseController($routeParams,
                                    $location,
                                    widgetService,currentUser) {

        var model = this;
        model.position = [];
        model.userId = currentUser._id;
        model.websiteId = $routeParams['wid'];
        model.pageId = $routeParams['pid'];
        model.createWidget = createWidget;
        //model.widgetId =(new Date()).getTime() + "";
        function init(){
            model.widgets = widgetService
                .findWidgetsByPageId(model.pageId)
                .then(renderWidgets);
            function renderWidgets(found) {
                found.sort(function (a, b) {
                    var A = a.rows;
                    var B = b.rows;
                    if (A < B) return -1;
                    if (A > B) return 1;
                });
                model.widgets = found;
            }
        }
        init();

        function createWidget(awidget) {
            awidget.position = model.widgets.length;
            awidget._page = model.pageId;
            if (awidget.widgetType === 'HEADING') {
                if (typeof awidget.size === 'undefined') {
                    awidget.size = '4';
                }
            }
            widgetService.createWidget(model.pageId, awidget);
            $location.url('/website/' + model.websiteId + '/page/' + model.pageId + '/widget');

        }
    }
})();