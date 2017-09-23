/**
 * Created by WittBulter on 2016/10/13.
 * @description :: 文章标签模型
 */

module.exports = {
  attributes: {
    name: {
      type: 'string',
      required: true,
      unique: true,
    },
    value: {
      type: 'integer',
      required: true,
      defaultsTo: 1,
    },
  },
}
