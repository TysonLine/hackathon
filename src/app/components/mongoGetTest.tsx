'use client';

const MongoFetch = () => {

    // Define the clicked function
    async function clicked() {
        console.log('clicked');
        try {
            const res = await fetch('/api/MongoDB', {
                method: 'GET',
            });

            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }

            const data = await res.json();
            console.log('Fetched Data:', data); // Handle the fetched data as needed
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    return (
        <button className="btn btn-primary" onClick={() => clicked()}>Fetch Data</button>
    );
};

export default MongoFetch;
