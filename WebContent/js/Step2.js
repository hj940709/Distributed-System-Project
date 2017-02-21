﻿$(document).ready(function(){
	$(".nav-pills>li>a").click(function(){
		$(".nav-pills>li").removeClass("active");
		$(this).parent().addClass("active");
		$("#plot").html("<p>Empty</p>");
		$("#equation").val("");
		switch($(".nav-pills>li>a").index($(this)))
		{
		case 0:
			$("#submit").attr("onClick","server()");
			break;
			
		case 1:
			$("#submit").attr("onClick","client()");
			break;
			
		case 2:
			$("#submit").attr("onClick","hybrid()");
			break;
		}
	});
	$("#plot").height(9*$("#plot").width()/16);
});

function server(){
	var equation = $("#equation").val().replace(/\+/g,"%2B").toLocaleLowerCase();
	$("#plot").html("<img src=\"./PlotServlet?equation="+equation+"\" />");
}

function client(){
	var equation = $("#equation").val().toLocaleLowerCase();
	$("#plot").html("<canvas/>");
	var array = substract(equation);
	var result = array[0];
	while(array[2]!=""){
		var arg1 = array[0];
		var op = array[1];
		var temp = substract(array[2]);
		var arg2 = temp[0];
		if(op=="+") op="%2B";

		if(arg2=="sin(x)") break;
		
		result = localCal(arg1,arg2,op);
		
		if(result == "Infinity") break;
		
		
		array = substract(result+temp[1]+temp[2]);
	}
	var data = [];
	for(var i=-Math.PI;i<Math.PI;i+=Math.PI/40){
		m = localCal(result,Math.sin(i).toString(),"*");
		data.push([i,m]);
	}	
	plotInCanvas(data,"y="+equation);
}

function hybrid(){
	//approximation table of 1*sin(x) from -pi to pi with step size pi/40(0.0785398163397)
	//format : [x,sin(x)]
	var sin = [[-3.14159265358979,"-1.22514845490862E-16"],
	           [-3.06305283725005,"-0.0784590957278451"],
	           [-2.9845130209103,"-0.156434465040231"],
	           [-2.90597320457056,"-0.233445363855906"],
	           [-2.82743338823081,"-0.309016994374948"],
	           [-2.74889357189107,"-0.38268343236509"],
	           [-2.67035375555132,"-0.453990499739547"],
	           [-2.59181393921158,"-0.522498564715949"],
	           [-2.51327412287183,"-0.587785252292473"],
	           [-2.43473430653209,"-0.649448048330184"],
	           [-2.35619449019234,"-0.707106781186548"],
	           [-2.2776546738526,"-0.760405965600031"],
	           [-2.19911485751286,"-0.809016994374947"],
	           [-2.12057504117311,"-0.852640164354092"],
	           [-2.04203522483337,"-0.891006524188368"],
	           [-1.96349540849362,"-0.923879532511287"],
	           [-1.88495559215388,"-0.951056516295154"],
	           [-1.80641577581413,"-0.972369920397677"],
	           [-1.72787595947439,"-0.987688340595138"],
	           [-1.64933614313464,"-0.996917333733128"],
	           [-1.5707963267949,"-1"],
	           [-1.49225651045515,"-0.996917333733128"],
	           [-1.41371669411541,"-0.987688340595138"],
	           [-1.33517687777566,"-0.972369920397677"],
	           [-1.25663706143592,"-0.951056516295154"],
	           [-1.17809724509617,"-0.923879532511287"],
	           [-1.09955742875643,"-0.891006524188368"],
	           [-1.02101761241668,"-0.852640164354092"],
	           [-0.942477796076938,"-0.809016994374947"],
	           [-0.863937979737193,"-0.760405965600031"],
	           [-0.785398163397448,"-0.707106781186547"],
	           [-0.706858347057703,"-0.649448048330184"],
	           [-0.628318530717959,"-0.587785252292473"],
	           [-0.549778714378214,"-0.522498564715949"],
	           [-0.471238898038469,"-0.453990499739547"],
	           [-0.392699081698724,"-0.38268343236509"],
	           [-0.314159265358979,"-0.309016994374947"],
	           [-0.235619449019234,"-0.233445363855905"],
	           [-0.15707963267949,"-0.156434465040231"],
	           [-0.0785398163397449,"-0.078459095727845"],
	           [0,"0"],
	           [0.0785398163397446,"0.0784590957278447"],
	           [0.15707963267949,"0.156434465040231"],
	           [0.235619449019234,"0.233445363855905"],
	           [0.31415926535898,"0.309016994374948"],
	           [0.392699081698724,"0.38268343236509"],
	           [0.471238898038469,"0.453990499739547"],
	           [0.549778714378214,"0.522498564715949"],
	           [0.628318530717959,"0.587785252292473"],
	           [0.706858347057704,"0.649448048330184"],
	           [0.785398163397448,"0.707106781186547"],
	           [0.863937979737193,"0.760405965600031"],
	           [0.942477796076938,"0.809016994374947"],
	           [1.02101761241668,"0.852640164354092"],
	           [1.09955742875643,"0.891006524188368"],
	           [1.17809724509617,"0.923879532511287"],
	           [1.25663706143592,"0.951056516295154"],
	           [1.33517687777566,"0.972369920397677"],
	           [1.41371669411541,"0.987688340595138"],
	           [1.49225651045515,"0.996917333733128"],
	           [1.5707963267949,"1"],
	           [1.64933614313464,"0.996917333733128"],
	           [1.72787595947439,"0.987688340595138"],
	           [1.80641577581413,"0.972369920397677"],
	           [1.88495559215388,"0.951056516295154"],
	           [1.96349540849362,"0.923879532511287"],
	           [2.04203522483337,"0.891006524188368"],
	           [2.12057504117311,"0.852640164354092"],
	           [2.19911485751286,"0.809016994374947"],
	           [2.2776546738526,"0.760405965600031"],
	           [2.35619449019234,"0.707106781186548"],
	           [2.43473430653209,"0.649448048330184"],
	           [2.51327412287183,"0.587785252292473"],
	           [2.59181393921158,"0.522498564715949"],
	           [2.67035375555132,"0.453990499739546"],
	           [2.74889357189107,"0.38268343236509"],
	           [2.82743338823081,"0.309016994374948"],
	           [2.90597320457056,"0.233445363855906"],
	           [2.9845130209103,"0.156434465040231"],
	           [3.06305283725005,"0.0784590957278446"],
	           [3.14159265358979,"1.22514845490862E-16"]];


	var equation = $("#equation").val().toLocaleLowerCase();
	$("#plot").html("<canvas/>");
	var array = substract(equation);
	var result = array[0];
	while(array[2]!=""){
		var arg1 = array[0];
		var op = array[1];
		var temp = substract(array[2]);
		var arg2 = temp[0];
		if(op=="+") op="%2B";

		if(arg2=="sin(x)") break;
		
		result = submitSimCal(arg1,arg2,op,false);
		
		if(result == "Infinity") break;
		
		
		array = substract(result+temp[1]+temp[2]);
	}
	var data = [];
	for(var i=0;i<sin.length;i++){
		m = submitSimCal(result,sin[i][1],"*",false,false);
		data.push([sin[i][0],m]);
	}	
	plotInCanvas(data,"y="+equation);
}