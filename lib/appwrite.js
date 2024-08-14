import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { Client, Account, ID, Avatars, Databases, Query } from 'react-native-appwrite';
import React, { useState } from 'react';
export const config = {

    endpoint: "https://cloud.appwrite.io/v1",
    platform: "com.rendev.poopoocup",
    projectID: "66b4d439000ee137f066",
    databaseID: "66b4d4b8000aa681ad4e",
    userCollectionID:"66b528e20032f592d6a2",
    poopsCollectionID:"66b529c80038249b4222",
    lobbysCollectionID:"66b52a18000f073bc74b",
    lobbyUpdateCollectionID:"66bb9c110010fe86f51a"
}


let client;
let account;
//Inizializza react-native SDK
client = new Client();
client
  .setEndpoint(config.endpoint)
  .setProject(config.projectID)
  .setPlatform(config.platform);

account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

  export const login = async (email, password) => {
    try {
       const session = await account.createEmailPasswordSession(email, password);
       return session;
    } catch (error) {
        console.log(error)
        return false;
    }
    
  }

 export const register = async (email, password, name) => {
    try {
     
    const NewAccount = await account.create(ID.unique(), email, password, name);
      
    if(!NewAccount) throw Error;
    const avatarUrl = avatars.getInitials(name);
    await login(email, password); 
    let userToADD = {accountId: NewAccount.$id, UserName:name,email:NewAccount.email, avatar:avatarUrl}
    console.log(config.userCollectionID);
    const NewUser =  databases.createDocument(
        config.databaseID,
        config.userCollectionID,
        ID.unique(),
        userToADD
    ) 
    return NewUser;
    } catch (error) {
        
    }
  }

export const logOut = async ()=>{
    try {
        console.log("logout interno")
        const session = await account.deleteSession('current')
        return session;
    } catch (error) {
        console.log(error)
    }
}

export const getCurrentUser = async () =>{
    try {
        const currentAccount = await account.get()

        if(!currentAccount) throw Error;
        const currentUser = databases.listDocuments(
            config.databaseID,
            config.userCollectionID,
            [Query.equal("accountId", currentAccount.$id)]
        )
        if(!currentUser) throw Error;
        return (await currentUser).documents[0];
    
    } catch (error) {
        console.log(error)
    }
}

export const getAllRooms = async () =>{
    try {
        console.log("ingetAllRooms")
        const post = await databases.listDocuments(
            config.databaseID,
            config.lobbysCollectionID
        )
        return post.documents;
    } catch (error) {
        console.log(error)
    }
}

export const getAllRoomsByUser = async (user) =>{
    try {
        console.log("ingetAllRooms")
        var result=[];
        for(const lobby of user.lobbysArray){
        const post = await databases.listDocuments(
            config.databaseID,
            config.lobbysCollectionID,
            [Query.equal("$id",lobby)]
        )
        result.push(post.documents[0])
    }
        return result;
    } catch (error) {
        console.log(error)
    }
}

export const getRoomMembers = async (id) =>{
    try {
        let result=[];
        for (const element of id) {
            const res = await databases.listDocuments(
                config.databaseID,
                config.userCollectionID,
                [Query.equal("$id", element)]
            );
            if(id=="66b52db20027bc0804b8"){ 
            console.log(res);
            }
            if(res.documents.length>0){
            result.push(res.documents[0].UserName);
            }
        }
        return result;
    } catch (error) {
        console.log(error)
    }
}
export const getRoomUser = async (element) =>{
    try {
            console.log(element)
            const res = await databases.listDocuments(
                config.databaseID,
                config.userCollectionID,
                [Query.equal("$id", element)]
            )
            if(!res) throw Error;
            console.log(res);
            return (res).documents[0];
    } catch (error) {
        console.log(error)
    }
}
export const getAllShips = async () =>{
    try {
        const post = await databases.listDocuments(
            config.databaseID,
            config.shipID
        )
       
        return post.documents;
    } catch (error) {
        console.log(error)
    }
}
export const getShipByID = async (id) =>{
    try {
        console.log("in getshipbyid")
        const post = await databases.listDocuments(
            config.databaseID,
            config.shipID,
            [Query.equal("$id",id)]
        )
        console.log(post.documents[0])
        return post.documents[0];
    } catch (error) {
        console.log(error)
    }
}

export const getRoomByID = async (id) =>{
    try {
        console.log("in getRoomByID")
        const post = await databases.listDocuments(
            config.databaseID,
            config.lobbysCollectionID,
            [Query.equal("$id",id)]
        )
        console.log(post.documents[0])
        return post.documents[0];
    } catch (error) {
        console.log(error)
    }
}


