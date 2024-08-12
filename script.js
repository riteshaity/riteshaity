function generateResume() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const summary = document.getElementById('summary').value;
    const experience = document.getElementById('experience').value;
    const education = document.getElementById('education').value;
    const skills = document.getElementById('skills').value;

    const resumeContent = `
        <div class="resume-header">
            <h2>${name}</h2>
            <p>Email: ${email}</p>
            <p>Phone: ${phone}</p>
        </div>
        <div class="section-content">
            <div class="section-title">Professional Summary</div>
            <p>${summary}</p>
        </div>
        <div class="section-content">
            <div class="section-title">Experience</div>
            <p>${experience.replace(/\n/g, '<br>')}</p>
        </div>
        <div class="section-content">
            <div class="section-title">Education</div>
            <p>${education.replace(/\n/g, '<br>')}</p>
        </div>
        <div class="section-content">
            <div class="section-title">Skills</div>
            <ul>
                ${skills.split('\n').map(skill => `<li>${skill}</li>`).join('')}
            </ul>
        </div>
    `;

    document.getElementById('resumeContent').innerHTML = resumeContent;
    document.getElementById('downloadButton').style.display = 'block';
}

async function downloadResume() {
    const resumeContent = document.getElementById('resumeContent');

    // Convert the resume content to a canvas using html2canvas
    const canvas = await html2canvas(resumeContent, { scale: 2 });

    // Create a PDF from the canvas using jsPDF
    const pdf = new jspdf.jsPDF('p', 'mm', 'a4');
    const imgData = canvas.toDataURL('image/png');

    // Calculate the width and height of the PDF
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    // Add the image of the resume to the PDF
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);

    // Save the generated PDF
    pdf.save('resume.pdf');
}
