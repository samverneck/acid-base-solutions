// Copyright 2002-2014, University of Colorado Boulder

/**
 * pH meter model.
 * Location is at the tip of the probe.
 *
 * @author Andrey Zelenkov (Mlearner)
 */
define( function( require ) {
  'use strict';

  // imports
  var DerivedProperty = require( 'AXON/DerivedProperty' );
  var Property = require( 'AXON/Property' );
  var Range = require( 'DOT/Range' );
  var ToolMode = require( 'ACID_BASE_SOLUTIONS/common/enum/ToolMode' );
  var Vector2 = require( 'DOT/Vector2' );

  /**
   * @param {Beaker} beaker
   * @param {Property<Number>} pHProperty
   * @param {Property<ToolMode>} toolModeProperty
   * @constructor
   */
  function PHMeter( beaker, pHProperty, toolModeProperty ) {

    this.beaker = beaker;
    this.pHProperty = pHProperty;

    // drag range (y coordinate)
    this.dragYRange = new Range( beaker.top - 15, beaker.top + 70 );

    // location, at tip of probe
    this.locationProperty = new Property( new Vector2( beaker.right - 85, beaker.top - 5 ) );

    // visibility
    this.visibleProperty = new DerivedProperty( [ toolModeProperty ],
      function( toolMode ) {
        return ( toolMode === ToolMode.PH_METER );
      } );
  }

  PHMeter.prototype = {

    reset: function() {
      this.locationProperty.reset();
    },

    // Is the tip of the pH probe in solution?
    inSolution: function() {
      return this.beaker.containsPoint( this.locationProperty.value );
    }
  };

  return PHMeter;
} );