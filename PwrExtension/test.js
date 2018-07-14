
window.addEventListener('DOMContentLoaded', function(){ 

    var createAverageSemesterInfoUl = (averageArrayInfo, years) => {
        var tableBody = document.createElement('tbody');
        var shouldSpan = false;
        tableBody.classList.add("semester-table-body");
        for(var i = 0; i < averageArrayInfo.length; i++){
            var row = document.createElement('tr');
            var text = document.createElement('td');
            var average = document.createElement('td');
            var yearAverage = document.createElement('td');
            text.appendChild(document.createTextNode(averageArrayInfo[i][0]));
            average.appendChild(document.createTextNode(averageArrayInfo[i][1]));
            yearAverage.appendChild(document.createTextNode(averageArrayInfo[i][2]));
            row.appendChild(text);
            row.appendChild(average);
                if(years[i] === years[i+1]) {
                    shouldSpan = true;
                    yearAverage.setAttribute('rowspan', 2);
                    row.appendChild(yearAverage);  
                } else if(!shouldSpan){
                    row.appendChild(yearAverage); 
                } else {
                    shouldSpan = false;
                }
            row.classList.add('table-row');
            text.classList.add('text');
            average.classList.add('average');
            yearAverage.classList.add('yearAverage');
            tableBody.appendChild(row);
        }
        return tableBody;
    }

    chrome.tabs.query({
        active: true,
        currentWindow: true,
    },
    function(tabs){
    var id = tabs[0].id;
        chrome.tabs.executeScript(
            id,
            {file: "app.js"}
        , function(res) {
            var table = document.querySelector(".semester-table");
            table.appendChild(createAverageSemesterInfoUl(res[0].info, res[0].years))
        })
    })
})