package com.miapsoft.manager;

import java.util.List;
import java.util.Map;

/**
 * <p>Title: MainManager.java</p>
 * <p>Description: TODO</p>
 * @author: 李少青
 * @time: 2017-11-6
 * <p>Company: 精益有容（北京）科技有限公司</p>
 * <p>Copyright:Copyright (c) 2017</p>
 */
public interface MainManager {
	
	List<Map<String, Object>> getProjectData();

	List<Map<String, Object>> getBarChartData();
	
	Map<String, Object> getBarChart1Data(String projectName);

	List<Map<String, Object>> getPieChartData();

	List<Map<String, Object>> getResourcePoolData();

	Map<String, Object> getWholeSurveyData();

}
