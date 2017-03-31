angular.module("dashboardApp").directive('webPagination',function() {

return{
		restrict : 'A',
		scope : {
				page :'=currentPage',
				count : '=totalThings',
				totalpage: '=totalPages'
		},
		template : function(element, attrs) { 
			
			
			return "<div class=\"jpag prdpaginationdiv\" id=\"srchpagination\">"+
		                "<div class=\"pageinfodiv\" >{{pagearr.info}}</div>"+
		                
		                    "<a class=\"prdpagination prevnxt\">PREVIOUS</a>"+
		                

		                
		                
			               "<div  ng-repeat=\"a in pagearr.pagenumbers\" >"+  
			                   		"<span ng-if=\"n == page\" class=\"act prdpagination countervar\"><span class=\"countertext\">{{a}}</span></span>"+
			                   
			                   		"<a ng-if=\"n != page\" class=\"prdpagination countervar\" href='' onclick=''>{{a}}</a>"+
			                "</div>" +
		                   		                    
                    "<a class=\"prdpagination prevnxt\" href='' onclick=''>NEXT</a>"+
		                    
		                "</div>";
		            },
		controller : function($scope, $element){

			
			//console.log($scope.pagearr.pagenumbers);
			//$scope.calculate_pages($scope.count, '10', $scope.page);


		},
		link: function (scope, element, attrs) {
//console.log(scope.count);
//console.log(scope.page);
//console.log(scope.totalpage);




			scope.calculate_pages = function(count, rows_per_page, page){

					var arr = {};
					var adjacents = 5;
					
					// calculate last page
					var last_page = Math.ceil(count / rows_per_page);
//console.log("lastpg::"+last_page);
					// make sure we are within limits
					page = parseInt(page);
					if (page < 1)
					{
					   page = 1;
					} 
					else if (page > last_page)
					{
					   page = last_page;
					}
//console.log("newpage::"+page);
					var upto = (page - 1) * rows_per_page;
					//var limit = 'LIMIT '.$upto.',' .10;
					var current = page;
					if (page == 1)
						var previous = page;
					else
						var previous = page - 1;

//console.log("previous::"+previous);					
					if (page == last_page)
						var next = last_page;
					else
						var next = page + 1;
//console.log("next::"+next);
					var last = last_page;
//console.log("newlast::"+last);
					var info = 'Page ('+page+' of '+last_page+')';

					var pages = scope.get_surrounding_pages(page, last_page, next);
					console.log(pages);

					if(page < 6){
		                var cnt = 1;
		                var lastpageCnt = 10; 
		            }
		            else{
		                var cnt = page - 4;
		                var lastpageCnt = $page + 5;    
		            }
		            if(lastpageCnt > last){
		                lastpageCnt = last;       
		            }

					arr['pagenumbers']  = pages;
					arr['info']         = info;
					arr['lastpage']     = last;
					arr['nextpage']     = next;
					arr['previouspage'] = previous;
					arr['cnt']          = cnt;
					arr['oneLessCnt']   = cnt -1;
					arr['lastpageCnt']  = lastpageCnt;
					
					scope.pagearr = arr;
					//console.log("slda");
					//console.log(scope.pagearr);
					console.log(arr);
				//return pages;
			};

			scope.get_surrounding_pages = function(page_num, last_page, next){
				var arr = [];
				var show = 5; // how many boxes
				// at first
				if (page_num == 1)
				{
					// case of 1 page only
					if (next == page_num) return array(1);
					for (var i = 0; i < show; i++)
					{
						if (i == last_page) break;
						arr.push(i + 1);
					}
					return arr;
				}
				// at last
				if (page_num == last_page)
				{
					var start = last_page - show;
					if (start < 1) start = 0;
					for (var i = start; i < last_page; i++)
					{
						arr.push(i + 1);
					}
					return arr;
				}
				// at middle
				var start = page_num - show;
				if (start < 1) start = 0;
				for (var i = start; i < page_num; i++)
				{
					arr.push(i + 1);
				}
				for (var i = (page_num + 1); i < (page_num + show); i++)
				{
					if (i == (last_page + 1)) break;
					arr.push(i);
				}
				return arr;
			};

			//setTimeout(function() {
				scope.calculate_pages(scope.count, 10, scope.page);
			//}, 5000);
      } 
	};
});
