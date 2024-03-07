document.addEventListener("DOMContentLoaded", function () {
    function deleteSelectedRows() {
        const table = document.getElementById("table");
        const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');

        checkboxes.forEach((checkbox) => {
            const row = checkbox.closest("tr");
            if (row) {
                table.deleteRow(row.rowIndex);
            }
        });

        updateSerialNumbers();
    }

    function mergeSelectedRows() {
        const table = document.getElementById("table");
        const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');

        if (checkboxes.length >= 2) {
            checkboxes.forEach((checkbox) => {
                const row = checkbox.closest("tr");
                if (row) {
                    table.deleteRow(row.rowIndex);
                }
            });

            let mergedBook = "";
            let mergedDate = "";
            checkboxes.forEach((checkbox) => {
                const row = checkbox.closest("tr");
                if (row) {
                    const bookName = row.cells[1].innerText;
                    const lastUpdated = row.cells[2].innerText;
                    const upiMethod = row.cells[4].innerText;

                    mergedBook += bookName + " & ";
                    mergedDate = lastUpdated; 
                }
            });

            mergedBook = mergedBook.slice(0, -2);
            const newRow = table.insertRow();
            newRow.insertCell(0).innerText = table.rows.length; 
            newRow.insertCell(1).innerText = mergedBook;
            newRow.insertCell(2).innerText = mergedDate;
            newRow.insertCell(3).innerText = "Merged";
            newRow.insertCell(4).innerText = "Merged";
            newRow.insertCell(5).innerHTML = `
                <input type="checkbox" id="_checkbox${table.rows.length}">
                <label for="_checkbox${table.rows.length}" id="_checkbox${table.rows.length}_label">
                    <div id="tick_mark"></div>
                </label>
                📂
            `;
            newRow.cells[0].style.backgroundColor = "#f875aa";
            newRow.cells[0].style.color = "#000000";
        } else {
            alert("Please select at least two rows to merge.");
        }

        updateSerialNumbers();
    }
    function updateSerialNumbers() {
        const table = document.getElementById("table");
        for (let i = 1; i < table.rows.length; i++) {
            table.rows[i].cells[0].innerText = i;
        }
    }

    document.getElementById("deleteBookBtn").addEventListener("click", deleteSelectedRows);
    document.getElementById("mergeBtn").addEventListener("click", mergeSelectedRows);
});
