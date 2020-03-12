//
//
//------------------------- Private Methods -------------------------//
function getAllObjectKeys(value) {
  let keys = [];

  if (typeof value === 'object' && value !== null) {
    // For...in includes inherited properties where-as Object.keys()
    // includes only the current level.
    for (let key in value) {
      keys.push(key);
    }
  }

  return keys;
}

//
//
//------------------------- Public API -------------------------//
module.exports = {
  isNullUndefinedOrEmpty: function isNullUndefinedOrEmpty(value) {
    return (
      typeof value === 'undefined' ||
      (typeof value === 'object' && (value === null || getAllObjectKeys(value).length === 0)) ||
      (Array.isArray(value) && value.length === 0) ||
      (typeof value === 'string' && value.trim() === '')
    );
  },
  isNotEmptyObject: function isNotEmptyObject(value) {
    return typeof value === 'object' && value !== null && getAllObjectKeys(value).length > 0;
  },
  isNotEmptyString: function isNotEmptyString(value) {
    return typeof value === 'string' && value.trim() !== '';
  },
};
