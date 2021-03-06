export default `
query findStageContainer($id: String) {
  stageContainer(id: $id) {
    id
    version
    type
    intro
    stageContainerGroup {
      id
      containerType
      description
      productionReady
      thumbnailUrl
      estimatedTime
      title
  	}
    stages {
      id
      title
      type
      details
      completionMessage
      codeFileIds
      task
      language
      position
      languageVersion
      testFramework
      abiValidations
      projectSkeletons {
        id
        ghNodeId
        ghRepoId
        title
        description
        thumbnailUrl
        zipName
      }
      solutions {
        id
        codeFileId
        stageId
        code
      }
      codeFiles {
        id
        name
        executable
        executablePath
        fileLocation
        hasProgress
        mode
        readOnly
        testFixture
        visible
        initialCode
        codeStageIds
      }
    }
	}
}
`
