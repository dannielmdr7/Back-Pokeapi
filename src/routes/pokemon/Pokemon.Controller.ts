import {RequestHandler} from 'express';
import { pokemonApi } from '../../external-api/pokemonApi';

const getPokemonByName = async(name:string)=>{
  const pokemons = await pokemonApi.get(
    `https://pokeapi.co/api/v2/pokemon/${name}`,
    );
    return pokemons.data
}
export const getPokemon: RequestHandler=async(req,res) =>{
  try {
    const name = req.header("name") || "";
    const poke =await  getPokemonByName(name);
    res.status(200).json({
      ok:true,
      data:poke
    })
  } catch (error) {
    console.log(error);
  }
}
