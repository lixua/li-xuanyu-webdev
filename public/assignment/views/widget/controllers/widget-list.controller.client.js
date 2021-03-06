/**
 * Created by xuanyuli on 5/26/17.
 */
(function () {
    angular
        .module('WebAppMaker')
        .controller('widgetListController', widgetListController);

    function widgetListController($routeParams,
                                  widgetService, $sce,currentUser) {

        var model = this;

        model.userId = currentUser._id;
        model.websiteId = $routeParams['wid'];
        model.pageId = $routeParams['pid'];
        model.trustThisContent = trustThisContent;
        model.getYouTubeEmbedUrl = getYouTubeEmbedUrl;
        model.getWidgetUrlForType = getWidgetUrlForType;
        function init() {

            model.widgets = widgetService
                .findWidgetsByPageId(model.pageId)
                .then(renderWidgets);
            function renderWidgets(found) {
                found.sort(function(a,b){
                    var A = a.position;
                    var B = b.position;
                    if(A < B) return -1;
                    if(A > B) return 1;
                })
                model.widgets = found;
            }

        }

        init();


        function getWidgetUrlForType(type) {
            return 'views/widget/templates/widget-' + type.toLowerCase() + '.view.client.html';
        }

        function getYouTubeEmbedUrl(youTubeLink) {
            var embedUrl = 'https://www.youtube.com/embed/';
            var youTubeLinkParts = youTubeLink.split('/');
            var id = youTubeLinkParts[youTubeLinkParts.length - 1];
            embedUrl += id;
            return $sce.trustAsResourceUrl(embedUrl);

        }

        function trustThisContent(html) {
            return $sce.trustAsHtml(html);
        }
    }
})();