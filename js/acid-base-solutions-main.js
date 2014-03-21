// Copyright 2002-2013, University of Colorado Boulder

/**
 * Main entry point for the 'Acid-Base Solutions' sim.
 *
 * @author Andrew Zelenkov (Mlearner)
 */

define( function( require ) {
  'use strict';

  // imports
  var SimLauncher = require( 'JOIST/SimLauncher' ),
    Sim = require( 'JOIST/Sim' ),
    Screen = require( 'JOIST/Screen' ),
    Image = require( 'SCENERY/nodes/Image' ),
    AcidBaseSolutionsCustomSolutionModel = require( 'ACID_BASE_SOLUTIONS/model/AcidBaseSolutionsCustomSolutionModel' ),
    AcidBaseSolutionsIntroductionModel = require( 'ACID_BASE_SOLUTIONS/model/AcidBaseSolutionsIntroductionModel' ),
    AcidBaseSolutionsView = require( 'ACID_BASE_SOLUTIONS/view/AcidBaseSolutionsView' );

  // images
  var introductionIcon = require( 'image!ACID_BASE_SOLUTIONS/../images/introduction-icon.png' ),
    customSolutionIcon = require( 'image!ACID_BASE_SOLUTIONS/../images/custom-solution-icon.png' );

  // strings
  var introductionTitleString = require( 'string!ACID_BASE_SOLUTIONS/introductionTitle' ),
    customSolutionTitleString = require( 'string!ACID_BASE_SOLUTIONS/customSolutionTitle' ),
    simTitleString = require( 'string!ACID_BASE_SOLUTIONS/acid-base-solutions.name' );

  var simOptions = {
    credits: {
      leadDesign: 'Kelly Lancaster',
      softwareDevelopment: 'Chris Malley',
      designTeam: 'Patricia Loeblein, Robert Parson, Kathy Perkins',
      thanks: 'Thanks to Mobile Learner Labs for working with the PhET development team\nto convert this simulation to HTML5.'
    }
  };

  SimLauncher.launch( function() {
    // create and start the sim
    new Sim( simTitleString, [
      new Screen( introductionTitleString, new Image( introductionIcon ),
        function() { return new AcidBaseSolutionsIntroductionModel(); },
        function( model ) { return new AcidBaseSolutionsView( model ); },
        {backgroundColor: 'rgb(230,230,230)'}
      ),
      new Screen( customSolutionTitleString, new Image( customSolutionIcon ),
        function() { return new AcidBaseSolutionsCustomSolutionModel(); },
        function( model ) { return new AcidBaseSolutionsView( model ); },
        {backgroundColor: 'rgb(230,230,230)'}
      )
    ], simOptions ).start();
  } );
} );