// Copyright 2014-2015, University of Colorado Boulder

/**
 * The 'Introduction' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var ABSColors = require( 'ACID_BASE_SOLUTIONS/common/ABSColors' );
  var acidBaseSolutions = require( 'ACID_BASE_SOLUTIONS/acidBaseSolutions' );
  var Circle = require( 'SCENERY/nodes/Circle' );
  var inherit = require( 'PHET_CORE/inherit' );
  var IntroductionModel = require( 'ACID_BASE_SOLUTIONS/introduction/model/IntroductionModel' );
  var IntroductionScreenView = require( 'ACID_BASE_SOLUTIONS/introduction/view/IntroductionScreenView' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Path = require( 'SCENERY/nodes/Path' );
  var Property = require( 'AXON/Property' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var Screen = require( 'JOIST/Screen' );
  var Shape = require( 'KITE/Shape' );

  // strings
  var screenIntroductionString = require( 'string!ACID_BASE_SOLUTIONS/screen.introduction' );

  /**
   * @constructor
   */
  function IntroductionScreen( tandem ) {

    var options = {
      name: screenIntroductionString,
      backgroundColorProperty: new Property( ABSColors.SCREEN_BACKGROUND ),
      homeScreenIcon: createScreenIcon(),
      tandem: tandem
    };

    Screen.call( this,
      function() { return new IntroductionModel(); },
      function( model ) { return new IntroductionScreenView( model ); },
      options );
  }

  acidBaseSolutions.register( 'IntroductionScreen', IntroductionScreen );

  /**
   * Creates the icon for this screen.
   * @returns {Node}
   */
  var createScreenIcon = function() {

    var width = Screen.MINIMUM_HOME_SCREEN_ICON_SIZE.width;
    var height = Screen.MINIMUM_HOME_SCREEN_ICON_SIZE.height;

    var background = new Rectangle( 0, 0, width, height, { fill: 'white' } );

    var beakerWidth = 0.6 * width;
    var beakerHeight = 0.75 * height;
    var lipOffset = 0.05 * width;

    var beakerNode = new Path( new Shape()
        .moveTo( -lipOffset, -lipOffset )
        .lineTo( 0, 0 )
        .lineTo( 0, beakerHeight )
        .lineTo( beakerWidth, beakerHeight )
        .lineTo( beakerWidth, 0 )
        .lineTo( beakerWidth + lipOffset, -lipOffset ),
      { stroke: 'black', lineWidth: Math.max( 1, beakerHeight / 40 ), center: background.center } );

    var waterNode = new Rectangle( 0, 0, beakerWidth, beakerHeight,
      { fill: 'rgb(213,231,233)', translation: beakerNode.translation } );

    var lensRadius = 0.4 * beakerHeight;
    var lensNode = new Circle( lensRadius,
      { stroke: 'black', lineWidth: lensRadius / 6, center: waterNode.center } );

    var handleNode = new Rectangle( lensRadius + 2, -lensRadius / 7, lensRadius, lensRadius / 3, 8, 8,
      { fill: 'rgb(85,55,33)', stroke: 'black', lineWidth: 1, translation: lensNode.translation } );
    handleNode.rotate( Math.PI / 6 );

    return new Node( { children: [ background, waterNode, beakerNode, handleNode, lensNode ] } );
  };

  return inherit( Screen, IntroductionScreen );
} );
