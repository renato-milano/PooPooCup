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
    lobbysCollectionID:"66b52a18000f073bc74b"
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
export const getRoomMembers = async (id) =>{
    try {
        let result=[];
        for (const element of id) {
            console.log(element);
            const res = await databases.listDocuments(
                config.databaseID,
                config.userCollectionID,
                [Query.equal("$id", element)]
            );
            result.push(res.documents[0].UserName);
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

export const SavePoop = async (user) =>{

    try {
        data= new Date();
        let poop= {date: data,user:user.accountId};
        const post = await databases.createDocument(
            config.databaseID,
            config.poopsCollectionID,
            ID.unique(),
            poop
        )
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}
const styles = StyleSheet.create({
    // ... define some tyles
});

