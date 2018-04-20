$(function(){
	//时间格式化
	Date.prototype.Format = function (fmt) { //author: meizz 
		var o = {
			"M+": this.getMonth() + 1, //月份 
			"d+": this.getDate(), //日 
			"h+": this.getHours(), //小时 
			"m+": this.getMinutes(), //分 
			"s+": this.getSeconds(), //秒 
			"q+": Math.floor((this.getMonth() + 3) / 3), //季度 
			"S": this.getMilliseconds() //毫秒 
		};
		if (/(y+)/.test(fmt)) {
			fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
		}
		for (var k in o){
			if (new RegExp("(" + k + ")").test(fmt)){
			 	fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
			}
		}
		return fmt;
	};
	//时间选择
	var jedateoption= {
		dateCell : "#datepicker",
		format : "YYYY年MM月",
		choosefun : function(elem, datas) {
			init();
		}
	};
	var date = new Date();
	$("#datepicker").val(date.Format("yyyy年MM月"));
	$("#datepicker").click(function() {
		jeDate(jedateoption);
		
	});
	//初始化项目阶段分布柱状图
	var wancheng = 15;
	var barChart = echarts.init(document.getElementById('barChart'));
	function initBarChart(){
//		var dataAxis = ['采购阶段','设计阶段','施工阶段','验收阶段','审计阶段','竣工阶段'];
//		var data = [3,0,28,wancheng,0,0];
		var dataAxis = ['采购阶段','施工阶段','验收阶段'];
		var data = [3,28,wancheng];
//		var dataAxis = [];
//		var data = [];
		$.ajax({
			url:'getBarChartData.do',
			type:'post',
			dataType:'json',
			success:function(result){
//				for(var i=0;i<result.length;i++){
//					dataAxis.push(result[i].STAGE);
//					data.push(result[i].NUM);
//				}
				var option = {
				        tooltip : {
				            trigger: 'axis',
				            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
				                type : 'line' ,       // 默认为直线，可选为：'line' | 'shadow'
				                lineStyle:{
					            	color:'#0d91E2',
				            	},
				            },
				            formatter:'{b}:{c}个',
				        },
				        grid: {
				            left: '3%',
				            right: '3%',
				            top:'12%',
				            bottom: '12%',
				            containLabel: true
				        },
				        xAxis : [
				            {	
				                type : 'category',
				                data : dataAxis,
			                    axisTick:{
			                    	show:false,
			                    },
				                axisLabel: {
			                        show: true,
			                        textStyle: {
			                            color: '#fff',
										fontSize: 14
			                        },
									interval: 0
				                },
				                axisLine:{  
		                            lineStyle:{  
		                                color:'#272C44',  
		                            }  
		                        },
				            }
				        ],
				        yAxis : [
				            {	
				            	splitLine:{
				            		show: true,
				            		lineStyle:{
				            			color:'#272C44'
				            		}
				            	},
				                minInterval: 1,
				                axisTick:{
			                    	show:false,
			                    },
				                axisLabel: {
			                        show: true,
			                        textStyle: {
			                            color: '#fff'
			                        }
				                },
				                axisLine:{  
		                            lineStyle:{  
		                                color:'#272C44',  
		                            }  
		                        },
				            }
				        ],
				        series : [
				            {
				                type:'bar',
				                barWidth: '25',
				                data:data,
				                itemStyle: {
				                    normal: {
				                        color: new echarts.graphic.LinearGradient(
				                            0, 0, 0, 1,
				                            [
				                                {offset: 0, color: '#FFE25E'},
				                                {offset: 1, color: '#FC8444'}
				                            ]
				                        )
				                    },
				                },
				            }
				        ]
					};
				barChart.clear();
				barChart.setOption(option);
			}
		})
	}
	function initWholeSurvey(){
		$("#bili").find(".num").text(Math.round(wancheng/46*100)+"%");
		// $.ajax({
			// url:'getWholeSurveyData.do',
			// type:'post',
			// dataType:'json',
			// success:function(data){
				// $("#xiangmuzongshu").find(".num").text(data.num);
				// $("#bili").find(".num").text(Math.round(data.percent*100)+"%");
				// $("#xiangmu").find(".num").text(data.delayNum);
				// $("#yujing").find(".num").text(data.warningNum);
			// }
		// })
	 }
	
	//初始化项目类别分布饼图
	var pieChart = echarts.init(document.getElementById('pieChart'));
	function initPieChart(){
		$.ajax({
			url:'getPieChartData.do',
			type:'post',
			dataType:'json',
			success:function(result){
				var datas = [];
				for(var i=0;i<result.length;i++){
					var data = {};
					data.value = result[i].NUM;
					data.name = result[i].PROJECT_CATEGORY;
					datas.push(data);
				}
				var option = {
						color:['#09A4DF','#D4A711','#C5544A','#65D37A','#D4A711','#C5544A','#09A4DF','#65D37A'],
					    series : [
					        {
					            name:'面积模式',
					            type:'pie',
					            radius : ['40%', '60%'],
					            center : ['50%', '50%'],
					            roseType : 'area',
					            label:{
					            	normal:{
					            		formatter: '{b}:{c}',
					            		textStyle: {
		                                    color: '#fff'
			                            },
					            	}
					            },
					            labelLine:{
					            	normal:{
					            		lineStyle:{
					            			color:'#fff'
					            		}
					            	}
					            },
//					            data:datas,
					            data:[
					                {value:4, name:'集团项目'},
					                {value:3, name:'信息安全域'},
					                {value:8, name:'信息化系统'},
					                {value:6, name:'业务分析域'},
					                {value:4, name:'业务管理域'},
					                {value:15, name:'业务运营域'},
					                {value:2, name:'业支资源池'},
					                {value:4, name:'其他'}
					            ]
					        }
					    ]
					};
				pieChart.clear();
				pieChart.setOption(option);
			}
		});
	}
	//初始化重点项目数据
	function initProjectData(){
		$.ajax({
			url:'getProjectData.do',
			type:'post',
			dataType:'json',
			success:function(result){
				var html = "";
				for(var i=0;i<result.length;i++){
					var name = result[i].PROJECT_NAME;
					var percent = result[i].CURRENT_SCHEDULE;
			   		if(i==0){
			   			html += '<div id="project1" class="eachProject curProject swiper-slide">';
			   		}else{
			   			html += '<div class="eachProject swiper-slide">';
			   		}
//			   		html +='<ul class="style="float:left;">'
//			   			+'<li>'
			   		html+='<div style="float:left;">'
					   	+'<div class="name">'+name+'</div><span>&nbsp;:</span>'
					   	+'</div>'
//					   	+'</li>'
//					   	+'</ul>'
					   	+'<div class="percent"></div>'
					   	+'<div class="percentNum">'+percent*100+"%"+'</div>'
					   	+'</div>';
				}
				$(".swiper-wrapper").html(html);
				$(".eachProject").each(function(e){
					_this = $(this);
					var divwidth = _this.find(".percent").width();
					var percentNum = _this.find(".percentNum").text();
					percentNum = percentNum.substring(0,percentNum.length-1)/100;
			    	var maxdivnum=(divwidth-6)/10;
			   		var thisnum = Math.round(maxdivnum*percentNum);
			   		var code = "";
				   	for(var j=0;j<thisnum;j++){
				    	if(j==0){
				    		code+="<div class='dataline' style='margin-left:6px;'></div>"
				    	}else{
				    		code+="<div class='dataline'></div>"
				    	}
					}
				   	_this.find(".percent").html(code);
				})
				$(".marquee").marquee({
					//设置循环滚动次数，-1位无线循环
					loop: -1,
					showSpeed:1000,
					scrollSpeed:25,
					pauseOnHover: false,auto: false,
				});
				var swiper1 = new Swiper('#project', {
				     slidesPerView: 3,
				     spaceBetween: 50,
				     navigation: {
				         nextEl: '.swiper-button-next',
				         prevEl: '.swiper-button-prev',
				     },
				});
				$(".eachProject").click(function(){
					$(".curProject").removeClass("curProject");
					$(this).addClass("curProject");
					initBarChart1()
				});
				initBarChart1();
			}
			
		})
	}
	//计算日期加N天
	function getNextDate(curdate,addnum){
	  	var ms = curdate.getTime()+addnum*24*60*60*1000;
	  	var nextdate = new Date(ms);
	  	return nextdate;
	}
	//初始化重点项目进展情况图表
	var barChart1 = echarts.init(document.getElementById('barChart1'));
	function initBarChart1(){
		var projectName = $(".curProject").find(".name").text();
		var data1 = [];
		var data2 = [];
		var data3 = [];
		var data4 = [];
		var data5 = [];
		var date = $("#datepicker").val();
		var year = date.substring(0,4);
		var month = date.substring(5,7);
		$.ajax({
			url:'getBarChart1Data.do',
			type:'post',
			dataType:'json',
			data:{
				projectName:projectName
			},
			success:function(data){
				var result = data.data;
				var minDate = data.minDate;
				var maxDate = data.maxDate;
				var interval = (new Date(maxDate).getTime()-new Date(minDate).getTime())/12;
				for(var i=0;i<result.length;i++){
					var x = result[i].IMPLEMENTATION_OBJECTIVES;
					var start_time = new Date(result[i].PLANNED_START_TIME);
					var end_time = new Date(result[i].PLANNED_END_TIME);
					var current_schedule = result[i].CURRENT_SCHEDULE;
					var current_schedule_percent = (result[i].CURRENT_SCHEDULE_PERCENT)*100+"%";
					data1.push(x);
					data2.push(start_time);
					data3.push(getNextDate(start_time,current_schedule));
					data4.push(end_time);
					data5.push(current_schedule_percent);
				}
				var option = {
						grid: {
							left: '3%',
				            right: '3%',
				            top:'3%',
				            bottom: '14%',
				            containLabel: true
				        },
						tooltip : {
							trigger: 'axis',
							axisPointer : {            // 坐标轴指示器，坐标轴触发有效
								type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
							},
							formatter: function (params){
								console.log(params);
								console.log(data5);
								var result = params[0].name + '<br/>';
								for(var i=0;i<params.length;i++){
									if(params[i].seriesName=="参考曲线"){
//										result += params[i].seriesName+":"+(params[i].data).Format('MM月')+ '<br/>';
									}else if(params[i].seriesName=="当前进度"){
										result += params[i].seriesName+":"+data5[params[0].dataIndex]+ '<br/>';
									}else{
										result += params[i].seriesName+":"+(params[i].data).Format('yyyy-MM-dd') + '<br/>';
									}
								}
								return result;
							}
						},
						yAxis : {
							type : 'category',
							boundaryGap :false,
							inverse:true,
					       	splitLine:{
					       		show: true,
					       		lineStyle:{
					       			color:'#272C44'
					       		}
					       	},
					   	  	axisTick:{
					        	show:false,
					        },
					        axisLine:{
					        	lineStyle:{
					       			color:'#272C44'
					       		}
					        },
					        axisLabel: {
						        show: true,
						        textStyle: {
						            color: '#fff'
						        }
					        },
					        data:data1,
						},
						xAxis : {
							type : 'time',
							position:'top',
							min:new Date(minDate),
							max:new Date(maxDate),
							splitNumber:12,
							interval:interval,
							splitLine:{
					       		show: true,
					       		lineStyle:{
					       			color:'#272C44'
					       		}
					       	},
							axisTick:{
					        	show:false,
					        },
					        axisLine:{
					        	lineStyle:{
					       			color:'#272C44'
					       		}
					        },
					        axisLabel: {
						        show: true,
						        textStyle: {
						            color: '#fff'
						        },
						        formatter:function (value, index) {
						        	return new Date(value).Format('yy-MM-dd');
						        }
					        },
						},
						dataZoom: [
						           {
						        	   type: 'inside',
						        	   orient:'vertical'
						           }
						       ],
						series : [  
							{
								name:'计划开始时间',
								type:'bar',
								stack: 'jh',
								itemStyle:{
									normal:{
										barBorderColor:'rgba(0,0,0,0)',
										color:'rgba(0,0,0,0)'
									},
									emphasis:{
										barBorderColor:'rgba(0,0,0,0)',
										color:'rgba(0,0,0,0)'
									}
								},
								data:data2,
							},
							{
								name:'当前进度',
								type:'bar',
								barWidth:10,
								stack: 'jh',
								itemStyle:{
									normal:{
										color: new echarts.graphic.LinearGradient(
							                1, 0, 0, 1,
							                [
							                    {offset: 0, color: '#00D8FE'},
							                    {offset: 1, color: '#00FEAD'}
							                ]
							            )
									}
								},
								data:data3,
							},
							{
								name:'计划结束时间',
								type:'bar',
								stack: 'jh',
								itemStyle:{
									normal:{
										color:'#4B4D58'
									}
								},
								data:data4,
							},
							{ 
								name: '参考曲线',
								type: 'line',
								itemStyle :{
									normal:{
										opacity:0
									}
								},
								color:'#fff',
								data:
									[
								      new Date(year,month-1),
								      new Date(year,month-1),
								      new Date(year,month-1),
								      new Date(year,month-1),
								      new Date(year,month-1),
								      new Date(year,month-1),
								      new Date(year,month-1)
								      ],
								markLine: {
									symbolSize:0,
									silent :true,
									data: [
									       {type: 'average', name: '平均值'}
									],
									lineStyle:{
										normal:{
											color:'#09E9DF'
										}
									},
									label:{
										normal:{
											formatter:function (value, index) {
												return new Date(value.value).Format('MM月');
											}
										}
									}
								}
							}
						]
					};
				barChart1.clear();
				barChart1.setOption(option);
			}
		})
	}
	function initResourcePool(){
		$.ajax({
			url:'getResourcePoolData.do',
			type:'post',
			dataType:'json',
			success:function(data){
				$(".resourcePool").each(function(){
					region = $(this).find(".region").text();
					for(var i=0;i<data.length;i++){
						if(region== data[i].REGION){
							$(this).find(".cabinet").find(".num").text(data[i].CABINET*100+"%");
							$(this).find(".server").find(".num").text(data[i].SERVER*100+"%");
							$(this).find(".battery").find(".num").text(data[i].BATTERY*100+"%");
							$(this).find(".networkEquipment").find(".num").text(data[i].NETWORK_EQUIPMENT*100+"%");
						}
					}
				})
				initCASPercent();
				initBatteryPercent();
				initNEPercent();
			}
		})
	}
	function initNEPercent(){
		$(".networkEquipment").each(function(e){
			var _this = $(this);
			var percent = _this.find(".num").text();
			var divHeight = _this.siblings().find(".NEPercent1").height();
	    	var maxdivnum=Math.round((divHeight-10)/14);
	   		var num = parseInt(percent.replace("%",""));
	   		var thisnum = Math.round((num*maxdivnum)/100);
	   		var code = "";
	   		for(var i=0;i<maxdivnum-thisnum;i++){
		    	code+="<div class='dataline1'></div>";
	   		}
		    for(var j=0;j<thisnum;j++){
		    	code+="<div class='dataline2'></div>";
		    }
		    _this.siblings().find(".NEPercent1").html(code);
		});
	}
	function initBatteryPercent(){
		$(".battery").each(function(e){
			var percent = $(this).find(".num").text();
			var _this =$(this).parent().siblings().find(".batteryPercent1");
			var divHeight = _this.height();
	   		var num = parseInt(percent.replace("%",""));
	   		var height = (num*divHeight)/100-2;
	   		var marginTop = divHeight-height+6;
	   		var code = "";
		    code+="<div style='width:10px;height:"+height+
		    	"px;margin-top:"+marginTop+"px;margin-left:3px;background:#00FFB2;'></div>";
		    _this.html(code);
		})
	}
	function initCASPercent(){
		$(".server").each(function(e){
			var percent = $(this).find(".num").text();
			var _this =$(this).parent().siblings().find(".cabinetAndServerPercent1");
			var divHeight = _this.height();
	    	var maxdivnum=Math.round((divHeight-10)/14);
	   		var num = parseInt(percent.replace("%",""));
	   		var thisnum = Math.round((num*maxdivnum)/100);
	   		var code = "";
	   		for(var i=0;i<maxdivnum-thisnum;i++){
		    	code+="<div class='dataline3'></div>";
	   		}
		    for(var j=0;j<thisnum;j++){
		    	code+="<div class='dataline4'></div>";
		    }
		    _this.html("");
		    _this.append(code);
		});
		initCabinetPercent();
	}
	function initCabinetPercent(){
		$(".cabinet").each(function(e){
			var percent = $(this).find(".num").text();
			var _this =$(this).parent().siblings().find(".cabinetAndServerPercent1");
			var divHeight = _this.height();
	   		var num = parseInt(percent.replace("%",""));
	   		var height = (num*divHeight)/100;
	   		var marginTop = -height;
	   		var code = "";
	   		if(num == 100){
	   			code+="<div style='float:left;width:5px;height:"+(height+10)+"px;background:#00FFB2;margin-left:-5px;margin-top:"+(marginTop)+"px'></div>";
	   			code+="<div style='float:right;width:5px;height:"+(height+10)+"px;background:#00FFB2;margin-right:-5px;margin-top:"+(marginTop)+"px'></div>";
	   			code+="<div style='float:left;width:40px;height:5px;margin-top:5px;background:#00FFB2;'></div>";
	   			code+="<div style='float:left;width:40px;height:5px;margin-top:-85px;background:#00FFB2;'></div>";
	   		}else{
	   			code+="<div style='float:left;width:5px;height:"+(height+5)+"px;background:#00FFB2;margin-left:-5px;margin-top:"+(marginTop+5)+"px'></div>";
	   			code+="<div style='float:right;width:5px;height:"+(height+5)+"px;background:#00FFB2;margin-right:-5px;margin-top:"+(marginTop+5)+"px'></div>";
	   			code+="<div style='float:left;width:40px;height:5px;margin-top:5px;background:#00FFB2;'></div>";
	   		}
	   		_this.append(code);
		});
	}
	
	function init(){
		initBarChart();
		initWholeSurvey();
		initPieChart();
		initProjectData();
		initResourcePool();
	}
	init();
});
