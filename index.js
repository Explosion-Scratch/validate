function validate(object, {autoconvert, transformFunction, defaultValue, onSet, onGet} = {}, startingObject = {}){
	let typeOf = (e = req("any", "any"), lowerCase = true) =>
	lowerCase
		? Object.prototype.toString
				.call(e)
				.split(" ")[1]
				.replace(/]$/, "")
				.toLowerCase()
		: Object.prototype.toString
				.call(e)
				.split(" ")[1]
				.replace(/]$/, "");

	let key = {...object};
	return new Proxy(startingObject, {
		set: function(obj, prop, value) {
			if (onSet){
				onSet(obj, prop, value)
			}
			if (autoconvert && !(value instanceof key[prop])){
				if (key[prop] === String){
					try {
						value = value.toString();
					} catch(e){
						throw new Error(`Could not convert to String.`);
						return obj[prop]
					}
				} else {
					try {
						value = key[prop].from(value)
					} catch(e){
						value = new key[prop](value)
					}
					if (key[prop] === Date && isNaN(value.getTime())){
						throw new Error(`Could not convert to Date.`)
						return obj[prop];
					}
					if (key[prop] === Object && typeof value === "string"){
						try {
							value = JSON.parse(value)
						} catch(e){
							throw new Error(`Can't convert string to JSON object.`);
							return obj[prop]
						}
					}
				}
			}
			if (transformFunction){
				value = transformFunction(value);
			}
			if (!(value instanceof key[prop])){
				throw new Error(`${prop} expects ${typeOf(new key[prop]())}. Received ${typeOf(value)}`)
				//keep old version
				return obj[prop];
			}
			console.log(`Set ${prop} to ${value}`);
			//is valid, set to new value
			obj[prop] = value;
			return value;
		},
		get: function(obj, prop) {
			if (onGet){
				onGet(obj, prop)
			}
			return prop in obj ?
				obj[prop] :
				defaultValue;
		}
	})
}
