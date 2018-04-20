package com.miapsoft.controller;

import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.miapsoft.common.exception.BussinessException;
import com.miapsoft.manager.UploadManager;
import com.miapsoft.util.ExcelUtil;

/**
 * 
 * <p>Title: UploadController</p>
 * @author: 李少青
 * @time: 2018年1月29日
 * <p>Company: 精益有容（北京）科技有限公司</p>
 * <p>Copyright:Copyright (c) 2018</p>
 */
@Controller
public class UploadController {
	
	@Autowired
	private UploadManager uploadManager;
	
	@RequestMapping("upload.do")
	public String upload(){
		return "jsp/upload";
	}
	
	@RequestMapping("fileupload.do")
	@ResponseBody
	@Transactional
	public String fileupload(HttpServletRequest request){
		try {
			MultipartHttpServletRequest multipartRequest  =  (MultipartHttpServletRequest) request;
			MultipartFile file1 = multipartRequest.getFile("file1");
		    MultipartFile file2 = multipartRequest.getFile("file2");
		    if(file1.getSize() != 0){
		    	Workbook workbook1 = fileToWorkbook(file1);
			    saveSummary(workbook1);
		    }
		    if(file2.getSize() != 0){
		    	Workbook workbook2 = fileToWorkbook(file2);
		 	    saveDetail(workbook2);
		    }
		} catch (Exception e) {
			e.printStackTrace();
//			throw new BussinessException("上传数据错误,请检查除备注以外是否存在空值");
		}
		return "上传成功";
	}
	
	private void saveSummary(Workbook workbook) throws Exception{
		Sheet sheet = workbook.getSheetAt(0);
		List<List<String>> datas = new ArrayList<List<String>>();
	    for (Row row : sheet) {
	    	if(row.getRowNum()!=0){
	    		List<String> data = new ArrayList<String>();
	    		for (Cell cell : row) {
	    			if(cell.getColumnIndex()!=6&&cell.getColumnIndex()!=7){
	    				data.add(ExcelUtil.getCellValue(cell));
	    			}
				}
	    		datas.add(data);
	    	}
		}
		uploadManager.deleteSummary();
		uploadManager.saveSummary(datas);
	    workbook.close();
	}
	private void saveDetail(Workbook workbook) throws Exception{
		Sheet sheet = workbook.getSheetAt(0);
			List<List<String>> datas = new ArrayList<List<String>>();
		    for (Row row : sheet) {
		    	if(row.getRowNum()!=0){
		    		List<String> data = new ArrayList<String>();
		    		for (Cell cell : row) {
		    			if(cell.getColumnIndex()!=2&&cell.getColumnIndex()!=6){
		    				data.add(ExcelUtil.getCellValue(cell));
		    			}
					}
		    		datas.add(data);
		    	}
			}
			uploadManager.deleteDetail();
			uploadManager.saveDetail(datas);
		    workbook.close();
	}
	
	private Workbook fileToWorkbook(MultipartFile file) throws Exception{
		String fileName = file.getOriginalFilename();
	    String fileType = "";
        fileType = fileName.substring(fileName.lastIndexOf(".") + 1,fileName.length());
	    InputStream inputStream = file.getInputStream();
	    Workbook workbook = null;
	    if(fileType.toLowerCase().equals("xls")){
        	workbook = new HSSFWorkbook(inputStream);
    	}else if(fileType.toLowerCase().equals("xlsx")){
    		workbook = new XSSFWorkbook(inputStream);
    	}else{
    		throw new BussinessException("导入的文件格式不正确,请导入excel文件");
    	}
		return workbook;
	}
}
