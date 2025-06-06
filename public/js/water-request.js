document.addEventListener('DOMContentLoaded', () => {

    document.getElementById('water-request-form').addEventListener('submit', async function (e) {
    e.preventDefault();

    const data = {
        litres: document.getElementById('litres').value,
        urgency: document.getElementById('urgency').value,
        contact: document.getElementById('contact').value
    };

    try {
        const response = await fetch('/api/request-water', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
        });

        const result = await response.json();
        alert(result.message);
    } catch (err) {
        alert('Something went wrong');
        console.error(err);
    }
    });
  
});
