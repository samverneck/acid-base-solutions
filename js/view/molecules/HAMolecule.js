// Copyright 2002-2013, University of Colorado Boulder

/**
 * View for HA molecule.
 *
 * @author Andrey Zelenkov (Mlearner)
 */

define( function( require ) {
  'use strict';

  // imports
  var inherit = require( 'PHET_CORE/inherit' ),
    Node = require( 'SCENERY/nodes/Node' ),
    Atom = require( 'ACID_BASE_SOLUTIONS/view/molecules/Atom' );

  // constants
  var COLOR_HA = require( 'ACID_BASE_SOLUTIONS/model/Constants/MoleculesColors' ).HA;

  var atomCache, getMolecule = function() {
    return new Node( {children: [
      new Atom( 7, COLOR_HA, {x: 0, y: 0} ),
      new Atom( 4, COLOR_HA, {x: -8, y: -1} )
    ]} );
  };

  function HAMolecule( options ) {
    options = _.extend( { fromCache: false }, options );
    Node.call( this, options );

    // cache values for next execution
    this.addChild( options.fromCache ? (atomCache ? atomCache : atomCache = getMolecule()) : getMolecule() );
  }

  return inherit( Node, HAMolecule );
} );