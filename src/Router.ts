const getAccess = {
  url: "/access/list?page={:page}&limit={:limit}",
  method: "GET",
};

const saveAccess = {
  url: "/access/save",
  method: "POST",
};

export default { getAccess, saveAccess };
