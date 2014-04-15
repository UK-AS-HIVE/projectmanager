
Template.search.events({
'keyup #searchBox': function doSearch() {
	var searchText = document.getElementById('searchBox').value.toLowerCase();
    var targetTable = document.getElementById('projectTable');
    var targetTableColCount;
            
    //Loop through table rows
    for (var rowIndex = 0; rowIndex < targetTable.rows.length; rowIndex++) {
        var rowData = '';

        //Get column count from header row
        if (rowIndex == 0) {
           targetTableColCount = targetTable.rows.item(rowIndex).cells.length;
           continue; //do not execute further code for header row.
        }
                
        //Process data rows. (rowIndex >= 1)
        for (var colIndex = 0; colIndex < targetTableColCount; colIndex++) {
            if (targetTable.rows.item(rowIndex).cells.item(colIndex).textContent.toLowerCase())
            {
            rowData += targetTable.rows.item(rowIndex).cells.item(colIndex).textContent.toLowerCase();
            }
        }
        

        //If search term is not found in row data
        //then hide the row, else show
        if (rowData.indexOf(searchText) == -1)
            targetTable.rows.item(rowIndex).style.display = 'none';
        else
            targetTable.rows.item(rowIndex).style.display = 'table-row';
         }
     }
})