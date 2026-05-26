import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Jean Cristian Mangaser cyber-noir portfolio preview';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#05070b',
          color: '#f0eee7',
          padding: 72,
          fontFamily: 'Arial, sans-serif',
          position: 'relative',
          overflow: 'hidden',
        }}>
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(135deg, rgba(0,240,255,0.24), transparent 38%), linear-gradient(315deg, rgba(245,166,35,0.2), transparent 42%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            right: -48,
            top: 72,
            color: 'rgba(0,240,255,0.15)',
            fontSize: 148,
            fontWeight: 900,
            letterSpacing: -8,
          }}>
          WORK
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18, position: 'relative' }}>
          <div
            style={{
              color: '#00f0ff',
              fontSize: 26,
              letterSpacing: 4,
              textTransform: 'uppercase',
            }}>
            SAP Security / ABAP / Cybersecurity
          </div>
          <div
            style={{
              maxWidth: 880,
              fontSize: 78,
              lineHeight: 0.98,
              fontWeight: 900,
              letterSpacing: -4,
            }}>
            Jean Cristian Mangaser
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', position: 'relative' }}>
          <div
            style={{
              maxWidth: 760,
              color: 'rgba(240,238,231,0.82)',
              fontSize: 32,
              lineHeight: 1.28,
            }}>
            Building dependable products with security thinking, enterprise discipline, and clear user flows.
          </div>
          <div
            style={{
              border: '2px solid rgba(245,166,35,0.68)',
              color: '#f5a623',
              padding: '18px 24px',
              fontSize: 24,
              letterSpacing: 3,
              textTransform: 'uppercase',
            }}>
            Portfolio
          </div>
        </div>
      </div>
    ),
    size,
  );
}
