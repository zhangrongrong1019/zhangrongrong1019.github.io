;
(function(){
  var transform=getTransform();
  function Drag(selector){
  	this.elem=typeof selector=='Object'?selector:document.getElementById(selector);
  	this.startX=0;
  	this.startY=0;
  	this.sourceX=0;
  	this.sourceY=0;
  	this.init()
  }

  Drag.prototype={
  	constructor:Drag,
  	init:function(){
  		this.setDrag();
  	},
  	getStyle:function(property){
  		return document.defaultView.getComputedStyle?document.defaultView.getComputedStyle(this.elem,false)[property]:this.elem.currentStyle[property];
  	},
  	getPosition:function(){
	  	var pos={x:0,y:0};
		if(transform){
			var transformValue=this.getStyle(transform);
			if(transformValue=='none'){
				this.elem.style[transform]='translate3d(0, 0, 0)';
				return pos
			}else{
				var temp=transformValue.match(/-?\d+/g);
				return pos={
					x:parseInt(temp[4].trim()),
					y:parseInt(temp[5].trim())
				}
			}
		}else{
          if(this.getStyle('position')=='static'){
               this.elem.style.position='relative';
          }else{
			var x=parseInt(this.getStyle('left')?this.getStyle('left'):0);
			var y=parseInt(this.getStyle('top')?this.getStyle('top'):0)
	        return pos={
	             x:x,
	             y:y
	        }
		  }
	   }
	},
    setPosition:function(pos){

	     if(transform){
			 if(pos.x<-this.maxWidth){
				 pos.x=-this.maxWidth
			 }else if(pos.x > 0 ){
				 pos.x=0
			 }
	     	this.elem.style[transform]='translate3d('+pos.x+'px,0,0)'
	     }else{
	     	this.elem.style.left=pos.x+'px';
	        //this.elem.style.top=pos.y+'px'
	     }
	     // return elem
    },
    setDrag:function(){
    	var self=this;
    	this.elem.addEventListener("touchstart",start,false);
    	function start(event){
			event.preventDefault()

			self.maxWidth=parseFloat(self.getStyle('width'))-document.body.clientWidth
			var touch = event.touches[0];
    		self.startX=touch.pageX;
    		self.startY=touch.pageY;
    		var pos=self.getPosition();
    		self.sourceX=pos.x;
    		self.sourceY=pos.y;
    		document.addEventListener("touchmove",move,false);
    		document.addEventListener("touchend",end,false);
    	}
    	function move(event){
			var touch = event.touches[0];
			var currentX=touch.pageX,
				currentY=touch.pageY,
    		/*var currentX=event.pageX,
    		    currentY=event.pageY,*/
    		    distanceX=currentX-self.startX,
    		    distanceY=currentY-self.startY;
    		    self.setPosition({
                    x:(self.sourceX+distanceX).toFixed(),
                    y:(self.sourceY+distanceY).toFixed()
    		    })
			event.preventDefault()

		}
    	function end(event){
			event.preventDefault()

			document.removeEventListener('touchmove',move);
              document.removeEventListener('touchend',end)
    	}
    }
  }
  function getTransform(){
	var transform='',
	    divStyle=document.createElement('div').style,
	    transformArr=['transform','webkitTransform','MozTransform','msTransform','oTransform'],
	    i=0,
	    len=transformArr.length;
	    for( ;i<len;i++ ){
	    	if(transformArr[i] in divStyle)
	    		return transform=transformArr[i];
	    }
	    return transform
  }
  window.Drag=Drag;
})()

