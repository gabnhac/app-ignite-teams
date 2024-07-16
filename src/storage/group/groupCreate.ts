import AsyncStorage from "@react-native-async-storage/async-storage";

import { GROUP_COLLECTION } from "@storage/storageConfig";
import { groupsGetAll } from "./groupGetAll";
import { AppError } from "@utils/AppError";

export async function groupCreate(newGroupName: string){
    try{
        const storedGroups = await groupsGetAll();

        const groupAlredyExists = storedGroups.includes(newGroupName);

        if (groupAlredyExists) {
            throw new AppError('Já existe uma Turma cadastrada com esse nome')
        }

        const storage = JSON.stringify([...storedGroups, newGroupName])
        await AsyncStorage.setItem(GROUP_COLLECTION, storage);
    }catch(error){
        throw error;
    }
};