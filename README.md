### 文档
`https://pdf-lib.js.org/docs/api/`
### 安装
```
> npm install pdf-lib    //核心库
> npm install pdf-fontkit    //自定义字体使用
```

html部分：
```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <iframe id="pdf" style="width: 100vw; height: 100vh;"></iframe>
    <script src="/dist/pdf_maker.js"></script>
    <script>
        createPDF()
    </script>
</body>
</html>
```
index.js部分:
```
import { PDFDocument, PDFForm,degrees } from 'pdf-lib';
import fontkit from 'pdf-fontkit';


window.createPDF = createPdf;
async function createPdf() {

    //下载pdf并将pdf转化为二进制数据流
    const existingPdfBytes = await fetch("/test/temp_pdf_test2.pdf").then(res => res.arrayBuffer())
    var bytes = new Uint8Array(existingPdfBytes);

    //加载转化的数据流
    const pdfDoc = await PDFDocument.load(bytes) 
    const pages = pdfDoc.getPages()    //获取已加载的pdf的页面

    //下载图片，并将图片嵌入到pdf
    const jpgImageBytes = await fetch('/test/d1236e178ba39863aad08c0e94a2867%20%E5%89%AF%E6%9C%AC.jpg').then((res) => res.arrayBuffer())
    const jpgImage = await pdfDoc.embedJpg(jpgImageBytes)
    const jpgDims = jpgImage.scale(0.5)

    //绘制图片到pdf，并添加相关参数
    pages[0].drawImage(jpgImage, {
        x: 25,
        y: 25,
        width: jpgDims.width,
        height: jpgDims.height,
        rotate: degrees(0),
        opacity:1,
    })
    
    //下载字体，嵌入字体到pdf并注册（标准步骤）
    const fontBytes = await fetch('/test/test.ttf').then(res => res.arrayBuffer())
    pdfDoc.registerFontkit(fontkit);
    const customFont = await pdfDoc.embedFont(fontBytes);
    
    //绘制文字到pdf，并使用自定义字体
    pages[0].drawText('新字体',{
        x:10,
        y:10,
        font:customFont
    })

    //保存pdf
    const pdfBytes = await pdfDoc.save()
    //将pdf转化为二进制
    const blob = new Blob([pdfBytes], { type: 'application/pdf' })
    //将二进制流转化为本地url链接
    const durl = URL.createObjectURL(blob)

    //打开转化过的链接
    window.open(durl)
    
}
```
