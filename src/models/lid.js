module.exports = (sequalize, { BOOLEAN, STRING, INTEGER }) =>
  sequalize.define(
    'lids', {
      id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      userId: {
        type: INTEGER,
        foreignKey: true
      },
      serviceId: {
        type: INTEGER,
        foreignKey: true
      },
      description: STRING,
      email: STRING,
      isVerified: BOOLEAN,
      name: STRING,
      phone: STRING,
      title: STRING
    }
  )
