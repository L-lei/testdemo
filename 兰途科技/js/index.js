//content中视频控制
(function(){
	///$(function(){
		var $b_video = $('#content .c-pic li .c-right .b-video'),
			$video = $b_video.find('video'),
			$cover = $b_video.find('.b-cover');
		$b_video.click(function(){
			$cover.hide();
			$video.show()[0].play();

			$video[0].addEventListener('ended', endPlay);
			function endPlay(){
				$cover.show();
				$video.hide();
			}
			
		});
		$video.click(function(){
			this.pause();
		});
	//content中轮播
	(function(){
	var $pic = $('#content .c-pic li'),
		$pli = $('#content .pli li'),
		length = $pic.length;
		index = 0,
		timer = null,
		inTime = 0,
		time = 3000;
		//初始化
		$pic.eq(index).addClass('on');
		$pli.eq(index).addClass('on');
		$pli.click(function(){
			var nowTime = new Date(),
				$index = $(this).index();
			if (nowTime - inTime >500 && $index!==index){
				auto(function(){index = $index;});
				inTime = nowTime;
			}
		});
		function auto(fn){
			$pic.eq(index).removeClass('on');
			$pli.eq(index).removeClass('on');
			fn();
			$pic.eq(index).addClass('on');
			$pli.eq(index).addClass('on');
		}
		go();
		function go(){
			timer = setInterval(function(){auto(function(){index = ++index%length;});},time);
		}
		$pic.hover(function(){
			clearInterval(timer);
		},function(){
			go();
		});
	})();

	//})
})();
	//手机效果
(function(){
	var $tile = $('#section .tile'),
		$t1 = $tile.find('.s-t-1'),
		$t1_li = $t1.find('li'),
		$t2_li = $tile.find('.s-t-2 li'),
		$btn = $('#section .btn div'),
		length = $t1_li.length,
		index = ~~(length/2),
		left = $t1_li.width(),
		inTime = 0;
	$(window).resize(function(){
		left = $t1_li.width();
	});
	$(window).scroll(function(){
		if ($(this).scrollTop()>250){
			change();
		}
	});
	$btn.click(function(){
		var nowTime = new Date();
		if (nowTime - inTime >600){
			if ($(this).index()){
				index = ++index%length;
				change();
				$t1.stop().animate({'marginLeft':-left},500,function(){
					$(this).css('marginLeft',0);
					$t1.append($t1.children().first());
				});
			}else{
				(--index<0)&&(index=length-1);
				change();
				$t1.stop().animate({'marginLeft':left},500,function(){
					$(this).css('marginLeft',0);
					$t1.prepend($t1.children().last())
				});
			}
			inTime = nowTime;
		}
	});
	
	function change(){
		$t2_li.removeClass().eq(index).addClass('on');
		$t1_li.removeClass().eq(index-1).addClass('second').next().addClass('first').next().addClass('second');
	}
})();