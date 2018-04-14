
$(function() {
    describe('RSS Feeds', function() {      
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toEqual(0);
        });

		it('All urls are not empty',function(){     
			var regularExpressionUrl = /^((ht|f)tps?):\/\/([\w\-]+(\.[\w\-]+)*\/)*[\w\-]+(\.[\w\-]+)*\/?(\?([\w\-\.,@?^=%&:\/~\+#]*)+)?/; // 检查 URL 格式是否正确的正规表达式
			allFeeds.forEach(function(item){
				var urls=item.url;
				noEmpty(urls);
				expect(item.url).toMatch(regularExpressionUrl); // 检查格式
			});
		});
        
        it('All names are not empty',function(){
        		allFeeds.forEach(function(item){
				var name=item.name;
				noEmpty(name);
        		})
        });
    });
    /* 编写一个名为“菜单”的新测试套件*/
    describe('The menu',function(){
   	 	var $menuIcon ;
   	 	var $body;
    		beforeEach(function(){
    			 $menuIcon = $('.menu-icon-link');
    			 $body=$('body');
    		});
    		afterEach(function(){
    			 $menuIcon=null;
    			 $body=null;
    		});
    		  		
   		it('the menu element is hidden by default',function(){      //菜单是否默认隐藏
   				expect($body.hasClass('menu-hidden')).toBeTruthy();    //body 身上的class menu-hidden 决定了菜单的隐藏与显示，针对这个做测试  			
   		});
   		
   		it('the menu visibility or hidden',function(){
   			$menuIcon.trigger('click');                       //触发菜单的点击事件
   			expect($body.hasClass('menu-hidden')).toBe(false);
   			$menuIcon.trigger('click');
   			expect($body.hasClass('menu-hidden')).toBe(true);
   		});
   });
	
	//测试loadFeed被调用时能成功运行
	describe('Initial Entries',function(){
		var $container;		
		beforeEach(function(done){
			$container = $('.feed');						
			loadFeed(0,done);					
		});
		it('the loadFeed function is called and completes its work',function(){        	
			expect($container.children().length).toBeGreaterThan(0);           //.feed的子元素个数大于0
			expect($container.children().hasClass('entry-link')).toBeTruthy();     //而且子元素是想要的模板元素
			
		})
	});

	//测试当用 loadFeed 函数加载一个新源的时候内容会真的改变
  	 describe('New Feed Selection',function(){
  	 	var $container;		
  	 	var allFeedslen;
  	 	var lastTextOne;               //保存上一个feedlist列表中的第一项的内容
  	 	var textOne;						//保存当前列表第一项的内容
  	 	
   		beforeEach(function(done){
   			$container = $('.feed');		
   			allFeedslen=allFeeds.length-1;
			loadFeed(allFeedslen,function(){     //加载allFeeds中最后一项的资源，并存储它的第一个子元素的内容
   				lastTextOne=$container.children().eq(0).text();               
   				loadFeed(0,function(){                       //先加载下标是最后的资源，再加载下标为0的，是因为初始化，显示的是下标为0的资源，这样避免修改页面
   					textOne=$container.children().eq(0).text();         
   					done();
   				});   				
			}); 						
   		});
   		
   		it('The content actually changes',function(){
   			expect(textOne).not.toEqual(lastTextOne);
   			
   		});
 	 });
});

function noEmpty(str){             //判断一个url或者name是否存在，且不为空
	expect(str).toBeDefined();            
	expect(str.length).not.toEqual(0);	 
}
