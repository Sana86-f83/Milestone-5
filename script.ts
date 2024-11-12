document
  .getElementById("resumeForm")
  ?.addEventListener("submit", function (event) {
    event.preventDefault();

    const profilePictureInput = document.getElementById(
      "profilePicture"
    ) as HTMLInputElement;
    const nameElement = document.getElementById("name") as HTMLInputElement;
    const emailElement = document.getElementById("email") as HTMLInputElement;
    const phoneElement = document.getElementById("phone") as HTMLInputElement;
    const addressElement = document.getElementById(
      "address"
    ) as HTMLTextAreaElement;
    const educationElement = document.getElementById(
      "education"
    ) as HTMLTextAreaElement;
    const experienceElement = document.getElementById(
      "experience"
    ) as HTMLTextAreaElement;
    const skillsElement = document.getElementById(
      "skills"
    ) as HTMLTextAreaElement;
    const usernameElement = document.getElementById(
      "username"
    ) as HTMLInputElement;

    if (
      profilePictureInput &&
      nameElement &&
      emailElement &&
      phoneElement &&
      addressElement &&
      educationElement &&
      experienceElement &&
      skillsElement &&
      usernameElement
    ) {
      const name = nameElement.value;
      const email = emailElement.value;
      const phone = phoneElement.value;
      const address = addressElement.value;
      const education = educationElement.value;
      const experience = experienceElement.value;
      const skills = skillsElement.value;
      const username = usernameElement.value;

      const profilePictureFile = profilePictureInput.files?.[0];
      const profilePictureURL = profilePictureFile
        ? URL.createObjectURL(profilePictureFile)
        : "";

      const resumeData = {
        name,
        email,
        phone,
        address,
        education,
        experience,
        skills,
        profilePictureURL,
      };

      // Encode resume data as a URL-safe string
      const encodedResumeData = encodeURIComponent(JSON.stringify(resumeData));
      const shareableLink  = `${window.location.origin}/view_resume.html`;


      // Save data locally
      localStorage.setItem("resumeData", JSON.stringify(resumeData));

      // Generate and display resume HTML
      const resumeOutputElement = document.getElementById("resumeOutput");
      if (resumeOutputElement) {
        const resumeHTML = `
          ${profilePictureURL ? `<img src="${profilePictureURL}" alt="Profile Picture" class="profilePicture">` : ""}
          <h2 id="edit-name" class="editable"> ${name} </h2>
          <p><strong>Email:</strong><span id="edit-email" class="editable"> ${email} </span> </p>
          <p><strong>Phone Number:</strong><span id="edit-phone" class="editable"> ${phone} </span></p>
          <p><strong>Address:</strong><span id="edit-address" class="editable"> ${address} </span></p>
          <h3>Education</h3>
          <p id="edit-education" class="editable"> ${education}</p>
          <h3>Experience</h3>
          <p id="edit-experience" class="editable"> ${experience}</p>
          <h3>Skills</h3>
          <p id="edit-skills" class="editable"> ${skills}</p>
        `;
        
        resumeOutputElement.innerHTML = resumeHTML;
        resumeOutputElement.classList.remove("hidden");

        // Create download and share link buttons
        const buttonsContainer = document.createElement("div");
        buttonsContainer.id = "buttonsContainer";
        resumeOutputElement.appendChild(buttonsContainer);

        const downloadButton = document.createElement("button");
        downloadButton.textContent = "Download as PDF";
        downloadButton.addEventListener("click", () => {
          document.getElementById("resumeForm")!.style.display = "none";
          window.print();
        });
        buttonsContainer.appendChild(downloadButton);

        const shareLinkButton = document.createElement("button");
        shareLinkButton.textContent = "Copy Shareable Link";
        shareLinkButton.addEventListener("click", async () => {
          try {
            await navigator.clipboard.writeText(shareableLink);
            alert("Shareable link copied to clipboard!");
          } catch (err) {
            console.error("Failed to copy link", err);
            alert("Failed to copy link to clipboard. Please try again.");
          }
        });
        buttonsContainer.appendChild(shareLinkButton);
      } else {
        console.error("Resume output container not found");
      }
    } else {
      console.error("Form elements are missing");
    }
  });
