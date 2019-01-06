module.exports = (sequalize, { BOOLEAN, STRING, INTEGER }) =>
  sequalize.define(
    'users', {
      id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      age: STRING,
      countryCode: STRING,
      coridor: STRING,
      coridorBefore: STRING,
      date_before_coridor: STRING,
      days_before: STRING,
      days_before_coridor: STRING,
      expire_date: STRING,
      displayName: STRING,
      email: STRING,
      federatedId: STRING,
      name: STRING,
      percent: STRING,
      phone: STRING,
      phoneNumber: STRING,
      avatarUrl: STRING,
      start_date: STRING,
      visaTime: STRING,
      visa_info: BOOLEAN,
      wechatId: STRING,
      openid: STRING,
      unionid: STRING,
      nickName: STRING,
      gender: STRING,
      language: STRING,
      city: STRING,
      province: STRING,
      country: STRING,
    },
    {
      charset: 'utf8',
      collate: 'utf8_unicode_ci'
    }
  )


