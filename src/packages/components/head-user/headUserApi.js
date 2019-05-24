import {server} from "@/tools/servers"

export class headUserApi{
  static submmitPassword(data){
    return server.connection('POST','/user/updatePassword',data)
  }
}
