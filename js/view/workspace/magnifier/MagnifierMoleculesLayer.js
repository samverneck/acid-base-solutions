// Copyright 2002-2013, University of Colorado Boulder

/**
 * Visual representation for single molecule type
 * within magnifier in the 'Acid-Base Solutions' sim.
 *
 * @author Andrey Zelenkov (Mlearner)
 */

define( function( require ) {
  "use strict";

  // imports
  var inherit = require( 'PHET_CORE/inherit' ),
    Node = require( 'SCENERY/nodes/Node' ),
    Util = require( 'DOT/Util' ),
    ViewModes = require( 'ACID_BASE_SOLUTIONS/model/Constants/ViewModes' );

  // molecules. The field names here must correspond to the 'key' fields in AqueousSolutionAbstract.molecules.
  var MoleculesConstructors = {
      A: require( 'ACID_BASE_SOLUTIONS/view/molecules/AMolecule' ),
      B: require( 'ACID_BASE_SOLUTIONS/view/molecules/BMolecule' ),
      BH: require( 'ACID_BASE_SOLUTIONS/view/molecules/BHMolecule' ),
      H2O: require( 'ACID_BASE_SOLUTIONS/view/molecules/H2OMolecule' ),
      H3O: require( 'ACID_BASE_SOLUTIONS/view/molecules/H3OMolecule' ),
      HA: require( 'ACID_BASE_SOLUTIONS/view/molecules/HAMolecule' ),
      M: require( 'ACID_BASE_SOLUTIONS/view/molecules/MMolecule' ),
      MOH: require( 'ACID_BASE_SOLUTIONS/view/molecules/MOHMolecule' ),
      OH: require( 'ACID_BASE_SOLUTIONS/view/molecules/OHMolecule' )
    };

  // constants
  var BASE_CONCENTRATION = 1E-7, // [H3O+] and [OH-] in pure water, value chosen so that pure water shows some molecules
    BASE_DOTS = 2,
    MAX_MOLECULES = 50; // TODO: should be 200, but sim will load approximately 30 second

  /**
   * @param {MagnifierModel} magnifierModel
   * @param {SolutionTypes} layerSolutionType solution type for this layer
   * @param {Property<Number>} property the property that determines the molecule's concentration
   * @param molecule the molecule description
   * @param radius the molecule's radius
   * @constructor
   */
  function MagnifierMoleculesLayer( magnifierModel, layerSolutionType, property, molecule, radius ) {
    var molecules = [],
      setMoleculesBinded;
    Node.call( this );
    this._pointer = 0; // last shown molecule's index

    // add molecules
    for ( var i = 0; i < MAX_MOLECULES; i++ ) {
      //TODO the order of args to the constructor is odd, options are first
      this.addChild( molecules[i] = new MoleculesConstructors[molecule.key]( {visible: false}, true ) );
    }

    // update number of molecules only when layer is visible
    setMoleculesBinded = setMolecules.bind( this, magnifierModel, layerSolutionType, property, molecules );
    property.lazyLink( setMoleculesBinded );
    magnifierModel.viewModeProperty.lazyLink( setMoleculesBinded );
    magnifierModel.solutionTypeProperty.link( setMoleculesBinded );

    // update position of molecules if solution type has been switched
    magnifierModel.solutionTypeProperty.link( function( solutionType ) {
      if ( layerSolutionType === solutionType ) {
        updatePosition( molecules, radius );
      }
    } );
  }

  // return number of molecules
  var getNumberOfMolecules = function( concentration ) {
    var raiseFactor = Util.log10( concentration / BASE_CONCENTRATION ),
      baseFactor = Math.pow( ( MAX_MOLECULES / BASE_DOTS ), ( 1 / Util.log10( 1 / BASE_CONCENTRATION ) ) );
    return Math.round( BASE_DOTS * Math.pow( baseFactor, raiseFactor ) );
  };

  // update position of molecules
  var updatePosition = function( molecules, radius ) {
    var r, fi;
    molecules.forEach( function( molecule ) {
      r = radius * Math.random();
      fi = 2 * Math.PI * Math.random();
      molecule.setTranslation( r * Math.sin( fi ), r * Math.cos( fi ) );
    } );
  };

  // show appropriate number of molecules
  var setMolecules = function( magnifierModel, layerSolutionType, property, molecules ) {
    var numberOfMolecules,
      visibility,
      i;

    // update visibility of layer
    this.setVisible( magnifierModel.solutionTypeProperty.value === layerSolutionType && magnifierModel.viewModeProperty.value === ViewModes.MOLECULES );

    // update number of molecules only when layer is visible
    if ( this.visible ) {
      numberOfMolecules = getNumberOfMolecules( property.get() );
      if ( numberOfMolecules !== this._pointer ) {
        for ( i = Math.min( this._pointer, numberOfMolecules ), visibility = (numberOfMolecules > this._pointer); i < Math.max( this._pointer, numberOfMolecules ); i++ ) {
          molecules[i].setVisible( visibility );
        }
        this._pointer = numberOfMolecules;
      }
    }
  };

  return inherit( Node, MagnifierMoleculesLayer );
} );
