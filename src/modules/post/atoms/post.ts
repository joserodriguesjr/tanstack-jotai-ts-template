import {atom} from "jotai";
import { atomWithSuspenseQuery } from 'jotai-tanstack-query'
import { postQueryOptions } from "@/modules/post/api";

export const postIdAtom = atom<string>("1");
export const postAtom = atomWithSuspenseQuery((get) => postQueryOptions(String(get(postIdAtom))))
