import { libraryMatchParts } from "@/lib/librarySearch";
export function LibrarySearchMatch({text,query}: {text:string;query:string}) {
 return <>{libraryMatchParts(text,query).map((part,index)=>part.match?<mark key={index} className="library-search-match">{part.text}</mark>:part.text)}</>;
}
