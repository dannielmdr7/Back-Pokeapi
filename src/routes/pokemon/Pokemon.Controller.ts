import {RequestHandler} from 'express';
import { pokemonApi } from '../../external-api/pokemonApi';

const getPokemonById = async(id:string)=>{
  const pokemons = await pokemonApi.get(
    `https://pokeapi.co/api/v2/pokemon/${id}`,
    );
    return pokemons.data
}
const getPokemonPage = async(limits:string)=>{
  const pokemons = await pokemonApi.get(
    `https://pokeapi.co/api/v2/pokemon?${limits}`,
    );
    return pokemons.data
}
export const getPokemon: RequestHandler=async(req,res) =>{
  try {
    const id=req.params.id
    const poke =await  getPokemonById(id);
    res.status(200).json({
      ok:true,
      data:poke
    })
  } catch (error) {
    console.log(error);
  }
}
export const getPokemonsPerPage: RequestHandler=async(req,res) =>{
  try {
    const limits = req.params.limit || ''
    const poke =await  getPokemonPage(limits);
    res.status(200).json({
      ok:true,
      data:poke
    })
  } catch (error) {
    console.log(error);
  }
}
const getPokemons = async()=>{
  const pokemons = await pokemonApi.get(
    `https://pokeapi.co/api/v2/pokemon?limit=20`,
    );
    return pokemons.data
}
export const getAllPokemon: RequestHandler=async(req,res) =>{
  try {
    console.log('req',req);
    const poke =await  getPokemons();
    res.status(200).json({
      ok:true,
      data:poke
    })
    // return res.json({
      // ok: true,
      // data:resp.data.results[1]
    // })
  } catch (error) {
    console.log(error);
  }
}