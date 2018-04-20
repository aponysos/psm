package com.miapsoft.util;

import java.text.SimpleDateFormat;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.DateUtil;
import org.apache.poi.ss.usermodel.FormulaEvaluator;

public class ExcelUtil {
	
	//未处理公式
    public static String getCellValue(Cell cell) {
        if (cell == null) {
            return null;
        }

        switch (cell.getCellType()) {
            case Cell.CELL_TYPE_STRING:
                return cell.getRichStringCellValue().getString().trim();
            case Cell.CELL_TYPE_NUMERIC:
                if (DateUtil.isCellDateFormatted(cell)) {
                    SimpleDateFormat sdf = new SimpleDateFormat("yyyy/MM/dd");//非线程安全
                    return sdf.format(cell.getDateCellValue());
                } else {
                    return String.valueOf(cell.getNumericCellValue());
                }
            case Cell.CELL_TYPE_BOOLEAN:
                return String.valueOf(cell.getBooleanCellValue());
            case Cell.CELL_TYPE_FORMULA:
                return cell.getCellFormula();
            default:
                return null;
        }
    }

    //处理公式
    public static String getCellValueFormula(Cell cell, FormulaEvaluator formulaEvaluator) {
        if (cell == null || formulaEvaluator == null) {
            return null;
        }

        if (cell.getCellType() == Cell.CELL_TYPE_FORMULA) {
            return String.valueOf(formulaEvaluator.evaluate(cell).getNumberValue());
        }
        return getCellValue(cell);
    }
}
