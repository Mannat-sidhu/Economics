/* Diagram helpers: generic chart (axes + lines + shaded polygons + points), payoff matrix, network graph. All return SVG strings. */
const DG = (() => {
  const f = n => Math.round(n * 10) / 10;
  const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');
  // chart({xlabel,ylabel,xmax,ymax,lines:[{p:[[x,y]..],label,c,dash,lx,ly,anchor}],polys:[{p,c,label,lx,ly}],pts:[{x,y,label,g:'xy'|'x'|'y'|'',dx,dy,xt,yt}],texts:[{x,y,t,anchor}],xticks:[{v,t}],yticks:[{v,t}]})
  function chart(o) {
    const W = o.w || 460, H = o.h || 340, L = 56, R = 26, T = 16, B = 50;
    const xm = o.xmax || 10, ym = o.ymax || 10;
    const X = x => f(L + (W - L - R) * x / xm), Y = y => f(H - B - (H - T - B) * y / ym);
    let s = `<svg class="dg" viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(o.alt || 'economics diagram')}">`;
    (o.polys || []).forEach(p => {
      s += `<polygon class="f${p.c || 0}" points="${p.p.map(q => X(q[0]) + ',' + Y(q[1])).join(' ')}"/>`;
      if (p.label) s += `<text x="${X(p.lx)}" y="${Y(p.ly)}" text-anchor="middle" class="h">${esc(p.label)}</text>`;
    });
    s += `<path class="ax" d="M${L} ${T - 4} V${H - B} H${W - R + 6}"/>`;
    s += `<text x="${(L + W - R) / 2}" y="${H - 10}" text-anchor="middle">${esc(o.xlabel || 'Quantity')}</text>`;
    s += `<text transform="translate(14 ${(T + H - B) / 2}) rotate(-90)" text-anchor="middle">${esc(o.ylabel || 'Price')}</text>`;
    (o.xticks || []).forEach(t => s += `<text x="${X(t.v)}" y="${H - B + 15}" text-anchor="middle" class="small">${esc(t.t)}</text>`);
    (o.yticks || []).forEach(t => s += `<text x="${L - 6}" y="${Y(t.v) + 4}" text-anchor="end" class="small">${esc(t.t)}</text>`);
    (o.lines || []).forEach(l => {
      s += `<polyline class="ln c${l.c || 0}" ${l.dash ? 'stroke-dasharray="6 4"' : ''} points="${l.p.map(q => X(q[0]) + ',' + Y(q[1])).join(' ')}"/>`;
      if (l.label) {
        const e = l.p[l.p.length - 1];
        const lx = l.lx != null ? l.lx : e[0], ly = l.ly != null ? l.ly : e[1];
        s += `<text x="${X(lx) + 5}" y="${Y(ly) + 4}" class="h" text-anchor="${l.anchor || 'start'}" style="fill:var(--${['pen', 'amber', 'bad', 'good', 'muted'][l.c || 0]})">${esc(l.label)}</text>`;
      }
    });
    (o.pts || []).forEach(p => {
      const g = p.g == null ? 'xy' : p.g;
      if (g.includes('x')) s += `<line class="gd" x1="${X(p.x)}" y1="${Y(p.y)}" x2="${X(p.x)}" y2="${H - B}"/>`;
      if (g.includes('y')) s += `<line class="gd" x1="${L}" y1="${Y(p.y)}" x2="${X(p.x)}" y2="${Y(p.y)}"/>`;
      s += `<circle class="pt" cx="${X(p.x)}" cy="${Y(p.y)}" r="3.6"/>`;
      if (p.label) s += `<text x="${X(p.x) + (p.dx != null ? p.dx : 7)}" y="${Y(p.y) + (p.dy != null ? p.dy : -7)}">${esc(p.label)}</text>`;
      if (p.xt && g.includes('x')) s += `<text x="${X(p.x)}" y="${H - B + 15}" text-anchor="middle">${esc(p.xt)}</text>`;
      if (p.yt && g.includes('y')) s += `<text x="${L - 6}" y="${Y(p.y) + 4}" text-anchor="end">${esc(p.yt)}</text>`;
    });
    (o.texts || []).forEach(t => s += `<text x="${X(t.x)}" y="${Y(t.y)}" text-anchor="${t.anchor || 'middle'}" ${t.cls ? `class="${t.cls}"` : ''}>${esc(t.t)}</text>`);
    return s + '</svg>';
  }
  // matrix({rowName,colName,rows:[..],cols:[..],cells:[[[a,b],..],..],hl:[[r,c]..],unit})
  function matrix(o) {
    const nr = o.rows.length, nc = o.cols.length, cw = 120, ch = 56, L = 96, T = 64, W = L + nc * cw + 16, H = T + nr * ch + 16;
    let s = `<svg class="dg" viewBox="0 0 ${W} ${H}" role="img" aria-label="payoff matrix">`;
    s += `<text x="${L + nc * cw / 2}" y="18" text-anchor="middle" class="h">${esc(o.colName)}</text>`;
    o.cols.forEach((c, j) => s += `<text x="${L + j * cw + cw / 2}" y="${T - 10}" text-anchor="middle">${esc(c)}</text>`);
    s += `<text x="8" y="${T + nr * ch / 2 - 6}" class="h">${esc(o.rowName)}</text>`;
    o.rows.forEach((r, i) => {
      s += `<text x="${L - 8}" y="${T + i * ch + ch / 2 + 4}" text-anchor="end">${esc(r)}</text>`;
      o.cols.forEach((c, j) => {
        const hl = (o.hl || []).some(h => h[0] === i && h[1] === j);
        const v = o.cells[i][j];
        s += `<rect class="cell${hl ? ' hl' : ''}" x="${L + j * cw}" y="${T + i * ch}" width="${cw}" height="${ch}"/>`;
        s += `<text x="${L + j * cw + cw / 2}" y="${T + i * ch + ch / 2 + 5}" text-anchor="middle" class="h" style="font-size:15px">${v == null ? '?' : esc(v[0]) + ' , ' + esc(v[1])}</text>`;
      });
    });
    return s + '</svg>' + (o.note ? `<div class="legend">${o.note}</div>` : '');
  }
  // graph({nodes:{A:[x,y]},edges:[[a,b,'s'|'w'|'+'|'-'|'e']],hl:[names],w,h,legend:true,labels:{A:'text'}})
  function graph(o) {
    const W = o.w || 460, H = o.h || 300;
    const P = n => [f(30 + (W - 60) * o.nodes[n][0] / 100), f(26 + (H - 52) * o.nodes[n][1] / 100)];
    let s = `<svg class="dg" viewBox="0 0 ${W} ${H}" role="img" aria-label="network graph">`;
    o.edges.forEach(e => {
      const a = P(e[0]), b = P(e[1]), cls = { s: 'es', w: 'ew', '+': 'ep', '-': 'en', e: 'es' }[e[2] || 'e'];
      s += `<line class="${cls}" x1="${a[0]}" y1="${a[1]}" x2="${b[0]}" y2="${b[1]}"/>`;
      if (e[3]) s += `<text x="${(a[0] + b[0]) / 2 + 6}" y="${(a[1] + b[1]) / 2 - 4}" class="small">${esc(e[3])}</text>`;
    });
    Object.keys(o.nodes).forEach(n => {
      const p = P(n), hl = (o.hl || []).includes(n);
      s += `<circle class="nd${hl ? ' hl' : ''}" cx="${p[0]}" cy="${p[1]}" r="16"/><text x="${p[0]}" y="${p[1] + 4}" text-anchor="middle" class="h">${esc(n)}</text>`;
    });
    s += '</svg>';
    if (o.legend) {
      const kind = o.kind || 'tie';
      s += kind === 'tie' ? '<div class="legend"><span>━ strong tie</span><span>┅ weak tie</span></div>'
        : kind === 'sign' ? '<div class="legend"><span style="color:var(--good)">━ friends (+)</span><span style="color:var(--bad)">┅ enemies (−)</span></div>' : '';
    }
    return s;
  }
  return { chart, matrix, graph };
})();
if (typeof module !== 'undefined') module.exports = DG;
