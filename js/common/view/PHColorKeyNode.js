// Copyright 2014-2015, University of Colorado Boulder

/**
 * pH color key, a set of color 'chips' for pH values.
 *
 * @author Andrey Zelenkov (Mlearner)
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var ABSColors = require( 'ACID_BASE_SOLUTIONS/common/ABSColors' );
  var acidBaseSolutions = require( 'ACID_BASE_SOLUTIONS/acidBaseSolutions' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var Text = require( 'SCENERY/nodes/Text' );

  // strings
  var pHColorKeyString = require( 'string!ACID_BASE_SOLUTIONS/pHColorKey' );

  // constants
  var FONT_BIG = new PhetFont( 12 );
  var FONT_SMALL = new PhetFont( 10 );
  var CHIP_HEIGHT = 28;
  var CHIP_X_SPACING = 1;

  /**
   * @param {Dimension2} paperSize
   * @param {Object} [options] any Node options
   * @constructor
   */
  function PHColorKeyNode( paperSize, options ) {

    Node.call( this );

    var numberOfChips = ABSColors.PH.length;

    // color chips, with a pH value above each one
    var parentNode = new Node();
    var chipNode;
    var previousChipNode;
    var pHNumberNode;
    for ( var i = 0; i < numberOfChips; i++ ) {

      chipNode = new Rectangle( 0, 0, paperSize.width, CHIP_HEIGHT, { fill: ABSColors.PH[ i ] } );
      pHNumberNode = new Text( i.toString(), { font: FONT_SMALL } );

      parentNode.addChild( chipNode );
      parentNode.addChild( pHNumberNode );

      if ( previousChipNode ) {
        chipNode.left = previousChipNode.right + CHIP_X_SPACING;
      }
      // pH number above color chip
      pHNumberNode.centerX = chipNode.centerX;
      pHNumberNode.bottom = chipNode.top - 2;

      previousChipNode = chipNode;
    }
    this.addChild( parentNode );

    // title, below color chips
    var titleNode = new Text( pHColorKeyString, {
      font: FONT_BIG,
      maxWidth: parentNode.width,
      left: parentNode.left,
      top: parentNode.bottom + 2
    } );
    this.addChild( titleNode );

    this.mutate( options );
  }

  acidBaseSolutions.register( 'PHColorKeyNode', PHColorKeyNode );

  return inherit( Node, PHColorKeyNode );
} );
