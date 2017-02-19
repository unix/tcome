/**
 * Created by WittBulter on 2017/1/29.
 */

module.exports = {
	findOptionAll: _ =>{
		return Option.find()
	},

	createOption: option =>{
		return Option.create(option)
	},

	updateOptionForID: (id, option) =>{
		return Option.update({id: id}, option)
	}
}