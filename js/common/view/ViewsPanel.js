// Copyright 2002-2013, University of Colorado Boulder

/**
 * 'Views' control panel
 *
 * @author Andrey Zelenkov (Mlearner)
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // imports
  var ABSColors = require( 'ACID_BASE_SOLUTIONS/common/ABSColors' );
  var AquaRadioButton = require( 'SUN/AquaRadioButton' );
  var CheckBox = require( 'SUN/CheckBox' );
  var H2OMolecule = require( 'ACID_BASE_SOLUTIONS/view/molecules/H2OMolecule' );
  var HBox = require( 'SCENERY/nodes/HBox' );
  var HStrut = require( 'SUN/HStrut' );
  var Image = require( 'SCENERY/nodes/Image' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var Text = require( 'SCENERY/nodes/Text' );
  var VBox = require( 'SCENERY/nodes/VBox' );
  var ViewModes = require( 'ACID_BASE_SOLUTIONS/common/enum/ViewModes' );

  // strings
  var graphString = require( 'string!ACID_BASE_SOLUTIONS/graph' );
  var hideViewsString = require( 'string!ACID_BASE_SOLUTIONS/hideViews' );
  var moleculesString = require( 'string!ACID_BASE_SOLUTIONS/molecules' );
  var solventString = require( 'string!ACID_BASE_SOLUTIONS/solvent' );

  // images
  var beakerImage = require( 'image!ACID_BASE_SOLUTIONS/beaker.png' );
  var magnifyingGlassImage = require( 'image!ACID_BASE_SOLUTIONS/magnifying-glass.png' );

  // constants
  var TEXT_ICON_X_SPACING = 10;
  var RADIO_BUTTON_OPTIONS = { radius: 7 };
  var CHECK_BOX_OPTIONS = { boxWidth: 15 };
  var TEXT_OPTIONS = { font: new PhetFont( 12 ) };
  var ICON_OPTIONS = { scale: 0.75 };

  // Creates an icon of the graph, with 4 bars (similar to weak acid)
  var createGraphIcon = function() {
    return new Node( {children: [
      new Rectangle( 0, 0, 24.5, 18, {fill: 'white', stroke: 'black', lineWidth: 0.5} ),
      new Rectangle( 2, 6, 3, 12, {fill: ABSColors.B} ),
      new Rectangle( 7.5, 3, 3, 15, {fill: ABSColors.H2O} ),
      new Rectangle( 13, 9, 3, 9, {fill: ABSColors.A} ),
      new Rectangle( 18.5, 9, 3, 9, {fill: ABSColors.H3O} )
    ]} );
  };

  /**
   * @param {Property<ViewModes>} viewModeProperty
   * @param {Property<Boolean>} solventVisibleProperty
   * @param {*} options
   * @constructor
   */
  function ViewsPanel( viewModeProperty, solventVisibleProperty, options ) {

    options = _.extend( {
      spacing: 4,
      align: 'left'
    }, options );

    // Molecules
    var moleculesRadioButton = new AquaRadioButton( viewModeProperty, ViewModes.MOLECULES,
      new HBox( {
        spacing: TEXT_ICON_X_SPACING,
        children: [
          new Text( moleculesString, TEXT_OPTIONS ),
          new Image( magnifyingGlassImage, ICON_OPTIONS )
        ]
      } ), RADIO_BUTTON_OPTIONS );

    // Solvent
    var solventLabel = new HBox( {
      spacing: TEXT_ICON_X_SPACING,
      children: [
        new Text( solventString, TEXT_OPTIONS ),
        new H2OMolecule()
      ]
    } );
    solventLabel.setEnabled = function( enabled ) {
      solventLabel.opacity = ( enabled ? 1 : 0.5 ); // gray out when disabled
    };
    var solventCheckBox = new CheckBox( solventLabel, solventVisibleProperty, CHECK_BOX_OPTIONS );

    // Graph
    var graphRadioButton = new AquaRadioButton( viewModeProperty, ViewModes.GRAPH,
      new HBox( {
        spacing: TEXT_ICON_X_SPACING,
        children: [
          new Text( graphString, TEXT_OPTIONS ),
          createGraphIcon()
        ]
      } ), RADIO_BUTTON_OPTIONS );

    // Hide Views
    var hideViewsRadioButton = new AquaRadioButton( viewModeProperty, ViewModes.HIDE_VIEWS,
      new HBox( {
        spacing: TEXT_ICON_X_SPACING,
        children: [
          new Text( hideViewsString, TEXT_OPTIONS ),
          new Image( beakerImage, ICON_OPTIONS )
        ]
      } ), RADIO_BUTTON_OPTIONS );

    options.children = [
      moleculesRadioButton,
      new HBox( { children: [ new HStrut( 20 ), solventCheckBox ] } ),
      graphRadioButton,
      hideViewsRadioButton
    ];

    // disable the 'Solvent' check box unless 'Molecules' is selected
    viewModeProperty.link( function( viewMode ) {
      solventCheckBox.enabled = ( viewMode === ViewModes.MOLECULES );
    } );

    VBox.call( this, options );
  }

  return inherit( VBox, ViewsPanel );
} );