// Copyright 2002-2013, University of Colorado Boulder

/**
 * Visual representation of a beaker that is filled to the top with a solution.
 * Ticks on the left edge of the beaker. Origin is at the bottom center.
 *
 * @author Andrey Zelenkov (Mlearner)
 */
define( function( require ) {
  'use strict';

  // imports
  var inherit = require( 'PHET_CORE/inherit' ),
    Node = require( 'SCENERY/nodes/Node' ),
    Path = require( 'SCENERY/nodes/Path' ),
    PhetFont = require( 'SCENERY_PHET/PhetFont' ),
    Shape = require( 'KITE/Shape' ),
    StringUtils = require( 'PHETCOMMON/util/StringUtils' ),
    Text = require( 'SCENERY/nodes/Text' ),

  // strings
    pattern_0value_1units = require( 'string!ACID_BASE_SOLUTIONS/pattern.0value.1units' ),
    units_litersString = require( 'string!ACID_BASE_SOLUTIONS/liters' ),

  // constants
    RIM_OFFSET = 10,
    MINOR_TICK_SPACING = 0.1, // L
    MINOR_TICKS_PER_MAJOR_TICK = 5,
    MAJOR_TICK_LENGTH = 25,
    MINOR_TICK_LENGTH = 10,
    TICK_LABEL_X_SPACING = 20;

  function Beaker( model, location ) {
    Node.call( this, {pickable: false} );

    // outline of the beaker, starting from upper left
    var width = model.width / 1.95,
      height = model.height / 1.66,
      outlineShape = new Shape()
        .moveTo( -width / 2 - RIM_OFFSET, -height - RIM_OFFSET )
        .lineTo( -width / 2, -height )
        .lineTo( -width / 2, 0 )
        .lineTo( width / 2, 0 )
        .lineTo( width / 2, -height )
        .lineTo( (width / 2) + RIM_OFFSET, -height - RIM_OFFSET ),
      fillShape = new Shape().lineTo( -width / 2, -height )
        .lineTo( -width / 2, 0 )
        .lineTo( width / 2, 0 )
        .lineTo( width / 2, -height ),
    // horizontal tick marks, left edge, from bottom up
      ticksParent,
      numberOfTicks = Math.round( 1 / MINOR_TICK_SPACING ),
      deltaY = height / numberOfTicks;

    // add water
    this.addChild( new Path( fillShape, {
      fill: 'rgba(193,222,227,0.7)'
    } ) );

    // add beaker
    this.addChild( new Path( outlineShape, {
      stroke: 'black',
      lineWidth: 3,
      lineCap: 'round',
      lineJoin: 'round'
    } ) );

    this.addChild( ticksParent = new Node() );

    var isMajorTick,
      y, leftX, rightX, tickShape, tickPath;
    for ( var i = 1; i <= numberOfTicks; i++ ) {

      // tick
      isMajorTick = ( i % MINOR_TICKS_PER_MAJOR_TICK === 0 );
      y = -( i * deltaY );
      leftX = width / 2;
      rightX = leftX - ( isMajorTick ? MAJOR_TICK_LENGTH : MINOR_TICK_LENGTH );
      tickShape = new Shape().moveTo( leftX, y ).lineTo( rightX, y );
      tickPath = new Path( tickShape, {
        stroke: 'black',
        lineWidth: 1.5,
        lineCap: 'round',
        lineJoin: 'bevel'
      } );

      ticksParent.addChild( tickPath );
    }

    // major tick label
    var label = StringUtils.format( pattern_0value_1units, '1', units_litersString );
    ticksParent.addChild( new Text( label, {
      font: new PhetFont( 18 ),
      fill: 'black',
      x: width / 2 - MAJOR_TICK_LENGTH - TICK_LABEL_X_SPACING,
      centerY: -deltaY * numberOfTicks
    } ) );

    this.centerX = location.x || 0;
    this.centerY = location.y || 0;
  }

  return inherit( Node, Beaker );
} );
