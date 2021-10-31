import React, { Component } from "react";
import { connect } from "react-redux";
import MidiControls from "./MidiControls";
import MidiPads from "./MidiPads";
import PadButtonEditBox from "./PadButtonEditBox";
import { CSSTransition } from "react-transition-group";
import { Piano, KeyboardShortcuts, MidiNumbers } from 'react-piano';
import 'react-piano/dist/styles.css';

import DimensionsProvider from './DimensionsProvider';
import SoundfontProvider from './SoundfontProvider';


// webkitAudioContext fallback needed to support Safari
const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const soundfontHostname = 'https://d1pzp51pvbm36p.cloudfront.net';

const noteRange = {
  first: MidiNumbers.fromNote('c3'),
  last: MidiNumbers.fromNote('f6'),
};
const keyboardShortcuts = KeyboardShortcuts.create({
  firstNote: noteRange.first,
  lastNote: noteRange.last,
  keyboardConfig: KeyboardShortcuts.HOME_ROW,
});

class App extends Component {
  render() {
    // const firstNote = MidiNumbers.fromNote('c3');
    // const lastNote = MidiNumbers.fromNote('f5');
    // const keyboardShortcuts = KeyboardShortcuts.create({
    //   firstNote: firstNote,
    //   lastNote: lastNote,
    //   keyboardConfig: KeyboardShortcuts.HOME_ROW,
    // });
    const { padButtonEdit } = this.props;

    const isEditMode = padButtonEdit !== null;

    return (
      <div id="app" 
      
      onTouchStart={() => { console.log("fffff"); window.onHold = true; }}
        onTouchMove={(e) => { 
          var target = document.elementFromPoint(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
          
          if(target === window.lastTarget) return;
          target.click();
          
          window.lastTarget = target;
        }}
      onMouseUp={() => { window.onHold = false; }}>

<div 
      style={{ 
        position:"fixed",
        top:0,
        width:"100%",
        zIndex:999
       }}>   
<DimensionsProvider>
  {({ containerWidth, containerHeight }) => (
    <SoundfontProvider
      instrumentName="acoustic_grand_piano"
      audioContext={audioContext}
      hostname={soundfontHostname}
      render={({ isLoading, playNote, stopNote }) => (
        <Piano
          noteRange={noteRange}
          width={containerWidth}
          playNote={playNote}
          stopNote={stopNote}
          disabled={isLoading}
        />
      )}
    />
  )}
</DimensionsProvider> 
    </div>
        <div id="midi-pad">
          <MidiControls />
   
          
          <MidiPads />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  padButtonEdit: state.padButtonEdit
});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
