
// pages/Description/Description.jsx
import { useParams } from "react-router-dom";
export default function Description(){
  const { id } = useParams();
  return <h1>Description for {id}</h1>;
}