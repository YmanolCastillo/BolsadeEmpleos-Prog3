export interface User{
    nombre:string
    uid:string;
    email:string,
    role:role;
    }
    export interface role{
        Admin?:boolean,
        User?:boolean,
        Poster?:boolean
    }

    export interface post{
        id?:string,
        Uid:string,
        categoria?:string,
        compania?:string,
        descripcion?:string,
        email?:string,
        info?:string,
        posicion?:string,
        ubicacion?:string,
        url?:string,
    }