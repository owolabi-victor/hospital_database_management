document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');

    if (searchInput) {
        searchInput.addEventListener('input', function () {
            const searchTerm = searchInput.value.toLowerCase();
            filterTables(searchTerm);
        });
    }
});

// Function to filter all tables on the page
function filterTables(searchTerm) {
    const tables = document.querySelectorAll('table'); // Select all tables

    tables.forEach(table => {
        const tbody = table.querySelector('tbody'); // Get table body
        if (!tbody) return;

        const rows = tbody.querySelectorAll('tr'); // Get all rows

        rows.forEach(row => {
            const cells = row.querySelectorAll('td');
            let rowMatches = false;

            // Check if any cell in the row contains the search term
            cells.forEach(cell => {
                if (cell.textContent.toLowerCase().includes(searchTerm)) {
                    rowMatches = true;
                }
            });

            // Show or hide row based on match
            row.style.display = rowMatches ? '' : 'none';
        });
    });
}
