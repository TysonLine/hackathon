
// Define the clicked function
    async function fetchJobs() {
        try {
            const res = await fetch('/api/postsAPI', {
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


export default fetchJobs;
