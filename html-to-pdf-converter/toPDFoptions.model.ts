export interface PrintPDFOptions {
    /**
     * The file path to save the PDF to.
     * If path is a relative path, then it is resolved relative to current working directory.
     * If no path is provided, the PDF won't be saved to the disk
     */
    path: string;
    /**
     * Scale of the webpage rendering. Defaults to 1. Scale amount must be between 0.1 and 2.
     */
    scale?: number;
    /**
     * Display header and footer. Defaults to false.
     */
    displayHeaderFooter?: boolean;
    /**
     * HTML template for the print header.
     * Should be valid HTML markup with following classes used to inject printing values into them:
     *** date - formatted print date
     *** title - document title
     *** url - document location
     *** pageNumber - current page number
     *** totalPages - total pages in the document
     */
    headerTemplate?: string;
    /**
     * HTML template for the print footer. Should use the same format as the headerTemplate.
     */
    footerTemplate?: string;
    /**
     * Print background graphics. Defaults to false.
     */
    printBackground?: boolean;
    /**
     * Paper orientation. Defaults to false.
     */
    landscape?: boolean;
    /**
     * Paper ranges to print, e.g., '1-5, 8, 11-13'. Defaults to the empty string, which means print all pages
     */
    pageRanges?: string;
    /**
     * Paper format. If set, takes priority over width or height options. Defaults to 'Letter'
     */
    format?: string;
    /**
     * Paper width, accepts values labeled with units
     */
    width?: string | number;
    /**
     * Paper height, accepts values labeled with units
     */
    height?: string | number;
    /**
     * Paper margins, defaults to none
     */
    margin?: {
        top: string | number;
        right: string | number;
        bottom: string | number;
        left: string | number;
    }
    /**
     * Give any CSS @page size declared in the page priority over what is declared in width and height or format options.
     * Defaults to false, which will scale the content to fit the paper size
     */
    preferCSSPageSize?: boolean;
}