package com.miapsoft.manager.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.miapsoft.manager.AbstractManager;
import com.miapsoft.manager.UploadManager;

/**
 * 
 * <p>Title: UploadManagerImpl</p>
 * @author: 李少青
 * @time: 2018年1月29日
 * <p>Company: 精益有容（北京）科技有限公司</p>
 * <p>Copyright:Copyright (c) 2018</p>
 */
@Service("uploadManager")
public class UploadManagerImpl extends AbstractManager implements UploadManager{

	public void saveDetail(List<List<String>> datas) {
		String sql = "insert into PROGRESS_OF_KEY_PROJECTS "
				+ "(PROJECT,IMPLEMENTATION_OBJECTIVES,PLANNED_START_TIME,PLANNED_END_TIME,"
				+ "CURRENT_SCHEDULE_PERCENT,DURATION,CURRENT_SCHEDULE,REMAINING_SCHEDULE) values ";
		for (int i=0;i<datas.size();i++) {
			sql += "(";
			List<String> data = datas.get(i);
			for(int j=0;j<data.size();j++){
				if(j!=data.size()-1){
					sql += "'"+data.get(j)+"',";
				}else{
					sql += "'"+data.get(j)+"')";
				}
			}
			if(i!= datas.size()-1){
				sql += ",";			
			}else {
				sql += ";";
			}
		}
		this.getJdbcTemplate().execute(sql);
	}
	
	public void deleteDetail(){
		String sql = "delete from PROGRESS_OF_KEY_PROJECTS";
		this.getJdbcTemplate().execute(sql);
	}

	public void saveSummary(List<List<String>> datas) {
		String[] stages = {"设计阶段","实施阶段","施工阶段","初验阶段","项目竣工","终验阶段"};
		String sql = "insert into PROJECT_INFO "
				+ "(PROJECT_ID,PROJECT_CATEGORY,PROJECT_NAME,PERSON_IN_CHARGE,COMPLETION_TIME_LIMIT,"
				+ "CURRENT_SCHEDULE,PROJECT_DESCRIPTION,STAGE,IMPORTANT,DELAY,WARNING) values ";
		for (int i=0;i<datas.size();i++) {
			sql += "(";
			List<String> data = datas.get(i);
			for(int j=0;j<data.size();j++){
				sql += "'"+data.get(j)+"',";
			}
			int randomNum = (int) (Math.round(Math.random()*5));
			String stage = stages[randomNum];
			sql += "'"+stage+"',1,null,null)"; 
			if(i!= datas.size()-1){
				sql += ",";			
			}else {
				sql += ";";
			}
		}
		this.getJdbcTemplate().execute(sql);
	}

	public void deleteSummary() {
		String sql = "delete from PROJECT_INFO";
		this.getJdbcTemplate().execute(sql);
	}
	
}
