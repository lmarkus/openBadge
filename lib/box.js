/**
 * Created by lmarkus on 12/10/15.
 */

/**
 * Helper function factory to determine the scaling factor of a font.
 * @param unitsPerEM This number comes from the font file itself. It specifies the conversion of the font-face units into EM. (ie: the resolution of the font)
 * @param pixelsPerEM This number is contextual, and is basically the font size.
 * @returns {unitToPixels} a pre-baked helper function that converts font units to pixels at a given font size.
 */
function calculator(unitsPerEM, pixelsPerEM) {
    var scaleFactor = pixelsPerEM / unitsPerEM;
    return function unitToPixels(sizeInUnits) {
        return sizeInUnits * scaleFactor;
    }
}

/**
 * Given a font face, and all the desired parameters for this badge fragment, determine how tall and wide it should be,
 * as well as the paths for drawing the text.
 * @param message The text to render on this badge fragment
 * @param options Padding, Offset, Font and attributes.
 * @returns {{width: *, height: *, textPath: (XML|string|void)}} The bounding box for this fragment, with the rendered text centered vertically and horizontally
 */
module.exports = function getBoundingBox(message, options) {
    var font = options.font.loadedFont,
        offsetX = options.offsetX,    // It's all horizontal, so no need for offsetY
        paddingX = options.paddingX,
        paddingY = options.paddingY,
        fontSize = options.font.fontSize,
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