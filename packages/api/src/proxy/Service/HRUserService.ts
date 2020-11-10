import ApiMethodFactory from "../../utils/ApiMethodFactory"

export const config = {
  EndPoint: "api/hirServlet",
  Service: "HRUserService",
  Module: "hir",
  Actions: {
    getAllUsers: "getAllUsers",
    getUserByUserLogin: "getUserByUserLogin",
    getUsersByRole: "getUsersByRole",
    getLoggedInUser: "getLoggedInUser"
  }
}

export default ApiMethodFactory(config)
