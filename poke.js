$(function () {
        let colorpai=['s','h','d','c'];
        let poke=[];
        let flag={};
        for (let i=0;i<52;i++){
            let index=Math.floor(Math.random()*colorpai.length);
            let color=colorpai[index];
            let number=Math.floor(Math.random()*13+1);
            while (flag[color+"_"+number]){
                 index=Math.floor(Math.random()*colorpai.length);
                 color=colorpai[index];
                 number=Math.floor(Math.random()*13+1);
            }
            poke.push({color,number});
            console.log(poke)
            flag[color+"_"+number]=true;
        }

    let index=-1;
        for (let i=0;i<6;i++){
            for (let j=0;j<=i;j++){
                index++;
                let lefts=100*j+550-50*i;
                let tops=50*i
                let obj=poke[index];
                $("<div>").addClass("hot")
                    .html("")
                    .css({backgroundImage:`url(./image/${obj.number}${obj.color}.jpg)`})
                    .attr("id",i+"_"+j)
                    .data("number",obj.number)
                    .appendTo(".box")
                    .delay(index*100)
                    .animate({left:lefts,top:tops,opacity:1});
            }
        }

        for (;index<51;index++){
            if (index<46) {
            let obj=poke[index];
            $("<div>").addClass("hot left").html("").css({backgroundImage:`url(./image/${obj.number}${obj.color}.jpg)`}).appendTo(".box") .attr("id",index)
                .data("number",obj.number)
                .delay(index*100)
                .animate({left:0,top:580,opacity:1});
            }else{
                let lefts=100*(53-index)*(-1)+1200;
                console.log(lefts)
                let obj=poke[index];
                $("<div>").addClass("hot right").html("").css({backgroundImage:`url(./image/${obj.number}${obj.color}.jpg)`}).appendTo(".box") .attr("id",index)
                    .data("number",obj.number)
                    .delay(index*100)
                    .animate({left:lefts,top:580,opacity:1});
            }

        }
        let first=null;
        $(".box").on("click","div",function () {

            let id=$(this).attr("id");

            let arr=id.split("_");
            let i=parseInt(arr[0])+1;
            let j=parseInt(arr[1]);
            let z=i+"_"+j;
            let z1=i+"_"+(j+1);
            if ($("#"+z).length||$("#"+z1).length){
              return;
            }


            if ($(this).hasClass("active")){
                $(this).animate({top:"+=30px"}).removeClass("active");
            }else{
                $(this).animate({top:"-=30px"}).addClass("active")
            }

            if (!first){
                first=$(this);
                if (first.data("number")==13){
                    if (first.hasClass("right")){
                        lefts=first.position().left;
                        tops=first.position().top;
                        fun(lefts,tops);
                    }
                    $(".active").animate({top:0,left:"1110px"},1000,function () {
                        $(this).remove();
                    })
                    first=null;
                }
            } else{
                let num1=first.data("number");
                let num2=$(this).data("number");
                if (num1+num2==13){
                    if (($(this).hasClass("left")&&first.hasClass("right"))||($(this).hasClass("right")&&first.hasClass("left"))){
                        console.log(111);
                        let lefts,tops;
                        if (first.hasClass("right")){
                            let obj=GPS1(first);
                            console.log(obj.lefts,obj.tops);
                            fun(obj.lefts,obj.tops);
                            fun(obj.lefts,obj.tops);
                        }
                        if ($(this).hasClass("right")) {

                            let obj=GPS2($(this));
                            console.log(obj.lefts,obj.tops);
                            fun(obj.lefts,obj.tops);
                            fun(obj.lefts,obj.tops);
                        }

                    }else{
                        let lefts,tops;
                        if (first.hasClass("right")){
                            let obj=GPS1(first);
                            fun(obj.lefts,obj.tops);
                        }
                        if ($(this).hasClass("right")) {
                            let obj=GPS2($(this));
                            console.log(obj.lefts,obj.tops);
                            fun(obj.lefts,obj.tops);
                        }
                        }

                    $(".active").animate({top:0,left:"1110px"},1000,function () {
                        $(this).remove();
                    })
                }else{
                    $(".active").animate({top:"+=30px"},function () {
                        $(this).removeClass("active");
                    })
                }
                first=null;
            }

    })
    console.log($(".box").children());

    function GPS1(name) {
        lefts=name.position().left;
        tops=name.position().top+30;
        return {lefts,tops}
    }
    function GPS2(name) {
        lefts=name.position().left;
        tops=name.position().top;
        return {lefts,tops}
    }

    function fun(lefts,tops) {
                $(".left").last().animate({left:lefts,top:tops}).addClass("right").removeClass("left");

    }


})