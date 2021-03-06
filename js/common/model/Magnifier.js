// Copyright 2014-2015, University of Colorado Boulder

/**
 * Model for the magnifier in 'Acid-Base Solutions' sim.
 *
 * @author Andrey Zelenkov (Mlearner)
 */
define( function( require ) {
  'use strict';

  // modules
  var acidBaseSolutions = require( 'ACID_BASE_SOLUTIONS/acidBaseSolutions' );

  /**
   * @param {Beaker} beaker
   * @param {AqueousSolution[]} solutions
   * @param {Property.<SolutionType>} solutionTypeProperty
   * @constructor
   */
  function Magnifier( beaker, solutions, solutionTypeProperty ) {

    // @public
    this.solutions = solutions;
    this.solutionTypeProperty = solutionTypeProperty;

    // @public magnifier radius
    this.radius = 0.465 * beaker.size.height;

    // @public magnifier location, origin at center of glass
    this.location = beaker.location.plusXY( 0, -beaker.size.height / 2 );
  }

  acidBaseSolutions.register( 'Magnifier', Magnifier );

  return Magnifier;
} );