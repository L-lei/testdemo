(function(){
	//第一张图片的自适应大小
	var $content = $('#content'),
		$box1 = $content.find('.c-box1');
	scrollH();
	$(window).resize(scrollH);
	function scrollH(){
		$box1.height($(window).height() - $content.offset().top);
	}
})();
//9大应用群的点击事件
(function(){
	var $left = $('#content .c-box3 .tile .t-2 .left li'),
		$center = $('#content .c-box3 .tile .t-2 .center'), 
		$c_li = $center.find('li'),
		length = $c_li.length,
		index = 0,
		timer = null,
		inTime = 0,
		time = 2000;
	
		$left.eq(index).addClass('on');
		$c_li.eq(index).addClass('on');
		auto();
	$c_li.click(function(){
		var $index = $(this).index(),
			nowTime = new Date();
		if ($index !== index && nowTime-inTime>100){
			change(function(){index = $index;});
			inTime = nowTime;
		};
	});
	function change(fn){
		$left.eq(index).removeClass();
		$c_li.eq(index).removeClass();
		fn();
		$left.eq(index).addClass('on');
		$c_li.eq(index).addClass('on');
	}
	function auto(){
		timer = setInterval(function(){
			change(function(){index = ++index%length;})
		},time); 
	}
	$center.hover(function(){
		clearInterval(timer);
	},function(){
		auto();
	});
})();
//点击b-img下拉
(function(){
    var $tile= $("#content .tile"),
		$btn = $("#content  .b-img"),
		length = $btn.length, 
        $header = $("#header").height() ;

    $btn.click(function () {
        var top = $tile.offset().top-($(window).height()-$tile.height()-$header)/2-$header,
			num = $(this).index('.b-img') +1;
			top = num===1?top:top-10;
        $("body,html").animate({
            scrollTop : top*num
        },1000)
    })
})();