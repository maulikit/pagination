angular.module("dashboardApp").directive('webPagination', function() {

 return {
  restrict: 'A',
  scope: {
     page: '=currentPage',
     count: '=totalThings',
     rows: '@',
     callbackFunction: '&callbackFn'
  },
  template: function(element, attrs) {


   return "<div class=\"jpag prdpaginationdiv\" id=\"srchpagination\" style=\"text-align: center;\">" +
    "<div style=\"float:left;display:inline-block;line-height:48px;\" class=\"pageinfodiv\" >{{pagearr.info}}</div>" +
    "<div style=\"float:center;display:inline-block;\">" +
    "<div style=\"display:inline-block;text-transform: uppercase;display: inline-block;color: #2874f0;padding: 12px 10px;cursor: pointer;\">" +
    "<a ng-if=\"page != 1\" class=\"prdpagination prevnxt\" ng-click=\"changePage(1)\">FIRST</a>" +
    "</div>" +

    "<div style=\"display:inline-block;text-transform: uppercase;display: inline-block;color: #2874f0;padding: 12px 10px;cursor: pointer;\">" +
    "<a ng-if=\"pagearr.previouspage != 0\" class=\"prdpagination prevnxt\" ng-click=\"changePage(pagearr.previouspage)\">PREVIOUS</a>" +
    "</div>" +
    "<ul style=\"display: inline-block;margin: 0;padding: 0;\">" +
    "<li style=\"display:inline-block;display: inline-block;padding: 7px 4px;margin: 5px;cursor: pointer;height: 32px;width: 32px;border-radius: 50%;\" ng-repeat=\"a in pagearr.pagenumbers\" >" +
    "<a ng-if=\"a == page\" style=\"color:#fff;background-color:#2874f0;border-radius: 50%;display: inline-block;    text-decoration: none;width: 30px; height: 30px;line-height: 30px;\" ng-click=\"changePage(a)\">{{a}}</a>" +
    "<a ng-if=\"a != page\" ng-click=\"changePage(a)\">{{a}}</a>" +
    "</li>" +
    "</ul>" +

    "<div style=\"display:inline-block;text-transform: uppercase;display: inline-block;color: #2874f0;padding: 12px 10px;cursor: pointer;\">" +
    "<a ng-if=\"pagearr.lastpage != page\" class=\"prdpagination prevnxt\" href='' ng-click=\"changePage(pagearr.nextpage)\">NEXT</a>" +
    "</div>" +
    "<div style=\"display:inline-block;text-transform: uppercase;display: inline-block;color: #2874f0;padding: 12px 10px;cursor: pointer;\">" +
    "<a ng-if=\"pagearr.lastpage != page\" class=\"prdpagination prevnxt\" href='' ng-click=\"changePage(pagearr.lastpage)\">LAST</a>" +
    "</div>" +
    "</div>" +
    "</div>";
  },
  controller: function($scope, $element) {},
  link: function(scope, element, attrs) {

   scope.$watch('page', function(newvalue, oldvalue) {
    
    if (newvalue) {
     scope.calculate_pages = function(count, rows_per_page, page) {
      var arr = {};
      var adjacents = 5;

      // calculate last page
      var last_page = Math.ceil(count / rows_per_page);

      // make sure we are within limits
      page = parseInt(page);
      if (page < 1) {
       page = 1;
      } else if (page > last_page) {
       page = last_page;
      }

      var upto = (page - 1) * rows_per_page;
      var current = page;
      if (page == 1)
       var previous = 0;
      else
       var previous = page - 1;

      if (page == last_page)
       var next = last_page;
      else
       var next = page + 1;
      var last = last_page;
      var info = 'Page (' + page + ' of ' + last_page + ')';

      var pages = scope.get_surrounding_pages(page, last_page, next);


      if (page < 6) {
       var cnt = 1;
       var lastpageCnt = 10;
      } else {
       var cnt = page - 4;
       var lastpageCnt = page + 5;
      }
      if (lastpageCnt > last) {
       lastpageCnt = last;
      }

      arr['pagenumbers']  = pages;
      arr['info']         = info;
      arr['lastpage']     = last;
      arr['nextpage']     = next;
      arr['previouspage'] = previous;
      arr['cnt']          = cnt;
      arr['oneLessCnt']   = cnt - 1;
      arr['lastpageCnt']  = lastpageCnt;

      scope.pagearr = arr;

     };

     scope.get_surrounding_pages = function(page_num, last_page, next) {
      var arr = [];
      var show = 5; // how many boxes
      // at first
      if (page_num == 1) {
       // case of 1 page only
       if (next == page_num) return array(1);
       for (var i = 0; i < show; i++) {
        if (i == last_page) break;
        arr.push(i + 1);
       }
       return arr;
      }
      // at last
      if (page_num == last_page) {
       var start = last_page - show;
       if (start < 1) start = 0;
       for (var i = start; i < last_page; i++) {
        arr.push(i + 1);
       }
       return arr;
      }
      // at middle
      //var start = page_num - show;
      var start = page_num - show + 2;
      if (start < 1) start = 0;
      for (var i = start; i < page_num; i++) {
       arr.push(i + 1);
      }
      for (var i = (page_num + 1); i < (page_num + show - 2); i++) {
       if (i == (last_page + 1)) break;
       console.log(i);
       arr.push(i);
      }
      return arr;
     };

     scope.calculate_pages(scope.count, scope.rows, scope.page);

    }
   });

   scope.changePage = function(newpagenum) {

      scope.page = newpagenum;
      scope.callbackFunction({
       pagenum: newpagenum
      });

   };

  }
 };
});
