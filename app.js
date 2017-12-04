console.log("starting password manager");

var storage=require("node-persist");
storage.initSync();

storage.setItemSync(`accounts',[{
    username:"Asreet",
    balance: 100
}])

var data=storage.getItemSync("accounts");