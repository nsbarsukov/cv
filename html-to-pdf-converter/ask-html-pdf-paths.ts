import {createInterface} from 'readline';

const DEFAULT_HTML_PATH = 'cv-template/cv-template.html';
const DEFAULT_PDF_PATH = 'cvBars.pdf';

export async function askHtmlPdfPaths(): Promise<[string, string]> {
    const consoleUI = createInterface({
        input: process.stdin,
        output: process.stdout
    });

    async function askQuestion(questionMessage: string): Promise<string> {
        return new Promise((resolve, reject) => {
            consoleUI.question(questionMessage, (answer) => {
                resolve(answer);
            });
        })
    }

    let htmlFilePath = await askQuestion('Введите путь к html-файлу: ');
    if (!htmlFilePath) {
        htmlFilePath = DEFAULT_HTML_PATH;
        console.log('Путь не был указан, взял дефолтный путь: ', htmlFilePath);
    }

    let pdfFilePath = await askQuestion('Введите путь к pdf-файлу: ');
    if (!pdfFilePath) {
        pdfFilePath = DEFAULT_PDF_PATH;
        console.log('Путь не был указан, взял дефолтный путь: ', pdfFilePath);
    }

    consoleUI.close();

    return [htmlFilePath, pdfFilePath];
}