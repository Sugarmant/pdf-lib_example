import { PDFDocument, PDFForm,degrees } from 'pdf-lib';
import fontkit from 'pdf-fontkit';

window.createPDF = createPdf;
async function createPdf() {

    const url = "/test/temp_pdf_test2.pdf";
    const existingPdfBytes = await fetch(url).then(res => res.arrayBuffer())
    var bytes = new Uint8Array(existingPdfBytes);

    const pdfDoc = await PDFDocument.load(bytes) 
    const pages = pdfDoc.getPages()

    

    const jpgUrl = '/test/d1236e178ba39863aad08c0e94a2867%20%E5%89%AF%E6%9C%AC.jpg'
    const jpgImageBytes = await fetch(jpgUrl).then((res) => res.arrayBuffer())
    const jpgImage = await pdfDoc.embedJpg(jpgImageBytes)
    const jpgDims = jpgImage.scale(0.5)


    const fontBytes = await fetch('/test/test.ttf').then(res => res.arrayBuffer())
    pdfDoc.registerFontkit(fontkit);
    const customFont = await pdfDoc.embedFont(fontBytes);

    

    // const form = pdfDoc.getForm();
    // const textField = form.getTextField('123');
    // textField.setFontSize(11);
    // textField.setText('stefan z');
    // textField.updateAppearances(customFont);

    // form.flatten();

    pages[0].drawText('新字体',{
        x:10,
        y:10,
        font:customFont
    })

    pages[0].drawImage(jpgImage, {
        x: 25,
        y: 25,
        width: jpgDims.width,
        height: jpgDims.height,
        rotate: degrees(0),
        opacity:1,
    })

    
    
    
    const pdfBytes = await pdfDoc.save()
    const blob = new Blob([pdfBytes], { type: 'application/pdf' })
    const durl = URL.createObjectURL(blob)
    window.open(durl)
    
    // page.drawText('Hello World!');
    // const pdfDataUri = await pdfDoc.saveAsBase64({ dataUri: true });
    // document.getElementById('pdf').src = pdfDataUri;
    
}