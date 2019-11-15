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
// 获取banner的数据
    function banner_download(){
        $.ajax({
            type:'get',
            url:'../json/banner.json',
            success:function(arr){
                var bannerArr = arr;
                for(i = 0;i < bannerArr.length;i++){
                    var docNode =`<li class='${i==0?"active":""}'></li>`
                    $(docNode).appendTo('#banner ol')
                    var bannerNode = `
                    <li >
                        <a href="" style='display: ${i == 0 ? "block" : "none"}; opacity: ${i == 0 ? 1 : 0.2};'>
                            <img src="${bannerArr[i].img}" alt="">
                        </a>
                    </li>`
                    $(bannerNode).appendTo('#banner ul')
                }

                function slide(){
                    var aAs = $('#banner ul li a');
                    var oBtns = $('#banner ol li');
                    var timer = null;
                    var iNow = 0;
                    timer = setInterval(function(){
                        iNow++;
                        tab();
                    }, 3000);

                    oBtns.click(function(){
                        iNow = $(this).index();
                        tab();
                    })

                    function tab(){
                        
            
                        aAs.css("opacity", 0.2).hide().eq(iNow).show().animate({
                            opacity: 1
                        }, 1000, function(){
                            if(iNow == oBtns.size() - 1){
                                iNow = -1;
                            }
                        });
                        oBtns.removeClass().eq(iNow).addClass('active')
                        
            
                    }
                    $('#banner').mouseenter(function(){
                        clearInterval(timer);
                    })
                    $('#banner').mouseleave(function(){
                        timer = setInterval(() => {
                            iNow++;
                            tab();
                        }, 3000);
                    })

                }
                slide(); 
            },
            error:function(msg){
                alert(msg);
            }

        })
    }
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
    
    function count_down(){
        var i = 43200; //总秒数
        var timer = null; //记录定时器的返回值
     
        timer = setInterval(function(){
            i--;
            $(".second_session .second_session_left .sec").html(doubleNum(i % 60));
            $(".second_session .second_session_left .min").html(doubleNum(parseInt(i / 60) % 60));
            $(".second_session .second_session_left .hour").html(doubleNum(parseInt(i / 3600)));

        }, 1000);
          
    }
    count_down();
    function doubleNum(n){
        if(n < 10){
            return "0" + n;
        }else{
            return n;
        }
    }
    // index_body
    function index_body_download(){
        $.ajax({
            type:'get',
            url:'../json/index_body.json',
            success:function(arr){
                var dataArr = arr;
                // 单品秒杀
                var arr0 = dataArr[0].child
                var box0 = `<ul></ul>`
                $(box0).appendTo('.second_session_right');
                for(i =0 ;i < arr0.length;i++){   
                    var con0 = `<li>
                    <a href="#">
                    <img src="${arr0[i].img}" alt=""><h3>${arr0[i].des}</h3>
                    <span class="nowPrice">${arr0[i].nowprice}</span>&nbsp;&nbsp;<span class="prePrice">${arr0[i].prePrice}</span>
                    </a>
                    </li>`
                    $(con0).appendTo('.second_session_right ul')
                }
                // 游戏笔记本
                $(`<img src="${dataArr[1].left_img}" alt="">`).appendTo('.third_session')
                var arr1 = dataArr[1].subtitle
                for(i = 0;i < arr1.length;i++){
                    var aLis = `<li id="li${i}"><a href="">${arr1[i].name}</a></li>`
                    $(aLis).appendTo('.third_title ul');
                    
                    if(arr1[i].child){
                        $(`<div class="detail_box " id="detail_box${i}"></div>`).appendTo(`.third_title ul #li${i}`);
                        var childArr = arr1[i].child;
                        // console.log(childArr);
                        for(j = 0;j< childArr.length;j++){
                            $(`<div class="detail">
                                    <div class="img"><a><img src="${childArr[j].img}" alt=""></a></div>
                                    <div class="des">${childArr[j].des}</div>
                                    <div class="price">${childArr[j].price}</div>
                                    <div class="evaluate">${childArr[j].evaluate}</div>
                                </div>
                            `).appendTo(`.third_title ul #li${i} #detail_box${i}`)
                        }
                    }
                    
                }
                $(".third_title ul li").eq(0).find(`div`).css('display','block')
                $(".third_title ul li").eq(0).find(`a`).css('color','skyblue')

                // 游戏台式机
                // $(`<img src="${dataArr[1].left_img}" alt="">`).appendTo('.third_session')
                var oImgArr2 = dataArr[2].left_img
                // console.log(oImgArr2);
                for(i = 0;i < oImgArr2.length;i++){
                    $(`<img src="${oImgArr2[i].img}" alt="">`).appendTo('.forth_session')
                }
                var arr2 = dataArr[2].subtitle
                for(i = 0;i < arr2.length;i++){
                    var aLis = `<li id="li${i}"><a href="">${arr2[i].name}</a></li>`
                    $(aLis).appendTo('.forth_title ul');
                    
                    if(arr2[i].child){
                        $(`<div class="detail_box " id="detail_box${i}"></div>`).appendTo(`.forth_title ul #li${i}`);
                        var childArr = arr2[i].child;
                        // console.log(childArr);
                        for(j = 0;j< childArr.length;j++){
                            $(`<div class="detail">
                                    <div class="img"><a><img src="${childArr[j].img}" alt=""></a></div>
                                    <div class="des">${childArr[j].des}</div>
                                    <div class="price">${childArr[j].price}</div>
                                    <div class="evaluate">${childArr[j].evaluate}</div>
                                </div>
                            `).appendTo(`.forth_title ul #li${i} #detail_box${i}`)
                        }
                    }
                    
                }
                $(".forth_title ul li").eq(0).find(`div`).css('display','block')
                $(".forth_title ul li").eq(0).find(`a`).css('color','skyblue')
                // 外设系列
                var oImgArr3 = dataArr[3].left_img
                // console.log(oImgArr3);
                for(i = 0;i < oImgArr3.length;i++){
                    $(`<img src="${oImgArr3[i].img}" alt="">`).appendTo('.fifth_session')
                }
                var arr3 = dataArr[3].subtitle
                for(i = 0;i < arr3.length;i++){
                    var aLis = `<li id="li${i}"><a href="">${arr3[i].name}</a></li>`
                    $(aLis).appendTo('.fifth_title ul');
                    
                    if(arr3[i].child){
                        $(`<div class="detail_box " id="detail_box${i}"></div>`).appendTo(`.fifth_title ul #li${i}`);
                        var childArr = arr3[i].child;
                        // console.log(childArr);
                        for(j = 0;j< childArr.length;j++){
                            $(`<div class="detail">
                                    <div class="img"><a><img src="${childArr[j].img}" alt=""></a></div>
                                    <div class="des">${childArr[j].des}</div>
                                    <div class="price">${childArr[j].price}</div>
                                    <div class="evaluate">${childArr[j].evaluate}</div>
                                </div>
                            `).appendTo(`.fifth_title ul #li${i} #detail_box${i}`)
                        }
                    }
                    
                }
                $(".fifth_title ul li").eq(0).find(`div`).css('display','block')
                $(".fifth_title ul li").eq(0).find(`a`).css('color','skyblue')

                // 增值服务
                
                var arr4 = dataArr[4].child;
                console.log(arr4);
                for(i = 0;i < arr4.length;i++){
                    var aLis = `
                    <li>
                        <a href='#'>
                        <div><img src="${arr4[i].img}" alt=""></div>
                        <div><span>${arr4[i].des}</span></div>
                        <div><span class="price">${arr4[i].price}</span></div>
                        </a>
                    </li>
                    `
                    $(aLis).appendTo('.sixth_session ul')
                }

                
                // 热评产品
                var arr5 = dataArr[5].child;
                for(i = 0;i < arr5.length;i++){
                    var aLis = `
                    <li>
                        <a href='#'>
                        <div><img src="${arr5[i].img}" alt=""></div>
                        <div class="des"><span>${arr5[i].des}</span></div>
                        <div><span class="price">${arr5[i].price}</span></div>
                        </a>
                    </li>
                    `
                    $(aLis).appendTo('.seventh_session ul')
                }

                // 粉丝同城会
                var arr6 = dataArr[6].child;
                for(i = 0;i < arr6.length;i++){
                    var aLis = `
                    <li>
                        <a href='#'>
                        <div><img src="${arr6[i].img}" alt=""></div>
                        <div><span>${arr6[i].des}</span></div>
                        </a>
                    </li>
                    `
                    $(aLis).appendTo('.last_session ul')
                }

            },
            error:function(msg){
                alert(msg);
            }
        })
    }
    function body_goods(){
        $('.main').on('mouseenter','.detail',function(){
            
            $(this).css('box-shadow', '5px 5px 5px #999999')
        })
        $('.main').on('mouseleave','.detail',function(){
            
            $(this).css('box-shadow', '')
        })
        $('.sixth_title .left').click(function(){
            // alert(1);
            $('.sixth_session ul').css('left','0')
        })
        $('.sixth_title .right').click(function(){
            // alert(1);
            $('.sixth_session ul').css('left','-1232.5px')
        })

        $('.last_title .left').click(function(){
            // alert(1);
            $('.last_session ul').css('left','0')
        })
        $('.last_title .right').click(function(){
            // alert(1);
            $('.last_session ul').css('left','-1236px')
        })
        
        $(".third_title ul").on("mouseenter", "li",function(){
            $(".third_title ul li").find('a').css("color",'#141414')
            $(".third_title ul li").find(`div`).hide().css('opacity','0.2')
            $(this).find('a').css("color",'skyblue')
            $(this).find(`div`).show().css('opacity','1')
            
        })
        $(".forth_title ul").on("mouseenter", "li",function(){
            $(".forth_title ul li").find('a').css("color",'#141414')
            $(".forth_title ul li").find(`div`).hide().css('opacity','0.2')
            $(this).find('a').css("color",'skyblue')
            $(this).find(`div`).show().css('opacity','1')
            
        })
        $(".fifth_title ul").on("mouseenter", "li",function(){
            $(".fifth_title ul li").find('a').css("color",'#141414')
            $(".fifth_title ul li").find(`div`).hide().css('opacity','0.2')
            $(this).find('a').css("color",'skyblue')
            $(this).find(`div`).show().css('opacity','1')
            
        })
        var l = ($(window).outerWidth() - $(".guide").outerWidth()) - 50;
        var t = ($(window).outerHeight() - $(".guide").outerHeight()) / 2 + $(window).scrollTop() + 50;
        $(".guide").css({
            left: l,
            top: t
        });
        $(window).on("scroll resize", function(){
            var l = ($(window).outerWidth() - $(".guide").outerWidth())- 50;
            var t = ($(window).outerHeight() - $(".guide").outerHeight()) / 2 + $(window).scrollTop() + 50;
            $(".guide").css({
                left: l,
                top: t
            });
        })

        $('.guide').on('click','.beauty',function(){
            confirm('客服小姐姐在忙！')
        })
        
    }
  
    return{ 
        nav_download:nav_download,
        topnav:topnav,
        sidenav:sidenav,
        banner_download:banner_download,
        index_body_download:index_body_download,
        body_goods:body_goods
    }
}

);
