import { getCurrentArtist } from "../globals.js";
let editMode = false

export function initAddEditItem(){
const currentArtist = getCurrentArtist()

const artistOnAddNew = document.getElementById("artistOnAddItem")
artistOnAddNew.innerText = currentArtist





}