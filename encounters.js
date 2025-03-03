// const API_BASE_URL = 'http://localhost:3000/api';

// // Load encounters on page load
// document.addEventListener('DOMContentLoaded', () => {
//     loadEncounters();
// });

// // Search input handling
// document.getElementById('searchInput').addEventListener('input', function(e) {
//     const searchTerm = e.target.value.toLowerCase();
//     loadEncounters(searchTerm);
// });

// // Fetch and display encounters
// async function loadEncounters(searchTerm = '') {
//     try {
//         let url = `${API_BASE_URL}/encounters`;
//         if (searchTerm) {
//             url += `?search=${encodeURIComponent(searchTerm)}`;
//         }

//         const response = await fetch(url);
//         const encounters = await response.json();

//         displayEncounters(encounters);
//     } catch (error) {
//         console.error('Error loading encounters:', error);
//         alert('Failed to load encounters.');
//     }
// }

// // Render encounters in table
// function displayEncounters(encounters) {
//     const tbody = document.querySelector('#encounters-table tbody');
//     tbody.innerHTML = '';

//     encounters.forEach(encounter => {
//         const row = document.createElement('tr');
//         row.innerHTML = `
//             <td>${formatDate(encounter.Start)}</td>
//             <td>${encounter.Patient}</td>
//             <td>${encounter.EncounterClass}</td>
//             <td>${encounter.Description}</td>
//             <td>$${encounter.Total_Claim_Cost}</td>
//         `;
//         tbody.appendChild(row);
//     });
// }

// // Utility function to format date
// function formatDate(dateString) {
//     return new Date(dateString).toLocaleDateString();
// }
