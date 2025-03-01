(() => {
  const API_URL = 'http://localhost:3000/employees';

    /**
     * TODO:
     * - Add a function to generate random string (10 digits alphanumeric) for id
     * - Add a function to add new data (submit)
     * - Add a function to redirect to the index page
     */

  const getId = () => {
    let result = '';
    const chars = '0123456789abcdefghijklmnopqrstuvwxyz';
    
    for (let i = 0; i <= 10; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return result;
  }

  const createNewEmployee = async () => {
    const formEmployee = document.getElementById('employee-form');
    const formData = new FormData(formEmployee);

    const newEmployee = {
      id: getId(),
      name: formData.get('name').trim(),
      position: formData.get('position'),
    };

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newEmployee),
    });

    if (response.ok) {
      window.location.href = 'index.html';
    }
  }

  const redirectToIndex = () => {
    window.location.href = 'index.html';
  }

  document.getElementById('employee-form').addEventListener('submit', (event) => {
    event.preventDefault();
    createNewEmployee();
  });

  document.getElementById('back-button').addEventListener('click', () => {
    redirectToIndex();
  });

})();
