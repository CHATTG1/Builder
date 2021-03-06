import React, { Component } from 'react';
import { completeSave, registerChanges, unregisterChanges } from '../redux/actions';
import { connect } from 'react-redux';
import { Prompt } from 'react-router-dom';

function deepMerge(props, dest) {
  const merged = Array.isArray(props) ? [ ...dest ] : { ...dest };
  const keys = Object.keys(props);
  for(let i = 0; i < keys.length; i++) {
    const key = keys[i];
    if(props[key] && typeof props[key] === 'object') {
      merged[key] = deepMerge(props[key], dest[key]);
    }
    else {
      merged[key] = props[key];
    }
  }
  return merged;
}

function deeplyEqualObjects(a, b) {
  const aKeys = Object.keys(a);
  const bKeys = Object.keys(b);
  if(aKeys.length !== bKeys.length) return false;
  for(let i = 0; i < aKeys.length; i++) {
    const key = aKeys[i];
    if(a[key] && typeof a[key] === 'object') {
      if(!deeplyEqualObjects(a[key], b[key])) {
        return false;
      }
    }
    else if(a[key] !== b[key]) {
      return false;
    }
  }
  return true;
}

class UpdateWrapper extends Component {
  constructor(props) {
    super(props);
    const { child, savePromise, ...rest } = props;
    this.state = {
      savePromise,
      originalState: { ...rest },
      currentState: { ...rest },
    }
  }

  onSave(savePromise) {
    this.setState({ savePromise });
  }

  componentWillUnmount() {
    const { saveState: { autosave, changes }} = this.props;
    if(autosave && changes) {
      this.saveState();
    }
    else {
      this.props.unregisterChanges();
    }
  }

  async saveState() {
    try {
      this.setState({ originalState: this.state.currentState });
      this.props.unregisterChanges();
      await this.state.savePromise(this.state.currentState);
    }
    catch(ex) {
      // do nothing: mutations automatically display errors
      // allow the user to attempt to fix their current state and retry
    }
    const changes = !deeplyEqualObjects(this.state.originalState, this.state.currentState);
    this.props.completeSave(changes);
  }

  async componentDidUpdate(prevProps) {
    const { saveState: { saving }} = this.props;
    if(saving && !prevProps.saveState.saving) {
      this.saveState();
    }
  }

  update(state) {
    const newState = deepMerge(state, this.state.currentState);

    this.setState({ currentState: newState })

    if(!deeplyEqualObjects(this.state.originalState, newState)) {
      this.props.registerChanges();
    }
    else {
      this.props.unregisterChanges();
    }
  }

  render() {
    const { child, saveState: { changes, autosave } } = this.props;
    const { currentState } = this.state;
    const ChildComponent = child;
    return (
        <React.Fragment>
          <ChildComponent {...currentState}
                    onSave={(...args) => this.onSave(...args)}
                    update={(...args) => this.update(...args)} />
          <Prompt
            when={changes && !autosave}
            message="Unsaved Changes. Discard them?" />
        </React.Fragment>
    )
  }
}

const mapStateToProps = ({ saveState }) => ({ saveState });
const mapDispatchToProps = { completeSave, registerChanges, unregisterChanges }

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UpdateWrapper);
