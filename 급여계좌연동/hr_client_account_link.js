var masterGrid;
var masterGridDP;

var popup;

$(document).ready(function () {


    // 마스터 그리드 생성
    f_set_masterGrid();


});

/** ************************************************************************************************************************** */

/** GRID SETTING * */

/** ************************************************************************************************************************** */
var f_set_masterGrid = function () {
	var grid_opt = {
	        grid_id: 'masterGrid',
	    	options : {
	    		checkBar : {
	    				visible : true,
	    				width : 35
	    		},
	    		stateBar : {
	    				visible : true
	    		}
	    	}
	    }
    masterGrid   = gf_gridInit(grid_opt);
    masterGridDP = masterGrid.getDataSource();
    
    //그리드 크기 자동 맞추기
    //없어짐

    masterGrid.onCellDblClicked = function (grid, itemIndex) { 
  
        parent.gv_hr_info['MENU_LIST'].push({
            ID         : masterGrid.getValue(masterGrid.getCurrent().itemIndex, 'CV_NAME')
            , MENU_CODE: 'comm_cv_list'
        });

        parent.gf_addPageIframe('comm_cv_list');
    }

    // 그리드 팝업

};

/** ************************************************************************************************************************** */

/** SEARCH * */

/** ************************************************************************************************************************** */
var f_search = function () {
    masterGridDP.clearRows();

    gf_gridSearch({
        gridView: masterGrid,
        param   : {
            queryId       : 'hr.S_HR_CLIENT_ACCOUNT_LINK',
            v_corporation_id	: gv_login_corporation_id,
            v_dept_name   : $('#S_DEPT_NAME').val(),
            v_emp_no      : $('#S_EMP_NO').val(),         

        }
    });
};


/** ************************************************************************************************************************** */

/** 거래처 생성 * */

/** ************************************************************************************************************************** */
var f_account_produce = function() {
	
	var rows = masterGrid.getRowsOfItems(masterGrid.getCheckedItems());
	if (rows.length == 0) {
        gf_toast(gf_msg('target_check'));
        return false;
    }

	
	if (confirm(gf_msg('account_produce'))) {
		var tempList = [];
		for (var i = 0; i < rows.length; i++) {
            if (!masterGridDP.getValue(rows[i],'CLIENT_LINKAGE_STATUS')){
            	tempList.push({HR_EMPLOYEE_MASTER_ID : masterGridDP.getValue(rows[i], 'HR_EMPLOYEE_MASTER_ID') });
            }			    			
		}
		console.log("tempList :: ",tempList);
		if(tempList.length > 0){
			gf_setData({
				data	: {
					queryId			: 'hr.P_HR_CLIENT_ACCOUNT_PRODUCE',
					keyList : JSON.stringify(tempList)
				},
				callback: function	(data) {
					f_search();
				}
			});
		}
		gf_toast(gf_msg('success'));
	}
}


/** ************************************************************************************************************************** */

/** 계좌연동 * */

/** ************************************************************************************************************************** */
var f_account_link = function() {
	
	var rows = masterGrid.getRowsOfItems(masterGrid.getCheckedItems());
	if (rows.length == 0) {
        gf_toast(gf_msg('target_check'));
        return false;
    }
	if (confirm(gf_msg('account_link'))) {
		var tempList = [];
		for (var i = 0; i < rows.length; i++){
			if (!masterGridDP.getValue(rows[i],'CLIENT_ACCOUNT_NUMBER')){
				tempList.push({HR_EMPLOYEE_MASTER_ID : masterGridDP.getValue(rows[i], 'HR_EMPLOYEE_MASTER_ID') });		
            }	    			
		}
		if(tempList.length > 0){
			gf_setData({
				data	: {
					queryId			: 'hr.P_INSERT_CLIENT_LINK',
					keyList : JSON.stringify(tempList)
				},
				callback: function	(data) {
					f_search();
				}
			});				

		}
		gf_toast(gf_msg('success'));

	}


}

/** ************************************************************************************************************************** */

/** COMBO * */

/** ************************************************************************************************************************** */




/** ************************************************************************************************************************** */

/** POPUP * */

/** ************************************************************************************************************************** */
var FormColumn = [{
    colId     : 'S_DEPT_CODE',
    popup_code: 'pop_dept',
    v_title   : gf_word('부서')
}, {
    colId     : 'S_EMP_NO',
    popup_code: 'pop_employee',
    v_title   : gf_word('사원')
}];

var paramReturn      = function (object) {
    var param;

    if (object.dataset != undefined && object.dataset.pop == 'true') {
        if (object.dataset.id == 'S_DEPT_CODE') {
            param = {
                S_DEPT_CODE: {searchCondition: object.value}
            }
        } else if (object.dataset.id == 'S_EMP_NO') {
            param = {
                S_EMP_NO: {searchCondition: object.value}
            }
        }
    } 

    return param;
};
// 팝업데이터 더블클릭시 콜백함수
var f_popup_callback = function (data, index) {
     if (popup == 'F_S_DEPT_CODE') {
        $('#S_DEPT_CODE').val(data.DEPT_CODE);
        $('#S_DEPT_NAME').val(data.DEPT_NAME);
    } else if (popup == 'F_S_EMP_NO') {
        $('#HR_EMPLOYEE_MASTER_ID').val(data.HR_EMPLOYEE_MASTER_ID);
        $('#S_EMP_NO').val(data.EMP_NO);
        $('#S_EMP_TITLE').val(data.EMP_TITLE);
    }
};
