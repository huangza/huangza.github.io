(function($){

    $.alphaRadio = function(el, options){
        if (this instanceof $.alphaRadio !== true) {
            return new $.alphaRadio(el, options);
        }

        var timestampID = new Date().getTime();

        var aRadio = this;
        aRadio.$container = $(el);

        // 初始化 Radio
        aRadio.init = function(){
            aRadio.opts = $.extend({}, $.alphaRadio.defaults, options);
            
            aRadio.verify();
            aRadio.render();
            aRadio.bindEvent();
        };

        // 检查配置属性
        aRadio.verify = function(){
            var opts = aRadio.opts;

            if ( !isType(opts.items, 'array') ) {
                throw new Error('[alphaRadio] type error: items');
            }
            if ( !isType(opts.name, 'string') ) {
                throw new Error('[alphaRadio] type error: items');
            }
            if ( opts.color && !isType(opts.color, 'string') ) {
                throw new Error('[alphaRadio] type error: items');
            }
        };

        // 渲染模版
        aRadio.render = function(){
            var name = aRadio.opts.name;
            var items = aRadio.opts.items;
            var template = '';
            for(var i=0,len=items.length; i<len; i++){
                var o = items[i];
                str = '<label class="alphaRadio" for="radio-' + timestampID + '-' + i + '">'
                    + '<i></i>'
                    + '<input type="radio" name="' + name + '" id="radio-' + timestampID + '-' + i + '" value="' + o.value + '"> '
                    + '<span>' + o.text + '</span></label>';
                template += str;
            }
            aRadio.$container.html(template);
            aRadio.setStatus();
            // aRadio.setColor();
        };

        // 设置选中状态
        aRadio.setStatus = function(){
            var items = aRadio.opts.items;
            for(var i=0, len=items.length; i<len; i++){
                var o = items[i];
                if (o.checked === true) {
                    var lb = aRadio.$container.find('label').eq(i);
                    lb && lb.addClass('checked').find('input[type="radio"]').prop('checked', 'checked');
                    break;
                }
            }
        };

        // aRadio.setColor = function(){
        //     var clr = aRadio.opts.color;
        //     if ( isColor(clr) === true ) {
        //     } else {
        //         clr = $.alphaRadio.defaults.color;
        //         console.warn("Your color is illegal.");
        //     }
        // };

        // 绑定事件
        aRadio.bindEvent = function(){
            aRadio.$container.off();
            aRadio.$container.on('click', 'label.alphaRadio', function(event){
                var _this = $(this);
                var _parent = _this.parent();
                _parent.find('label.alphaRadio').removeClass('checked');
                _parent.find('input[type="radio"]').prop('checked', '');
                _this.addClass('checked').find('input[type="radio"]').eq(0).prop('checked', 'checked');
            });
        };


        $.data(el, 'alphaRadio', aRadio);   // ?

        aRadio.init();

    };

    $.alphaRadio.defaults = {
        // color: '#4FA7F5'
    };

    // 判断某个变量是否为某种类型
    function isType(param, type) {
        return Object.prototype.toString.call(param).slice(8, -1).toLowerCase() === type.toLowerCase() ? true : false;
    }

    // function isColor(strColor) {
    //     var $oSpan = $("<span style='color:" + strColor + ";'></span>");
    //     var oSpan = $oSpan[0];
    //     if (oSpan.style.color !== "") {
    //         return true;
    //     } else {
    //         return false;
    //     }
    //     $oSpan = oSpan = null;
    // }

    $.fn.alphaRadio = function(options){
        if (options === undefined) { options = {}; }
        if (typeof options === 'object') {
            return $(this).each(function(){
                var _this = $(this);
                return  new $.alphaRadio(_this, options);
            });
        } else {
            return $(this);
        }
    };

})(jQuery);


