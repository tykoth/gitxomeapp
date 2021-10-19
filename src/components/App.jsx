import React, { Component } from "react";
import { connect } from "react-redux";
import MidiControls from "./MidiControls";
import MidiPads from "./MidiPads";
import PadButtonEditBox from "./PadButtonEditBox";
import { CSSTransition } from "react-transition-group";

class App extends Component {
  render() {
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
        <div id="midi-pad">
          <MidiControls />
          <MidiPads />
        </div>

        <CSSTransition
          in={isEditMode}
          timeout={300}
          classNames="edit-sidebar"
          unmountOnExit
        >
          <PadButtonEditBox />
        </CSSTransition>
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
