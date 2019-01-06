module.exports = (sequalize, { BOOLEAN, STRING, INTEGER }) =>
  sequalize.define(
    'services', {
      id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      parentId: {
        type: INTEGER,
        foreignKey: true
      },
      description: STRING,
      linkedId: BOOLEAN,
      poster: STRING,
      title: STRING
    },
    {
      charset: 'utf8',
      collate: 'utf8_unicode_ci'
    }
  )
