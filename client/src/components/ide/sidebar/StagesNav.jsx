import React, { Component } from 'react';
import { NavLink, Route } from 'react-router-dom';
import CodeFilesNav from './CodeFilesNav';
import * as dialog from '../../../utils/dialog';
import AddStage from './AddStage';
import SVG from '../../SVG';
import './StagesNav.scss';

class StagesNav extends Component {
  render() {
    const { stageContainer: { id, stages }} = this.props;
    return (
      <ul className="stages-nav">
        { stages.map(stage => <StageNav key={stage.id} stage={stage} {...this.props} /> ) }
        <li>
          <a onClick={() => dialog.open(AddStage, { containerId: id })}>
            <SVG name="add" />
            <span>Add a Stage…</span>
          </a>
        </li>
      </ul>
    )
  }
}

class StageNav extends Component {
  render() {
    const { basename, stage: { id, title }} = this.props;
    const path = `${basename}/stage/${id}`;
    return (
      <li className="caret">
        <NavLink to={path}> {title} </NavLink>
        <Route path={path} children={({ match }) => (match && <CodeFilesNav {...this.props} basename={path} />)} />
      </li>
    )
  }
}

export default StagesNav;
