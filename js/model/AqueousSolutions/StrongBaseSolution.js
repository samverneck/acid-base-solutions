// Copyright 2002-2013, University of Colorado Boulder

/**
 *  An aqueous solution whose solute is a strong base.
 *
 * @author Andrey Zelenkov (Mlearner)
 */

define( function( require ) {
  'use strict';

  // imports
  var inherit = require( 'PHET_CORE/inherit' ),
    SolutionTypes = require( 'ACID_BASE_SOLUTIONS/model/Constants/SolutionTypes' ),
    AqueousSolutionAbstract = require( 'ACID_BASE_SOLUTIONS/model/AqueousSolutions/AqueousSolutionAbstract' ),
    Constants = require( 'ACID_BASE_SOLUTIONS/model/Constants/Constants' );

  // [M+] = c
  var getProductConcentration = function( concentration ) {
    return concentration;
  };

  // [OH-] = c
  var getOHConcentration = function( concentration ) {
    return concentration;
  };

  // [H3O+] = Kw / [OH-]
  var getH3OConcentration = function( OHConcentration ) {
    return Constants.WATER_EQUILIBRIUM_CONSTANT / OHConcentration;
  };

  var isValidStrength = function( strength ) {
    return strength > Constants.CONCENTRATION_RANGE.max;
  };

  // constants
  var STRENGTH_DEFAULT = Constants.STRONG_STRENGTH,
    CONCENTRATION_DEFAULT = Constants.CONCENTRATION_RANGE.defaultValue,
    OH_CONCENTRATION_DEFAULT = getOHConcentration( CONCENTRATION_DEFAULT ),
    H3O_CONCENTRATION_DEFAULT = getH3OConcentration( OH_CONCENTRATION_DEFAULT ),
    IS_VALID_STRENGTH_DEFAULT = isValidStrength( STRENGTH_DEFAULT ),
    PRODUCT_CONCENTRATION_DEFAULT = getProductConcentration( CONCENTRATION_DEFAULT );

  function StrongBaseSolution() {
    var self = this;

    // set default strength and add common properties
    AqueousSolutionAbstract.call( this, SolutionTypes.STRONG_BASE,
      [
        // molecules found in this solution
        {key: 'MOH', concentrationPropertyName: 'soluteConcentration'},
        {key: 'M', concentrationPropertyName: 'productConcentration'},
        {key: 'OH', concentrationPropertyName: 'OHConcentration'}
      ],
      {
        // initial values for solution properties
        strength: STRENGTH_DEFAULT,
        concentration: CONCENTRATION_DEFAULT,
        productConcentration: PRODUCT_CONCENTRATION_DEFAULT,
        OHConcentration: OH_CONCENTRATION_DEFAULT,
        H3OConcentration: H3O_CONCENTRATION_DEFAULT,
        isValidStrength: IS_VALID_STRENGTH_DEFAULT
      } );

    // set links between concentrations
    this.property( 'concentration' ).link( function( value ) {
      self.productConcentration = getProductConcentration( value );
      self.OHConcentration = getOHConcentration( value );
    } );

    this.property( 'OHConcentration' ).link( function( value ) {
      self.H3OConcentration = getH3OConcentration( value );
    } );

    this.property( 'strength' ).link( function( strength ) {
      self.isValidStrength = isValidStrength( strength );
    } );
  }

  return inherit( AqueousSolutionAbstract, StrongBaseSolution );
} );
