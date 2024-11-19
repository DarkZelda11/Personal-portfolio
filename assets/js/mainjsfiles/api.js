document.getElementById('apiForm').addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent form submission

    const responseArea = document.getElementById('responseArea');
    responseArea.innerHTML = ''; // Clear the previous response

    // Get the selected API and input value
    const selectedAPIs = Array.from(document.querySelectorAll('input[name="api"]:checked'))
        .map(checkbox => checkbox.value);

    // Check if more than one API has been selected
    if (selectedAPIs.length >  1) {
        responseArea.innerHTML = '<p style="color:red;"> Please select only one API at once</p>';
        return;
    }

    // Loop through selected APIs
    for (const api of selectedAPIs) {
        let url = '';
        if (api === 'riddles') {
            url = `https://api.api-ninjas.com/v1/riddles`;
        } else if (api === 'passwordgenerator') {
            url = `https://api.api-ninjas.com/v1/passwordgenerator?length=16`;
        }

        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'x-api-key': 'U8rDb1mt1QprqIsLChsg4w==YehCqMUz1zuykITo',
                    'content-type': 'application/json',
                }
            });

            if (!response.ok) {
                responseArea.innerHTML += `<p>Failed to fetch ${api}. Status: ${response.status}</p>`;
                continue; // Skip to the next API if this one fails
            }

            const data = await response.json();
            console.log(data); // Inspect the structure of the API response

            // Display the response
            if (api === 'riddles') {
                if (data.length > 0) { // Ensure there are riddles in the response
                    responseArea.innerHTML += `<p><strong>Riddle:</strong> ${data[0].question}</p>`; // Show the riddle
                    responseArea.innerHTML += `<p><strong>Answer:</strong> ${data[0].answer}</p>`; // Show the answer
                } else {
                    responseArea.innerHTML += `<p>No riddles found.</p>`; // Handle empty response
                }
            } else if (api === 'passwordgenerator') {
                responseArea.innerHTML += `<p>${data.random_password}</p>`; // Show the generated password
            }
        } catch (error) {
            console.error(error);
            responseArea.innerHTML += `<p>${error.message}</p>`;
        }
    }
});