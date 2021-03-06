const { ObjectID } = require('mongodb');
const stageProjectProps = require('./projectProps');
const path = require('path');

module.exports = ({
  ioHelpers: { configWriter, fileWriter, configResolver, rename },
  projectHelpers: { findStageFilePath },
  config: { LOOKUP_KEY, MODEL_DB },
}) => {
  const onChange = {
    projectSkeletons: (stage) => {
      stage.projectSkeletons.forEach((skeleton) => {
        if(!skeleton.id) {
          skeleton.id = ObjectID().toString();
        }
      })
    }
  }

  async function modifyStage(props) {
    const stage = await configResolver(MODEL_DB.STAGES, props.id);
    const merged = { ...stage, ...props };

    const newBasePath = await findStageFilePath(merged);
    const previousBasePath = await findStageFilePath(stage);

    if(newBasePath !== previousBasePath) {
      await rename(previousBasePath, newBasePath)
    }

    const keys = Object.keys(props);
    for(let i = 0; i < keys.length; i++) {
      const key = keys[i];
      if(stage[key] !== merged[key]) {
        if(onChange[key]) {
          onChange[key](merged);
        }
        if(stageProjectProps[key]) {
          const filePath = path.join(newBasePath, stageProjectProps[key]);
          await fileWriter(filePath, merged[key]);
          merged[key] = LOOKUP_KEY;
        }
      }
    }

    return configWriter(MODEL_DB.STAGES, merged);
  }

  return modifyStage;
}
