const mongoose = require('mongoose');
const groupSchema = mongoose.Schema({

nom:{

	type:String,
	unique:true,
	upsart:true
}
});

module.exports = mongoose.model("Group", groupSchema);
