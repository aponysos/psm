<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE html>
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>上传数据</title>
    
	<!--
	<link rel="stylesheet" type="text/css" href="styles.css">
	-->

  </head>
  
  <body>
  	<div><a href="excel/摘要模板.xlsx" download="">下载摘要模板</a></div>
  	<div><a href="excel/详情模板.xlsx" download="">下载详情模板</a></div>
  	<form action="fileupload.do" method="post" enctype="multipart/form-data">
    	<div>
    		<span>上传摘要文件：</span>
    		<input id="" name="file1" type="file">
    	</div>
    	<div>
	    	<span>上传详情文件：</span>
	    	<input id="" name="file2" type="file">
    	</div>
    	<input type="submit" value="提交">
    </form>
  </body>
</html>
