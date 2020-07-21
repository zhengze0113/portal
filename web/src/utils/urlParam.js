export async function requestParams(service, params) {
  appendParamsToUrl(params);
  const result = await service(params);
  return result;
}

export function appendParamsToUrl(searchParams = {}) {
  searchParams = Object.entries(searchParams).map(([p, v]) => `${p}=${v}`).join('&');
  let hash = location.hash;
  const index = hash.indexOf('?');
  if (index !== -1) {
    hash = hash.slice(0, index);
  }
  location.hash = hash + `?${searchParams}`;
}

/**
 * @desc 将location.hash的值转换为对象
 * @export
 */
export function parseHash(originSearch) {
  let hash = location.hash;
  const index = hash.indexOf('?');
  if (index === -1) {
    return originSearch;
  }
  
  hash = hash.slice(index + 1);
  const obj = {};
  hash.split('&').forEach((item) => {
    var j = item.split('=');
    obj[j[0]] = decodeURI(j[1]);


  });
  //obj.params = 
  return obj;
}
