import React, { Component } from 'react';
import SaveToolbar from './SaveToolbar';
import SVG from '../../SVG';
import { READ_THE_DOCS } from '../../../config';

class CodeFileConfigToolbar extends Component {
  render() {
    return (
      <React.Fragment>
        <SaveToolbar />
        <li className="docs">
          <a href={`${READ_THE_DOCS}/model_types.html#code-files`} target="_blank" rel="noopener noreferrer">
            <SVG name="book" />
            <div> Code File Docs </div>
          </a>
        </li>
      </React.Fragment>
    )
  }
}

export default CodeFileConfigToolbar;
