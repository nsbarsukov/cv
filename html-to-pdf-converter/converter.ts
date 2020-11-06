import * as puppeteer from 'puppeteer';
import * as path from "path";

import {askHtmlPdfPaths} from "./ask-html-pdf-paths";
import {PrintPDFOptions} from "./toPDFoptions.model";

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

    const printPDFOptions: PrintPDFOptions = {
        format: 'A4',
        preferCSSPageSize: true,
        margin: {
            bottom: 0,
            left: 0,
            right: 0,
            top: 0
        },
        path: pdfFilePath,
        printBackground: true,
        pageRanges: '1'
    };

    await page.pdf(printPDFOptions);

    await browser.close();
    process.exit();
}
