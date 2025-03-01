(() => {
  const API_URL = 'http://localhost:3000/employees';

  /**
   * TODO:
   * - Add a function to redirect to the form page
   * - Add a function to fetch data
   * - Add a function to filter data by employee's name
   * - Add a function to display table
   * - Add a function to delete data (bonus)
   */ 

  let employees = [];

  function redirectToForm() {
    window.location.href = 'form.html';
  }

  const renderTableEmployees = () => {
    const table = document.getElementById('employee-table-body');
    table.innerHTML = '';

    employees.forEach((employee) => {
      table.innerHTML += `
        <tr>
          <td>${employee.id}</td>
          <td>${employee.name}</td>
          <td>${employee.position}</td>
          <td>
            <button class="btn-secondary btn-delete" id="btn-${employee.id}">Delete</button>
          </td>
        </tr>
      `;
      
    });
  }

  const renderLoading = () => {
    const table = document.getElementById('employee-table-body');
    table.innerHTML = `
      <tr>
        <td colspan="4">Loading...</td>
      </tr>
    `;
  }

  const getEmployees = async () => {
    renderLoading();
    const response = await fetch(API_URL);
    const data = await response.json();
    employees = data;
    renderTableEmployees();
  }

  const searchEmployee = async () => {
    renderLoading();
    const searchInput = document.getElementById('search-input').value.trim();
    const response = await fetch(`${API_URL}?name=${searchInput}`);
    const data = await response.json();
    employees = data;
    renderTableEmployees();
  }

  const deleteEmployee = async (id) => {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      getEmployees();
    }
  }

  

  document.addEventListener('DOMContentLoaded', () => {
    getEmployees();
  });
  document.getElementById('button-to-form').addEventListener('click', redirectToForm);
  document.getElementById('button-search-employee').addEventListener('click', (event) => { 
    event.preventDefault()
    searchEmployee()
  });

  document.getElementById('employee-table-body').addEventListener('click', (event) => {
    if (event.target.classList.contains('btn-delete')) {
      const id = event.target.id.split('-')[1];
      deleteEmployee(id);
    }
  });

})();
