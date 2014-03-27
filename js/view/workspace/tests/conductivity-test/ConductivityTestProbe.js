// Copyright 2002-2014, University of Colorado Boulder

/**
 * Conductivity tester probe.
 * Origin is at bottom-center.
 *
 * @author Andrey Zelenkov (Mlearner)
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // imports
  var Dimension2 = require( 'DOT/Dimension2' );
  var Circle = require( 'SCENERY/nodes/Circle' );
  var inherit = require( 'PHET_CORE/inherit' );
  var MinusNode = require( 'SCENERY_PHET/MinusNode' );
  var Node = require( 'SCENERY/nodes/Node' );
  var PlusNode = require( 'SCENERY_PHET/PlusNode' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var SimpleDragHandler = require( 'SCENERY/input/SimpleDragHandler' );
  var Util = require( 'DOT/Util' );
  var Vector2 = require( 'DOT/Vector2' );

  // constants
  var SHOW_ORIGIN = true; // draws a red circle at the origin, for debugging
  var PROBE_SIZE = new Dimension2( 16, 55 );
  var POSITIVE_FILL = 'red';
  var NEGATIVE_FILL = 'black';

  function ConductivityTestProbe( locationProperty, dragYRange, options ) {

    options = _.extend( {
      isPositive: true
    }, options );

    var self = this;
    Node.call( this, options );

    var plateNode = new Rectangle( -PROBE_SIZE.width / 2, -PROBE_SIZE.height, PROBE_SIZE.width, PROBE_SIZE.height,
      { fill: ( options.isPositive ? POSITIVE_FILL : NEGATIVE_FILL ), stroke: 'black', lineWidth: 0.5 } );
    var signNode = options.isPositive ?
                   new PlusNode( { size: new Dimension2( 6, 2 ), fill: 'white'} ) :
                   new MinusNode( { size: new Dimension2( 6, 2 ), fill: 'white'} );
    signNode.centerX = plateNode.centerX;
    signNode.bottom = plateNode.bottom - 10;

    this.addChild( plateNode );
    this.addChild( signNode );
    if ( SHOW_ORIGIN ) {
      this.addChild( new Circle( 2, { fill: 'red' } ) );
    }

    this.cursor = 'pointer';
    this.addInputListener( new SimpleDragHandler( {

      clickYOffset: 0,

      start: function( e ) {
        this.clickYOffset = self.globalToParentPoint( e.pointer.point ).y - e.currentTarget.y;
      },

      drag: function( e ) {
        var y = self.globalToParentPoint( e.pointer.point ).y - this.clickYOffset;
        locationProperty.value = new Vector2( locationProperty.value.x, Util.clamp( y, dragYRange.min, dragYRange.max ) );
      }
    } ) );

    locationProperty.link( function( location ) {
      self.translation = location;
    } );
  }

  return inherit( Node, ConductivityTestProbe );
} );
