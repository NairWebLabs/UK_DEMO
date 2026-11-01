import React, { useMemo } from 'react';

/**
 * Deterministic 21x21 QR-like matrix generator from a string seed
 * Creates standard QR pattern with real corner finder patterns and dynamic timing marks
 */
export function generateQRMatrix(data: string): boolean[][] {
  const size = 25;
  const matrix: boolean[][] = Array(size).fill(false).map(() => Array(size).fill(false));

  // Helper to draw 7x7 corner finder patterns
  const drawFinder = (startX: number, startY: number) => {
    for (let r = 0; r < 7; r++) {
      for (let c = 0; c < 7; c++) {
        if (
          r === 0 || r === 6 || c === 0 || c === 6 || // Outer square
          (r >= 2 && r <= 4 && c >= 2 && c <= 4)      // Inner 3x3 square
        ) {
          matrix[startY + r][startX + c] = true;
        } else {
          matrix[startY + r][startX + c] = false;
        }
      }
    }
  };

  // 3 standard QR position finders
  drawFinder(0, 0);                 // Top-Left
  drawFinder(size - 7, 0);          // Top-Right
  drawFinder(0, size - 7);          // Bottom-Left

  // Timing lines
  for (let i = 8; i < size - 8; i++) {
    matrix[6][i] = i % 2 === 0;
    matrix[i][6] = i % 2 === 0;
  }

  // Generate pseudo-random hash bits from the string for the data area
  let hash = 0;
  for (let i = 0; i < data.length; i++) {
    hash = (hash << 5) - hash + data.charCodeAt(i);
    hash |= 0;
  }

  let bitIndex = 0;
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      // Skip finder zones
      const inTopLeft = r < 8 && c < 8;
      const inTopRight = r < 8 && c >= size - 8;
      const inBottomLeft = r >= size - 8 && c < 8;
      const inTiming = (r === 6 && c >= 8 && c < size - 8) || (c === 6 && r >= 8 && r < size - 8);

      if (!inTopLeft && !inTopRight && !inBottomLeft && !inTiming) {
        // Derive bit from hash and coordinates
        const pseudoBit = ((hash ^ (r * 31 + c * 17 + bitIndex)) & 1) === 1;
        matrix[r][c] = pseudoBit;
        bitIndex++;
      }
    }
  }

  return matrix;
}

interface DynamicQRCodeProps {
  value: string;
  size?: number;
  fgColor?: string;
  bgColor?: string;
  className?: string;
}

export const DynamicQRCode: React.FC<DynamicQRCodeProps> = ({
  value,
  size = 200,
  fgColor = '#000000',
  bgColor = '#ffffff',
  className = ''
}) => {
  const matrix = useMemo(() => generateQRMatrix(value), [value]);
  const matrixSize = matrix.length;
  const cellSize = size / matrixSize;

  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="rounded-xl shadow-inner"
        style={{ backgroundColor: bgColor }}
      >
        {matrix.map((row, r) =>
          row.map((cell, c) => {
            if (!cell) return null;
            return (
              <rect
                key={`${r}-${c}`}
                x={c * cellSize}
                y={r * cellSize}
                width={cellSize + 0.3}
                height={cellSize + 0.3}
                fill={fgColor}
                rx={cellSize > 8 ? 1.5 : 0.5}
              />
            );
          })
        )}
      </svg>
    </div>
  );
};
