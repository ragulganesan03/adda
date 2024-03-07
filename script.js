document.addEventListener('DOMContentLoaded', function () {
    var pieChartElement = document.getElementById('pieChart');
    var barChartElement = document.getElementById('barChart');

    pieChartElement.width = 600;
    pieChartElement.height = 600;

    barChartElement.width = 600;
    barChartElement.height = 600;

    var pieChart = new Chart(pieChartElement, {
    type: 'pie',
    data: {},
    options: {
        responsive: false,
        maintainAspectRatio: false,
        aspectRatio: 0.5, 
        scales: {
            x: {
                display: false
            },
            y: {
                display: false
            }
        }
    }
});

    var barChart = new Chart(barChartElement, {
    type: 'bar',
    data: {},
    options: {
        responsive: false,
        maintainAspectRatio: false,
        aspectRatio: 0.5, 
        scales: {
            x: {
                display: false
            },
            y: {
                display: false
            }
        }
    }
});


    
    var generateReportButton = document.getElementById('generateReport');
    generateReportButton.addEventListener('click', generateCharts);

    var downloadReportButton = document.getElementById('downloadReport');
    downloadReportButton.addEventListener('click', downloadCharts);

    function generateCharts() {
        var selectedBook = document.getElementById('reportType1').value;
        var selectedReportType = document.getElementById('reportType').value;

        var chartData = getSampleChartData(selectedBook, selectedReportType);

        
        pieChart.data = chartData.pieChartData;
        pieChart.update();


        barChart.data = chartData.barChartData;
        barChart.update();
    }
     function downloadCharts() {
        
        var pieDataURL = pieChart.toBase64Image();
        var barDataURL = barChart.toBase64Image();


        var pieLink = document.createElement('a');
        pieLink.href = pieDataURL;
        pieLink.download = 'pie_chart.png';

        var barLink = document.createElement('a');
        barLink.href = barDataURL;
        barLink.download = 'bar_chart.png';

       
        document.body.appendChild(pieLink);
        pieLink.click();
        document.body.removeChild(pieLink);

        document.body.appendChild(barLink);
        barLink.click();
        document.body.removeChild(barLink);
    }

    
    function getSampleChartData(book, reportType) {
        
        var travelExpenditureData = generateRandomData(12, 50, 200);

       
        var foodExpenditureData = generateRandomData(12, 30, 120);

        var rentData = generateRandomData(12, 200, 400);

        
        var provisionsData = generateRandomData(12, 40, 150);

       
        var miscellaneousData = generateRandomData(12, 20, 100);

        
        var selectedData = [];
        switch (book) {
            case 'Travel Expenditure':
                selectedData = travelExpenditureData;
                break;
            case 'Food Expenditure':
                selectedData = foodExpenditureData;
                break;
            case 'Rent':
                selectedData = rentData;
                break;
            case 'Provisions':
                selectedData = provisionsData;
                break;
            case 'Miscellaneous':
                selectedData = miscellaneousData;
                break;
            default:
                selectedData = [];
        }

        
        var labelPrefix = reportType === 'weekly' ? 'Week' : (reportType === 'monthly' ? 'Month' : 'Year');

        
        return {
            pieChartData: {
                labels: selectedData.map((_, i) => `${labelPrefix} ${i + 1}`),
                datasets: [{
                    data: selectedData,
                    backgroundColor: getRandomColorArray(selectedData.length)
                }]
            },
            barChartData: {
                labels: selectedData.map((_, i) => `${labelPrefix} ${i + 1}`),
                datasets: [{
                    label: book,
                    data: selectedData,
                    backgroundColor: getRandomColorArray(selectedData.length),
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1
                }]
            }
        };
    }

    
    function generateRandomData(length, min, max) {
        return Array.from({ length }, () => Math.floor(Math.random() * (max - min + 1)) + min);
    }

    
    function getRandomColorArray(length) {
        return Array.from({ length }, () => getRandomColor());
    }

    function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    function downloadCharts() {
    
    var pieDataURL = pieChart.toBase64Image();
    var barDataURL = barChart.toBase64Image();

    
    var pieLink = document.createElement('a');
    pieLink.href = pieDataURL;
    pieLink.download = 'pie_chart.png';
    
    var barLink = document.createElement('a');
    barLink.href = barDataURL;
    barLink.download = 'bar_chart.png';

    
    document.body.appendChild(pieLink);
    pieLink.click();
    document.body.removeChild(pieLink);

    document.body.appendChild(barLink);
    barLink.click();
    document.body.removeChild(barLink);
}

});
