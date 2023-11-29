let pageTimings = {};
let startTime, endTime;

function startForm() {
    document.getElementById('homepage').style.display = 'none';
    document.getElementById('questionPage1').style.display = 'flex';
    startTime = new Date();
}

function nextPage() {
    const currentPage = document.querySelector('.container[style="display: flex;"]');
    endTime = new Date();
    const pageId = currentPage.id;

    if (!pageTimings[pageId]) {
        pageTimings[pageId] = 0;
    }

    pageTimings[pageId] += (endTime - startTime) / 1000; // add duration to page timings

    currentPage.style.display = 'none';

    const nextPage = currentPage.nextElementSibling;
    if (nextPage) {
        nextPage.style.display = 'flex';
        startTime = new Date(); // start timer for the next page
    } else {
        submitForm();
    }
}

function submitForm() {
    const lastPage = document.querySelector('.container[style="display: flex;"]');
    endTime = new Date();
    const lastPageId = lastPage.id;

    if (!pageTimings[lastPageId]) {
        pageTimings[lastPageId] = 0;
    }

    pageTimings[lastPageId] += (endTime - startTime) / 1000; // add duration to last page

    let durationText = '';

    for (const [page, timing] of Object.entries(pageTimings)) {
        durationText += `${page}: ${timing.toFixed(2)} seconds\n`;
    }

    const downloadBtn = document.createElement('button');
    downloadBtn.innerText = 'Download Summary as PDF';
    downloadBtn.onclick = downloadSummaryAsPDF;

    document.getElementById('duration').innerText = durationText;
    document.getElementById('summaryPage').appendChild(downloadBtn);

    lastPage.style.display = 'none';
    document.getElementById('summaryPage').style.display = 'flex';
}

function downloadSummaryAsPDF() {
    const summaryPage = document.getElementById('summaryPage');

    html2pdf(summaryPage, {
        margin: 10,
        filename: 'form_summary.pdf',
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    });
}
