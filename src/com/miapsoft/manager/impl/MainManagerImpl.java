package com.miapsoft.manager.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.miapsoft.manager.AbstractManager;
import com.miapsoft.manager.MainManager;

/**
 * <p>Title: MainManagerImpl.java</p>
 * <p>Description: TODO</p>
 * @author: 李少青
 * @time: 2017-11-6
 * <p>Company: 精益有容（北京）科技有限公司</p>
 * <p>Copyright:Copyright (c) 2017</p>
 */
@Service("mainManager")
public class MainManagerImpl extends AbstractManager implements MainManager {
	
	public List<Map<String, Object>> getProjectData() {
		String sql = "SELECT PROJECT_NAME,CURRENT_SCHEDULE from PROJECT_INFO where IMPORTANT = '1'";
		List<Map<String, Object>> list = this.getJdbcTemplate().queryForList(sql);
		return list;
	}
	
	public List<Map<String, Object>> getBarChartData() {
		String sql = "select s.NAME as STAGE,count(*) as NUM from PROJECT_INFO p " +
				"left join STAGE s on s.ID = p.STAGE group by s.NAME order by s.ID"; 
		List<Map<String, Object>> list = this.getJdbcTemplate().queryForList(sql);
		return list;
	}
	
	public List<Map<String, Object>> getPieChartData() {
		String sql = "select PROJECT_CATEGORY,count(*) as NUM from PROJECT_INFO p group by PROJECT_CATEGORY"; 
		List<Map<String, Object>> list = this.getJdbcTemplate().queryForList(sql);
		return list;
	}

	public Map<String, Object> getBarChart1Data(String projectName) {
		Map<String,Object> map  = new HashMap<String, Object>();
		String sql = "select * from PROGRESS_OF_KEY_PROJECTS WHERE PROJECT = ?";
		List<Map<String, Object>> list = this.getJdbcTemplate().queryForList(sql,projectName);
		sql = "select min(PLANNED_START_TIME) as MIN_DATE from PROGRESS_OF_KEY_PROJECTS WHERE PROJECT = ?";
		Map<String, Object> map1 = this.getJdbcTemplate().queryForMap(sql,projectName);
		sql = "select max(PLANNED_END_TIME) as MAX_DATE from PROGRESS_OF_KEY_PROJECTS WHERE PROJECT = ?";
		Map<String, Object> map2 = this.getJdbcTemplate().queryForMap(sql,projectName);
		map.put("data", list);
		map.put("minDate", map1.get("MIN_DATE"));
		map.put("maxDate", map2.get("MAX_DATE"));
		return map;
	}

	public List<Map<String, Object>> getResourcePoolData() {
		String sql = "select * from RESOURCE_POOL"; 
		List<Map<String, Object>> list = this.getJdbcTemplate().queryForList(sql);
		return list;
	}

	public Map<String, Object> getWholeSurveyData() {
		Map<String, Object> map = new HashMap<String, Object>();
		String sql = "select count(*) from PROJECT_INFO";
		int num = this.getJdbcTemplate().queryForInt(sql);
		map.put("num", num);
		sql = "select AVG(CURRENT_SCHEDULE) as PERCENR  from PROJECT_INFO";
		String percent = this.getJdbcTemplate().queryForMap(sql).get("PERCENR").toString();
		map.put("percent", percent);
		sql = "select count(*) from PROJECT_INFO where DELAY = '1'";
		int delayNum = this.getJdbcTemplate().queryForInt(sql);
		map.put("delayNum", delayNum);
		sql = "select count(*) from PROJECT_INFO where WARNING = '1'";
		int warningNum = this.getJdbcTemplate().queryForInt(sql);
		map.put("warningNum", warningNum);
		return map;
	}


}
