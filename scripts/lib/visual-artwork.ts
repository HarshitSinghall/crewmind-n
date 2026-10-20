import { visuals } from '../../src/content/visuals.ts';
import type { ImageId, Crop } from '../../src/content/imagery.ts';

const ink = '#25212f', muted = '#625b70', line = '#d4cede', lilac = '#9787fa', mint = '#90efcb';
const esc = (value: string) => value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
const rect = (x: number, y: number, width: number, height: number, fill: string, radius = 12, stroke = 'none') => `<rect x="${x}" y="${y}" width="${width}" height="${height}" rx="${radius}" fill="${fill}" stroke="${stroke}" stroke-width="1.5"/>`;
const text = (x: number, y: number, value: string, size = 24, fill = ink, weight = 400) => `<text x="${x}" y="${y}" font-size="${size}" fill="${fill}" font-weight="${weight}">${esc(value)}</text>`;

/** Each aspect ratio is composed separately. Text is never cropped from a square master. */
export function renderVisual(id: ImageId, crop: Crop): string {
  const data = visuals[id];
  const wide = crop === 'landscape';
  const w = wide ? 1280 : 960, h = wide ? 720 : crop === 'portrait' ? 1200 : 960;
  const outer = 48, inner = 82, panelWidth = w - inner * 2;
  let art = `<defs><pattern id="grid" width="24" height="24" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r="1" fill="#dcd7e5"/></pattern><marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M1 1L6 4L1 7" fill="none" stroke="${muted}" stroke-width="1.4"/></marker></defs>`;
  art += rect(0, 0, w, h, '#f2f0f6', 0) + `<rect width="${w}" height="${h}" fill="url(#grid)"/>`;
  art += rect(outer, outer, w - outer * 2, h - outer * 2, '#fff', 24, line);
  art += text(inner, 100, data.kind === 'workflow' ? 'WORKFLOW STUDY' : 'INTERFACE STUDY', 17, muted, 600);
  art += rect(w - inner - 145, 76, 145, 36, '#ece8fd', 18) + text(w - inner - 126, 100, 'ILLUSTRATIVE', 14, '#463575', 600);
  art += text(inner, 160, data.title, wide ? 39 : 43, ink, 600);
  art += text(inner, 202, data.eyebrow, wide ? 23 : 25, muted);

  if (data.kind === 'workflow') {
    if (wide) {
      const gap = 54, nodeWidth = (panelWidth - gap * 2) / 3, y = 280;
      data.steps.forEach((step, index) => {
        const x = inner + index * (nodeWidth + gap);
        art += rect(x, y, nodeWidth, 164, index === 2 ? '#e8faf2' : index === 1 ? '#f0ebff' : '#faf9fc', 16, index === 2 ? '#64b697' : line);
        art += rect(x + 20, y + 20, 38, 34, index === 2 ? mint : '#ded6ff', 10);
        art += text(x + 29, y + 44, String(index + 1).padStart(2, '0'), 17, ink, 600);
        // The only longer step is intentionally split at a meaningful phrase.
        const lines = step.includes('?') ? step.split('?').map((part, i) => i ? part.trim() : part + '?') : [step];
        lines.forEach((value, i) => { art += text(x + 20, y + 103 + i * 30, value, 25, ink, 600); });
        if (index < 2) art += `<path d="M${x + nodeWidth + 8} ${y + 82}h${gap - 18}" stroke="${muted}" fill="none" stroke-width="2" marker-end="url(#arrow)"/>`;
      });
      art += `<path d="M${w / 2} 444v52" stroke="${muted}" stroke-dasharray="5 6" fill="none" stroke-width="2"/>`;
      art += rect(inner, 496, panelWidth, 66, '#f7f6fa', 12, line) + text(inner + 24, 538, data.exception, 24, muted);
    } else {
      const top = 252, stepHeight = crop === 'portrait' ? 164 : 136, gap = crop === 'portrait' ? 46 : 32;
      data.steps.forEach((step, index) => {
        const y = top + index * (stepHeight + gap);
        art += rect(inner, y, panelWidth, stepHeight, index === 2 ? '#e8faf2' : index === 1 ? '#f0ebff' : '#faf9fc', 18, index === 2 ? '#64b697' : line);
        art += rect(inner + 26, y + (stepHeight - 50) / 2, 56, 50, index === 2 ? mint : '#ded6ff', 12);
        art += text(inner + 40, y + stepHeight / 2 + 9, String(index + 1).padStart(2, '0'), 24, ink, 600);
        art += text(inner + 108, y + stepHeight / 2 + 12, step, 36, ink, 600);
        if (index < 2) art += `<path d="M${w / 2} ${y + stepHeight + 3}v${gap - 8}" stroke="${muted}" fill="none" stroke-width="2" marker-end="url(#arrow)"/>`;
      });
      const y = top + 3 * stepHeight + 2 * gap + 30;
      art += text(inner, y + 30, data.exception, 27, muted);
    }
  } else {
    const y = wide ? 250 : 256, frameHeight = wide ? 310 : crop === 'portrait' ? 680 : 500;
    art += rect(inner, y, panelWidth, frameHeight, '#faf9fc', 16, line);
    art += rect(inner, y, panelWidth, 58, '#eeebf4', 16);
    for (let i = 0; i < 3; i++) art += `<circle cx="${inner + 24 + i * 18}" cy="${y + 29}" r="5" fill="${i === 0 ? lilac : i === 1 ? '#a1dec6' : '#c7c0d6'}"/>`;
    art += text(inner + 92, y + 37, 'Crewmind / Sample workspace', wide ? 18 : 22, muted);
    const rowStart = y + 104, rowHeight = wide ? 62 : crop === 'portrait' ? 140 : 98;
    if (id === 'chat' || id === 'support') {
      const left = inner + 28, bubbleWidth = panelWidth - 90, firstHeight = wide ? 72 : 116;
      art += rect(left, rowStart - 12, bubbleWidth, firstHeight, '#ece7ff', 14);
      art += text(left + 20, rowStart + 12, 'CUSTOMER / SAMPLE', wide ? 13 : 19, muted, 600);
      art += text(left + 20, rowStart + (wide ? 43 : 65), id === 'chat' ? 'How do I get started?' : 'What happens next?', wide ? 24 : 33, ink, 500);
      const replyY = rowStart + firstHeight + 6;
      art += rect(left + 34, replyY, bubbleWidth, firstHeight, '#e4f7ed', 14);
      art += text(left + 54, replyY + 25, 'ASSISTANT / DRAFT', wide ? 13 : 19, muted, 600);
      art += text(left + 54, replyY + (wide ? 54 : 75), 'Check approved guidance.', wide ? 24 : 33, ink, 500);
      art += text(left, replyY + firstHeight + (wide ? 31 : 49), 'Uncertain answer? Ask your team.', wide ? 19 : 25, muted);
    } else if (id === 'booking') {
      const days = wide ? ['MON', 'TUE', 'WED', 'THU', 'FRI'] : ['MON', 'TUE', 'WED'];
      const cellWidth = (panelWidth - 60 - (days.length - 1) * 12) / days.length;
      const cellHeight = wide ? 106 : crop === 'portrait' ? 230 : 170;
      days.forEach((day, index) => {
        const x = inner + 30 + index * (cellWidth + 12);
        art += rect(x, rowStart - 10, cellWidth, cellHeight, index === 1 ? '#e4f7ed' : '#f1edf8', 12, index === 1 ? '#64b697' : line);
        art += text(x + 16, rowStart + 20, day, wide ? 17 : 25, muted, 600);
        art += text(x + 16, rowStart + (wide ? 67 : 106), index === 1 ? '10:00' : index === 2 ? '14:00' : '—', wide ? 25 : 36, ink, 500);
      });
      const statusY = rowStart + cellHeight + 20;
      art += rect(inner + 30, statusY, panelWidth - 60, wide ? 44 : 64, '#ece7ff', 10);
      art += text(inner + 48, statusY + (wide ? 29 : 42), 'Sample availability / Not booked', wide ? 22 : 29, '#473a64', 500);
    } else data.rows.forEach(([label, value], index) => {
      const rowY = rowStart + index * rowHeight;
      const statusColor = /review|input|Not booked|To |Ask|Draft|Check/.test(value) ? '#ece7ff' : '#e0f6eb';
      if (wide) {
        if (id === 'onboarding') art += rect(inner + 24, rowY + 8, 22, 22, '#fff', 5, '#9787fa');
        art += text(inner + (id === 'onboarding' ? 60 : 30), rowY + 28, label, 25, ink, 500);
        art += rect(inner + panelWidth - 290, rowY, 260, 42, statusColor, 9) + text(inner + panelWidth - 272, rowY + 28, value, 22, '#473a64', 500);
      } else {
        if (id === 'onboarding') art += rect(inner + 26, rowY + 3, 24, 24, '#fff', 5, '#9787fa');
        art += text(inner + (id === 'onboarding' ? 66 : 30), rowY + 24, label, 32, ink, 500);
        art += rect(inner + 30, rowY + 38, panelWidth - 60, 42, statusColor, 9) + text(inner + 48, rowY + 68, value, 28, '#473a64', 500);
      }
      if (index < 2) art += `<path d="M${inner + 30} ${rowY + rowHeight - (wide ? 8 : 5)}h${panelWidth - 60}" stroke="${line}"/>`;
    });
    art += text(inner, y + frameHeight + (wide ? 35 : 48), data.note, wide ? 22 : 27, muted);
  }
  art += `<path d="M${inner} ${h - 104}h${panelWidth}" stroke="${line}"/>`;
  art += text(inner, h - 70, 'SAMPLE ONLY · NOT A LIVE INTEGRATION', wide ? 16 : 20, muted, 600);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-label="${esc(data.alt)}"><title>${esc(data.title)}</title><desc>${esc(data.alt)}</desc><g font-family="Segoe UI, sans-serif">${art}</g></svg>`;
}
