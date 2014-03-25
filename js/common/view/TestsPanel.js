// Copyright 2002-2013, University of Colorado Boulder

/**
 * 'Tests' control panel
 *
 * @author Andrey Zelenkov (Mlearner)
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // imports
  var AquaRadioButton = require( 'SUN/AquaRadioButton' );
  var Image = require( 'SCENERY/nodes/Image' );
  var inherit = require( 'PHET_CORE/inherit' );
  var TestMode = require( 'ACID_BASE_SOLUTIONS/common/enum/TestMode' );
  var VBox = require( 'SCENERY/nodes/VBox' );

  // images
  var lightBulbImage = require( 'image!ACID_BASE_SOLUTIONS/light-bulb.png' );
  var pHMeterImage = require( 'image!ACID_BASE_SOLUTIONS/pH-meter.png' );
  var pHPaperImage = require( 'image!ACID_BASE_SOLUTIONS/pH-paper.png' );

  // constants
  var ICON_OPTIONS = { scale: 0.75 };
  var RADIO_BUTTON_OPTIONS = { radius: 7 };

  /**
   * @param {Property<TestMode>} testModeProperty
   * @param {*} options
   * @constructor
   */
  function TestsPanel( testModeProperty, options ) {

    options = _.extend( {
      spacing: 4,
      align: 'left'
    }, options );

    options.children = [
      new AquaRadioButton( testModeProperty, TestMode.PH_METER, new Image( pHMeterImage, ICON_OPTIONS ), RADIO_BUTTON_OPTIONS ),
      new AquaRadioButton( testModeProperty, TestMode.PH_PAPER, new Image( pHPaperImage, ICON_OPTIONS ), RADIO_BUTTON_OPTIONS ),
      new AquaRadioButton( testModeProperty, TestMode.CONDUCTIVITY, new Image( lightBulbImage, ICON_OPTIONS ), RADIO_BUTTON_OPTIONS )
    ];

    VBox.call( this, options );
  }

  return inherit( VBox, TestsPanel );
} );