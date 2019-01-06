module.exports = (sequalize, { BOOLEAN, STRING, INTEGER }) =>
  sequalize.define(
    'exchanges', {
      id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      userId: {
        type: INTEGER,
        foreignKey: true
      },
      getCurrency: STRING,
      gettedOption: STRING,
      isVerified: STRING,
      setCurrency: STRING,
      setedOption: STRING,
      sum: STRING,
      title: STRING,
      total: STRING
    },
    {
      charset: 'utf8',
      collate: 'utf8_unicode_ci'
    }
  )
