document.addEventListener('DOMContentLoaded', () => {
    const generateButton = document.getElementById('generate-button');
    generateButton.addEventListener('click', generateTables);

    const viewResultsButton = document.getElementById('view-results-button');
    viewResultsButton.addEventListener('click', () => {
        window.location.href = 'results.html';
    });
});

async function generateTables() {
    const numberInput = document.getElementById('number-input');
    const number = parseInt(numberInput.value);

    if (isNaN(number) || number < 1) {
        alert("Please enter a valid number greater than 0");
        return;
    }

    const multiplicationTable = generateTable(number, 'multiplication');
    const divisionTable = generateTable(number, 'division');

    displayTable('multiplication-table', multiplicationTable, 'Multiplication');
    displayTable('division-table', divisionTable, 'Division');

    await saveResult(number, 'multiplication', multiplicationTable);
    await saveResult(number, 'division', divisionTable);
}

function generateTable(number, type) {
    const results = [];
    for (let i = 1; i <= 10; i++) {
        if (type === 'multiplication') {
            results.push({ operand: i, result: number * i });
        } else if (type === 'division') {
            results.push({ operand: i, result: (number / i).toFixed(2) });
        }
    }
    return results;
}

function displayTable(tableId, results, type) {
    const table = document.getElementById(tableId);
    table.innerHTML = ''; // Clear the table

    // Create table header
    let header = table.createTHead();
    let headerRow = header.insertRow();
    let headerCell1 = headerRow.insertCell();
    let headerCell2 = headerRow.insertCell();
    headerCell1.innerHTML = type === 'multiplication' ? 'Multiplier' : 'Divisor';
    headerCell2.innerHTML = 'Result';

    // Create table body
    let body = table.createTBody();
    results.forEach(item => {
        let row = body.insertRow();
        let cell1 = row.insertCell();
        let cell2 = row.insertCell();
        cell1.innerHTML = item.operand;
        cell2.innerHTML = item.result;
    });
}

async function saveResult(number, type, results) {
    try {
        await fetch('http://localhost:5000/api/results', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ number, type, results })
        });
    } catch (err) {
        console.error('Error saving result:', err);
    }
}
