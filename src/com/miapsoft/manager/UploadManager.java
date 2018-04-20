package com.miapsoft.manager;

import java.util.List;

/**
 * 
 * <p>Title: UploadManager</p>
 * @author: 李少青
 * @time: 2018年1月29日
 * <p>Company: 精益有容（北京）科技有限公司</p>
 * <p>Copyright:Copyright (c) 2018</p>
 */
public interface UploadManager {
	
	public void saveSummary(List<List<String>> datas);
	
	public void deleteSummary();
	
	public void saveDetail(List<List<String>> datas);
	
	public void deleteDetail();
	
}
