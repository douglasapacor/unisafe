const getAccess = {
  url: "/access/list?page={:page}&limit={:limit}",
  method: "GET",
};

const saveAccess = {
  url: "/access/save",
  method: "POST",
};

const deletAccess = {
  url: "/access/{:id}/delete",
  method: "DELETE",
};

export default { getAccess, saveAccess, deletAccess };
