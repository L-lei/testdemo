//header�е��������ʾ������
	$(function(){
		var $last = $('#header .nav .tit .tit2 li:last-child'),
		$duo = $last.find('.duo'),
		$d_list = $last.find('.d-list');
		$last.click(function(){
			$d_list.toggle();
		});
	});