const adviceIdElement = document.getElementById("advice-number");
const adviceTextElement = document.getElementById("advice-text");
const adviceButton = document.getElementById("advice-btn");
const adviceApiUrl = "https://api.adviceslip.com/advice";

async function fetchAdvice(URL) {
	// Disable button interaction and potentially add visual indicator (using class "paused")
	adviceButton.classList.add("paused");
	adviceButton.removeEventListener("click", fetchAdvice); // Prevent multiple fetches on same click
	try {
		const response = await fetch(URL);
		const adviceData = await response.json();
		adviceIdElement.innerText = `Advice #${adviceData.slip.id}`;
		adviceTextElement.innerText = `"${adviceData.slip.advice}"`;
	} catch (error) {
		console.log("Error fetching advice: ", error);
	} finally {
		// Re-enable button and event listener after 2 seconds
		setTimeout(() => {
			adviceButton.addEventListener("click", () => {
				// Re-attach event listener
				fetchAdvice(adviceApiUrl);
			});
			adviceButton.classList.remove("paused"); // Remove "paused" class
		}, 2000);
	}
}

// Add event listener initially
adviceButton.addEventListener("click", () => {
	fetchAdvice(adviceApiUrl);
});
