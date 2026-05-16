"use client";

import { jsPDF } from "jspdf";
import { MenuCard, SWAADA_INFO } from "./menuData";

export function generateMenuPDF(card: MenuCard): void {
    const doc = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
    });

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 15;
    const contentWidth = pageWidth - margin * 2;

    // ── Helper: hex to RGB ──────────────────────────────
    const hexToRgb = (hex: string) => {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result
            ? {
                r: parseInt(result[1], 16),
                g: parseInt(result[2], 16),
                b: parseInt(result[3], 16),
            }
            : { r: 123, g: 28, b: 28 };
    };

    const brandColor = hexToRgb(card.color);
    const maroon = { r: 123, g: 28, b: 28 };
    const saffron = { r: 244, g: 168, b: 40 };
    const gold = { r: 212, g: 175, b: 55 };

    let currentPage = 1;

    const addHeader = () => {
        // Top gradient bar
        doc.setFillColor(brandColor.r, brandColor.g, brandColor.b);
        doc.rect(0, 0, pageWidth, 38, "F");

        // Gold accent line
        doc.setFillColor(gold.r, gold.g, gold.b);
        doc.rect(0, 38, pageWidth, 2, "F");

        // Brand name
        doc.setTextColor(255, 255, 255);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(22);
        doc.text("Swaada Caterings & Services", pageWidth / 2, 14, { align: "center" });

        // Tagline
        doc.setFont("helvetica", "italic");
        doc.setFontSize(10);
        doc.setTextColor(255, 240, 200);
        doc.text(SWAADA_INFO.tagline, pageWidth / 2, 21, { align: "center" });

        // Menu title banner
        doc.setFillColor(saffron.r, saffron.g, saffron.b);
        doc.roundedRect(margin, 26, contentWidth, 10, 2, 2, "F");
        doc.setTextColor(maroon.r, maroon.g, maroon.b);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(13);
        doc.text(card.title.toUpperCase(), pageWidth / 2, 33, { align: "center" });
    };

    const addFooter = (pageNum: number, totalPages: number) => {
        const footerY = pageHeight - 18;

        // Footer bar
        doc.setFillColor(brandColor.r, brandColor.g, brandColor.b);
        doc.rect(0, footerY - 2, pageWidth, 20, "F");

        doc.setTextColor(255, 255, 255);
        doc.setFont("helvetica", "normal");
        doc.setFontSize(8);

        // Contact info
        doc.text(`Ph: ${SWAADA_INFO.phone1}  |  ${SWAADA_INFO.phone2}`, margin, footerY + 4);
        doc.text(`Email: ${SWAADA_INFO.email}`, margin, footerY + 9);

        // Page number
        doc.text(`Page ${pageNum} of ${totalPages}`, pageWidth - margin, footerY + 4, { align: "right" });
        doc.text(SWAADA_INFO.website, pageWidth - margin, footerY + 9, { align: "right" });
    };

    // ── Page 1: Header + Description + Menus ──────────
    addHeader();

    let y = 48;

    // Description box
    doc.setFillColor(255, 248, 240);
    doc.roundedRect(margin, y, contentWidth, 12, 2, 2, "F");
    doc.setDrawColor(saffron.r, saffron.g, saffron.b);
    doc.setLineWidth(0.5);
    doc.roundedRect(margin, y, contentWidth, 12, 2, 2, "S");
    doc.setTextColor(maroon.r, maroon.g, maroon.b);
    doc.setFont("helvetica", "italic");
    doc.setFontSize(9.5);
    doc.text(card.description, pageWidth / 2, y + 7.5, { align: "center" });

    y += 18;

    // Render each menu variant
    for (let mi = 0; mi < card.menus.length; mi++) {
        const menu = card.menus[mi];

        // Check if we need a new page
        const estimatedHeight = 10 + menu.items.length * 6 + 8;
        if (y + estimatedHeight > pageHeight - 25) {
            addFooter(currentPage, card.menus.length + 1);
            doc.addPage();
            currentPage++;
            addHeader();
            y = 48;
        }

        // Menu variant title
        doc.setFillColor(brandColor.r, brandColor.g, brandColor.b);
        doc.roundedRect(margin, y, contentWidth, 9, 1.5, 1.5, "F");
        doc.setTextColor(255, 255, 255);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(10);
        doc.text(menu.name, margin + 5, y + 6);
        y += 13;

        // Items in two columns
        const colWidth = (contentWidth - 5) / 2;
        const leftItems = menu.items.slice(0, Math.ceil(menu.items.length / 2));
        const rightItems = menu.items.slice(Math.ceil(menu.items.length / 2));
        const maxRows = Math.max(leftItems.length, rightItems.length);

        for (let i = 0; i < maxRows; i++) {
            if (y > pageHeight - 28) {
                addFooter(currentPage, card.menus.length + 1);
                doc.addPage();
                currentPage++;
                addHeader();
                y = 48;
            }

            // Alternating row background
            if (i % 2 === 0) {
                doc.setFillColor(255, 252, 245);
                doc.rect(margin, y - 1, contentWidth, 6, "F");
            }

            doc.setTextColor(40, 40, 40);
            doc.setFont("helvetica", "normal");
            doc.setFontSize(10);

            if (leftItems[i]) {
                doc.setTextColor(brandColor.r, brandColor.g, brandColor.b);
                doc.text("-", margin + 2, y + 4);
                doc.setTextColor(40, 40, 40);
                const leftText = doc.splitTextToSize(leftItems[i], colWidth - 8);
                doc.text(leftText[0], margin + 6, y + 4);
            }

            if (rightItems[i]) {
                doc.setTextColor(brandColor.r, brandColor.g, brandColor.b);
                doc.text("-", margin + colWidth + 7, y + 4);
                doc.setTextColor(40, 40, 40);
                const rightText = doc.splitTextToSize(rightItems[i], colWidth - 8);
                doc.text(rightText[0], margin + colWidth + 11, y + 4);
            }

            y += 7;
        }

        y += 6;
    }

    // ── Last page: What We Provide ──────────────────────
    const includesHeight = 14 + card.includes.length * 7 + 20;
    if (y + includesHeight > pageHeight - 25) {
        addFooter(currentPage, currentPage + 1);
        doc.addPage();
        currentPage++;
        addHeader();
        y = 48;
    }

    // "What We Provide" section
    doc.setFillColor(saffron.r, saffron.g, saffron.b);
    doc.roundedRect(margin, y, contentWidth, 9, 1.5, 1.5, "F");
    doc.setTextColor(maroon.r, maroon.g, maroon.b);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.text("What We Provide (Complimentary)", margin + 5, y + 6);
    y += 13;

    for (const item of card.includes) {
        if (y > pageHeight - 28) {
            addFooter(currentPage, currentPage + 1);
            doc.addPage();
            currentPage++;
            addHeader();
            y = 48;
        }
        doc.setTextColor(brandColor.r, brandColor.g, brandColor.b);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(9);
        doc.text("*", margin + 2, y + 3.5);
        doc.setTextColor(40, 40, 40);
        doc.setFont("helvetica", "normal");
        doc.text(item, margin + 8, y + 3.5);
        y += 7;
    }

    y += 8;

    // Note box
    if (y + 22 < pageHeight - 25) {
        doc.setFillColor(255, 243, 214);
        doc.roundedRect(margin, y, contentWidth, 22, 2, 2, "F");
        doc.setDrawColor(saffron.r, saffron.g, saffron.b);
        doc.setLineWidth(0.5);
        doc.roundedRect(margin, y, contentWidth, 22, 2, 2, "S");
        doc.setTextColor(maroon.r, maroon.g, maroon.b);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(9);
        doc.text("NOTE:", margin + 4, y + 7);
        doc.setFont("helvetica", "normal");
        doc.setFontSize(8.5);
        doc.setTextColor(60, 60, 60);
        doc.text("Please arrange Tables, Chairs & Cleaning at the venue.", margin + 4, y + 13);
        doc.text("For custom menus & pricing, please contact us directly.", margin + 4, y + 19);
    }

    // Add footer to last page
    addFooter(currentPage, currentPage);

    // Save the PDF
    const fileName = `Swaada_${card.title.replace(/[^a-zA-Z0-9]/g, "_")}_Menu.pdf`;
    doc.save(fileName);
}
