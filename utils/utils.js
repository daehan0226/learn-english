export const randomProperty = (obj) => {
  const keys = Object.keys(obj);
  const randomIndex = (keys.length * Math.random()) << 0;
  return keys[randomIndex];
};

export const randomElement = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

export const replaceText = (srcText, target, replaceTo) => {
  return srcText.replace(new RegExp("\\b" + target + "\\b"), replaceTo);
};

export const randomArrayShuffle = (array) => {
  let currentIndex = array.length,
    temporaryValue,
    randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
};

export const createQueryParams = (params) => {
  return Object.keys(params)
    .map((k) => encodeURIComponent(k) + "=" + encodeURIComponent(params[k]))
    .join("&");
};

export const getRandomItems = ({ src, remove, itemCount }) => {
  const result = new Set();
  const removeIndex = src.indexOf(remove);
  if (removeIndex > -1) {
    src.splice(removeIndex, 1);
  }

  while (result.size < itemCount) {
    result.add(randomElement(src));
  }
  return result;
};

export const renameObjectKey = ({ src, oldKey, newKey }) => {
  if (oldKey !== newKey && src[oldKey]) {
    Object.defineProperty(
      src,
      newKey,
      Object.getOwnPropertyDescriptor(src, oldKey)
    );
    delete src[oldKey];
  }
  return { ...src };
};

export const removeFalseElements = (array) => {
  const flasyValues = [null, undefined, ""];
  return array.filter((item) => !flasyValues.includes(item));
};


export const capitalizeFirstLetter = (string) => {
  try {
    return string.charAt(0).toUpperCase() + string.slice(1);
  } catch {
    return string
  }
}