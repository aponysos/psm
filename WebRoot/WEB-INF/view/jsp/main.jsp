<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>

<!DOCTYPE HTML>
<html>
<head>
<base href="<%=basePath%>">

<title>规划工程进度监控</title>

<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="expires" content="0">
<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
<meta http-equiv="description" content="This is my page">

<link rel="stylesheet" type="text/css" href="css/iconfont/iconfont.css">
<link rel="stylesheet" type="text/css" href="css/main.css">
<link rel="stylesheet" href="plugin/jedate/skin/jedate.css"	type="text/css"></link>
<link type="text/css" href="css/jquery.marquee.css" rel="stylesheet"/>
<link type="text/css" href="css/swiper.css" rel="stylesheet"/>

<script type="text/javascript" src="js/jquery-1.8.3.min.js"></script>
<script type="text/javascript" src="js/echarts.js"></script>
<script type="text/javascript" src="js/main/main.js"></script>
<script type="text/javascript" src="plugin/jedate/jedate.js"></script>
<script type="text/javascript" src="js/jquery.marquee.js"></script>
<script type="text/javascript" src="js/swiper.js"></script>

</head>

<body>
	<div id="main">
		<div id="title"><h1>规划工程进度监控</h1></div>
		<div class="content">
			<div id="date"><input type="text" id="datepicker" value="2017年10月"/></div>
			<div class="top">
				<div class="left">
					<div class="title1"><h4>项目阶段分布</h4></div>
					<div class="content1" id="barChart"></div>
				</div>
				<div class="center" id="survey">
					<div class="title1"><h4>整体概况</h4></div>
					<div class="content1">
						<div class="eachSurvey" id="xiangmuzongshu">
							<div class="icon"></div>
							<div class="nav1">项目总数</div>
							<div class="num">46</div>
						</div>
						<div class="eachSurvey" id="bili">
							<div class="icon"></div>
							<div class="nav1">完成比例</div>
							<div class="num">15</div>
						</div>
						<div class="eachSurvey" id="xiangmu">
							<div class="icon"></div>
							<div class="nav1">延期项目</div>
							<div class="num">0</div>
						</div>
						<div class="eachSurvey" id="yujing">
							<div class="icon"></div>
							<div class="nav1">延期预警</div>
							<div class="num">0</div>
						</div>
					</div>
				</div>
				<div class="right">
					<div class="title1"><h4>项目类别分布</h4></div>
					<div class="content1" id="pieChart"></div>
				</div>
			</div>
			<div class="middle">
				<div class="title2"><h4>重点项目进展情况</h4></div>
				<div class="content2">
					<div id="project" class="swiper-container" title="按住鼠标左键可以左右拖动">
						<div class="swiper-wrapper">
