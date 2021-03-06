const {
  GraphQLObjectType,
  GraphQLBoolean,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
} = require('graphql');
const { MODEL_DB } = require('../../config');
const { configDocumentReader } = require('../../ioHelpers').dethunked;

const StageContainerGroupType = new GraphQLObjectType({
  name: 'StageContainerGroup',
  fields: () => ({
    id: { type: GraphQLString },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    containerType: { type: GraphQLString },
    productionReady: { type: GraphQLBoolean },
    thumbnailUrl: { type: GraphQLString },
    estimatedTime: { type: GraphQLInt },
    stageContainers: {
      type: new GraphQLList(require('./StageContainerType')),
      resolve: async ({ id }) => {
        const models = await configDocumentReader(MODEL_DB.STAGE_CONTAINERS);
        return models.filter(x => x.stageContainerGroupId === id);
      }
    },
  })
});

module.exports = StageContainerGroupType;
