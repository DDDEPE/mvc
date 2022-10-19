<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>거래처계좌연동</title>
    <%@include file="/WEB-INF/jsp/common.jsp" %>
    <style>
        #masterGrid{height:100%;}
    </style>
</head>
<body>
<div class="contents_wrap">
    <div class="contents_header_top">
        <h3 class="list_title"></h3>
    </div>
    <div class="contents_header half_header">
        <div class="content_header_inner">
            <div class="form_object w283">
                <input class="form_pop4_v2 fw50" data-pop="true" data-id="S_DEPT_CODE" type="text" id="S_DEPT_CODE" name="S_DEPT_CODE" autocomplete="off">
                <button class="form_popup_btn2_v2" data-pop="true" data-id="S_DEPT_CODE"></button>
                <input class="form_inp1_v2 fw50" type="text" id="S_DEPT_NAME" name="S_DEPT_NAME" readonly autocomplete="off">
                <label class="label_inp0_v2" for="S_DEPT_CODE">${fn:escapeXml(emax:word("부서"))}</label>
            </div>
            <div class="form_object w283">
                <input type="hidden" id="HR_EMPLOYEE_MASTER_ID">
                <input class="form_pop4_v2 fw50" type="text" data-pop="true" data-id="S_EMP_NO" id="S_EMP_NO" name="S_EMP_NO" autocomplete="off">
                <button class="form_popup_btn2_v2" data-pop="true" data-id="S_EMP_NO"></button>
                <label class="label_inp0_v2" for="S_EMP_NO">${fn:escapeXml(emax:word("사번/사원명"))}</label>
                <input class="form_inp1_v2 fw50" type="text" id="S_EMP_TITLE" name="S_EMP_TITLE" autocomplete="off" readonly="readonly">
            </div>
        </div>
    </div>
    <div class="contents_area half_h_contents">
        <div class="w100 grid_inner_wrap0" id="masterGrid"></div>
    </div>
</div>
</body>