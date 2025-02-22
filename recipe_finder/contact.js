document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    const nameInput = form.querySelector("input[name='name']");
    const emailInput = form.querySelector("input[name='email']");
    const subjectInput = form.querySelector("input[name='subject']");
    const messageInput = form.querySelector("textarea[name='message']");
  
    form.addEventListener("submit", async function (e) {
      e.preventDefault();
  
      const name = nameInput.value.trim();
      const email = emailInput.value.trim();
      const subject = subjectInput.value.trim();
      const message = messageInput.value.trim();
  
      if (!name || !email || !subject || !message) {
        alert("All fields are required!");
        return;
      }
  
      if (!/^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(email)) {
        alert("Please enter a valid email address! of format user@gmail.com");
        return;
      }

      const data = { name, email, subject, message };
  
      try {
        const response = await fetch("http://localhost:3000/feedback", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
  
        if (response.ok) {
          alert("Message sent successfully!");
          form.reset(); 
        } else {
          alert("Failed to send message. Please try again.");
        }
      } 
      catch (error) {
        console.error("Error:", error);
        alert("An error occurred. Please try again later.");
      }
    });
  });
  