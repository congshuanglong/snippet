/*
 * 用于快速创建Html结构
 * objectToHtml({'li|f':'span'}); --><li class='f'><span></span></li>
 * objectToHtml('className'); --><div class='className'></div>
 */
objectToHtml=function(o){//将对象转换成Element元素,o等转换的内容
  var kwds = ['div','ul','li','span'];
  if(typeof o == 'object' && o.length){ //数组
    var elemArr = [];
    for(var i in o){
      elemArr.push(Util.objectToHtml(o[i]));
    }
    return elemArr;
  }else if(typeof o == 'object'){//对象
    var p,ch;
    for(var i in o){
      p = Util.objectToHtml(i);
      ch = Util.objectToHtml(o[i]);
      if(ch.length){ //数组
        for(var i in ch){
          p.appendChild(ch[i]);
        }
      }else{
        p.appendChild(ch);
      }
    }
    return p;
  }else if(typeof o == 'string'){//字符串
    var ts = o.split('|');
    var te;
    if(ts.length > 1){
      te = document.createElement(ts[0]);
      te.className=ts[1];
    }else if($.inArray(ts[0],kwds)>0){
      te = document.createElement(ts[0]);
    }else{
      te = document.createElement('div');
      te.className=ts[0];
    }
    return te;
  }
}
