# pagination

A simple Pagination directive which calculates total number of pages based on  data count. Provides link to First, Previous, Next & Last Page along with 5 page number strings. A callback function can be called when a page is changed.

How to use? 

1. Include the js directive file in your page
2. Initialize directive as below. Pass in Current Page number, Total Data Rows / Things And a callback function to be called on page change.

 
 ```html
 <div  web-pagination current-page="currentPage" total-things="totalThings" callback-fn="getMyJobs(pagenum)" rows="10"></div>
 ```
 
  
  
angular pagination
