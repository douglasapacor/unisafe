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

const savePolicies = {
  url: "/policies/save",
  method: "POST",
};

export default { getAccess, saveAccess, deletAccess, savePolicies };