export const SavePoop = async (user) =>{

    try {
        console.log(user)
        data= new Date();
        let poop= {date: data,user:user.$id};
        const post = await databases.createDocument(
            config.databaseID,
            config.poopsCollectionID,
            ID.unique(),
            poop
        )
        for(const lobby of user.lobbysArray){
        const UpdatePoop = {id_lobby:lobby,senderUserName:"Poop",senderID:"Poop",message:user.UserName+" "+getFraseRandom()}
         await databases.createDocument(
            config.databaseID,
            config.lobbyUpdateCollectionID,
            ID.unique(),
            UpdatePoop
        )
    }
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}

export const getRoomBoard2 = async (users,start) =>{
    var result=[];
    for (const user of users){
    const poops = await databases.listDocuments(
        config.databaseID,
        config.poopsCollectionID,
        [Query.and([Query.equal("user",user), Query.greaterThan("date", start)])]
    )
    result.push({user:user,total:poops.total})
}
return result;
}

export const getRoomBoard = async (users,start) =>{
    var result=[];
    for (const user of users){
    const poops = await databases.listDocuments(
        config.databaseID,
        config.poopsCollectionID,
        [Query.and([Query.equal("user",user), Query.greaterThan("date", start)])]
    )
    const UserName = await databases.listDocuments(
        config.databaseID,
        config.userCollectionID,
        [Query.equal("$id",user)]
    )
    result.push({user:UserName.documents[0],total:poops.total})
}
result.sort((a, b) => b.total - a.total);
return result;
}

export const getRoomUpdates = async (id) =>{
    console.log("In get Room Updates with id: "+ id)
    try {
    const UserName = await databases.listDocuments(
        config.databaseID,
        config.lobbyUpdateCollectionID,
        [Query.equal("id_lobby",id),Query.limit(50),Query.orderDesc("$createdAt")]
    ).catch(()=>{return false})
return UserName.documents//.reverse();
} catch (error) {
        console.log(error)
}
}

export const SendUpdate= async(message)=>{
    const UpdatePoop = {id_lobby:message.lobby,senderUserName:message.username,senderID:message.userID,message:message.content}
    console.log("carico Messaggio:")
    console.log(UpdatePoop)
    await databases.createDocument(
       config.databaseID,
       config.lobbyUpdateCollectionID,
       ID.unique(),
       UpdatePoop
   )
}

export const CreateRoom = async (user,name) =>{

    try {
        let lista=[];
        lista.push(user.$id);
        let codice= randomString(6);
        let lobby={title:name,usersArray:lista,code:codice}
        let lobbyCreated;

        let exist= await databases.listDocuments(config.databaseID,
            config.lobbysCollectionID,
            [Query.equal("code",codice)])

            if(exist.documents.length==0){
                lobbyCreated = await databases.createDocument(
                    config.databaseID,
                    config.lobbysCollectionID,
                    ID.unique(),
                    lobby
                )
            
                let UserLobbys=[]
            if (user.lobbysArray!=undefined){
            UserLobbys = user.lobbysArray;
            }
            
            UserLobbys.push(lobbyCreated.$id);
            console.log("lobby id:"+ lobbyCreated.$id)
            console.log("Lobby aggiornate: "+ UserLobbys.join(","))
            databases.updateDocument(
                config.databaseID,
                config.userCollectionID,
                user.$id,
            {lobbysArray:UserLobbys})
            }
            else{
                CreateRoom(user,name);
            }
            return lobbyCreated;
        
    } catch (error) {
        console.log(error);
        return false;
    }
}

export const JoinLega = async (user,codice)=>{
    try {
        if(user==undefined){
            user = getCurrentUser();
        }
    let exist= await databases.listDocuments(config.databaseID,
        config.lobbysCollectionID,
        [Query.equal("code",codice)])

        console.log(exist);
        if(exist.documents.length>0){
            let users = exist.documents[0].usersArray;
            
            users.push(user.$id);
            
            await databases.updateDocument(
                config.databaseID,
                config.lobbysCollectionID,
                exist.documents[0].$id,
            {usersArray:users}).catch(()=>{return false})

            let UserLobbys =[];
            if(user.lobbysArray!=undefined){
                UserLobbys= user.lobbysArray;
            };
            UserLobbys.push(exist.documents[0].$id);
            await databases.updateDocument(
                config.databaseID,
                config.userCollectionID,
                user.$id,
            {lobbysArray:UserLobbys}).catch(()=>{return false})
            return true;
        }
        else{
            return false;
        }
    } catch (error) {
     console.log(error);
    }

}




function randomString(length) {
    var result = '';
    var chars= '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    for (var i = length; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))];
    return result.toUpperCase();
}


function getFraseRandom(){
    let frasi= ["madonna santa...si sente da qua.","ne ha tirata una enorme ragazzi!","vuole portarsi a casa la PooPooCup!","ha sofferto, ma ha vinto la battaglia!",
        "...ma che bestia hai tirato fuori?","ci voleva proprio!"];
        return frasi[Math.floor(Math.random()*frasi.length)];
}



const styles = StyleSheet.create({
    // ... define some tyles
});


