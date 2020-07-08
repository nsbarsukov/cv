import * as puppeteer from 'puppeteer';
import * as path from "path";

import {askHtmlPdfPaths} from "./ask-html-pdf-paths";

converter().catch(err => {
    console.error(err);
    process.exit(1);
});

async function converter(): Promise<void> {
    const [htmlFilePath, pdfFilePath] = await askHtmlPdfPaths();

    const browser = await puppeteer.launch({
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-web-security', '--font-render-hinting=none'],
        headless: true
    });
    const page = await browser.newPage();

    await page.goto('file://' + path.resolve(htmlFilePath), {waitUntil: 'networkidle0'});

    // await new Promise(resolve => setTimeout(resolve, 1000));

    await page.pdf({
        displayHeaderFooter: false,
        // format: 'A4',
        preferCSSPageSize: true,
        margin: {
            bottom: '0.2in',
            left: '0.2in',
            right: '0.2in',
            top: '0.2in'
        },
        path: pdfFilePath,
        scale: 0.9,
        printBackground: true
    });

    await browser.close();
    process.exit();
}
