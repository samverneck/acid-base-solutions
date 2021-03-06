// Copyright 2014-2015, University of Colorado Boulder

/**
 * Model for the concentration graph in 'Acid-Base Solutions' sim.
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
  function ConcentrationGraph( beaker, solutions, solutionTypeProperty ) {

    // @public
    this.solutions = solutions;
    this.solutionTypeProperty = solutionTypeProperty;

    // @public dimensions of the graph's background
    this.width = 0.5 * beaker.size.width;
    this.height = 0.9 * beaker.size.height;

    // @public location, origin at upper-left corner
    this.location = beaker.location.plusXY( (this.width - beaker.size.width) / 2, -(beaker.size.height + this.height) / 2 );
  }

  acidBaseSolutions.register( 'ConcentrationGraph', ConcentrationGraph );

  return ConcentrationGraph;
} );