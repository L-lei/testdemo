!function(){
	//
	//????????
	function $(obj){//obj???????
		return new Init(obj);//????cl????
	}
	
	//??????
	function Init(obj){
		this.exe(obj);
	}
	$.prototype.constructor = $;
	//?????????
	Init.prototype = {
		exe:function(obj){ //????????????
			switch(typeof obj){
				case 'string':
					if (/^<[^><]+>/.test(obj)){//??????????
						var Tag = document.createElement('div');
						Tag.innerHTML = obj;
						this.length = Tag.children.length;
						for (var i=0,l=this.length;i<l;i++ ){
							this[i] = Tag.children[0];
							this[i].index = i;
						}
					}else{
						var tag = document.querySelectorAll(obj);
						this.length = tag.length;
						//??js?????��??????cl?????��?
						for (i=0,l=this.length;i<l;i++ ){
							this[i] = tag[i];
							this[i].index = i;
						}
					}
				break;
				case 'function':
					window.onload = obj;
					break;
				case 'object'://???????????????obj.nodeType???
					if (obj.nodeType || obj == window ){
						this.length = 1;
						this[0] = obj;
						this[0].index = 0;
					}else{
						this.length = obj.length;
						for (i=0;i<this.length;i++ ){
							this[i] = obj[i];
							this[i].index = i;
						}
					}
					break;
			}
		},
		index:function(){
			return this[0].index;
		},
		extend : function(json){//???$???????????
			if (typeof json === 'object'){
				for (var key in json){
					this[key] = json[key].bind(this);
				}
			}
			return this;
		},
		append:function(el){//?????	��???--->?????cl?????????????? ?��???????cl??????????????????cl???????????
			var eType = typeof el;
			if (eType === 'string'){
				if (/^<[^><]+>/.test(el)){//???????
					this.append($(el));
				}else{//????????
					this[0].appendChild(document.createTextNode(el));
					this[0].removeChild(document.createTextNode(el));
				}
			}else if (eType === 'object'){
				if (el.constructor === Init){//??????cl????
					var This = this[0];
					this.each(function(i){
						This.removeChild(el[i]);
						This.appendChild(el[i]);
					});
				}else{
					this.append($(el));
				}
			}
			return $(this);
		},
		prepend:function(el){//????????????
			var eType = typeof el;
			if (eType === 'string'){
				if (/^<[^><]+>/.test(el)){//???????
					this.prepend($(el));
				}else{//????????
					this[0].removeChild(el);
					this[0].insertBefore(document.createTextNode(el),this[0].children[0]);
				}
			}else if (eType === 'object'){
				if (el.constructor === Init){//??????cl????
					var This = this[0],
						l = el.length -1;
					this.each(function(i){
						This.removeChild(el[i]);
						This.insertBefore(el[l - i],This.children[0]);//??????????????????????????????????????
					});
				}else{
					this.prepend($(el));
				}
			}
			return $(this);
		},
		wrap:function(el){//???????????? ?��????????????????????????????????cl?????????????????
			if (typeof el === 'string' && /^<[^><]+>/.test(el)){//?????????
				el = $(el)[0];
			}else{
				if (el.constructor === Init ){//?????cl????
					el = el[0];
				}else if(!el.nodeType && el.length){//?????????? ???????????????????
					el = el[0];
				}
			} 
			var prant = this[0].parentNode;
			prant.insertBefore(el,this[0]);
			this.each(function(){
				el.appendChild(this);
			});
			return this;
		},
		unwrap:function(){//??????????? ?��:?????????????????????????????????????????????????????????
			this.each(function(){
				var p = this.parentNode,
					pC = p.children,
					pP = p.parentNode;
				for (var i=pC.length - 1;i>-1;i--){
					pP.insertBefore(pC[pC.length - 1 -i],p);
				}console.log(p,pP);
				pP.removeChild(p);
			});
			return this;
		},
		empty:function(){//???????????
			this.each(function(){
				this.innerHTML = '';
			});
			return this;
		},
		remove:function(){//??????
			this.each(function(){
				this.parentNode.removeChild(this);
			});
			return this;
		},
		children:function(child){//???????
			var arr = [];
			if (typeof child === 'string'){//????��????????��?????????????????????????????????????arr
				this.each(function(){
					var zi = this.querySelectorAll(child);
					for (var i=0,l=zi.length;i<l ;i++ ){
						if (zi[i].parentNode === this){
							arr.push(zi[i]);
						}
					}
				});
			}else{
				this.each(function(){
					for (var i=0;i<this.children.length ;i++ ){
						arr.push(this.children[i]);
					}
				});
			}
			return $(arr);
		},
		first:function(){
			return this[0];
		},
		last:function(){
			return this[this.length-1];
		},
		find:function(parameter){//????
			var arr = [];
			if (typeof parameter){
				this.each(function(){
					var all = this.querySelectorAll(parameter);
					for (var i=0,l=all.length;i<l ;i++ ){
						arr.push(all[i]);
					}
				});
			}
			return $(arr);
		},
		siblings:function(parameter){//???????
			var arr = [];
			if (typeof parameter === 'string'){
				this.each(function(){
					var allSibling = this.parentNode.querySelectorAll(parameter);//??????????????????????????
					for (var i=0,l=allSibling.length;i<l ;i++ ){
						if (allSibling[i].parentNode === this.parentNode && allSibling[i] !== this){//?????????????????????????????????????????????
							arr.push(allSibling[i]);
						}
					}
				});
			}else{
				this.each(function(){//????????????????????????????????????????
					allSibling = this.parentNode.children;
					for (i=0,l=allSibling.length;i<l ;i++ ){
						if (allSibling[i] !== this){
							arr.push(allSibling[i]);
						}
					}
				});
			}
			return $(arr);
		},
		outerHeight:function(){//???????? ??????+padding+???
			return this[0].offsetHeight;
		},
		outerWidth:function(){//???????? ??????+padding+???
			return this[0].offsetWidth;
		},
		innerHeight:function(){//???????? ??????+padding ,?????????
			return this[0].clientHeight;
		},
		innerWidth:function(){//???????? ??????+padding ,?????????
			return this[0].clientWidth;
		},
		height:function(val){//?????
			if (typeof val !== 'undefined'){
				this.css('height',val);
			}else{
				return this.css('height');
			}
			return this;
		},
		width:function(val){//?????
			if (typeof val !== 'undefined'){
				this.css('width',val);
			}else{
				return this.css('width');
			}
			return this;
		},
		position:function(){//???????????��????
			return {left:this[0].offsetLeft,top:this[0].offsetTop};
		},
		scrollTop:function(top){//????Top
			var obj = this[0];
			if (obj === window || obj === document || obj === document.body ){
				var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
				if (typeof top !== 'undefined'){
					scrollTop = isNaN(top)?top:top+'px';
				}else{
					return scrollTop;
				}
			}else{
				if (typeof top !== 'undefined'){
					obj.scrollTop = isNaN(top)?top:top+'px';
				}else{
					return obj.scrollTop;
				}
			}
			return this;
		},
		scrollLeft:function(left){//????Left
			var obj = this[0];
			if (obj === window || obj === document || obj === document.body ){
				var scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft;
				if (typeof left !== 'undefined'){
					scrollLeft = isNaN(left)?left:left+'px';
				}else{
					return scrollLeft;
				}
			}else{
				if (typeof left !== 'undefined'){
					obj.scrollLeft = isNaN(left)?left:left+'px';
				}else{
					return obj.scrollLeft;
				}
			}
			return this;
		},
		offset:function(){//?????????????? = ????body????? - ?????????
			var json= {left:0,top:0},
				obj = this[0];
			while (obj !== document.body){
				json.left += obj.offsetLeft;
				json.top += obj.offsetTop;
				obj = obj.offsetParent;
			}
			var scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft,
				scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
			json.left -= scrollLeft;
			json.top -= scrollTop;
			return json;
		},
		val:function(text){//?????????
			var val = '';
			this.each(function(){
				if ((typeof text !== 'undefined') && this.value){
					this.value = text;
				}else{
					val =  this.value;
				}
			});
			return text?this:val;
		},
		text:function(text){//??????????
			var val = '';
			this.each(function(){
				if (typeof text !== 'undefined'){
					this.innerText = text;
				}else{
					val =  this.innerText;
				}
			});
			return text?this:val;
		},
		html:function(text){//??????????
			var val = '';
			this.each(function(){
				if (typeof text !== 'undefined'){
					this.innerHTML = text;
				}else{
					val =  this.innerHTML;
				}
			});
			return text?this:val;
		},
		toggleClass:function(Name){//????????????????????????????
			this.each(function(){
				var str = this.className,
					arr = [];
				if (str && Name){
					var arrN = [...new Set(Name.split(' '))],
						arrS = [...new Set(str.split(' '))];
					
					//?????????????????????????  ???????????????????????????????????????????????????????
					for (var i=arrN.length-1;i>-1;i-- ){
						for (var j=arrS.length-1;j>-1 ; j--){
							if(arrN[i]===arrS[j]){
								arrN.splice(i,1);
								arrS.splice(j,1);
							}
						}
					}
					arr = [...new Set(arrS.concat(arrN))];
				}else if(!str){
					arr = [...new Set(Name.split(' '))];
				}
				
				this.className = arr.join(' ');
			});
			return this;
		},
		removeClass:function(Name){//???????
			this.each(function(){
				var str = this.className;
				if (str && Name){
					var arrN = Name.split(' '),
						arr = [...new Set(str.split(' ').concat(arrN))];
					//?????????????????????????
					for (var i=arrN.length-1;i>-1;i-- ){
						for (var j=arr.length-1;j>-1 ; j--){
							if (arrN[i]===arr[j]){
								arr.splice(j,1);//???��???i??????1??
							}
						}
					}
					this.className = arr.join(' ');
				}else{
					this.className = "";
				}
			});
			return this;
		},
		addClass:function(Name){//???????
			this.each(function(){
				var str = this.className;
				if (str && Name){
					this.className = [...new Set(str.split(' ').concat(Name.split(' ')))].join(' ');
				}else{
					this.className = [...new Set(Name.split(' '))].join(' ');
				}
			});
			return this;
		},
		hasClass:function(parameter){//???????
			var cName = this[0].className,
				bool = false,
				arr = parameter.split(' ');
			for (var i=0,l=arr.length;i<l ;i++ ){
				if ((new RegExp("(^|\\s)"+arr[i]+"(\\s|$)")).test(cName)){
					bool = true;
				}else{
					bool = false;
					break;
				}
			}
			return bool;
		},
		attr:function(attr){//????????????????
			var attrType = typeof attr,
				arr = (attrType === 'object')?attr:arguments,
				l = arr.length;

			if (attrType === 'string' && (l === 2)){
				this.each(function(){
					this.setAttribute(arr[0],arr[1]);
				});
			}else if (attrType === 'string' && (l === 1)){
				return this[0].getAttribute(attr);
			}else if (attrType === 'object'){
				this.each(function(){
					for (var key in arr){
						this.setAttribute(key,arr[key]);
					}
				});
			}
			return this;
		},
		each:function(fn){//????
		for (var i=0,l=this.length;i<l;i++ ){
				fn.call(this[i],i);
			}
		},
		css:function(set){//???????
			var setType = typeof set,
				arr = (setType === 'object')?set:arguments,
				l = arr.length;
			//??????????????px??��??
			var str = 'left,right,top,bottom,marginLeft,marginTop,marginRight,marginBottom,paddingLeft,paddingTop,paddingRight,paddingBottom,width,height,fontSize';
			
			if (setType === 'string' && (l === 2)){
				
				this.each(function(){//??str????????????????????????px
					this.style[arr[0]] = (str.indexOf(arr[0])!==-1&&(!isNaN(arr[1])))?arr[1]+'px':arr[1];
				});
			}else if (setType === 'string' && (l === 1)){
				var val = '';
				switch (set){
					case 'left':
						val = this[0].offsetLeft;
						break;
					case 'top':
						val = this[0].offsetTop;
						break;
					case 'right':
						val = this[0].offsetLeft + this[0].offsetWidth;
						break;
					case 'bottom':
						val = this[0].offsetTop + this[0].offsetHeight;
						break;
					default:
						if (str.indexOf(arr[0])!==-1){
							val = parseFloat(this[0].currentStyle?this[0].currentStyle[arr[0]]:getComputedStyle(this[0])[arr[0]]);
						}else{
							val = this[0].currentStyle?this[0].currentStyle[arr[0]]:getComputedStyle(this[0])[arr[0]];
						}
					break;
				}
				return val;
			}else if (setType === 'object'){
				this.each(function(){
					for (var key in arr){//??str????????????????????????px
						this.style[key] = (str.indexOf(key)!==-1&&(!isNaN(arr[key])))?arr[key]+'px':arr[key];
					}
				});
			}
			return this;
		},
		eq:function(i){//???????cl????????0??
			return $(this[isNaN(i)?0:i]);
		},
		next:function(){
		if(this.node){
			console.log(this.node);
		}
			var a = this[0].nextSibling;
			if (a.nodeName === 1){
				return $(a);
			};
			return $(a.nextSibling);
		},
		get:function(i){//????????????????js????????0??
			return this[isNaN(i)?0:i];
		},
		on:function(eName,fn){//???????
			if (eName === 'mousewheel'){
				this.each(function(){
					this[eName+'cl']?this[eName+'cl'].push(eFn):this[eName+'cl']=[eFn];
					var ifFF = window.onmousewheel === 'undefined'?'DOMMouseScroll':eName;
					function eFn(e){
						e = e || window.event;
						if (fn.call(this,e,e.wheelDelta/120||-e.detail/3)===false){
							!-[1,]?e.returnValue=false:e.preventDefault()
						}
					}
					window.addEventListener?this.addEventListener(ifFF,eFn):this.attachEvent('on'+ifFF,eFn);
				});
			}else{
				this.each(function(){
					this[eName+'cl']?this[eName+'cl'].push(fn):this[eName+'cl']=[fn];
					window.addEventListener?this.addEventListener(eName,fn):this.attachEvent('on'+eName,fn);
				});
			}
			return this;
		},
		off:function(eName){//??????
			if (eName === 'mousewheel'){
				this.each(function(){
					if (this[eName+'cl']){
						eName = window.onmousewheel === 'undefined'?'DOMMouseScroll':eName;
						for (var i=0,l=this[eName+'cl'].length;i<l ;i++ ){
							window.removeEventListener?this.removeEventListener(eName,this[eName+'cl'][i]):this.detachEvent('on'+eName,this[eName+'cl'][i]);
						}	
					}
				});
			}else{
				this.each(function(){
					if (this[eName+'cl']){
						for (var i=0,l=this[eName+'cl'].length;i<l ;i++ ){
							window.removeEventListener?this.removeEventListener(eName,this[eName+'cl'][i]):this.detachEvent('on'+eName,this[eName+'cl'][i]);
						}	
					}
				});
			}
			return this;console.log(eName);
		},
		hover:function(){
			var arr = arguments;
			if (arr.length){
				if (arr.length === 1){
					arr[1] = arr[0];
				}
				this.on('mouseenter',arr[0]);
				this.on('mouseleave',arr[1]);
			}
			return this;
		},
		click:function(fn){
			return this.on('click',fn);
		},
		dblclick:function(fn){
			return this.on('dblclick',fn);
		},
		mousewheel:function(fn){
			return this.on('mousewheel',fn);
		},
		contextmenu:function(fn){
			return this.on('contextmenu',fn);
		},
		mouseenter:function(fn){
			return this.on('mouseenter',fn);
		},
		mouseleave:function(fn){
			return this.on('mouseleave',fn);
		},
		mouseover:function(fn){
			return this.on('mouseover',fn);
		},
		mouseout:function(fn){
			return this.on('mouseout',fn);
		},
		mousedown:function(fn){
			return this.on('mousedown',fn);
		},
		mousemove:function(fn){
			return this.on('mousemove',fn);
		},
		mouseup:function(fn){
			return this.on('mouseup',fn);
		},
		keydown:function(fn){
			return this.on('keydown',fn);
		},
		keyup:function(fn){
			return this.on('keyup',fn);
		},
		keypress:function(fn){
			return this.on('keypress',fn);
		},
		blur:function(fn){
			return this.on('blue',fn);
		},
		foucs:function(fn){
			return this.on('foucs',fn);
		},
		resize:function(fn){
			return this.on('resize',fn);
		},
		load:function(fn){
			return this.on('load',fn);
		},
		submit:function(fn){
			return this.on('submit',fn);
		},
		change:function(fn){
			return this.on('change',fn);
		},
		scroll:function(fn){
			return this.on('scroll',fn);
		},
		drag:function(fn){
			return this.on('drag',fn);
		},
		show:function(){//???
			var arr = arguments;
			if(arr.length === 0){
				this.each(function(){
					this.style.display = 'block';
				});
			}else{
				var val,callback;
				if (typeof arr[0] === 'number'){
					(typeof arr[1] === 'function')?(callback = arr[1],val = arr[0]):(val = arr[0]);
				}else if(typeof arr[0] === 'function'){
					callback = arr[0];
				}
				this.each(function(){
					if ($(this).css('display') === 'none'){
						this.style.display = 'block';
						var width = this.clientWidth,
							height = this.clientHeight,
							opacity = $(this).css('opacity');
						this.style.width = '0';
						this.style.height = '0';
						this.style.opacity = '0';
						$(this).animate({width:width,height:height,opacity:opacity},val,callback.bind(this));
					}
				});
			}
			return this;
		},
		hide:function(){//????
			var arr = arguments;
			if(arr.length === 0){
				this.each(function(){
					this.style.display = 'none';
				});
			}else{
				var val,callback;
				if (typeof arr[0] === 'number'){
					(typeof arr[1] === 'function')?(callback = arr[1],val = arr[0]):(val = arr[0]);
				}else if(typeof arr[0] === 'function'){
					callback = arr[0];
				}
				this.each(function(){
					var is = this;
					if ($(this).css('display') !== 'none'){
						$(this).animate({width:'0',height:'0',opacity:'0'},val,function(){
							is.style.display = 'none';
							callback&&callback.bind(this);
						});
					}
				});
			}
			return this;
		},
		toggle:function(){//????????????????????
			var arr = arguments;
			if(arr.length === 0){
				this.each(function(){
					if ($(this).css('display') === 'none'){
						$(this).show.apply($(this));
					}else{
						$(this).hide.apply($(this));
					}
				});
			}else{
				this.each(function(){
					if ($(this).css('display') === 'none'){
						$(this).show.apply($(this),arr);
					}else{
						$(this).hide.apply($(this),arr);
					}
				});
			}
			
			return this;
		},
		fadeIn:function(time,back){//????
			var time = time || 300;
			this.each(function(){
				if ($(this).css('display') === 'none'){
					this.style.display = 'block';
					this.style.opacity = '0';
					$(this).animate({opacity:'1'},time,back);
				}
			});
			return this;
		},
		fadeOut:function(time,back){//????
			var time = time || 300;
			this.each(function(){
				if ($(this).css('display') !== 'none'){
					var is = this;
					$(this).animate({opacity:'0'},time,function(){
						is.style.display = 'none';
						back&&back();
					});
				}
			});
			return this;
		},
		fadeToggle:function(){//??????????????
			var arr = arguments;
			this.each(function(){
				if ($(this).css('display') === 'none'){
					$(this).fadeIn.apply($(this),arr);
				}else{
					$(this).fadeOut.apply($(this),arr);
				}
			});
			return this;
		},
		slideDown:function(time,back){//??????????
			this.each(function(){
				if ($(this).css('display') === 'none'){
					this.style.display = 'block';
					var height = this.clientHeight;
					this.style.height = '0';
					$(this).animate({height:height},time,back);
				}
			});
			return this;
		},
		slideUp:function(time,back){//??????????
			this.each(function(){
				if ($(this).css('display') !== 'none'){
					var is = this;
					$(this).animate({height:'0'},time,function(){
						is.style.display = 'none';
						back&&back.call(is);
					});
				}
			});
			return this;
		},
		slideToggle:function(time,back){//???????????????????????????????
			this.each(function(){
				if ($(this).css('display') === 'none'){
					$(this).slideDown.call($(this),time,back);
				}else{
					$(this).slideUp.call($(this),time,back);
				}
			});
			return this;
		},
		stop:function(){
			window.cancelAnimationFrame = window.canceltAnimationFrame || clearTimeout;
			cancelAnimationFrame();
			return this;
		},
		animate:function(json,time,callback,curve){//????????????????????????????????????
			if (typeof json === 'object'){
				time = (typeof time === 'number')?time:300;
				curver = this.tween[curve]?this.tween[curve]:this.tween.linear;
				
				window.requestAnimationFrame = window.requestAnimationFrame || function(fn){return setTimeout(fn,1000/60)};
				window.cancelAnimationFrame = window.canceltAnimationFrame || clearTimeout;
				var This = this,
					nowTime = new Date();
				this.each(function(){
					var sty = this.currentStyle || getComputedStyle(this);
					var timer = null;
					var poor = {},//?????????????
						init = {};//??????
					for (var key in json ){
						init[key] = parseFloat(sty[key]);
						poor[key] = parseFloat(json[key]) - init[key];
					};
					
					(function fn(){
						var cTime = new Date() - nowTime;
						for (var you in init){
							var val = curver.call(This,cTime,init[you],poor[you],time);
							
							if (cTime >= time){
								val = init[you]+poor[you];
							}
							if (you === 'opacity'){
								this.style[you] = val;
								this.style.filter = 'aplha(opacity='+val*100+')';
							}else{
								this.style[you] = val +'px';
							}
						}
						cTime >= time?(cancelAnimationFrame(timer),callback&&callback.call(this)):timer = requestAnimationFrame(fn.bind(this));
					}.bind(this))()
				});
			}
			return this;
		},
		tween:{//???????
			linear: function (t, b, c, d){  //????
				return c*t/d + b;
			},
			easeIn: function(t, b, c, d){  //????????
				return c*(t/=d)*t + b;
			},
			easeOut: function(t, b, c, d){  //????????
				return -c *(t/=d)*(t-2) + b;
			},
			easeBoth: function(t, b, c, d){  //???????????
				if ((t/=d/2) < 1) {
					return c/2*t*t + b;
				}
				return -c/2 * ((--t)*(t-2) - 1) + b;
			},
			easeInStrong: function(t, b, c, d){  //?????????
				return c*(t/=d)*t*t*t + b;
			},
			easeOutStrong: function(t, b, c, d){  //??????????
				return -c * ((t=t/d-1)*t*t*t - 1) + b;
			},
			easeBothStrong: function(t, b, c, d){  //??????????????
				if ((t/=d/2) < 1) {
					return c/2*t*t*t*t + b;
				}
				return -c/2 * ((t-=2)*t*t*t - 2) + b;
			},
			elasticIn: function(t, b, c, d, a, p){  //????????????????????
				if (t === 0) {
					return b;
				}
				if ( (t /= d) == 1 ) {
					return b+c;
				}
				if (!p) {
					p=d*0.3;
				}
				if (!a || a < Math.abs(c)) {
					a = c;
					var s = p/4;
				} else {
					var s = p/(2*Math.PI) * Math.asin (c/a);
				}
				return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
			},
			elasticOut: function(t, b, c, d, a, p){    //??????????????????????
				if (t === 0) {
					return b;
				}
				if ( (t /= d) == 1 ) {
					return b+c;
				}
				if (!p) {
					p=d*0.3;
				}
				if (!a || a < Math.abs(c)) {
					a = c;
					var s = p / 4;
				} else {
					var s = p/(2*Math.PI) * Math.asin (c/a);
				}
				return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
			},
			elasticBoth: function(t, b, c, d, a, p){
				if (t === 0) {
					return b;
				}
				if ( (t /= d/2) == 2 ) {
					return b+c;
				}
				if (!p) {
					p = d*(0.3*1.5);
				}
				if ( !a || a < Math.abs(c) ) {
					a = c;
					var s = p/4;
				}
				else {
					var s = p/(2*Math.PI) * Math.asin (c/a);
				}
				if (t < 1) {
					return - 0.5*(a*Math.pow(2,10*(t-=1)) *
						Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
				}
				return a*Math.pow(2,-10*(t-=1)) *
					Math.sin( (t*d-s)*(2*Math.PI)/p )*0.5 + c + b;
			},
			backIn: function(t, b, c, d, s){     //???????????????
				if (typeof s == 'undefined') {
					s = 1.70158;
				}
				return c*(t/=d)*t*((s+1)*t - s) + b;
			},
			backOut: function(t, b, c, d, s){
				if (typeof s == 'undefined') {
					s = 3.70158;
				}
				return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
			},
			backBoth: function(t, b, c, d, s){
				if (typeof s == 'undefined') {
					s = 1.70158;
				}
				if ((t /= d/2 ) < 1) {
					return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
				}
				return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
			},
			bounceIn: function(t, b, c, d){    //?????????????
				return c - this.tween['bounceOut'](d-t, 0, c, d) + b;
			},
			bounceOut: function(t, b, c, d){
				if ((t/=d) < (1/2.75)) {
					return c*(7.5625*t*t) + b;
				} else if (t < (2/2.75)) {
					return c*(7.5625*(t-=(1.5/2.75))*t + 0.75) + b;
				} else if (t < (2.5/2.75)) {
					return c*(7.5625*(t-=(2.25/2.75))*t + 0.9375) + b;
				}
				return c*(7.5625*(t-=(2.625/2.75))*t + 0.984375) + b;
			},
			bounceBoth: function(t, b, c, d){
				if (t < d/2) {
					return this.tween['bounceIn'](t*2, 0, c, d) * 0.5 + b;
				}
				return this.tween['bounceOut'](t*2-d, 0, c, d) * 0.5 + c*0.5 + b;
			}
		},
		/*extend:function(json){//???$???????????
			if (typeof json === 'object'){
				for (var key in json){
					$[key] = json[key].bind(this);
				}
			}
			return this;
		}*/

	}
	$.ajax=function(json){//ajax
				json = json || {};
				var type = json.type || 'get',
					dataType = json.dataType || 'JSON',
					data = json.data,
					asyns = json.asyns !== false;
					url = json.url,
					success = json.success,
					error = json.error;

				data = data &&(function(){
					var arr = [];
					for (var key in data){
						arr.push(key+'='+data[key]);
					}
					return arr.join("&");
				})();

				var xhr = window.XMLHttpRequest?new XMLHttpRequest():new ActiveXobject('Microsoft.XMLHTTP');

				if (dataType.toUpperCase() === 'JSONP'){
					jsonp(url,data);
				}else if(dataType.toUpperCase() === 'JSON'){
					if (type.toLowerCase() === 'get'){
						xhr.open(type,url+'?'+data+'&_t='+new Date().getTime(),asyns);
						xhr.send(null);
					}else if (type.toLowerCase() === 'post'){
						xhr.open(type,url,asyns);
						xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
						xhr.send(data);
						}else{
							console.log(type+' is undefined');
						}
					}
				xhr.onreadystatechange = function(){
					if (this.readyState === 4){
						var status = this.status,
							text = this.responseText;
						(status === 200 && dataType.toUpperCase() === 'JSON')?(success&&success(text)):error&&error(text);
		        	}

		        	}

		        	function jsonp(url,data){//??jsonp????????
		        		var sp = document.createElement('script');
		        		sp.src = url+'?'+data+'&_t='+new Data().getTime();
		        		document.body.appendChild(sp);
		       	}
		};
	Init.prototype.constructor = Init;
	window.$ = window.cl = $;
}()



