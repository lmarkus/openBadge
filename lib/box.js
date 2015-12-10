/**
 * Created by lmarkus on 12/10/15.
 */

function calculator(unitsPerEM, pixelsPerEM) {
    var scaleFactor = pixelsPerEM / unitsPerEM;
    return function unitToPixels(sizeInUnits) {
        return sizeInUnits * scaleFactor;
    }
}

module.exports = function (message, options) {
    var font = options.font.loadedFont,
        offsetX = options.offsetX || 0,    // It's all horizontal, so no need for offsetY
        paddingX = options.paddingX || 6,
        paddingY = options.paddingY || 6,
        fontSize = options.font.fontSize || 11,
        heightInUnits, widthInUnits,
        heightInPixels, widthInPixels,
        unitToPixels = calculator(font.unitsPerEm, fontSize);

    //Determine Height
    heightInUnits = font.charToGlyph('E');  // Ignoring the full ascender, and using capital E to determine the CAP-HEIGHT of this font.
    heightInUnits.getPath();                // Need this to warm up the calculator.
    heightInUnits = heightInUnits.yMax;     // Otherwise yMax would be null.
    heightInPixels = Math.round(unitToPixels(heightInUnits));

    //Determine Width
    widthInUnits = font
        .stringToGlyphs(message)
        .reduce(function (w, glyph) {
            return w + glyph.advanceWidth; //Todo: Kerning, if I really want to be anal about this.
        }, 0);
    widthInPixels = Math.round(unitToPixels(widthInUnits));

    //Draw centered and padded text.
    var textPath = font
        .getPath(message, paddingX + offsetX, heightInPixels + paddingY, fontSize)
        .toSVG(1)
        .replace(/\.0 /g, ' ');//Pack it tighter by removing unused decimal places

    /**
     * Return bouding box where the text should be drawn.
     */
    return {
        width: (paddingX * 2) + widthInPixels,
        height: (paddingY * 2 ) + heightInPixels,
        textPath: textPath
    }
}