<!-- 							<div id="project1" class="eachProject curProject swiper-slide"> -->
<!-- 							<ul class="marquee" style="float:left;"> -->
<!-- 								<li> -->
<!-- 								<div style="float:left;"> -->
<!-- 									<div class="name">大数据平台</div> -->
<!-- 									<span>&nbsp;:</span> -->
<!-- 								</div> -->
<!-- 								</li> -->
<!-- 							</ul> -->
<!-- 							<div class="percent"></div> -->
<!-- 							<div class="percentNum">12%</div> -->
<!-- 							</div> -->
<!-- 							<div id="project2" class="eachProject swiper-slide"> -->
<!-- 								<ul class="marquee" style="float:left;"> -->
<!-- 									<li> -->
<!-- 									<div style="float:left;"> -->
<!-- 										<div class="name">大数据对内应用</div> -->
<!-- 										<span>&nbsp;:</span> -->
<!-- 									</div> -->
<!-- 									</li> -->
<!-- 								</ul> -->
<!-- 								<div class="percent"></div> -->
<!-- 								<div class="percentNum">20%</div> -->
<!-- 							</div> -->
<!-- 							<div id="project3" class="eachProject swiper-slide"> -->
<!-- 								<ul class="marquee" style="float:left;"> -->
<!-- 									<li> -->
<!-- 									<div style="float:left;"> -->
<!-- 										<div class="name">大数据对内应用</div> -->
<!-- 										<span>&nbsp;:</span> -->
<!-- 									</div> -->
<!-- 									</li> -->
<!-- 								</ul> -->
<!-- 								<div class="percent"></div> -->
<!-- 								<div class="percentNum">15%</div> -->
<!-- 							</div> -->
<!-- 							<div id="project4" class="eachProject swiper-slide"> -->
<!-- 								<ul class="marquee" style="float:left;"> -->
<!-- 									<li> -->
<!-- 									<div style="float:left;"> -->
<!-- 										<div class="name">大数据对内应用</div> -->
<!-- 										<span>&nbsp;:</span> -->
<!-- 									</div> -->
<!-- 									</li> -->
<!-- 								</ul> -->
<!-- 								<div class="percent"></div> -->
<!-- 								<div class="percentNum">55%</div> -->
<!-- 							</div> -->
<!-- 							<div id="project5" class="eachProject swiper-slide"> -->
<!-- 								<ul class="marquee" style="float:left;"> -->
<!-- 									<li> -->
<!-- 									<div style="float:left;"> -->
<!-- 										<div class="name">大数据对内应用</div> -->
<!-- 										<span>&nbsp;:</span> -->
<!-- 									</div> -->
<!-- 									</li> -->
<!-- 								</ul> -->
<!-- 								<div class="percent"></div> -->
<!-- 								<div class="percentNum">20%</div> -->
<!-- 							</div> -->
						</div>
					</div>
					<div id="barChart1"></div>
				</div>
			</div>
			<div class="bottom">
				<div class="title2"><h3>业支资源池</h3></div>
				<div class="content2">
					<div class="resourcePool" id="left">
						<div class="region">保定</div>
						<div class="content3"></div>
						<div class="content4">
							<div class="mainEquipment">
								<div>主设备</div>
								<div class="eachEquipment cabinet"><span>X86:</span><span class="num"></span></div>
								<div class="eachEquipment server"><span>小机:</span><span class="num"></span></div>
								<div class="eachEquipment battery"><span>存储:</span><span class="num"></span></div>
							</div>
							<div class="cabinetAndServerPercent">
								<div class="cabinetAndServerPercent1"></div>
							</div>
							<div class="batteryPercent">
								<div class="batteryPercent1">
								</div>
							</div>
							<div class="networkEquipment">
								<div>网络设备</div>
								<div class="num"></div>
							</div>
							<div class="NEPercent">
								<div class="innerBorder">
									<div class="NEPercent1"></div>
								</div>
							</div>
						</div>
					</div>
					<div class="resourcePool" id="center">
						<div class="region">开发区</div>
						<div class="content3"></div>
						<div class="content4">
							<div class="mainEquipment">
								<div>主设备</div>
								<div class="eachEquipment cabinet"><span>X86:</span><span class="num"></span></div>
								<div class="eachEquipment server"><span>小机:</span><span class="num"></span></div>
								<div class="eachEquipment battery"><span>存储:</span><span class="num"></span></div>
							</div>
							<div class="cabinetAndServerPercent">
								<div class="cabinetAndServerPercent1"></div>
							</div>
							<div class="batteryPercent">
								<div class="batteryPercent1">
								</div>
							</div>
							<div class="networkEquipment">
								<div>网络设备</div>
								<div class="num"></div>
							</div>
							<div class="NEPercent">
								<div class="innerBorder">
									<div class="NEPercent1"></div>
								</div>
							</div>
						</div>
					</div>
					<div class="resourcePool" id="right">
						<div class="region">青园街</div>
						<div class="content3"></div>
						<div class="content4">
							<div class="mainEquipment">
								<div>主设备</div>
								<div class="eachEquipment cabinet"><span>X86:</span><span class="num"></span></div>
								<div class="eachEquipment server"><span>小机:</span><span class="num"></span></div>
								<div class="eachEquipment battery"><span>存储:</span><span class="num"></span></div>
							</div>
							<div class="cabinetAndServerPercent">
								<div class="cabinetAndServerPercent1">
								</div>
							</div>
							<div class="batteryPercent">
								<div class="batteryPercent1">
								</div>
							</div>
							<div class="networkEquipment">
								<div>网络设备</div>
								<div class="num"></div>
							</div>
							<div class="NEPercent">
								<div class="NEPercent1">
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</body>
</html>
