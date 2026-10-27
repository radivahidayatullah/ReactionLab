import React from 'react';

/**
 * Renders chemical formulas with proper subscripts and superscripts.
 * Examples:
 *   <ChemicalFormula formula="CaCO3 + 2HCl -> CaCl2 + H2O + CO2" />
 *   <ChemicalFormula formula="S2O3^2- + 2H^+ -> S + SO2 + H2O" />
 */
export default function ChemicalFormula({ formula, className = '' }) {
  if (!formula) return null;

  // Split by reaction arrow if present
  const parts = formula.split(/(\s*->\s*|\s*→\s*|\s*<==>\s*|\s*⇌\s*)/);

  const formatTokens = (text) => {
    // Regex matches numbers following letters for subscript, or ^ followed by charge/power for superscript
    const tokenRegex = /([A-Za-z)\]])(\d+)|(\^)(\d*[+-]|\d+)/g;
    const elements = [];
    let lastIndex = 0;
    let match;

    while ((match = tokenRegex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        elements.push(text.substring(lastIndex, match.index));
      }

      if (match[1] && match[2]) {
        // Subscript number after element e.g. O2, H2O
        elements.push(match[1]);
        elements.push(<sub key={`sub-${match.index}`}>{match[2]}</sub>);
      } else if (match[3] && match[4]) {
        // Superscript charge e.g. ^2-, ^+
        elements.push(<sup key={`sup-${match.index}`}>{match[4]}</sup>);
      }

      lastIndex = tokenRegex.lastIndex;
    }

    if (lastIndex < text.length) {
      elements.push(text.substring(lastIndex));
    }

    return elements;
  };

  return (
    <span className={`chemical-formula ${className}`}>
      {parts.map((part, idx) => {
        if (part.includes('->') || part.includes('→')) {
          return (
            <span key={idx} className="reaction-arrow" aria-label="menghasilkan">
              &rarr;
            </span>
          );
        }
        if (part.includes('<==>') || part.includes('⇌')) {
          return (
            <span key={idx} className="reaction-arrow" aria-label="bolak-balik">
              &#8652;
            </span>
          );
        }
        return <React.Fragment key={idx}>{formatTokens(part)}</React.Fragment>;
      })}
    </span>
  );
}
