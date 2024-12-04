// index.js

let generateImageForm = 
    document.getElementById('generate-image-form');
let formInput = 
    document.getElementById('input-value');
let imageContainerText = 
    document.getElementById('imageContainerText');
let imageGenerated = 
    document.getElementById('generated-image');
let imageContainer = 
    document.getElementById('images-visible');

async function fetchImages(prompt) {
    try {
        let response = await fetch("https://api.stability.ai/v1/generate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer sk-tcMSMCygwSdymhredPwKO4P5JHxPb2rbLaHqq7eKyVxZfjGZ`  // Replace with your actual API key
            },
            body: JSON.stringify({
                prompt: prompt,  // Sending the user's text prompt
                // Include other parameters as needed by the Stability AI API
            })
        });

        if (!response.ok) {
            throw new Error('Unable to fetch the data');
        }

        // Assuming the API response includes a URL to the generated image
        const data = await response.json();
        const imageUrl = data.imageUrl;  // Adjust based on actual API response

        imageContainerText.innerText = 
            "Below is your generated Image:";
        imageContainer.style.display = "block";
        imageGenerated.src = imageUrl;
        console.log(imageUrl);

    } catch (error) {
        console.log(error);
        imageContainerText.innerText = 
            "An error occurred while generating the image.";
    }
}

generateImageForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let enteredText = formInput.value;
    if (enteredText !== "") {
        fetchImages(enteredText);
    } else {
        imageContainerText.innerText = 
            "Input field cannot be empty!";
    }
});
