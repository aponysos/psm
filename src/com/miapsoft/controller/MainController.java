package com.miapsoft.controller;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.miapsoft.manager.MainManager;
/**
 * 
 * @author:李少青
 * @date:2017-11-6
 */
@Controller
public class MainController {
	@Autowired
	MainManager mainManager;
	@RequestMapping(value="main.do")
	public String main() {
		return "jsp/main";
	}
	
	@ResponseBody
	@RequestMapping(value="getProjectData.do")
	public List<Map<String, Object>> getProjectData() {
		List<Map<String, Object>> list = mainManager.getProjectData();
		return list;
	}
	@ResponseBody
	@RequestMapping(value="getBarChartData.do")
	public List<Map<String, Object>> getBarChartData(HttpServletRequest request) {
		List<Map<String, Object>> list = mainManager.getBarChartData();
		return list;
	}
	@ResponseBody
	@RequestMapping(value="getWholeSurveyData.do")
	public Map<String, Object> getWholeSurveyData(HttpServletRequest request) {
		Map<String, Object> map = mainManager.getWholeSurveyData();
		return map;
	}
	@ResponseBody
	@RequestMapping(value="getPieChartData.do")
	public List<Map<String, Object>> getPieChartData(HttpServletRequest request) {
		List<Map<String, Object>> list = mainManager.getPieChartData();
		return list;
	}
	@ResponseBody
	@RequestMapping(value="getBarChart1Data.do")
	public Map<String, Object> getBarChart1Data(HttpServletRequest request) {
		String projectName = request.getParameter("projectName");
		Map<String, Object> map = mainManager.getBarChart1Data(projectName);
		return map;
	}
	
	@ResponseBody
	@RequestMapping(value="getResourcePoolData.do")
	public List<Map<String, Object>> getResourcePoolData(HttpServletRequest request) {
		List<Map<String, Object>> list = mainManager.getResourcePoolData();
		return list;
	}
	
	
	
}
