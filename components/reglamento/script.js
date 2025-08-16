document.addEventListener('DOMContentLoaded', () => {
    // La URL de tu archivo PDF. Asegúrate de que esté en la misma carpeta.
    const pdfUrl = 'REGLAMENTO DISCIPLINARIO LIGA RECREATIVA DE HANDBALL PUNILLA.pdf';
    
    // Elementos de la interfaz
    const pdfCanvas = document.getElementById('pdf-canvas');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');

    let pdfDoc = null;
    let pageNum = 1;
    let pageRendering = false;
    let pageNumPending = null;

    const renderPage = (num) => {
        pageRendering = true;
        
        // Obtener una página específica del PDF
        pdfDoc.getPage(num).then(page => {
            const viewport = page.getViewport({ scale: 1.5 });
            pdfCanvas.height = viewport.height;
            pdfCanvas.width = viewport.width;

            // Renderizar la página del PDF en el contexto del canvas
            const renderContext = {
                canvasContext: pdfCanvas.getContext('2d'),
                viewport: viewport,
            };
            const renderTask = page.render(renderContext);

            // Esperar a que la renderización termine
            renderTask.promise.then(() => {
                pageRendering = false;
                if (pageNumPending !== null) {
                    renderPage(pageNumPending);
                    pageNumPending = null;
                }
            });
        });

        // Actualizar el estado de los botones
        prevBtn.disabled = num <= 1;
        nextBtn.disabled = num >= pdfDoc.numPages;
    };

    const queueRenderPage = (num) => {
        if (pageRendering) {
            pageNumPending = num;
        } else {
            renderPage(num);
        }
    };

    // Cargar el documento PDF
    pdfjsLib.getDocument(pdfUrl).promise.then(pdf => {
        pdfDoc = pdf;
        renderPage(pageNum);
    });

    // Eventos de los botones
    prevBtn.addEventListener('click', () => {
        if (pageNum <= 1) {
            return;
        }
        pageNum--;
        queueRenderPage(pageNum);
    });

    nextBtn.addEventListener('click', () => {
        if (pageNum >= pdfDoc.numPages) {
            return;
        }
        pageNum++;
        queueRenderPage(pageNum);
    });
});
