document.addEventListener('DOMContentLoaded', () => {
    fetchPreviousResults();
});

async function fetchPreviousResults() {
    try {
        const response = await fetch('http://localhost:5000/api/results');
        const data = await response.json();

        displayPreviousResults(data);
    } catch (err) {
        console.error('Error fetching previous results:', err);
    }
}

function displayPreviousResults(results) {
    const container = document.getElementById('previous-results');
    container.innerHTML = ''; // Clear previous results

    results.forEach(result => {
        const tableWrapper = document.createElement('div');
        tableWrapper.className = 'table-wrapper';

        const tableTitle = document.createElement('h2');
        tableTitle.innerHTML = `${result.type.charAt(0).toUpperCase() + result.type.slice(1)} Table for ${result.number}`;
        tableWrapper.appendChild(tableTitle);

        const table = document.createElement('table');
        const header = table.createTHead();
        const headerRow = header.insertRow();
        const headerCell1 = headerRow.insertCell();
        const headerCell2 = headerRow.insertCell();
        headerCell1.innerHTML = result.type === 'multiplication' ? 'Multiplier' : 'Divisor';
        headerCell2.innerHTML = 'Result';

        const body = table.createTBody();
        result.results.forEach(item => {
            let row = body.insertRow();
            let cell1 = row.insertCell();
            let cell2 = row.insertCell();
            cell1.innerHTML = item.operand;
            cell2.innerHTML = item.result;
        });

        tableWrapper.appendChild(table);
        container.appendChild(tableWrapper);
    });
}
