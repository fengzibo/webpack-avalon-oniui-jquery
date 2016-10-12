var avalon = require("avalon")
require("./accordion/avalon.accordion")
var $ = require("jquery")
avalon.define({
    $id: "test",
    aaa: "Hello Avalon!"
})
// 具体参考这里 https://github.com/RubyLouvre/avalon.oniui/blob/master/accordion/avalon.accordion.ex1.html
avalon.define({
    $id: "test",
    aaa: "Hello Avalon!",
    $opts:{
        data: [{
            'title': '标题1',
            'content': '正文1<p>fasdfsdaf</p>'
        }, {
            'title': '标题2',
            'content': '正文2'
        }],
        accordionClass: "oni-accordion-customClass",
        initIndex: 1,
        width: "500",
        onBeforeSwitch: function() {
            avalon.log(this);
            avalon.log(arguments);
            avalon.log("onBeforeSwitch callback");
        },
        onSwitch: function() {
            avalon.log("onSwitch callback");
        },
        multiple: true
    }
})
$(function(){
    $("<div>这是jQuery生成的</div>").appendTo("body")
})