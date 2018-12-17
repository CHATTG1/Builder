import React, { Component } from 'react';
import apiMutation from '../../../utils/api/mutation';
import './CodeFileConfig.scss';
import StyledSwitch from '../../forms/StyledSwitch';
import StyledSelect from '../../forms/StyledSelect';
import SVG from '../../SVG';

const modeOptions = [
  { label: 'Solidity', value: 'solidity' },
  { label: 'JavaScript', value: 'javascript' },
  { label: 'Vyper', value: 'python' },
  { label: 'JSON', value: 'json' },
]

const variables = [
  ['id', 'String'],
  ['name', 'String'],
  ['mode', 'String'],
  ['executablePath', 'String'],
  ['readOnly', 'Boolean'],
  ['hasProgress', 'Boolean'],
  ['executable', 'Boolean'],
  ['testFixture', 'Boolean'],
  ['visible', 'Boolean'],
]

const args = variables.map(([prop, type]) => `$${prop}: ${type}`).join(', ');
const mapping = variables.map(([prop, type]) => `${prop}: $${prop}`).join(', ');
const returns = variables.map(([prop]) => `${prop}`).join('\n    ');

const mutation = `
mutation modifyCodeFile(${args}) {
  modifyCodeFile(${mapping}) {
    ${returns}
  }
}
`

const deleteMutation = `
mutation deleteCodeFile($id: String) {
  deleteCodeFile(id: $id) {
    id
  }
}
`

class CodeFileConfig extends Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    const { id } = nextProps.codeFile;
    if(id !== prevState.id) {
       return { ...nextProps.codeFile }
    }
    return prevState;
  }
  constructor(props) {
    super(props);
    this.state = { ...props.codeFile }
  }
  handleChange(prop, value) {
    this.setState({ [prop]: value });
    const { id } = this.props.codeFile;
    apiMutation(mutation, { [prop]: value, id });
  }
  destroy = () => {
    const { id } = this.props.codeFile;
    apiMutation(deleteMutation, { id });
  }
  render() {
    const { name, mode, executablePath, readOnly, hasProgress, executable, testFixture, visible } = this.state;
    return (
      <form className="config" ref="container">
        <label>
          <span>Name</span>
          <input value={name} onChange={({ target: { value }}) => this.handleChange('name', value)}/>
        </label>
        <label>
          <span>Execution Path</span>
          <input value={executablePath} onChange={({ target: { value }}) => this.handleChange('executablePath', value)}/>
        </label>
          
        <StyledSelect
          label="Monaco Mode"
          onChange={(val) => this.handleChange("mode", val)}
          value={mode}
          options={modeOptions} />

        <StyledSwitch
          onChange={(x) => this.handleChange('visible', x)}
          label="Visible to Users?"
          checked={visible} />

        <StyledSwitch
          onChange={(x) => this.handleChange('executable', x)}
          label="Executable?"
          checked={executable} />

        <StyledSwitch
          onChange={(x) => this.handleChange('hasProgress', x)}
          label="Mantain User Progress?"
          checked={hasProgress} />

        <StyledSwitch
          onChange={(x) => this.handleChange('readOnly', x)}
          label="Read Only?"
          checked={readOnly} />

        <StyledSwitch
          onChange={(x) => this.handleChange('testFixture', x)}
          label="Test File?"
          checked={testFixture} />

        <div class="btn btn-primary" onClick={this.destroy}>
          <SVG name="trash" />
          Destroy { name }
        </div>
      </form>
    )
  }
}

export default CodeFileConfig;
