define([
    'jquery',
    'jquery-cookie'
], function($) {
    $('#top .last').mouseenter(function(){
        $('.car_msg').css('display','block')
     })
     $('#top .last').mouseleave(function(){
         $('.car_msg').css('display','none')
      })
      function nav_download(){
        $.ajax({
            type:'get',
            url:'../json/nav.json',
            success:function(obj){
                // 获取topnav
                // alert(obj.topnav.length);
               for(i = 0;i < obj.topnav.length;i++){
                   var sub  = `<a class="topnav-title" href="#" id="${i}"><span>${obj.topnav[i].title}</span></a>`;
                   $(sub).appendTo($('#navbox #nav'))
                   if(obj.topnav[i].child){
                       var childArr = obj.topnav[i].child;
                    var Node = `
                    <div class="nav_list" id="topnav_list${i}"></div>
                    `
                    $(Node).appendTo($(`#navbox #nav #${i}`));
                    for(j = 0; j < childArr.length;j++ ){
                        var node = `
                        <div class="_good">
                            <div><img src="${childArr[j].img}" alt=""></div>
                            <div class="title">${childArr[j].title}</div>
                            <div class="price">${childArr[j].price}</div>
                        </div>
                        `
                      $(node).appendTo($(`#topnav_list${i}`));
                    }
                   }
               }

            //    获取sidenav
            var sidenavArr = obj.sidenav;
            for(i = 0;i< sidenavArr.length;i++){
                var sideNode = `
                <li id='${i}'><a href="#">
                <span class="first">${sidenavArr[i].title}</span><span class="second">${sidenavArr[i].pic}</span>
                </a></li>
                `
                $(sideNode).appendTo($('#listbox #list ul'));
                if(sidenavArr[i].child){
                    // alert('hello');
                    var spaceNode = `<div id="_list"></div>`
                    $( spaceNode).appendTo(`#listbox #list ul #${i}`);
                    var sidenavArrChild = sidenavArr[i].child
                    for(j = 0;j < sidenavArrChild.length;j++){
                        var subNode=`
                        <a href="#"><span class="span1">${sidenavArrChild[j].title}</span><span class="span2">${sidenavArrChild[j].pic}</span></a>
                        `
                        $(subNode).appendTo(`#listbox #list ul #${i} #_list`)
                        var spaceDiv = `<div id="div${j}">
                                                </div>`
                        $(spaceDiv).appendTo(`#listbox #list ul #${i} #_list`)
                        var sidenavArrDouchild = sidenavArrChild[j].child;
                        // console.log(sidenavArrDouchild)
                        for(k =0;k < sidenavArrDouchild.length;k++){
                            var lastNode = `<a href=""><img src="${sidenavArrDouchild[k].img}" alt=""><span>${sidenavArrDouchild[k].title}</span></a>`
                            $(lastNode).appendTo(`#listbox #list ul #${i} #_list #div${j}`)
                        }
                        
                    }
                }
            }


            },
            error:function(msg){
                alert(msg);
            }
        })
    }
    $('#nav').find('.first-title').mouseenter(function(){
        $('#listbox').css('display','block')
    })
    $('#nav').find('.first-title').mouseleave(function(){
        $('#listbox').css('display','none')
    })
    function topnav(){
        $("#nav").on("mouseenter", "a", function(){
            $(this).css("color",'skyblue')
            $('#navbox').find(`#topnav_list${this.id}`).show()
            
        })
        $("#nav").on("mouseleave", "a", function(){
            $(this).css("color",'white')
            $('#navbox').find(`#topnav_list${this.id}`).hide()
        })
    }
    function sidenav(){
        $("#listbox #list ul").on("mouseenter", "li", function(){
            $(this).css({
                "backgroundColor":'#00eef3',
                "opacity":1
            }).find('span').css('color','black')
            $(this).find("#_list").show()
            
        })
        $("#listbox #list ul").on("mouseleave", "li", function(){
            $(this).css("backgroundColor",'#141414').find('span').css('color','white')
            $(this).find("#_list").hide()
        })
    }
    



    return{
        nav_download:nav_download,
        topnav:topnav,
        sidenav:sidenav
    }
});