import React, { Component } from 'react';
import StyledSelect from '../../forms/StyledSelect';
import {STAGE_LANGUAGE_OPTIONS} from '../../../config';

const LANGUAGE_HINT = 'The execution environment language';
const LANGUAGE_VERSION_HINT = 'The programming language build';
const TEST_FRAMEWORK_HINT = 'The framework used for test assertions';

const languageVersionOptions = [
  { label: 'Solidity v0.4.19', value: '0.4.19' },
  { label: 'Vyper v0.1', value: '0.1.0b3' },
  { label: 'Node 8.x', value: '8.x/babel' },
  { label: 'Node 6.x', value: '6.x/babel' },
]

const frameworkOptions = [
  { label: 'Mocha', value: 'mocha_bdd' },
  { label: 'Truffle With Mocha', value: 'truffle_with_mocha' },
]

class CodeStageConfig extends Component {
  render() {
    const { onChange,
      stage: { type, language, languageVersion, testFramework }
    } = this.props;
    if(type !== 'CodeStage') return null;
    return (
      <React.Fragment>
        <StyledSelect
          label="Language"
          hint={LANGUAGE_HINT}
          onChange={(language) => onChange({ language })}
          value={language}
          options={STAGE_LANGUAGE_OPTIONS} />

        <StyledSelect
          label="Language Version"
          hint={LANGUAGE_VERSION_HINT}
          onChange={(languageVersion) => onChange({ languageVersion })}
          value={languageVersion}
          options={languageVersionOptions} />

        <StyledSelect
          label="Test Framework"
          hint={TEST_FRAMEWORK_HINT}
          onChange={(testFramework) => onChange({ testFramework })}
          value={testFramework}
          options={frameworkOptions} />
      </React.Fragment>
    )
  }
}

export default CodeStageConfig;
